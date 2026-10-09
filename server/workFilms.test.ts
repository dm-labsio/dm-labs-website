import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import {
  filmProjects,
  filmSource,
  filmPoster,
} from "../client/src/components/work/filmData";
const root = resolve(import.meta.dirname, "../client/public");
describe("Our Work film delivery", () => {
  it("delivers all eight supplied films with web-safe, progressively playable files and posters", () => {
    const clips = filmProjects.flatMap(p => p.clips);
    expect(clips).toHaveLength(8);
    expect(new Set(clips.map(c => c.id)).size).toBe(8);
    for (const clip of clips) {
      const video = readFileSync(resolve(root, filmSource(clip).slice(1)));
      expect(video.length).toBeLessThan(9_000_000);
      expect(existsSync(resolve(root, filmPoster(clip).slice(1)))).toBe(true);
      const atoms: string[] = [];
      for (let offset = 0; offset + 8 <= video.length; ) {
        const size = video.readUInt32BE(offset);
        atoms.push(video.toString("ascii", offset + 4, offset + 8));
        if (!size) break;
        offset += size;
      }
      expect(atoms).toContain("moov");
      expect(atoms).toContain("mdat");
      expect(atoms.indexOf("moov")).toBeLessThan(atoms.indexOf("mdat"));
    }
  });
});
