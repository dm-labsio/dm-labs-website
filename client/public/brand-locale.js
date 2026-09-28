// Shared with LanguageContext: exact locale prefixes only; never stored preferences.
(() => {
  const path = window.location.pathname;
  const lang = /^\/he(?:\/|$)/.test(path) ? "he" : /^\/el(?:\/|$)/.test(path) ? "el" : "en";
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "he" ? "rtl" : "ltr";
})();
