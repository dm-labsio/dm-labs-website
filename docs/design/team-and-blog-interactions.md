# Team portraits and editorial blog index

Preview design update, October 10, 2026.

## References

- Team Showcase, Ravi Katiyar: https://21st.dev/@ravikatiyar162/components/team-showcase
  Public description and usage example inspected. The overlapping, gently angled portraits and hover lift inform the team cards. Our implementation uses existing portraits and biographies, native touch scrolling and Radix accessible profile dialogs. It is original code, not a copy of gated component source.
- Blogs, Cnippet: https://21st.dev/@cnippet-dev/components/blogs
  Public description and usage inspected. Stacked interactive headings inform the article index. Our version adds a desktop sticky image preview, touch-friendly inline previews, search and actual-topic filters. It is original code, not a copy of gated component source.

## Boundaries

Only the homepage team component and blog index presentation change. Article routes, bodies, titles, dates, images and SEO metadata remain unchanged. All article links remain in initial HTML in newest-first order. No new dependency or generated biography claims. Existing seasonal portrait frames are retained for Halloween decorations.

## Interaction

Team: entire portrait is a button; biographies open in a focus-trapped dialog with Escape, backdrop dismissal, localized close and contact actions. Closing returns focus to the portrait without changing page scroll. Mobile portraits use native scroll snapping, with the second card peeking into view.

Blog: desktop hover/focus changes the sticky visual; Preview opens an excerpt inline, including the large image on mobile. Titles always navigate directly to articles. Topic filters combine with accent-insensitive search, provide result counts and a resettable empty state. Reduced-motion mode removes animated movement. Keyboard users can operate every control.
