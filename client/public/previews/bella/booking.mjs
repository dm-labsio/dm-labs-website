export const services = {
  cut: {
    name: "Cut & shape",
    minutes: 60,
    price: 65,
    image: "bob-detail",
    caption: "A shape that works beyond the salon.",
    alt: "Close view of a softly shaped chestnut bob",
  },
  colour: {
    name: "Colour & dimension",
    minutes: 150,
    price: 140,
    image: "curls-detail",
    caption: "Warmth, placed where the light finds it.",
    alt: "Cinnamon highlights through dark textured curls",
  },
  texture: {
    name: "Curls & texture",
    minutes: 90,
    price: 85,
    image: "curls-portrait",
    caption: "Definition without losing the movement.",
    alt: "Rounded curly cut with natural volume",
  },
  finish: {
    name: "Style & finish",
    minutes: 45,
    price: 40,
    image: "tools",
    caption: "The considered finishing touches.",
    alt: "Aubergine comb, scissors and linen in the studio",
  },
};
export function dayKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function parseDay(key) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(key || "")) return null;
  const [y, m, d] = key.split("-").map(Number);
  const date = new Date(y, m - 1, d, 12);
  return dayKey(date) === key ? date : null;
}
export function lastBookableDay(now = new Date()) {
  return new Date(now.getFullYear(), now.getMonth() + 3, 0, 12);
}
export function isBookable(key, now = new Date()) {
  const date = parseDay(key);
  return (
    !!date &&
    key > dayKey(now) &&
    date.getDay() !== 0 &&
    key <= dayKey(lastBookableDay(now))
  );
}
export function slotsFor(key, service, now = new Date()) {
  if (!services[service] || !isBookable(key, now)) return [];
  const date = parseDay(key);
  // Illustrative salon hours and a different sample schedule for each day.
  const closing = date.getDay() === 6 ? 16 * 60 : 18 * 60;
  return ["09:30", "10:30", "12:00", "13:30", "15:00", "16:30"].filter(
    (time, index) => {
      const [h, m] = time.split(":").map(Number);
      return (
        h * 60 + m + services[service].minutes <= closing &&
        (date.getDate() + index) % 4 !== 0
      );
    }
  );
}
export function validAppointment(state, now = new Date()) {
  return (
    !!services[state.service] &&
    slotsFor(state.day, state.service, now).includes(state.time)
  );
}
