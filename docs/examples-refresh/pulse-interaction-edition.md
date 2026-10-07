# Pulse Gym: interaction edition

7 October 2026. User direction: retain the existing visual identity and strengthen the one-page experience. Preview only.

## Retained design

Black and yellow, Barlow Condensed headings, gym photography, the hero, class cards, coach portraits, membership cards and closing trial invitation remain. Hero statistics now sit in normal flow to prevent overlap; placeholder rankings and fabricated member counts are replaced by the actual demo's six training styles, seven-day schedule and three coach profiles.

## Working paths

- Navigation scrolls within the page without adding browser-history entries. The mobile menu closes and focus moves to the destination.
- Each class filters the timetable to its sessions. Every coach opens a profile with a route into their timetable.
- Seven animated day tabs, class/coach filters and an empty state make the timetable browsable. A shared data module drives class descriptions and session rows.
- Visitors can add/remove sessions, see total minutes, reject overlaps, clear the line-up and download an ICS calendar for the displayed upcoming week. Selections persist locally on the device. Calendar times convert from Cyprus time to UTC, including daylight saving.
- A mobile shortcut brings the selected line-up into view.
- Trial, membership and tour buttons open an accessible date/time dialog and create an explicit demo pass. Membership selection carries its name and sample price. Nothing is sent, charged or reserved.
- Footer controls open relevant information or the tour flow. Sample hours remain text; the fake address and phone are removed.

## 21st.dev components

Native adaptations of SmoothUI Animated Tabs, Magnetic Button and Tilt Card, discovered via the SmoothUI library on 21st.dev. Upstream source, adaptation notes and MIT license are recorded in `client/public/previews/pulse/SOURCES.txt`. No Hover Expand reuse from Bella. Motion respects reduced-motion and touch input.

## Preview-window integration

Pulse opts into managing its own hash navigation, preserving menu/focus state while preventing history pollution. Older demos retain the wrapper's existing navigation fallback. Only the Pulse iframe receives `allow-downloads`, so its user-triggered calendar export works within the showcase window.

## QA

`scripts/qa-pulse.mjs` exercises 320, 390, 768, 1024 and 1440 px layouts: every class, coach, membership, trial/tour and footer control; tab keyboard behavior; filters; overlap prevention; persistence; calendar download and DST conversion; dialog completion/edit/focus; font/image loading; console/network errors; wrapped calendar export and mobile navigation; a regression check on Bella's wrapper.

Screenshots and reports are retained in workspace `output/website-refresh/pulse/qa`. Run the site build for link integrity, prerendering and SEO audit before publishing the preview branch.
