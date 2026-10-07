export const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
export const coaches = {
  alex: {
    name: "Alex Konstantinou",
    specialty: "Strength & conditioning",
    description:
      "A measured approach to getting stronger. Alex’s sessions centre on clear cues, controlled movement and helping each person find a starting point that suits them.",
    photo:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&q=80",
  },
  maria: {
    name: "Maria Ioannou",
    specialty: "HIIT, movement & endurance",
    description:
      "Energy with a plan. Maria leads interval sessions, flowing movement and seafront runs, with room to adapt the pace and plenty of encouragement along the way.",
    photo:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80",
  },
  nikos: {
    name: "Nikos Papadopoulos",
    specialty: "Boxing & functional training",
    description:
      "Technique comes first. Nikos breaks down combinations and functional movements before bringing them together in focused, varied sessions.",
    photo:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=500&q=80",
  },
};
export const classes = {
  strength: {
    name: "Strength & Power",
    minutes: 60,
    coach: "alex",
    summary: "Mon / Wed / Fri · 7am, 12pm, 6pm",
    times: {
      0: ["07:00", "12:00", "18:00"],
      2: ["07:00", "12:00", "18:00"],
      4: ["07:00", "12:00", "18:00"],
    },
  },
  hiit: {
    name: "HIIT Burn",
    minutes: 45,
    coach: "maria",
    summary: "Tue / Thu · 6am, 9am, 5pm · Sat · 9am, 5pm",
    times: {
      1: ["06:00", "09:00", "17:00"],
      3: ["06:00", "09:00", "17:00"],
      5: ["09:00", "17:00"],
    },
  },
  boxing: {
    name: "Boxing Fitness",
    minutes: 60,
    coach: "nikos",
    summary: "Mon / Wed / Sat · 7pm",
    times: { 0: ["19:00"], 2: ["19:00"], 5: ["19:00"] },
  },
  functional: {
    name: "Functional WOD",
    minutes: 50,
    coach: "nikos",
    summary: "Daily · 8am, 12pm, 5pm",
    times: Object.fromEntries(
      days.map((_, i) => [i, ["08:00", "12:00", "17:00"]])
    ),
  },
  yoga: {
    name: "Power Yoga",
    minutes: 60,
    coach: "maria",
    summary: "Tue / Thu / Sun · 8am",
    times: { 1: ["08:00"], 3: ["08:00"], 6: ["08:00"] },
  },
  run: {
    name: "Endurance Run",
    minutes: 60,
    coach: "maria",
    summary: "Sat / Sun · 7am",
    times: { 5: ["07:00"], 6: ["07:00"] },
  },
};
export const sessions = Object.entries(classes)
  .flatMap(([type, c]) =>
    Object.entries(c.times).flatMap(([day, times]) =>
      times.map(time => ({
        id: `${type}-${day}-${time}`,
        type,
        day: Number(day),
        time,
        ...c,
      }))
    )
  )
  .sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));
export const membershipPrices = { Starter: 39, Performance: 69, Elite: 129 };
export const minutes = time =>
  Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
export function clashes(a, b) {
  return (
    a.day === b.day &&
    minutes(a.time) < minutes(b.time) + b.minutes &&
    minutes(b.time) < minutes(a.time) + a.minutes
  );
}
export function cyprusDate(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Nicosia",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
export function addDays(key, n) {
  const date = new Date(key + "T12:00:00Z");
  date.setUTCDate(date.getUTCDate() + n);
  return date.toISOString().slice(0, 10);
}
export function nextMonday(now = new Date()) {
  const key = cyprusDate(now),
    day = new Date(key + "T12:00:00Z").getUTCDay();
  return addDays(key, (8 - day) % 7 || 7);
}
export function validVisit(date, time, now = new Date()) {
  const today = cyprusDate(now);
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    !Number.isNaN(Date.parse(date + "T12:00:00Z")) &&
    new Date(date + "T12:00:00Z").toISOString().slice(0, 10) === date &&
    date > today &&
    date <= addDays(today, 30) &&
    ["10:00", "13:00", "18:00"].includes(time)
  );
}
export function calendarFor(selected, week, now = new Date()) {
  // Convert Cyprus wall-clock times to UTC with the runtime timezone database,
  // including daylight-saving changes. Calendar imports need no custom zone.
  const utcTime = (date, time) => {
    const wall = Date.parse(`${date}T${time}:00Z`);
    let instant = wall;
    for (let i = 0; i < 2; i++) {
      const parts = Object.fromEntries(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Nicosia",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hourCycle: "h23",
        })
          .formatToParts(new Date(instant))
          .map(p => [p.type, p.value])
      );
      const represented = Date.UTC(
        +parts.year,
        +parts.month - 1,
        +parts.day,
        +parts.hour,
        +parts.minute,
        +parts.second
      );
      instant += wall - represented;
    }
    return new Date(instant)
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  };
  const escape = s =>
    s
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
  const stamp = now
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//DM-Labs//Pulse Gym Demo//EN",
    "CALSCALE:GREGORIAN",
    "X-WR-CALNAME:Pulse Gym demo line-up",
    "X-WR-TIMEZONE:Asia/Nicosia",
  ];
  for (const s of selected) {
    const date = addDays(week, s.day).replace(/-/g, ""),
      end = minutes(s.time) + s.minutes,
      endTime =
        String(Math.floor(end / 60)).padStart(2, "0") +
        ":" +
        String(end % 60).padStart(2, "0");
    lines.push(
      "BEGIN:VEVENT",
      `UID:pulse-demo-${s.id.replace(/:/g, "")}-${date}@dm-labs.io`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${utcTime(addDays(week, s.day), s.time)}`,
      `DTEND:${utcTime(addDays(week, s.day), endTime)}`,
      `SUMMARY:${escape("Demo: " + s.name)}`,
      "DESCRIPTION:Fictional Pulse Gym showcase. No place reserved.",
      "END:VEVENT"
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n") + "\r\n";
}
