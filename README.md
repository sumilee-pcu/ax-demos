# AX 바이브코딩 워크숍: 오전 실습 미니앱

Claude Code 한 문장 프롬프트로 만든 정적 미니앱 4종 + 허브. 전부 단일 HTML 파일이라 별도 빌드 없이 그대로 배포된다.

| 파일 | 앱 | 설명 |
|------|----|------|
| `index.html` | 허브 | 앱 진입점 (다크 프로 디자인) |
| `studio/` | **내PC 스튜디오** | 업로드 없는 파일 작업실 13종: PDF 병합·분할·PDF↔이미지, 이미지 리사이즈·압축·변환·자르기·회전·보정, URL 단축+QR, JSON⇄CSV, Markdown→HTML |
| `todo.html` | 투두 | 추가·체크·로컬저장 |
| `biblio.html` | 서지정보 | 책 정보 입력·정리 |
| `folder.html` | 폴더정리 | OPFS 파일 이동 (File System Access API) |
| `pdf.html` | (구) PDF 에디터 | `studio/pdf-merge.html`로 리다이렉트 |

`index_basic.html`(라이트 before) / `index_pro.html`(다크 after)는 디자인 전후 비교용.

## 배포
Vercel 정적 배포. 루트가 그대로 서빙되며 `index.html`이 허브 진입점이다.

> 참고: `folder.html`은 File System Access API라 cross-origin iframe 임베드에서는 제한될 수 있어 새 탭으로 여는 것을 권장한다.

## 내PC 스튜디오

"파일이 내 PC를 떠나지 않습니다": 모든 처리가 브라우저 안에서 끝나는 파일 도구 모음. 무유출·무설치·무결재·무료.

- 라이브러리는 전부 `studio/vendor/`에 동봉(CDN 차단 환경에서도 동작): pdf-lib, pdf.js, marked, DOMPurify, PapaParse, JSZip, qrcode-generator
- 단축주소만 QRLink(qrlink.vercel.app) 서비스를 사용하며, 연결 실패 시 QR만 생성하는 폴백으로 동작
- 다크/라이트 테마, 한/영 전환, 세션 통계(탭 단위) 지원
- 설계와 구현 순서는 `PRD_pdf-studio-upgrade.md` 참조
