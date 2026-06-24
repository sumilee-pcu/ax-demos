# AX 바이브코딩 워크숍 — 오전 실습 미니앱

Claude Code 한 문장 프롬프트로 만든 정적 미니앱 4종 + 허브. 전부 단일 HTML 파일이라 별도 빌드 없이 그대로 배포된다.

| 파일 | 앱 | 설명 |
|------|----|------|
| `index.html` | 허브 | 4종 앱 진입점 (다크 프로 디자인) |
| `todo.html` | 투두 | 추가·체크·로컬저장 |
| `biblio.html` | 서지정보 | 책 정보 입력·정리 |
| `folder.html` | 폴더정리 | OPFS 파일 이동 (File System Access API) |
| `pdf.html` | PDF 에디터 | 병합·편집·내보내기 |

`index_basic.html`(라이트 before) / `index_pro.html`(다크 after)는 디자인 전후 비교용.

## 배포
Vercel 정적 배포. 루트가 그대로 서빙되며 `index.html`이 허브 진입점이다.

> 참고: `folder.html`은 File System Access API라 cross-origin iframe 임베드에서는 제한될 수 있어 새 탭으로 여는 것을 권장한다.
