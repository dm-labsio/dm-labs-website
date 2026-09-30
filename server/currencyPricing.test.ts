import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import type { IncomingMessage, ServerResponse } from "node:http";
import { describe, expect, it, vi } from "vitest";
import { CURRENCIES, CURRENCY_SNAPSHOT, commercialText, convertedPrice, currencyForCountry, formatMoney } from "../shared/currency";
import visitorCurrency from "../api/visitor-currency";
import { loadVisitorCurrency } from "../client/src/lib/visitorCurrency";
import { CurrencyProvider } from "../client/src/contexts/CurrencyContext";
import { pricingPaymentSchedule } from "../client/src/components/pricing/pricingExperience";
import { pricingContactUrl } from "../client/src/components/pricing/pricingContent";
import PricingEstimate from "../client/src/components/pricing/PricingEstimate";
import { PackageCards } from "../client/src/components/pricing/PackageOverview";
import { pricingEnquiry, pricingEnquiryQuery } from "../client/src/lib/pricingEnquiry";
import { pageSchema } from "../client/src/lib/structuredData";

const basePrices = [299,749,1499,69,129,750,1395];
const expected = {
  EUR: [299,749,1499,69,129,750,1395],
  USD: [350,875,1725,80,150,875,1600],
  CAD: [500,1225,2425,115,210,1225,2250],
  ILS: [1050,2600,5250,240,450,2650,4850],
};
const plain = (html: string) => html.replace(/<[^>]*>/g, "").replace(/&amp;/g,"&");

describe("country-based stable prices", () => {
  it("maps only Israel, US and Canada specially, independently of language", () => {
    for (const [country,currency] of [["IL","ILS"],["US","USD"],["CA","CAD"],["CY","EUR"],["GR","EUR"],["GB","EUR"],["AU","EUR"],["","EUR"],["US,CA","EUR"],["USD","EUR"],[" il ","ILS"]]) expect(currencyForCountry(country)).toBe(currency);
    for (const country of [undefined,null,[],["US"],42]) expect(currencyForCountry(country)).toBe("EUR");
  });
  it.each(CURRENCIES)("pins %s amounts, rounds up and keeps yearly care cheaper", currency => {
    expect(basePrices.map(price=>convertedPrice(price,currency))).toEqual(expected[currency]);
    for (const price of [...basePrices,25,45,50,60,80,149]) {
      const converted = convertedPrice(price,currency);
      expect(converted).toBeGreaterThanOrEqual(price*CURRENCY_SNAPSHOT.rates[currency]);
      expect(Number.isInteger(converted)).toBe(true);
    }
    for (const [month,year] of [[69,750],[129,1395]]) expect(convertedPrice(year,currency)).toBeLessThan(convertedPrice(month,currency)*12);
    expect(convertedPrice(0,currency)).toBe(0);
    for (const invalid of [-1,NaN,Infinity]) expect(()=>convertedPrice(invalid,currency)).toThrow();
  });
  it.each(CURRENCIES)("adds already-rounded amounts in %s, never converts a total", currency => {
    for (let build=0;build<3;build++) for (let care=0;care<2;care++) {
      const annual=pricingPaymentSchedule(build,care,true,currency)!;
      expect(annual.total).toBe(expected[currency][build]+expected[currency][5+care]);
      const monthly=pricingPaymentSchedule(build,care,false,currency)!;
      expect(monthly).toEqual({build:expected[currency][build],care:expected[currency][3+care],total:null});
    }
  });
  it("formats both dollar currencies explicitly and isolates inline Hebrew figures", () => {
    expect(formatMoney("en",500,"CAD")).toContain("CAD");
    expect(formatMoney("en",350,"USD")).toContain("USD");
    expect(commercialText("מ־€1,499 לחודש", "he", "ILS")).toContain("\u2066");
    expect(commercialText("€1.499", "el", "CAD")).toContain("2.425");
  });
  it.each(CURRENCIES)("matches cards, estimates and Offer schema in %s for all languages", currency => {
    for (const locale of ["en","el","he"] as const) {
      const wrapped=(child:React.ReactNode)=>React.createElement(CurrencyProvider,{currency,children:child});
      const cards=plain(renderToStaticMarkup(wrapped(React.createElement(PackageCards,{locale,compact:true}))));
      for (const price of expected[currency].slice(0,3)) expect(cards).toContain(formatMoney(locale,price,currency));
      for (const yearly of [false,true]) {
        const receipt=plain(renderToStaticMarkup(wrapped(React.createElement(PricingEstimate,{locale,build:2,care:1,yearly}))));
        const schedule=pricingPaymentSchedule(2,1,yearly,currency)!;
        expect(receipt).toContain(formatMoney(locale,yearly?schedule.total!:schedule.build,currency));
        if (!yearly) expect(receipt).toContain(formatMoney(locale,schedule.care,currency));
      }
      const schema=pageSchema(`https://dm-labs.io/${locale==="en"?"":`${locale}/`}pricing/`,"Pricing","Plans",locale,"/logo.png","Logo",currency);
      const offers=schema["@graph"][0].hasOfferCatalog!.itemListElement;
      expect(offers.map(offer=>offer.price)).toEqual(expected[currency].slice(0,3));
      expect(offers.every(offer=>offer.priceCurrency===currency)).toBe(true);
    }
  });
  it("carries validated currency into contact and language switches, ignores invented amounts", () => {
    const url=pricingContactUrl("he",1,1,false,"CAD");
    const query=url.slice(url.indexOf("?"));
    expect(pricingEnquiryQuery(query)).toBe(query);
    for (const locale of ["en","el","he"] as const) {
      const message=pricingEnquiry(locale,query+"&price=1");
      expect(message).toContain("CAD");
      expect(message).toContain(formatMoney(locale,1225,"CAD"));
      expect(message).toContain(formatMoney(locale,210,"CAD"));
    }
    expect(pricingEnquiryQuery(query.replace("CAD","BOGUS"))).not.toContain("currency");
    expect(pricingEnquiry("en","?package=invalid&currency=CAD")).toBe("");
  });
});

describe("private country lookup", () => {
  function request(country?: unknown, method="GET") {
    const headers:Record<string,string>={};let body:unknown;let statusCode=200;
    const res={setHeader:(name:string,value:string)=>{headers[name]=value;},end:(value:unknown)=>{body=value;},get statusCode(){return statusCode;},set statusCode(value){statusCode=value;}};
    visitorCurrency({method,headers:{"x-vercel-ip-country":country}} as IncomingMessage,res as unknown as ServerResponse);
    return {headers,body,statusCode};
  }
  it("responds without shared caching, cookies or personal data", () => {
    for (const [country,currency] of [["IL","ILS"],["US","USD"],["CA","CAD"],["CY","EUR"],[undefined,"EUR"]]) {
      const result=request(country);
      expect(JSON.parse(result.body as string)).toEqual({currency});
      expect(result.headers["Cache-Control"]).toBe("private, no-store");
      expect(result.headers["Vercel-CDN-Cache-Control"]).toBe("no-store");
      expect(result.headers["Set-Cookie"]).toBeUndefined();
    }
    expect(request("CA","HEAD").body).toBeUndefined();
    expect(request("US","POST").statusCode).toBe(405);
  });
  it("loads a supported currency and falls back safely on failures/malformed results", async () => {
    for (const currency of CURRENCIES) expect(await loadVisitorCurrency(vi.fn().mockResolvedValue(Response.json({currency})))).toBe(currency);
    for (const body of [{currency:"GBP"},{},null,{currency:["ILS"]}]) expect(await loadVisitorCurrency(vi.fn().mockResolvedValue(Response.json(body)))).toBe("EUR");
    expect(await loadVisitorCurrency(vi.fn().mockRejectedValue(new Error("offline")))).toBe("EUR");
    expect(await loadVisitorCurrency(vi.fn().mockResolvedValue(new Response("unavailable",{status:503})))).toBe("EUR");
    expect(await loadVisitorCurrency(vi.fn().mockResolvedValue(new Response("not json")))).toBe("EUR");
  });
  it("bounds a slow lookup so it cannot prevent the site becoming interactive", async () => {
    vi.useFakeTimers();
    try {
      const fetcher=vi.fn((_url,options)=>new Promise<Response>((_resolve,reject)=>options.signal.addEventListener("abort",()=>reject(new Error("aborted")))));
      const pending=loadVisitorCurrency(fetcher);
      await vi.advanceTimersByTimeAsync(1500);
      expect(await pending).toBe("EUR");
    } finally { vi.useRealTimers(); }
  });
});
