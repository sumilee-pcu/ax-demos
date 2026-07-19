/* 내PC 스튜디오: 이미지 공통 유틸 (EXIF 반영 로드, 내보내기, WEBP 폴백 감지) */
(function () {
  "use strict";

  const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

  function isImageFile(f) {
    return IMAGE_TYPES.indexOf(f.type) !== -1 || /\.(jpe?g|png|webp)$/i.test(f.name);
  }

  /* EXIF 방향을 반영해 비트맵으로 로드. createImageBitmap 미지원 시 img 폴백 */
  async function loadBitmap(file) {
    if (typeof createImageBitmap === "function") {
      try {
        return await createImageBitmap(file, { imageOrientation: "from-image" });
      } catch (e) { /* 폴백으로 진행 */ }
    }
    return new Promise(function (resolve, reject) {
      const img = new Image();
      img.onload = function () { resolve(img); };
      img.onerror = function () { reject(new Error("이미지를 읽을 수 없습니다: " + file.name)); };
      img.src = URL.createObjectURL(file);
    });
  }

  function toCanvas(bitmap, w, h) {
    const c = document.createElement("canvas");
    c.width = Math.max(1, Math.round(w || bitmap.width));
    c.height = Math.max(1, Math.round(h || bitmap.height));
    const ctx = c.getContext("2d");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bitmap, 0, 0, c.width, c.height);
    return c;
  }

  /* JPG 출력 시 투명 영역을 흰색으로 합성 */
  function flattenWhite(canvas) {
    const c = document.createElement("canvas");
    c.width = canvas.width; c.height = canvas.height;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(canvas, 0, 0);
    return c;
  }

  /* 반환: { blob, actualType, fallback } — 요청 형식을 브라우저가 못 만들면 fallback=true */
  function exportBlob(canvas, type, quality) {
    if (type === "image/jpeg") canvas = flattenWhite(canvas);
    return new Promise(function (resolve, reject) {
      canvas.toBlob(function (blob) {
        if (!blob) { reject(new Error("이미지 생성에 실패했습니다.")); return; }
        resolve({ blob, actualType: blob.type, fallback: blob.type !== type });
      }, type, quality);
    });
  }

  function extFor(type) {
    return { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[type] || "png";
  }

  function stripExt(name) { return String(name || "image").replace(/\.[^.]+$/, ""); }

  function formatBytes(n) {
    if (n < 1024) return n + " B";
    if (n < 1024 * 1024) return (n / 1024).toFixed(1) + " KB";
    return (n / (1024 * 1024)).toFixed(2) + " MB";
  }

  function downloadBlob(blob, name) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  window.CanvasUtils = { isImageFile, loadBitmap, toCanvas, flattenWhite, exportBlob, extFor, stripExt, formatBytes, downloadBlob };
})();
