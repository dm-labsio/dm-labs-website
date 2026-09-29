import { afterEach, describe, expect, it, vi } from "vitest";
import { attachCardVideo } from "../client/src/components/home/serviceCardVideo";

function setup(reduced = false, saveData = false) {
  const preference = { matches:reduced, addEventListener:vi.fn(), removeEventListener:vi.fn() };
  const doc = { hidden:false, addEventListener:vi.fn(), removeEventListener:vi.fn() };
  let observeCallback: (entries: { isIntersecting: boolean }[]) => void;
  const observer = { observe:vi.fn(), disconnect:vi.fn() };
  vi.stubGlobal("window",{ matchMedia:() => preference });
  vi.stubGlobal("navigator",{ connection:{saveData} });
  vi.stubGlobal("document",doc);
  vi.stubGlobal("IntersectionObserver",class { constructor(callback:typeof observeCallback){observeCallback=callback;return observer;} });
  const video = { src:"", muted:false, ended:false, play:vi.fn().mockResolvedValue(undefined),pause:vi.fn(),removeAttribute:vi.fn(),load:vi.fn() };
  const close = attachCardVideo(video as unknown as HTMLVideoElement,"/clip.mp4");
  return { video, close, preference, doc, observer, visibility:(value:boolean)=>observeCallback([{isIntersecting:value}]) };
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
  it("stops for a changed motion preference and does not loop a finished clip",()=>{
    const s=setup();s.preference.matches=true;s.visibility(true);expect(s.video.play).not.toHaveBeenCalled();
    s.preference.matches=false;s.video.ended=true;s.visibility(true);expect(s.video.play).not.toHaveBeenCalled();s.close();
  });
  it("cancels loading and listeners on close or navigation, including late observer events",()=>{
    const s=setup();s.close();s.visibility(true);
    expect(s.observer.disconnect).toHaveBeenCalledOnce();expect(s.video.removeAttribute).toHaveBeenCalledWith("src");
    expect(s.video.load).toHaveBeenCalledOnce();expect(s.video.play).not.toHaveBeenCalled();
    expect(s.preference.removeEventListener).toHaveBeenCalled();expect(s.doc.removeEventListener).toHaveBeenCalled();
  });
});
