const $ = s => document.querySelector(s);
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const treatments = {
  routine: {
    label: "A good place to begin",
    title: "Make space for<br>the everyday.",
    description:
      "A check-up is a chance to talk about your teeth and gums, ask questions and discuss any next steps.",
    list: [
      "Dental check-ups",
      "Hygiene appointments",
      "At-home care conversations",
    ],
    word: "everyday",
    name: "Everyday care",
    cta: "Plan an everyday care visit",
  },
  smile: {
    label: "A conversation, not a prescription",
    title: "A smile that<br>feels like you.",
    description:
      "Talk through what you would like to change, what is possible and what is right for your teeth. No pressure to decide on the day.",
    list: [
      "Smile consultations",
      "Whitening discussions",
      "Alignment & cosmetic options",
    ],
    word: "confidence",
    name: "Your smile",
    cta: "Plan a smile consultation",
  },
  restore: {
    label: "Understand your options",
    title: "Thoughtful care.<br>A clear next step.",
    description:
      "From a damaged tooth to a missing one, begin with an assessment and a conversation about the available options.",
    list: [
      "Fillings & crowns",
      "Root canal consultations",
      "Tooth replacement discussions",
    ],
    word: "restore",
    name: "Repair & restore",
    cta: "Plan a restorative consultation",
  },
  family: {
    label: "A familiar face, from the start",
    title: "Little visits.<br>Growing confidence.",
    description:
      "An introduction at their pace, with time to get familiar with the chair, meet the team and ask all the questions.",
    list: [
      "Children’s check-ups",
      "First-visit introductions",
      "Family care conversations",
    ],
    word: "together",
    name: "Growing smiles",
    cta: "Plan a family visit",
  },
};
const tabs = [...document.querySelectorAll("[data-care]")];
function selectCare(tab) {
  const item = treatments[tab.dataset.care];
  tabs.forEach(t => {
    t.setAttribute("aria-selected", String(t === tab));
    t.tabIndex = t === tab ? 0 : -1;
  });
  $("#care-panel").setAttribute("aria-labelledby", tab.id);
  $("#care-panel").dataset.kind = tab.dataset.care;
  $("#art-word").textContent = item.word;
  $("#care-label").textContent = item.label;
  $("#care-name").innerHTML = item.title;
  $("#care-description").textContent = item.description;
  $("#care-list").replaceChildren(
    ...item.list.map(text => {
      const li = document.createElement("li");
      li.textContent = text;
      return li;
    })
  );
  $("#care-book").textContent = item.cta;
  $("#care-book").dataset.book = item.name;
  if (!reduced.matches)
    $(".care-content").animate(
      [
        { opacity: 0.3, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 320, easing: "ease-out" }
    );
}
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectCare(tab));
  tab.addEventListener("keydown", event => {
    const moves = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next;
    if (event.key in moves)
      next = (index + moves[event.key] + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    else return;
    event.preventDefault();
    tabs[next].focus();
    selectCare(tabs[next]);
  });
});
const preferences = () =>
  [...document.querySelectorAll(".comfort input:checked")].map(i => i.value);
document.querySelectorAll(".comfort input").forEach(input =>
  input.addEventListener("change", () => {
    const notes = [];
    if ($('.comfort input[value="Talk me through each step"]').checked)
      notes.push("We’ll explain each step.");
    if ($('.comfort input[value="Make time for questions"]').checked)
      notes.push("There’s time for your questions.");
    if ($('.comfort input[value="Agree on a pause signal"]').checked)
      notes.push("We’ll agree on a signal to pause.");
    $("#comfort-note").textContent =
      "“" + (notes.join(" ") || "Let’s start with a conversation.") + "”";
  })
);
const dialog = $("#booking");
let opener;
let previousOverflow;
let plan = "";
function makeDates() {
  const dates = [];
  const date = new Date();
  while (dates.length < 4) {
    date.setDate(date.getDate() + 1);
    if (date.getDay() !== 0) dates.push(new Date(date));
  }
  $("#date-options").replaceChildren(
    ...dates.map((date, i) => {
      const label = document.createElement("label"),
        input = document.createElement("input"),
        span = document.createElement("span");
      input.type = "radio";
      input.name = "date";
      input.value = date.toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      input.checked = i === 0;
      span.textContent = date.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
      label.append(input, span);
      return label;
    })
  );
}
document.querySelectorAll("[data-book]").forEach(button =>
  button.addEventListener("click", () => {
    opener = button;
    makeDates();
    $("#visit-care").value = button.dataset.book || "I’d like to talk first";
    $("#booking-comfort").textContent = preferences().length
      ? "Your preferences: " + preferences().join(" · ")
      : "You can add comfort preferences in “Your visit, your way”.";
    $("#booking-options").hidden = false;
    $("#booking-result").hidden = true;
    $("#save-status").textContent = "";
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    dialog.scrollTop = 0;
  })
);
$("#close-booking").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", e => {
  if (e.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (
      e.clientX < r.left ||
      e.clientX > r.right ||
      e.clientY < r.top ||
      e.clientY > r.bottom
    )
      dialog.close();
  }
});
dialog.addEventListener("close", () => {
  document.body.style.overflow = previousOverflow || "";
  opener?.focus({ preventScroll: true });
});
$("#booking-form").addEventListener("submit", e => {
  e.preventDefault();
  const rows = [
    ["Your care", $("#visit-care").value],
    [
      "Sample appointment",
      $("input[name=date]:checked").value +
        " at " +
        $("input[name=time]:checked").value,
    ],
    ["What helps", preferences().join(" · ") || "Start with a conversation"],
  ];
  $("#visit-summary").replaceChildren(
    ...rows.flatMap(([label, value]) => {
      const dt = document.createElement("dt"),
        dd = document.createElement("dd");
      dt.textContent = label;
      dd.textContent = value;
      return [dt, dd];
    })
  );
  plan =
    "DR. ELARA | SAMPLE VISIT PLAN\nFictional DM-Labs website concept. Nothing has been booked or sent.\n\n" +
    rows.map(([label, value]) => label + ": " + value).join("\n\n");
  $("#booking-options").hidden = true;
  $("#booking-result").hidden = false;
  dialog.scrollTop = 0;
  $("#result-title").focus();
});
$("#edit-plan").addEventListener("click", () => {
  $("#booking-options").hidden = false;
  $("#booking-result").hidden = true;
  $("#visit-care").focus();
});
$("#save-plan").addEventListener("click", () => {
  const url = URL.createObjectURL(
    new Blob([plan], { type: "text/plain;charset=utf-8" })
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = "elara-sample-visit.txt";
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
  $("#save-status").textContent = "Your sample plan is ready to save.";
});
const video = $("#care-video");
async function playFilm() {
  $("#film-error").hidden = true;
  $("#play-film").hidden = true;
  try {
    await video.play();
  } catch {
    $("#play-film").hidden = false;
  }
}
$("#play-film").addEventListener("click", playFilm);
video.addEventListener("error", () => {
  $("#play-film").hidden = true;
  $("#film-error").hidden = false;
});
$("#retry-film").addEventListener("click", () => {
  video.load();
  playFilm();
});
// Pausing off-screen saves work without starting motion that was not requested.
const observer = new IntersectionObserver(
  entries => {
    if (!entries[0].isIntersecting) video.pause();
  },
  { threshold: 0.1 }
);
observer.observe(video);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) video.pause();
});
// Keep section navigation out of the parent showcase's Back history.
document.addEventListener("click", e => {
  const anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  const destination = document.getElementById(
    anchor.getAttribute("href").slice(1)
  );
  if (!destination) return;
  e.preventDefault();
  destination.scrollIntoView({
    behavior: reduced.matches ? "instant" : "smooth",
  });
  history.replaceState(history.state, "", anchor.getAttribute("href"));
  if (anchor.classList.contains("skip"))
    destination.focus({ preventScroll: true });
});
document.documentElement.dataset.elaraReady = "true";
