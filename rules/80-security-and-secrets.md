# 80. 보안 & 시크릿 & 의존성

> **쉽게 말하면:** 비밀번호·키 같은 민감정보를 코드에 넣지 않는다.

## 시크릿

<!-- rule: SEC-001 | severity: error | enforce: review -->
- API Key, Secret, Token, DB 접속 정보, 인증 정보를 **코드/커밋에 절대 하드코딩하지 않는다.**
<!-- rule: SEC-002 | severity: error | enforce: review -->
- 환경 변수는 `.env`(git 무시) + `.env.example`(키 이름만, 값 없이)로 관리.
  `import.meta.env`로 접근하고, 클라이언트 노출 변수는 빌드 도구 접두사 규칙을 따른다.
<!-- rule: SEC-003 | severity: error | enforce: review -->
- `.env`/시크릿 파일은 읽지도 출력하지도 않는다(로그·PR·이슈 포함). `settings.json`에서 read deny.

## 환경 변수 추가

필요한 변수는 임의 추가 금지. **이름·목적·사용 위치**를 설명하고 `.env.example`에 키를 추가한 뒤 도입.

## 의존성

<!-- rule: SEC-004 | severity: error | enforce: review -->
- 새 패키지는 `rules/10-guardrails.md`의 추가 기준(필요성·대안·번들 영향·유지보수 상태)을 충족하고 승인받아야.
<!-- rule: SEC-005 | severity: error | enforce: review -->
- 버전 임의 변경 금지. lockfile(`pnpm-lock.yaml`)을 커밋에 포함해 재현성 유지.
<!-- rule: SEC-006 | severity: error | enforce: review -->
- 생성 파일(`schema.d.ts`)·서드파티 코드는 손대지 않는다.

## 클라이언트 보안 기본

<!-- rule: SEC-007 | severity: error | enforce: review -->
- 사용자 입력을 신뢰하지 않는다. `v-html`/`innerHTML` 등 DOM 주입은 피하고, 불가피하면 sanitize.
<!-- rule: SEC-008 | severity: error | enforce: review -->
- 인증 토큰은 안전한 저장소 정책을 따르고, 라우트 가드로 보호 페이지 접근을 통제.
<!-- rule: SEC-009 | severity: error | enforce: review -->
- 외부로 데이터를 보내는 동작(로그 전송·서드파티 API)은 사용자 데이터 노출 여부를 먼저 확인.

## AI 작업 시

<!-- rule: SEC-010 | severity: error | enforce: review -->
- 에이전트는 시크릿을 요청·수집·출력하지 않는다. 인증이 필요한 작업은 사용자에게 위임한다.
<!-- rule: SEC-011 | severity: error | enforce: review -->
- 대량 파괴적 작업(`rm -rf` 등)은 수행하지 않는다(`settings.json` deny).
