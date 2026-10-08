import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
const source = readFileSync(
  resolve("client/public/previews/dr-elara-dental.html"),
  "utf8"
);
const script = readFileSync(
  resolve("client/public/previews/elara/elara.mjs"),
  "utf8"
);
describe("Dr. Elara educational film", () => {
  it("preserves the supplied film with native controls and on-demand loading", () => {
    expect(source).toContain(
      "https://zcqnftsc7hsxgrnx.public.blob.vercel-storage.com/dr-elara-root-canal-treatment_dc985187.mp4"
    );
    expect(source).toMatch(/muted\s+playsinline\s+controls\s+preload="none"/);
    expect(source).toContain(
      'aria-label="Animated explanation of root canal treatment"'
    );
    expect(source).not.toContain("autoplay");
    expect(script).toContain("video.pause()");
  });
  it("explains its educational context without treatment guarantees", () => {
    expect(source).toContain("not an individual treatment plan");
    expect(source).toContain(
      "https://www.nhs.uk/tests-and-treatments/root-canal-treatment/"
    );
    expect(source).not.toMatch(
      /full strength|painless|leave with the tooth saved/
    );
  });
  it("keeps this fictional practice out of search and real booking flows", () => {
    expect(source).toContain('content="noindex, nofollow"');
    expect(source).toContain("nothing is booked or sent");
    expect(source).not.toMatch(/type="(?:email|tel)"|onsubmit="return false"/);
    expect(script).not.toMatch(/fetch\(|XMLHttpRequest|localStorage/);
  });
});
