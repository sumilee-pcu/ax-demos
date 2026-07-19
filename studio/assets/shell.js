/* 내PC 스튜디오: 공통 셸. 도구 목록, 사이드바, 상단 바, 테마, 한/영 버튼 */
(function () {
  "use strict";

  const TOOLS = [
    { cat: "PDF", en: "PDF", items: [
      { id: "pdf-merge",    href: "pdf-merge.html",    name: "PDF 병합",      en: "Merge PDF",       gov: "붙임파일 하나로",    govEn: "Combine attachments",  ready: true,
        sum: "여러 PDF의 페이지를 삭제·회전·재배열해 한 파일로 묶습니다.", sumEn: "Delete, rotate and reorder pages across PDFs, then merge." },
      { id: "pdf-split",    href: "pdf-split.html",    name: "PDF 분할·추출", en: "Split PDF",       gov: "필요한 쪽만 골라서",  govEn: "Pick only the pages you need", ready: true,
        sum: "페이지 범위를 골라 새 PDF로 추출하거나 여러 개로 나눕니다.", sumEn: "Extract a page range or split into multiple files." },
      { id: "pdf-to-image", href: "pdf-to-image.html", name: "PDF → 이미지",  en: "PDF to Images",   gov: "공문을 그림파일로",  govEn: "Pages as pictures",     ready: true,
        sum: "각 페이지를 PNG/JPG 이미지로 내려받습니다.", sumEn: "Download each page as a PNG/JPG image." },
      { id: "image-to-pdf", href: "image-to-pdf.html", name: "이미지 → PDF",  en: "Images to PDF",   gov: "스캔본을 문서로",    govEn: "Scans into a document", ready: true,
        sum: "사진·스캔 이미지를 순서대로 배치해 PDF로 만듭니다.", sumEn: "Arrange photos and scans in order into one PDF." },
    ]},
    { cat: "이미지", en: "Image", items: [
      { id: "img-resize",   href: "img-resize.html",   name: "리사이즈",      en: "Resize",          gov: "규격 맞추기",        govEn: "Fit the required size", ready: true,
        sum: "픽셀 또는 퍼센트로 크기를 조절합니다. 비율 고정.", sumEn: "Resize by pixels or percent, aspect ratio locked." },
      { id: "img-compress", href: "img-compress.html", name: "압축",          en: "Compress",        gov: "제출용 용량 줄이기",  govEn: "Shrink for submission", ready: true,
        sum: "품질을 조절해 파일 용량을 줄입니다. 절약률 표시.", sumEn: "Reduce file size with a quality slider." },
      { id: "img-convert",  href: "img-convert.html",  name: "형식 변환",     en: "Convert",         gov: "JPG·PNG·WEBP",       govEn: "JPG, PNG, WEBP",        ready: true,
        sum: "이미지 형식을 상호 변환합니다. 여러 장 일괄 처리.", sumEn: "Convert between formats, batch supported." },
      { id: "img-crop",     href: "img-crop.html",     name: "자르기",        en: "Crop",            gov: "필요한 부분만",      govEn: "Keep only what you need", ready: true,
        sum: "드래그로 영역을 지정해 잘라냅니다. 비율 프리셋.", sumEn: "Drag to select an area, ratio presets included." },
      { id: "img-rotate",   href: "img-rotate.html",   name: "회전·뒤집기",   en: "Rotate & Flip",   gov: "방향 바로잡기",      govEn: "Fix the orientation",   ready: true,
        sum: "90도 회전과 좌우·상하 반전.", sumEn: "Rotate by 90 degrees, flip horizontally or vertically." },
      { id: "img-filter",   href: "img-filter.html",   name: "보정·필터",     en: "Adjust & Filter", gov: "증빙사진 다듬기",    govEn: "Clean up evidence photos", ready: true,
        sum: "밝기·대비·채도 조정과 흑백·세피아 프리셋.", sumEn: "Brightness, contrast, saturation and presets." },
    ]},
    { cat: "문서 · 텍스트", en: "Docs & Text", items: [
      { id: "url-short",    href: "url-short.html",    name: "URL 단축",      en: "Shorten URL",     gov: "안내문에 짧은 주소",  govEn: "Short links for notices", ready: true,
        sum: "긴 주소를 짧게 줄이고 QR 이미지를 함께 만듭니다.", sumEn: "Shorten long links and get a QR image." },
      { id: "json-csv",     href: "json-csv.html",     name: "JSON ⇄ CSV",   en: "JSON / CSV",      gov: "자료 형식 맞추기",    govEn: "Reshape your data",     ready: true,
        sum: "JSON과 CSV를 상호 변환합니다. 한글·엑셀 호환.", sumEn: "Convert between JSON and CSV, Excel friendly." },
      { id: "md-html",      href: "md-html.html",      name: "Markdown → HTML", en: "Markdown to HTML", gov: "문서를 웹으로",    govEn: "Docs to the web",       ready: true,
        sum: "마크다운을 미리보며 HTML로 변환합니다.", sumEn: "Preview markdown and export clean HTML." },
    ]},
  ];

  const THEME_KEY = "naepc-theme";

  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
    const b = document.getElementById("themeBtn");
    if (b) b.textContent = t === "light" ? "다크" : "라이트";
  }

  function initTheme() {
    let t = null;
    try { t = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (!t) t = matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    applyTheme(t);
  }

  function renderTopbar(opts) {
    const el = document.createElement("div");
    el.className = "topbar";
    el.innerHTML =
      '<a class="brand" href="' + (opts.home ? "#" : "index.html") + '"><span class="dot"></span>내PC 스튜디오</a>' +
      '<span class="tagline" data-i18n="Your files never leave your PC">파일이 내 PC를 떠나지 않습니다</span>' +
      '<span class="spacer"></span>' +
      '<a class="hub" href="../index.html" data-i18n="Workshop hub">워크숍 허브</a>' +
      '<button class="btn-ghost" id="langBtn" type="button">EN</button>' +
      '<button class="btn-ghost" id="themeBtn" type="button">테마</button>';
    document.body.prepend(el);
    el.querySelector("#themeBtn").onclick = function () {
      const cur = document.documentElement.getAttribute("data-theme");
      applyTheme(cur === "light" ? "dark" : "light");
    };
    el.querySelector("#langBtn").onclick = function () {
      if (window.I18n) I18n.toggle();
    };
  }

  function renderSidebar(activeId) {
    const side = document.querySelector(".sidebar");
    if (!side) return;
    let html = "";
    TOOLS.forEach(function (g) {
      html += '<div class="cat" data-i18n="' + g.en + '">' + g.cat + "</div>";
      g.items.forEach(function (t) {
        if (t.ready) {
          html += '<a class="tool' + (t.id === activeId ? " active" : "") + '" href="' + t.href +
                  '" data-i18n="' + t.en + '">' + t.name + "</a>";
        } else {
          html += '<span class="tool"><span data-i18n="' + t.en + '">' + t.name +
                  '</span><span class="soon" data-i18n="soon">준비 중</span></span>';
        }
      });
    });
    side.innerHTML = html;
  }

  window.Shell = {
    tools: TOOLS,
    init: function (opts) {
      opts = opts || {};
      initTheme();
      renderTopbar(opts);
      renderSidebar(opts.active || "");
      if (window.I18n) I18n.apply();
    },
  };
})();
