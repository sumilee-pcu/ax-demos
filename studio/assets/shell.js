/* 내PC 스튜디오: 공통 셸: 도구 목록, 사이드바, 상단 바, 테마 (Phase 0) */
(function () {
  "use strict";

  const TOOLS = [
    { cat: "PDF", items: [
      { id: "pdf-merge",    href: "pdf-merge.html",    name: "PDF 병합",      gov: "붙임파일 하나로",      ready: true,
        sum: "여러 PDF의 페이지를 삭제·회전·재배열해 한 파일로 묶습니다." },
      { id: "pdf-split",    href: "pdf-split.html",    name: "PDF 분할·추출", gov: "필요한 쪽만 골라서",   ready: false,
        sum: "페이지 범위를 골라 새 PDF로 추출하거나 여러 개로 나눕니다." },
      { id: "pdf-to-image", href: "pdf-to-image.html", name: "PDF → 이미지",  gov: "공문을 그림파일로",    ready: false,
        sum: "각 페이지를 PNG/JPG 이미지로 내려받습니다." },
      { id: "image-to-pdf", href: "image-to-pdf.html", name: "이미지 → PDF",  gov: "스캔본을 문서로",      ready: false,
        sum: "사진·스캔 이미지를 순서대로 배치해 PDF로 만듭니다." },
    ]},
    { cat: "이미지", items: [
      { id: "img-resize",   href: "img-resize.html",   name: "리사이즈",      gov: "규격 맞추기",          ready: false,
        sum: "픽셀 또는 퍼센트로 크기를 조절합니다. 비율 고정." },
      { id: "img-compress", href: "img-compress.html", name: "압축",          gov: "제출용 용량 줄이기",   ready: false,
        sum: "품질을 조절해 파일 용량을 줄입니다. 절약률 표시." },
      { id: "img-convert",  href: "img-convert.html",  name: "형식 변환",     gov: "JPG·PNG·WEBP",         ready: false,
        sum: "이미지 형식을 상호 변환합니다. 여러 장 일괄 처리." },
      { id: "img-crop",     href: "img-crop.html",     name: "자르기",        gov: "필요한 부분만",        ready: false,
        sum: "드래그로 영역을 지정해 잘라냅니다. 비율 프리셋." },
      { id: "img-rotate",   href: "img-rotate.html",   name: "회전·뒤집기",   gov: "방향 바로잡기",        ready: false,
        sum: "90도 회전과 좌우·상하 반전." },
      { id: "img-filter",   href: "img-filter.html",   name: "보정·필터",     gov: "증빙사진 다듬기",      ready: false,
        sum: "밝기·대비·채도 조정과 흑백·세피아 프리셋." },
    ]},
    { cat: "문서 · 텍스트", items: [
      { id: "url-short",    href: "url-short.html",    name: "URL 단축",      gov: "안내문에 짧은 주소",   ready: false,
        sum: "긴 주소를 짧게 줄이고 QR 이미지를 함께 만듭니다." },
      { id: "json-csv",     href: "json-csv.html",     name: "JSON ⇄ CSV",   gov: "자료 형식 맞추기",     ready: false,
        sum: "JSON과 CSV를 상호 변환합니다. 한글·엑셀 호환." },
      { id: "md-html",      href: "md-html.html",      name: "Markdown → HTML", gov: "문서를 웹으로",     ready: false,
        sum: "마크다운을 미리보며 HTML로 변환합니다." },
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
      '<span class="tagline">파일이 내 PC를 떠나지 않습니다</span>' +
      '<span class="spacer"></span>' +
      '<a class="hub" href="../index.html">워크숍 허브</a>' +
      '<button class="btn-ghost" id="themeBtn" type="button">테마</button>';
    document.body.prepend(el);
    el.querySelector("#themeBtn").onclick = function () {
      const cur = document.documentElement.getAttribute("data-theme");
      applyTheme(cur === "light" ? "dark" : "light");
    };
  }

  function renderSidebar(activeId) {
    const side = document.querySelector(".sidebar");
    if (!side) return;
    let html = "";
    TOOLS.forEach(function (g) {
      html += '<div class="cat">' + g.cat + "</div>";
      g.items.forEach(function (t) {
        if (t.ready) {
          html += '<a class="tool' + (t.id === activeId ? " active" : "") + '" href="' + t.href + '">' + t.name + "</a>";
        } else {
          html += '<span class="tool">' + t.name + '<span class="soon">준비 중</span></span>';
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
    },
  };
})();
