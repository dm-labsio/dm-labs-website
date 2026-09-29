import { afterEach, describe, expect, it, vi } from "vitest";
import { schedulePricingAdvance } from "../client/src/components/pricing/pricingNavigation";

function setup(reduced: boolean) {
  vi.useFakeTimers();
  const target = { focus: vi.fn(), scrollIntoView: vi.fn() };
  vi.stubGlobal("document", { getElementById: vi.fn(() => target) });
  vi.stubGlobal("window", { matchMedia: () => ({ matches: reduced }), setTimeout, clearTimeout });
  return target;
}
afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });
describe("pricing selection advancement", () => {
  it("confirms selection before focusing and scrolling to the requested step", () => {
    const target = setup(false);
    schedulePricingAdvance("maintenance");
    vi.advanceTimersByTime(359);
    expect(target.focus).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(document.getElementById).toHaveBeenCalledWith("maintenance");
    expect(target.focus).toHaveBeenCalledWith({ preventScroll: true });
    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  });
  it("does not move focus after the selection is cancelled or the page unmounts", () => {
    const target = setup(false);
    const cancel = schedulePricingAdvance("your-selection");
    cancel();
    vi.runAllTimers();
    expect(target.focus).not.toHaveBeenCalled();
    expect(target.scrollIntoView).not.toHaveBeenCalled();
  });
  it("moves immediately without animation when reduced motion is requested", () => {
    const target = setup(true);
    schedulePricingAdvance("your-selection");
    expect(target.focus).toHaveBeenCalledOnce();
    expect(target.scrollIntoView).toHaveBeenCalledWith({ behavior: "instant", block: "start" });
    expect(vi.getTimerCount()).toBe(0);
  });
});
