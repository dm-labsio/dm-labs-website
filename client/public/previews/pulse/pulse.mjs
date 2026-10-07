import {
  days,
  coaches,
  classes,
  sessions,
  membershipPrices,
  clashes,
  cyprusDate,
  addDays,
  nextMonday,
  validVisit,
  calendarFor,
} from "./data.mjs";
import { animateTabs, installPointerEffects, reveal } from "./motion.mjs";
const $ = s => document.querySelector(s),
  $$ = s => [...document.querySelectorAll(s)];
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const week = nextMonday();
const storageKey = "pulse-demo-lineup-v1";
const dateLabel = key =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(new Date(key + "T12:00:00Z"));
let selected = [];
try {
  const stored = JSON.parse(localStorage.getItem(storageKey) || "[]");
  if (Array.isArray(stored))
    selected = [...new Set(stored)].filter(id =>
      sessions.some(s => s.id === id)
    );
} catch {}
// Reject stale/corrupt conflicting selections instead of trusting persisted data.
selected = selected.reduce((ids, id) => {
  const next = sessions.find(s => s.id === id);
  return ids.some(x =>
    clashes(
      next,
      sessions.find(s => s.id === x)
    )
  )
    ? ids
    : [...ids, id];
}, []);
let activeDay = 0,
  activeCoach = "alex",
  lastTrigger = null,
  intent = "trial",
  membership = "Performance";
function node(tag, className, text) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (text !== undefined) n.textContent = text;
  return n;
}
function scrollTo(id, focus = false) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({
    behavior: reduced.matches ? "instant" : "smooth",
    block: "start",
  });
  if (focus) {
    if (!el.hasAttribute("tabindex")) el.tabIndex = -1;
    el.focus({ preventScroll: true });
  }
}
function menuClose() {
  $("#nav-links").classList.remove("is-open");
  $(".menu-toggle").setAttribute("aria-expanded", "false");
}
$(".menu-toggle").addEventListener("click", () => {
  const open = $(".menu-toggle").getAttribute("aria-expanded") !== "true";
  $(".menu-toggle").setAttribute("aria-expanded", String(open));
  $("#nav-links").classList.toggle("is-open", open);
});
document.addEventListener("keydown", e => {
  if (
    e.key === "Escape" &&
    $(".menu-toggle").getAttribute("aria-expanded") === "true"
  ) {
    menuClose();
    $(".menu-toggle").focus();
  }
});
$$('a[href^="#"]').forEach(a =>
  a.addEventListener("click", e => {
    const id = a.getAttribute("href").slice(1);
    if (!document.getElementById(id)) return;
    e.preventDefault();
    e.stopPropagation();
    menuClose();
    scrollTo(id, true);
  })
);
function openDialog(dialog, trigger) {
  lastTrigger = trigger || document.activeElement;
  menuClose();
  dialog.showModal();
  reveal(dialog);
}
$$("dialog").forEach(dialog => {
  dialog.addEventListener("close", () => {
    if (!document.querySelector("dialog[open]"))
      lastTrigger?.focus({ preventScroll: true });
  });
  dialog.addEventListener("click", e => {
    if (e.target !== dialog) return;
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  });
});
$$("[data-close]").forEach(b =>
  b.addEventListener("click", () =>
    document.getElementById(b.dataset.close).close()
  )
);
Object.entries(classes).forEach(([id, c]) => {
  const option = node("option", "", c.name);
  option.value = id;
  $("#class-filter").append(option);
  $(`[data-class="${id}"]`)
    .closest(".class-card")
    .querySelector(".class-time").textContent = c.summary;
});
$("#schedule-week").textContent = `Week of ${dateLabel(week)}`;
days.forEach((day, index) => {
  const tab = node("button", "", day);
  tab.id = `day-${index}`;
  tab.type = "button";
  tab.setAttribute("role", "tab");
  tab.setAttribute("aria-controls", "day-sessions");
  tab.setAttribute("aria-label", `${day}, ${dateLabel(addDays(week, index))}`);
  $(".day-tabs").append(tab);
});
function visibleSessions(day = activeDay) {
  return sessions.filter(
    s =>
      s.day === day &&
      ($("#class-filter").value === "all" ||
        s.type === $("#class-filter").value) &&
      ($("#coach-filter").value === "all" ||
        s.coach === $("#coach-filter").value)
  );
}
function save() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(selected));
  } catch {}
  renderPlan();
  renderSessions();
}
function toggleSession(s) {
  if (selected.includes(s.id)) {
    selected = selected.filter(id => id !== s.id);
    $("#planner-status").textContent = `Removed ${s.name} from your line-up.`;
  } else {
    const conflict = selected
      .map(id => sessions.find(s => s.id === id))
      .find(other => clashes(s, other));
    if (conflict) {
      $("#planner-status").textContent =
        `This overlaps with ${conflict.name} on ${days[s.day]}. Remove that session first.`;
      const status = $("#planner-status");
      status.scrollIntoView({
        behavior: reduced.matches ? "instant" : "smooth",
        block: "nearest",
      });
      return;
    }
    selected.push(s.id);
    $("#planner-status").textContent =
      `Added ${s.name} on ${days[s.day]} at ${s.time}.`;
  }
  save();
  const button = $(`[data-session="${s.id}"]`);
  button?.focus({ preventScroll: true });
}
function renderSessions() {
  $("#day-sessions").setAttribute("aria-labelledby", `day-${activeDay}`);
  const list = visibleSessions();
  $("#day-sessions").replaceChildren(
    ...list.map(s => {
      const row = node("article", "session-row");
      row.append(node("time", "session-time", s.time));
      const info = node("div");
      info.append(
        node("h3", "", s.name),
        node(
          "p",
          "",
          `${s.minutes} min · ${coaches[s.coach].name.split(" ")[0]} · All levels`
        )
      );
      row.append(info);
      const b = node("button", "", selected.includes(s.id) ? "Added" : "Add");
      b.type = "button";
      b.dataset.session = s.id;
      b.setAttribute("aria-pressed", String(selected.includes(s.id)));
      b.setAttribute(
        "aria-label",
        `${selected.includes(s.id) ? "Remove" : "Add"} ${s.name}, ${days[s.day]} ${s.time}`
      );
      b.addEventListener("click", () => toggleSession(s));
      row.append(b);
      return row;
    })
  );
  if (!list.length)
    $("#day-sessions").append(
      node(
        "p",
        "empty-sessions",
        "No matching sessions on this day. Try another day or reset the filters."
      )
    );
}
const selectDay = animateTabs($(".day-tabs"), index => {
  activeDay = index;
  renderSessions();
  reveal($("#day-sessions"));
});
function applyFilters() {
  const day = days.findIndex((_, index) => visibleSessions(index).length);
  if (day >= 0) selectDay(day);
  else renderSessions();
}
$("#class-filter").addEventListener("change", applyFilters);
$("#coach-filter").addEventListener("change", applyFilters);
$("#reset-filters").addEventListener("click", () => {
  $("#class-filter").value = "all";
  $("#coach-filter").value = "all";
  renderSessions();
  reveal($("#day-sessions"));
});
$$("[data-class]").forEach(b =>
  b.addEventListener("click", () => {
    $("#class-filter").value = b.dataset.class;
    $("#coach-filter").value = "all";
    applyFilters();
    scrollTo("schedule-title", true);
  })
);
function planned() {
  return sessions.filter(s => selected.includes(s.id));
}
function renderPlan() {
  const list = planned();
  $("#plan-count").textContent = list.length;
  $("#lineup-jump").hidden = !list.length;
  $("#lineup-jump").textContent =
    `Your line-up · ${list.length} ${list.length === 1 ? "session" : "sessions"}`;
  reveal($("#plan-count"));
  $("#planned-sessions").replaceChildren(
    ...list.map(s => {
      const item = node("div", "planned-item"),
        text = node("div");
      text.append(
        node("strong", "", s.name),
        node(
          "small",
          "",
          `${days[s.day]} ${dateLabel(addDays(week, s.day))} · ${s.time}`
        )
      );
      item.append(text);
      const button = node("button", "", "Remove");
      button.type = "button";
      button.setAttribute(
        "aria-label",
        `Remove ${s.name}, ${days[s.day]} ${s.time} from line-up`
      );
      button.addEventListener("click", () => {
        selected = selected.filter(id => id !== s.id);
        save();
        $("#planner-status").textContent = `Removed ${s.name}.`;
        $("#clear-plan").disabled
          ? $("#plan-title").focus()
          : $("#clear-plan").focus();
      });
      item.append(button);
      return item;
    })
  );
  if (!list.length)
    $("#planned-sessions").append(
      node("p", "plan-empty", "One session is a start.\nMake it yours.")
    );
  $("#plan-total").textContent = list.length
    ? `${list.reduce((sum, s) => sum + s.minutes, 0)} minutes in your week`
    : "";
  $("#download-week").disabled = !list.length;
  $("#clear-plan").disabled = !list.length;
}
$("#plan-title").tabIndex = -1;
$("#lineup-jump").addEventListener("click", () => scrollTo("plan-title", true));
renderPlan();
$("#clear-plan").addEventListener("click", () => {
  selected = [];
  save();
  $("#planner-status").textContent = "Your line-up is cleared.";
  $("#plan-title").focus();
});
$("#download-week").addEventListener("click", () => {
  if (!selected.length) return;
  const blob = new Blob([calendarFor(planned(), week)], {
      type: "text/calendar;charset=utf-8",
    }),
    url = URL.createObjectURL(blob),
    a = node("a");
  a.href = url;
  a.download = "pulse-demo-training-week.ics";
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  $("#planner-status").textContent =
    "Calendar downloaded. These are demo sessions, not reservations.";
});
$$("[data-coach]").forEach(b =>
  b.addEventListener("click", () => {
    activeCoach = b.dataset.coach;
    const c = coaches[activeCoach];
    $("#coach-title").textContent = c.name;
    $("#coach-specialty").textContent = c.specialty;
    $("#coach-description").textContent = c.description;
    $("#coach-photo").src = c.photo;
    $("#coach-photo").alt = "Illustrative training photograph for " + c.name;
    openDialog($("#coach-dialog"), b);
  })
);
$("#coach-sessions").addEventListener("click", () => {
  lastTrigger = $("#schedule-title");
  $("#coach-dialog").close();
  $("#coach-filter").value = activeCoach;
  $("#class-filter").value = "all";
  applyFilters();
  scrollTo("schedule-title", true);
});
function updateVisitSummary() {
  membership = $("#membership").value;
  $("#visit-summary").textContent =
    intent === "membership"
      ? `${membership} · €${membershipPrices[membership]}/month. Sample membership; no payment is taken.`
      : intent === "tour"
        ? "A 30-minute introduction to the gym and its training spaces."
        : "A sample seven-day trial, starting on your selected day.";
}
function showVisit(type, trigger, plan = "Performance") {
  intent = type;
  membership = plan;
  $("#membership").value = plan;
  $("#membership-field").hidden = type !== "membership";
  $("#visit-title").textContent =
    type === "membership"
      ? "Make it your gym."
      : type === "tour"
        ? "Take a look around."
        : "Your first week.";
  $("#visit-form").reset();
  $("#membership").value = plan;
  $("#visit-date").min = addDays(cyprusDate(), 1);
  $("#visit-date").max = addDays(cyprusDate(), 30);
  $("#visit-form").hidden = false;
  $("#visit-done").hidden = true;
  $("#visit-error").textContent = "";
  updateVisitSummary();
  openDialog($("#visit-dialog"), trigger);
}
$$("[data-join]").forEach(b =>
  b.addEventListener("click", () => {
    const card = b.closest(".price-card");
    if (card)
      $$(".price-card").forEach(c =>
        c.classList.toggle("featured", c === card)
      );
    showVisit("membership", b, b.dataset.join);
  })
);
$$("[data-visit]").forEach(b =>
  b.addEventListener("click", () => showVisit(b.dataset.visit, b))
);
$("#membership").addEventListener("change", updateVisitSummary);
$("#visit-form").addEventListener("submit", e => {
  e.preventDefault();
  const date = $("#visit-date").value,
    time = $("#visit-time").value;
  if (!validVisit(date, time)) {
    $("#visit-error").textContent =
      "Choose a valid date within the next 30 days and one of the listed times.";
    return;
  }
  $("#pass-title").textContent =
    intent === "membership"
      ? membership + " membership"
      : intent === "tour"
        ? "Studio tour"
        : "Seven-day trial";
  $("#pass-date").textContent =
    `${dateLabel(date)} at ${time} · Cyprus time${intent === "membership" ? " · €" + membershipPrices[membership] + "/month" : ""}`;
  $("#visit-form").hidden = true;
  $("#visit-done").hidden = false;
  $("#pass-schedule").focus();
  reveal($(".demo-pass"));
});
$("#edit-visit").addEventListener("click", () => {
  $("#visit-form").hidden = false;
  $("#visit-done").hidden = true;
  $("#visit-date").focus();
});
$("#pass-schedule").addEventListener("click", () => {
  lastTrigger = $("#schedule-title");
  $("#visit-dialog").close();
  scrollTo("schedule-title", true);
});
$$("[data-info]").forEach(b =>
  b.addEventListener("click", () => {
    const nutrition = b.dataset.info === "nutrition";
    $("#info-title").textContent = nutrition
      ? "Support beyond the session."
      : "Meet the Pulse team.";
    $("#info-copy").textContent = nutrition
      ? "The concept includes a conversation about routines, training goals and the support a member is looking for. Personal nutrition advice would be provided by an appropriately qualified professional. Try the studio-visit flow to see how a first conversation could begin."
      : "Curious about the space, a class or how membership works? Explore the studio-visit flow. This showcase has no live phone number, inbox or real staff to contact.";
    openDialog($("#info-dialog"), b);
  })
);
$("#info-tour").addEventListener("click", () => {
  const trigger = lastTrigger;
  $("#info-dialog").close();
  showVisit("tour", trigger);
});
installPointerEffects();
document.documentElement.dataset.pulseReady = "true";
