import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import StarButton from "../client/src/components/ui/star-button";

describe("glass star button", () => {
  it("defaults to a non-submitting native button with decorative stars", () => {
    const html = renderToStaticMarkup(createElement(StarButton, null, "Consultation"));
    expect(html).toContain('type="button"');
    expect(html).toContain('aria-hidden="true"');
    expect(html.match(/viewBox=/g)).toHaveLength(6);
    expect(html).toContain("Consultation");
  });

  it("preserves explicit submit and disabled behavior", () => {
    const html = renderToStaticMarkup(createElement(StarButton, { type: "submit", disabled: true }, "Send"));
    expect(html).toContain('type="submit"');
    expect(html).toContain('disabled=""');
  });

  it("decorates links without creating a nested button", () => {
    const html = renderToStaticMarkup(createElement(StarButton, { asChild: true },
      createElement("a", { href: "/el/contact/", className: "btn-primary", target: "_blank", rel: "noopener noreferrer" }, "Επικοινωνία")));
    expect(html).toContain('href="/el/contact/"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain("star-button btn-primary");
    expect(html).not.toContain("<button");
    expect(html).toContain("Επικοινωνία");
  });

  it("preserves native selection state and the original disabled prop through Slot", () => {
    const html = renderToStaticMarkup(createElement(StarButton, { asChild: true },
      createElement("button", { type: "button", "aria-pressed": true, disabled: true, className: "btn-secondary" }, "Selected")));
    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain('disabled=""');
    expect(html.match(/<button/g)).toHaveLength(1);
  });
});
