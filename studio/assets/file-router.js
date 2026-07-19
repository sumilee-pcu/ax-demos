/* 내PC 스튜디오: 홈 전역 드롭존 라우터 (1차: 안내 방식)
   떨어뜨린 파일의 종류를 보고 알맞은 도구를 제안한다. 파일 자체는 페이지 간 전달하지 않는다. */
(function () {
  "use strict";

  function classify(files) {
    const list = [...files];
    const pdfs = list.filter(function (f) { return /\.pdf$/i.test(f.name); });
    const imgs = list.filter(function (f) { return /\.(jpe?g|png|webp)$/i.test(f.name); });
    const jsoncsv = list.filter(function (f) { return /\.(json|csv)$/i.test(f.name); });
    const mds = list.filter(function (f) { return /\.(md|markdown)$/i.test(f.name); });

    const sug = [];   // { href, name, why }
    if (pdfs.length >= 2) sug.push({ href: "pdf-merge.html", name: "PDF 병합", why: "PDF " + pdfs.length + "개: 하나로 묶기" });
    if (pdfs.length === 1) {
      sug.push({ href: "pdf-split.html", name: "PDF 분할·추출", why: "필요한 쪽만 골라내기" });
      sug.push({ href: "pdf-to-image.html", name: "PDF → 이미지", why: "페이지를 그림파일로" });
    }
    if (imgs.length >= 2) {
      sug.push({ href: "image-to-pdf.html", name: "이미지 → PDF", why: "이미지 " + imgs.length + "장: 한 문서로" });
      sug.push({ href: "img-convert.html", name: "형식 변환", why: "여러 장 일괄 변환" });
    }
    if (imgs.length === 1) {
      sug.push({ href: "img-compress.html", name: "압축", why: "제출용 용량 줄이기" });
      sug.push({ href: "img-resize.html", name: "리사이즈", why: "규격 맞추기" });
      sug.push({ href: "img-crop.html", name: "자르기", why: "필요한 부분만" });
    }
    if (jsoncsv.length) sug.push({ href: "json-csv.html", name: "JSON ⇄ CSV", why: "자료 형식 맞추기" });
    if (mds.length) sug.push({ href: "md-html.html", name: "Markdown → HTML", why: "문서를 웹으로" });
    return { sug, total: list.length, known: pdfs.length + imgs.length + jsoncsv.length + mds.length };
  }

  window.FileRouter = {
    /* dropzoneEl에 드롭을 받으면 panelEl에 제안 목록을 그린다 */
    attach: function (dropzoneEl, panelEl) {
      ["dragenter", "dragover"].forEach(function (ev) {
        dropzoneEl.addEventListener(ev, function (e) { e.preventDefault(); dropzoneEl.classList.add("over"); });
      });
      ["dragleave", "drop"].forEach(function (ev) {
        dropzoneEl.addEventListener(ev, function (e) { e.preventDefault(); dropzoneEl.classList.remove("over"); });
      });
      dropzoneEl.addEventListener("drop", function (e) {
        const r = classify(e.dataTransfer.files);
        panelEl.innerHTML = "";
        if (!r.total) return;
        if (!r.sug.length) {
          panelEl.innerHTML = '<div class="route-note">지원하지 않는 형식입니다. PDF·JPG·PNG·WEBP·JSON·CSV·MD 파일을 지원합니다.</div>';
          return;
        }
        const note = document.createElement("div");
        note.className = "route-note";
        note.textContent = "파일 " + r.total + "개를 확인했습니다. 아래 도구를 열어 같은 파일을 다시 놓으면 바로 처리됩니다.";
        panelEl.appendChild(note);
        const wrap = document.createElement("div");
        wrap.className = "route-grid";
        r.sug.forEach(function (s) {
          const a = document.createElement("a");
          a.className = "toolcard";
          a.href = s.href;
          a.innerHTML = '<div class="name">' + s.name + '</div><div class="gov">' + s.why + "</div>";
          wrap.appendChild(a);
        });
        panelEl.appendChild(wrap);
        panelEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    },
    classify: classify,
  };
})();
