# 규칙 ID 체계

모든 규칙에는 바뀌지 않는 ID가 붙는다. 리뷰 코멘트, CI 실패, 파이프라인 회고가 이 ID로 규칙을 가리킨다.

## 형식

`<영역>-<세 자리 번호>`. 한 번 붙인 번호는 규칙을 폐기해도 재사용하지 않는다.

| 영역 | 규칙 파일 | 비고 |
| --- | --- | --- |
| CORE | 00 · 05 · 10 · 15 | 10-guardrails가 CORE-001~018, 이어서 00·05·15가 CORE-019~045 |
| ARCH | 20 | |
| UI | 30 | UI-003~011은 bumpist-design 4-0 디자인 원칙과 임시 컴포넌트 한도용으로 예약 |
| A11Y | 35 | |
| FIGMA | 37 | |
| API | 40 | |
| TEST | 50 | |
| GIT | 70 | |
| SEC | 80 | |
| DATA | 85 (신설) | DATA-001: 모든 테이블의 RLS와 권한 테스트 |
| CI | 90 | |
| OPS | 95 (신설) | OPS-001: 에러 추적·성능 예산 없이는 프로덕션 배포 금지 |
| NEXT · REACT · VUE | `rules/<fw>/` | |

## 표시 방법

규칙 바로 윗줄에 HTML 주석으로 단다. 렌더링된 문서에는 보이지 않는다.

```md
<!-- rule: CORE-001 | severity: error | enforce: review -->
- 명시되지 않은 패키지, 설정을 임의로 추가하지 않는다.
```

| 속성 | 값 | 기본값 |
| --- | --- | --- |
| `severity` | `error` `warn` `info` | `error` |
| `enforce` | `lint` `ci` `review` `human` `build` (쉼표로 여럿) | `review` |
| `tool` | ESLint 규칙 이름이나 CI 체크 id | 없음 |
| `status` | `proposed` `warn` `enforced` `deprecated` | `enforced` |

`node scripts/build-rules-index.mjs`가 표시를 모아 `rules.json`(계약 C3)을 만든다. ID 형식이 틀리거나 겹치면 실패한다.

## 현황

모든 규칙 파일에 ID가 붙어 있다. 새 규칙을 쓸 때는 같은 영역의 마지막 번호 다음을 붙인다.

- 규칙으로 보는 것: 지시하는 목록 항목과 표의 행. 설명, 예시, 링크, 명령어·폴더 표, 코드 블록, 문단은 붙이지 않는다(문단은 제목이 줄바꿈에서 잘린다).
- 다른 파일 규칙을 가리키기만 하는 항목은 원래 규칙의 ID를 쓰고 새로 붙이지 않는다.
- UI-002는 비어 있다. DATA(85)와 OPS(95)는 파일을 새로 만들 때 붙인다.
