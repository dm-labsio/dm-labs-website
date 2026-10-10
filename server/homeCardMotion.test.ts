import { afterEach, describe, expect, it, vi } from "vitest";
import { attachCardVideo } from "../client/src/components/home/serviceCardVideo";

function setup(reduced = false, saveData = false, deny = false) {
  const preference = { matches:reduced, addEventListener:vi.fn(), removeEventListener:vi.fn() };
  const doc = { hidden:false, addEventListener:vi.fn(), removeEventListener:vi.fn() };
  let observeCallback: (entries: { isIntersecting: boolean }[]) => void;
  const observer = { observe:vi.fn(), disconnect:vi.fn() };
  vi.stubGlobal("window",{ matchMedia:() => preference });
  vi.stubGlobal("navigator",{ connection:{saveData} });
  vi.stubGlobal("document",doc);
  vi.stubGlobal("IntersectionObserver",class { constructor(callback:typeof observeCallback){observeCallback=callback;return observer;} });
  const video = { src:"", muted:false, loop:false, ended:false, play:vi.fn().mockResolvedValue(undefined),pause:vi.fn(),removeAttribute:vi.fn(),load:vi.fn(),addEventListener:vi.fn(),removeEventListener:vi.fn() };
  if (deny) video.play.mockRejectedValue(Object.assign(new Error("Denied"),{name:"NotAllowedError"}));
  const blocked = vi.fn();
  const close = attachCardVideo(video as unknown as HTMLVideoElement,"/clip.mp4",blocked);
  return { video, close, blocked, preference, doc, observer, visibility:(value:boolean)=>observeCallback([{isIntersecting:value}]) };
}
afterEach(()=>vi.unstubAllGlobals());
describe("Service card motion lifecycle",()=>{
  it.each([[true,false],[false,true]])("does not request motion for reduced=%s or saveData=%s",(reduced,saveData)=>{
    const s=setup(reduced,saveData);expect(s.video.src).toBe("");expect(s.observer.observe).not.toHaveBeenCalled();s.close();
  });
  it("plays only in view and pauses when the tab is hidden",()=>{
    const s=setup();s.visibility(true);expect(s.video.play).toHaveBeenCalledOnce();
    s.visibility(false);expect(s.video.pause).toHaveBeenCalled();
    s.doc.hidden=true;s.visibility(true);expect(s.video.play).toHaveBeenCalledOnce();s.close();
  });
  it("loops the active clip but stops for a changed motion preference",()=>{
    const s=setup();s.preference.matches=true;s.visibility(true);expect(s.video.play).not.toHaveBeenCalled();
    expect(s.video.loop).toBe(true);
    s.preference.matches=false;s.video.ended=true;s.visibility(true);expect(s.video.play).toHaveBeenCalledOnce();s.close();
  });
  it("offers a user-gesture fallback when autoplay is denied", async()=>{
    const s=setup(false,false,true);s.visibility(true);await Promise.resolve();
    expect(s.blocked).toHaveBeenCalledOnce();s.close();
  });
  it("retries when the media can play and ignores late rejection after cleanup", async()=>{
    const s=setup(false,false,true);s.visibility(true);s.close();await Promise.resolve();
    expect(s.blocked).not.toHaveBeenCalled();
    expect(s.video.addEventListener).toHaveBeenCalledWith("canplay",expect.any(Function));
    expect(s.video.removeEventListener).toHaveBeenCalledWith("canplay",expect.any(Function));
  });
  it("cancels loading and listeners on close or navigation, including late observer events",()=>{
    const s=setup();s.close();s.visibility(true);
    expect(s.observer.disconnect).toHaveBeenCalledOnce();expect(s.video.removeAttribute).toHaveBeenCalledWith("src");
    expect(s.video.load).toHaveBeenCalledOnce();expect(s.video.play).not.toHaveBeenCalled();
    expect(s.preference.removeEventListener).toHaveBeenCalled();expect(s.doc.removeEventListener).toHaveBeenCalled();
  });
});
