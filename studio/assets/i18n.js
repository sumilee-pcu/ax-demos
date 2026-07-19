/* 내PC 스튜디오: 한/영 전환.
   번역 대상 요소는 data-i18n="English text"를 달고 한국어를 textContent로 둔다.
   전환 시 원문은 data-ko에 보관했다가 복원한다. */
(function () {
  "use strict";
  const KEY = "naepc-lang";

  function lang() {
    try { return localStorage.getItem(KEY) || "ko"; } catch (e) { return "ko"; }
  }

  function apply() {
    const l = lang();
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      if (el.dataset.ko === undefined) el.dataset.ko = el.textContent;
      el.textContent = l === "en" ? el.dataset.i18n : el.dataset.ko;
    });
    const b = document.getElementById("langBtn");
    if (b) b.textContent = l === "en" ? "한" : "EN";
    document.documentElement.lang = l === "en" ? "en" : "ko";
  }

  function toggle() {
    try { localStorage.setItem(KEY, lang() === "ko" ? "en" : "ko"); } catch (e) {}
    apply();
  }

  window.I18n = { lang, apply, toggle };
})();
