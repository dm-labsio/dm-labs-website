import { afterEach, describe, expect, it, vi } from "vitest";
import { attachServiceMotion } from "../client/src/components/services/useServiceMotion";

function environment(reduced = false) {
  let intersection: (entries: { isIntersecting: boolean }[]) => void = () => {};
  const preference = { matches: reduced, addEventListener: vi.fn(), removeEventListener: vi.fn() };
  const doc = { hidden: false, addEventListener: vi.fn(), removeEventListener: vi.fn() };
  const disconnect = vi.fn();
  vi.stubGlobal("window", { matchMedia: () => preference });
  vi.stubGlobal("document", doc);
  vi.stubGlobal("IntersectionObserver", class { constructor(cb: typeof intersection) { intersection = cb; } observe() {} disconnect = disconnect; });
  const revert = vi.fn();
  const animate = vi.fn();
  const add = vi.fn((callback: () => void) => { callback(); return { revert }; });
  const module = { animate, createScope: vi.fn(() => ({ add })), stagger: vi.fn(() => 0) };
  const root = { querySelectorAll: () => [{}] } as unknown as HTMLElement;
  const loader = vi.fn(async () => module as unknown as Pick<typeof import("animejs"), "animate" | "createScope" | "stagger">);
  return { preference, doc, disconnect, revert, animate, module, root, loader, enter: () => intersection([{ isIntersecting: true }]), leave: () => intersection([{ isIntersecting: false }]) };
}
const flush = async () => { await Promise.resolve(); await Promise.resolve(); };
afterEach(() => vi.unstubAllGlobals());

describe("service artwork motion lifecycle", () => {
  it("keeps reduced-motion artwork static without loading the animation engine", async () => {
    const e = environment(true); const stop = attachServiceMotion(e.root, e.loader); e.enter(); await flush();
    expect(e.loader).not.toHaveBeenCalled(); stop(); expect(e.disconnect).toHaveBeenCalled();
  });
  it("starts once when visible, settles offscreen and cleans up listeners", async () => {
    const e = environment(); const stop = attachServiceMotion(e.root, e.loader);
    expect(e.loader).not.toHaveBeenCalled(); e.enter(); await flush(); expect(e.animate).toHaveBeenCalled();
    for (const [, options] of e.animate.mock.calls) expect(options.loop).toBeUndefined();
    e.leave(); expect(e.revert).toHaveBeenCalledTimes(1); e.enter(); await flush(); expect(e.loader).toHaveBeenCalledTimes(1);
    stop(); expect(e.preference.removeEventListener).toHaveBeenCalled(); expect(e.doc.removeEventListener).toHaveBeenCalled();
  });
  it("restores static styles when the motion preference changes", async () => {
    const e = environment(); const stop = attachServiceMotion(e.root, e.loader); e.enter(); await flush();
    e.preference.matches = true; e.preference.addEventListener.mock.calls[0][1](); expect(e.revert).toHaveBeenCalledTimes(1); stop();
  });
  it("does not animate after navigating away during the lazy import", async () => {
    const e = environment(); let finish!: (value: Awaited<ReturnType<typeof e.loader>>) => void;
    const deferred = () => new Promise<Awaited<ReturnType<typeof e.loader>>>(resolve => { finish = resolve; });
    const stop = attachServiceMotion(e.root, deferred); e.enter(); stop(); finish(await e.loader()); await flush();
    expect(e.module.createScope).not.toHaveBeenCalled();
  });
  it("does not animate a section that became offscreen during the lazy import", async () => {
    const e = environment(); let finish!: (value: Awaited<ReturnType<typeof e.loader>>) => void;
    const stop = attachServiceMotion(e.root, () => new Promise(resolve => { finish = resolve; }));
    e.enter(); e.leave(); finish(await e.loader()); await flush(); expect(e.module.createScope).not.toHaveBeenCalled(); stop();
  });
  it("settles an active scene when the document becomes hidden", async () => {
    const e = environment(); const stop = attachServiceMotion(e.root, e.loader); e.enter(); await flush();
    e.doc.hidden = true; e.doc.addEventListener.mock.calls[0][1](); expect(e.revert).toHaveBeenCalledTimes(1); stop();
  });
  it("keeps the static fallback when the optional animation chunk fails", async () => {
    const e = environment(); const stop = attachServiceMotion(e.root, async () => { throw new Error("offline"); }); e.enter(); await flush();
    expect(e.module.createScope).not.toHaveBeenCalled(); stop();
  });
});
