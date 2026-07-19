/* 내PC 스튜디오: 세션 통계 (sessionStorage, 탭 단위·새로고침 시 유지, 탭 닫으면 초기화) */
(function () {
  "use strict";
  const KEY = "naepc-stats";

  function load() {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { files: 0, savedBytes: 0, tools: [], flow: [] };
  }

  function save(s) {
    try { sessionStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {}
  }

  window.Stats = {
    /* record({ tool: "pdf-merge", label: "PDF 병합", files: 3, savedBytes: 12345 }) */
    record: function (ev) {
      const s = load();
      s.files += ev.files || 1;
      s.savedBytes += Math.max(0, ev.savedBytes || 0);
      if (ev.tool && s.tools.indexOf(ev.tool) === -1) s.tools.push(ev.tool);
      if (ev.label) { s.flow.push(ev.label); if (s.flow.length > 20) s.flow.shift(); }
      save(s);
    },
    summary: function () {
      const s = load();
      return {
        files: s.files,
        savedKB: Math.round(s.savedBytes / 1024),
        toolCount: s.tools.length,
        flow: s.flow,
      };
    },
  };
})();
