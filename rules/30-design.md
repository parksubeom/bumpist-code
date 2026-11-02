# 30. 디자인 원칙 — 여백으로 나누고, 브랜드 색으로 말한다

> **쉽게 말하면:** 칸막이 선과 그림자 대신 넓은 여백과 글자 크기로 화면을 나눈다. 상태도 신호등 색이 아니라 브랜드 색의 밝기로.

이 문서는 [bumpist-design](https://github.com/parksubeom/bumpist-design)의 디자인 원칙(UI-003~011)을 화면 코드에서
지키는 법이다. 색·간격·모서리·그림자의 구체 값은 **디자인 토큰이 최종 권위**다. Bumpist 토큰은 만들 때 대비와
UI-003·005·010을 검사해 어기는 값을 아예 내보내지 않는다. 그래서 토큰 유틸만 쓰면 값에 관한 원칙은 저절로 지켜지고,
이 문서는 토큰이 막지 못하는 **쓰는 방식**을 다룬다.

프로필은 두 가지다. **소비자형**(`consumer`, 기본)은 일반 사용자가 쓰는 앱, **작업 공간형**(`workspace`)은
업무용 도구다. 프로필에 따라 다른 규칙은 따로 적었다.

## 원칙

<!-- rule: UI-001 | severity: error | enforce: review -->
- **색은 토큰으로만 쓴다.** `#hex`·`rgb()` 같은 색 값이나 Tailwind 기본 팔레트(`bg-gray-100`, `text-red-500`)를 코드에 직접 쓰지 않는다.
<!-- rule: UI-003 | severity: error | enforce: build,review -->
- **순백과 순흑을 쓰지 않는다.** 배경은 살짝 톤이 있는 밝은 색이고, 가장 진한 글자도 아주 진한 남색이나 회색이다.
  다크 모드는 거꾸로 배경이 순흑, 글자가 순백이 아니다. `bg-white`·`text-black` 대신 `bg-bg`·`text-fg`를 쓴다.
<!-- rule: UI-004 | severity: error | enforce: review -->
- **구역은 칸막이 선이 아니라 여백과 글자 크기로 나눈다.** 구역 사이에 `border-b`·`divide-*`·`<hr>`를 긋지 않는다.
  더 나눠야 하면 배경 톤 차이(`bg-bg` → `bg-surface` → `bg-surface-raised`)를 쓴다. 그림자는 떠 있는 요소
  (모달·드롭다운·팝오버·토스트)에만 `shadow-overlay` 한 단계로 쓰고, 테두리는 입력창 경계(`border-input`)처럼 기능이 있을 때만 쓴다.
<!-- rule: UI-005 | severity: error | enforce: build,review -->
- **모서리는 컨트롤과 컨테이너 두 가지뿐이다.** 버튼·입력창 같은 컨트롤은 `rounded-control`, 카드·시트 같은 컨테이너는
  `rounded-container`를 쓴다. 값은 12px 또는 16px이다(paper: 컨트롤 12px, 컨테이너 16px). `rounded-md`, `rounded-[10px]`는 쓰지 않는다.
<!-- rule: UI-006 | severity: error | enforce: build,review -->
- **요소 사이를 넉넉히 띄운다.** 소비자형은 최소 24px, 작업 공간형은 최소 16px이다. 요소 사이는 `gap-stack`,
  구역 사이는 `gap-section`으로 쓴다(`space-y-*`, `p-*`도 같은 이름). 값이 프로필에 따라 바뀌므로 `gap-6` 같은 숫자로 고정하지 않는다.
<!-- rule: UI-007 | severity: error | enforce: review -->
- **소비자형은 휴대폰 화면부터 설계한다.** 기본 스타일을 가장 좁은 화면에 맞춰 쓰고 `sm:`·`md:`·`lg:`로 넓힌다.
  화면을 만들면 휴대폰 폭 미리보기에서 먼저 확인한다.
<!-- rule: UI-008 | severity: error | enforce: review -->
- **소비자형에서는 흔한 관리자 화면 틀을 쓰지 않는다.** 왼쪽 메뉴와 위쪽 메뉴를 함께 두는 레이아웃을 쓰지 않는다. 작업 공간형은 예외다.
<!-- rule: UI-009 | severity: error | enforce: review -->
- **아이콘을 상자에 가두거나 의미 없이 늘어놓지 않는다.** 아이콘에 네모·동그라미 배경 칸을 씌우지 않고,
  꾸밈으로 아이콘을 줄지어 놓지 않는다. 아이콘은 글과 함께 뜻을 보탤 때만 쓴다.
<!-- rule: UI-010 | severity: error | enforce: build,review -->
- **성공·주의·오류를 신호등 색으로 보여 주지 않는다.** 초록·노랑·빨강 원색 대신 브랜드 색의 밝기 차이인
  `positive`·`notice`·`negative` 토큰을 쓰고, 항상 글과 아이콘을 함께 붙인다. 색만으로 상태를 전하지 않는다(`rules/35`).
<!-- rule: UI-011 | severity: error | enforce: review | status: proposed -->
- **부품 목록에 없는 임시 부품은 한도 안에서만 만든다.** 한도 값과 세는 방법은 bumpist-design 부품 목록(C2, v0.1)과 함께 정한다.
  그 전까지는 같은 일을 하는 부품이 목록에 있으면 그 부품을 쓴다.

## Bumpist 토큰 이름

`@bumpist/tokens`의 `dist/tailwind.css`는 Tailwind 기본 색·모서리·그림자를 지우고 아래 이름만 남긴다. 목록에 없는 이름은
클래스가 만들어지지 않는다.

| 쓰임 | 유틸 |
| --- | --- |
| 배경 3단 | `bg-bg`, `bg-surface`, `bg-surface-raised` |
| 글자 | `text-fg`, `text-fg-muted` |
| 강조 | `bg-primary` + `text-on-primary`, `bg-accent` + `text-on-accent` |
| 상태 | `positive`, `notice`, `negative` (`text-*`, `bg-*` 등) |
| 입력창 경계 | `border-input` |
| 포커스 링 | `ring-focus-ring`, `outline-focus-ring` |
| 모서리 | `rounded-control`, `rounded-container` |
| 그림자 | `shadow-overlay` |
| 간격 | `gap-stack`, `gap-section` (`p-*`, `space-y-*` 등) |

값은 `data-mode`(light·dark)와 `data-profile`(consumer·workspace)에 따라 바뀐다. 색마다 `dark:`를 따로 붙이지 않는다.

## 그 밖의 기본

- **강조색은 테마의 primary와 accent뿐이다.** 여러 강조색을 늘어놓거나 의미 없는 그라디언트·글로우를 쓰지 않는다.
- **위계는 글자 크기와 굵기로 만든다.** 제목·본문·보조 3단 정도로 뚜렷하게 나눈다.
- **접근성은 미감보다 위다.** 본문 대비 WCAG AA(4.5:1), 입력창 경계와 포커스 링 3:1. `focus-visible` 링을 지우지 않는다(`rules/35`).
- **모션은 절제한다.** 150–200ms, 진입·상태 변화 같은 기능적 전환만. 바운스·긴 트랜지션을 쓰지 않고 `prefers-reduced-motion`을 존중한다.
- **상태를 먼저 완성한다.** 화려함보다 빈 상태·로딩·에러·비활성을 먼저 챙긴다.

## 토큰이 없는 프로젝트

Bumpist 토큰이 없으면 프로젝트의 토큰을 쓰되 위 원칙은 그대로 지킨다. 순백·순흑 금지, 모서리 12·16px, 요소 사이
24px(작업 공간형 16px), 상태색은 브랜드 색의 밝기 차이로. 토큰 생성·교체는 `gen-tokens`(`docs/adr/0010`)가 맡는다.

## 적용

- 클래스는 Tailwind 유틸 + 토큰(`rules/<fw>/code-style`), variant는 cva/cn.
- 디자인 토큰이나 impeccable의 `DESIGN.md`(비주얼 SoT)가 있으면 그게 최종 권위다. 이 문서와 충돌하면 토큰/`DESIGN.md`를 따른다.

## 심화 디자인 (impeccable 연계)

이 문서는 **기본선(baseline)**이다. 미감을 더 끌어올리는 **디자인 craft**(정교한 타이포·색·모션·위계·비평)는
[impeccable](https://github.com/pbakaus/impeccable) 스킬에 위임한다 — 설치돼 있으면 그쪽으로 넘긴다.

- 컴포넌트/화면 마감: `/impeccable polish`, UX 비평: `/impeccable critique`, 기술 점검: `/impeccable audit`,
  타이포/색/모션: `/impeccable typeset`·`colorize`·`animate`.
- 설치 안내: `npx impeccable install` → `/impeccable init` (자동 설치하지 않는다 — 사용자가 직접).
