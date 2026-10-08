export const METHODS = {
  filter: { ratio: 16, iceRatio: 0, time: "3:00", grind: "Medium-fine" },
  press: { ratio: 15, iceRatio: 0, time: "4:00", grind: "Coarse" },
  iced: { ratio: 10, iceRatio: 6, time: "2:30", grind: "Medium-fine" },
};
export function makeRecipe(method, requestedDose) {
  const config = METHODS[method] ?? METHODS.filter;
  const numeric = Number(requestedDose);
  const dose = Math.round(
    Math.max(15, Math.min(40, Number.isFinite(numeric) ? numeric : 20))
  );
  const water = Math.round(dose * config.ratio);
  const ice = Math.round(dose * config.iceRatio);
  const bloom = dose * 2;
  const detail =
    method === "press"
      ? `Coarse grind. Add ${water} g of water, stir gently and steep for 4 minutes. Press slowly and pour into your cup.`
      : method === "iced"
        ? `Medium-fine grind. Put ${ice} g of ice in the server. Wet the grounds with ${bloom} g of hot water, wait 30 seconds, then pour up to ${water} g hot water total. Swirl to chill.`
        : `Medium-fine grind. Rinse the filter, wet the grounds with ${bloom} g of water, wait 30 seconds, then pour slowly up to ${water} g total.`;
  return { dose, water, ice, time: config.time, detail };
}
