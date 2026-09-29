import { describe, expect, it } from "vitest";
import { firstYearEstimate, comparisonRows } from "../client/src/components/pricing/pricingExperience";
import { COMPARISON } from "../client/src/components/pricing/pricingContent";

describe("pricing decision support", () => {
  it("never presents a complete total for an incomplete or invalid selection", () => {
    for (const [build, care] of [[null,null],[0,null],[null,1],[-1,0],[3,1],[0,2],[1.5,0]]) {
      expect(firstYearEstimate(build,care,false)).toBeNull();
      expect(firstYearEstimate(build,care,true)).toBeNull();
    }
  });
  it("adds the build once and exactly twelve monthly payments or one annual payment", () => {
    const expectedMonthly = [[1127,1847],[1577,2297],[2327,3047]];
    const expectedYearly = [[1049,1694],[1499,2144],[2249,2894]];
    for(let build=0;build<3;build++) for(let care=0;care<2;care++) {
      expect(firstYearEstimate(build,care,false)).toBe(expectedMonthly[build][care]);
      expect(firstYearEstimate(build,care,true)).toBe(expectedYearly[build][care]);
      expect(firstYearEstimate(build,care,false)!-firstYearEstimate(build,care,true)!).toBe(care===0?78:153);
    }
  });
  it.each(["en","el","he"] as const)("filters only identical comparison rows in %s", locale => {
    expect(comparisonRows(locale,false)).toEqual(COMPARISON[locale]);
    const differences=comparisonRows(locale,true);
    expect(differences).toHaveLength(10);
    expect(differences[0]).toBe(COMPARISON[locale][0]);
    expect(differences.at(-1)).toBe(COMPARISON[locale].at(-1));
    expect(differences.every(row=>row.launch!==row.growth||row.growth!==row.pro)).toBe(true);
    expect(COMPARISON[locale]).toHaveLength(13);
  });
});
