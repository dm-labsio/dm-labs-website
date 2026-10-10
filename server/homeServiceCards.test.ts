import React from "react";
import { Router } from "wouter";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { HomeServiceCard } from "../client/src/components/home/HomeServiceCards";
import { overviewContent } from "../client/src/components/home/overviewContent";
import { SERVICE_CARD_COPY } from "../client/src/components/home/serviceCardContent";

const cases = (["en", "el", "he"] as const).flatMap(language => [0,1,2,3,4,5].map(index => ({language,index})));
describe("Homepage service cards", () => {
  it.each(cases)("keeps the complete $language service $index reachable with localized controls", ({language,index}) => {
    const props = { language, index, play: false, onOpen: () => {}, onToggle: () => {} };
    const item = overviewContent[language].services[index];
    const closed = renderToStaticMarkup(React.createElement(Router, {ssrPath:"/"}, React.createElement(HomeServiceCard, {...props, open:false})));
    const open = renderToStaticMarkup(React.createElement(Router, {ssrPath:"/"}, React.createElement(HomeServiceCard, {...props, open:true})));
    const text = (value:string) => renderToStaticMarkup(React.createElement(React.Fragment,null,value));
    expect(closed).toContain(text(SERVICE_CARD_COPY[language].summaries[index]));
    expect(closed).toContain('aria-expanded="false"');
    expect(closed).toContain('hidden=""');
    expect(open).toContain('aria-expanded="true"');
    expect(open).not.toContain('hidden=""');
    expect(open).toContain(text(item.body));
    expect(open).toContain(`href="${language === "en" ? "" : `/${language}`}/services/${item.slug}/"`);
    expect(open).toContain(`aria-controls="home-service-${item.slug}-detail"`);
    for (const html of [open,closed]) {
      expect(html.match(/<video[^>]*>/)?.[0]).not.toMatch(/\ssrc=/);
      expect(html.match(/<video[^>]*>/)?.[0]).toMatch(/autoPlay/);
      expect(html.match(/<video[^>]*>/)?.[0]).toMatch(/muted/);
      expect(html).toContain('preload="none"');
    }
  });
});
