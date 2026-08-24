# 데이허브 랜딩 페이지

Vite + React + Tailwind + lucide-react로 만든 반응형 랜딩 페이지입니다.
스크롤 리빌·호버 인터랙션은 별도 라이브러리 없이 CSS + IntersectionObserver로 구현했습니다.

## 로컬 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
npm run preview   # 빌드 결과 미리보기
```

## Vercel 배포

1. 이 폴더를 GitHub 저장소로 push
2. [vercel.com](https://vercel.com) → **New Project** → 해당 저장소 선택
3. Framework Preset: **Vite** (자동 감지됨) — `vercel.json`에 이미 설정되어 있어 그대로 Deploy
4. 커스텀 도메인은 배포 후 Project → Settings → Domains에서 연결

또는 CLI로:

```bash
npm i -g vercel
vercel
```

## 다음 단계 (Figma → React → 반응형 → 애니메이션 → Vercel)

- **Figma**: 이 코드가 1차 시안 역할을 하므로, 이 화면을 스크린샷/컴포넌트 단위로 Figma에 가져가 톤을 다듬은 뒤
  다시 코드에 반영하는 순서로 진행하면 왕복이 줄어듭니다.
- **반응형**: `sm/md/lg` 브레이크포인트로 이미 구성돼 있습니다 (`App.jsx` 내 Tailwind 클래스 참고).
- **애니메이션**: 현재는 스크롤 리빌 + 호버 트랜지션까지만 CSS로 구현했습니다. 더 정교한 시퀀스가
  필요하면 `framer-motion`을 추가해 `Reveal` 컴포넌트를 교체하는 걸 추천합니다.
  ```bash
  npm install framer-motion
  ```
- **실제 데이터 연결**: 히어로의 허브 데모(`HubDemo`)는 지금 더미 데이터입니다. 실제 프로그램 스크린샷이나
  실데이터로 교체하면 신뢰도가 올라갑니다.

## 커스터마이징 포인트

- `src/App.jsx` 상단 `C` 객체 — 브랜드 컬러 토큰
- `FLOW` 배열 — 실행 흐름 단계 문구
- `FEATURES` / `DETAILS` 배열 — 기능 소개 카피
- `WinGlyph` — Windows 다운로드 버튼 아이콘 (자체 제작 SVG, 상표 아이콘 아님)
