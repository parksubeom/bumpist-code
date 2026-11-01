# ADR-006. Vercel 배포

- 상태: 제안
- 날짜: 2026-10-31
- 범위: Bumpist Suite 전체

## 결정

GitHub Actions + Vercel CLI가 기본, Vercel Git 연동은 선택.

## 이유

품질 관문을 통과한 커밋만 배포하고 URL을 C5에 기록.

## 고려한 대안

Git 연동만: 검사와 배포가 따로 돌아 틀린 커밋도 미리보기가 뜸.
