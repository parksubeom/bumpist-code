# 35. 접근성 (a11y)

> **쉽게 말하면:** 키보드만으로도, 스크린리더로도 쓸 수 있게 만든다.

어드민은 폼·테이블·모달이 많아 키보드/스크린리더 접근성이 실제 업무 품질에 직결된다. 아래는
최소 기준이며, 컴포넌트를 만들 때(`create-component`) 기본으로 지킨다.

## 시맨틱 우선

<!-- rule: A11Y-001 | severity: error | enforce: review -->
- 역할에 맞는 네이티브 요소를 쓴다: 버튼은 `<button>`, 링크는 `<a>`, 목록은 `<ul>/<li>`,
  표는 `<table>`. `div`에 click 핸들러로 버튼을 흉내내지 않는다.
<!-- rule: A11Y-002 | severity: error | enforce: review -->
- ARIA는 네이티브로 표현이 안 될 때만 보충한다. 잘못된 ARIA는 없느니만 못하다.

## 키보드

<!-- rule: A11Y-003 | severity: error | enforce: review -->
- 모든 상호작용은 키보드로 가능해야 한다(Tab 이동, Enter/Space 실행, Esc 닫기).
<!-- rule: A11Y-004 | severity: error | enforce: review -->
- 포커스 순서는 시각 순서와 일치. 커스텀 위젯은 `tabindex`와 방향키 처리를 명시.
<!-- rule: A11Y-005 | severity: error | enforce: review -->
- 포커스 표시를 지우지 않는다. `focus-visible` 링을 유지(Tailwind `focus-visible:` 사용).

## 폼

<!-- rule: A11Y-006 | severity: error | enforce: review -->
- 모든 입력에 연결된 `<label for>`(또는 감싼 label). placeholder를 라벨 대용으로 쓰지 않는다.
<!-- rule: A11Y-007 | severity: error | enforce: review -->
- 오류는 텍스트로 제시하고 `aria-invalid`/`aria-describedby`로 입력과 연결. 색만으로 표시하지 않는다.
<!-- rule: A11Y-008 | severity: error | enforce: review -->
- 필수 여부·형식 힌트를 시각+프로그램적으로 함께 전달.

## 모달·오버레이

<!-- rule: A11Y-009 | severity: error | enforce: review -->
- 열릴 때 포커스를 안으로 이동, 닫힐 때 트리거로 복귀. 열려 있는 동안 포커스를 가둔다(focus trap).
<!-- rule: A11Y-010 | severity: error | enforce: review -->
- Esc로 닫기. 배경은 `aria-hidden` 또는 inert 처리.

## 표·이미지·대비

<!-- rule: A11Y-011 | severity: error | enforce: review -->
- 표는 `<th scope>`로 헤더를 명시. 의미 있는 이미지는 `alt`, 장식 이미지는 빈 `alt=""`.
<!-- rule: A11Y-012 | severity: error | enforce: review -->
- 텍스트 대비는 최소 WCAG AA(본문 4.5:1). Tailwind 색 조합 시 확인.

## 검증

<!-- rule: A11Y-013 | severity: error | enforce: review -->
- 컴포넌트 스펙에 키보드 상호작용/역할을 한 케이스 이상 포함(`write-test`).
<!-- rule: A11Y-014 | severity: error | enforce: human -->
- 최소한 Tab만으로 주요 플로우가 되는지 수동 확인.
