/* 내PC 스튜디오: PDF 공통 유틸 (pdf.js 렌더 + 범위 파서 + 다운로드) */
(function () {
  "use strict";

  async function loadDoc(file) {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const doc = await pdfjsLib.getDocument({ data: bytes.slice() }).promise;
    return { doc, bytes, name: file.name, pageCount: doc.numPages };
  }

  /* intent:"print" — 기본(display) 렌더는 rAF로 진행을 조절해 백그라운드 탭에서 멈춘다 */
  async function renderPage(doc, pageNo, opts) {
    opts = opts || {};
    const page = await doc.getPage(pageNo);
    const base = page.getViewport({ scale: 1 });
    const scale = opts.scale || (opts.targetWidth ? opts.targetWidth / base.width : 1);
    const vp = page.getViewport({ scale, rotation: (base.rotation + (opts.extraRotation || 0)) % 360 });
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(vp.width);
    canvas.height = Math.round(vp.height);
    await page.render({ canvasContext: canvas.getContext("2d"), viewport: vp, intent: "print" }).promise;
    return canvas;
  }

  /* "1-3,7,10-끝" → [1,2,3,7,10,...max]. 잘못된 토큰은 무시, 결과는 중복 제거·오름차순 */
  function parseRange(text, max) {
    const out = new Set();
    String(text || "").split(",").forEach(function (tok) {
      tok = tok.trim();
      if (!tok) return;
      const m = tok.match(/^(\d+)\s*-\s*(\d+|끝|end)$/i);
      if (m) {
        const a = parseInt(m[1], 10);
        const b = /끝|end/i.test(m[2]) ? max : parseInt(m[2], 10);
        for (let i = Math.max(1, a); i <= Math.min(max, b); i++) out.add(i);
      } else if (/^\d+$/.test(tok)) {
        const n = parseInt(tok, 10);
        if (n >= 1 && n <= max) out.add(n);
      }
    });
    return [...out].sort(function (a, b) { return a - b; });
  }

  function downloadBlob(blob, name) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function downloadBytes(bytes, name, mime) {
    downloadBlob(new Blob([bytes], { type: mime || "application/pdf" }), name);
  }

  function baseName(name) {
    return String(name || "file").replace(/\.pdf$/i, "");
  }

  function pad3(n) { return String(n).padStart(3, "0"); }

  window.PdfUtils = { loadDoc, renderPage, parseRange, downloadBlob, downloadBytes, baseName, pad3 };
})();
