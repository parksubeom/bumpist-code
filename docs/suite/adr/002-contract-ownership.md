# ADR-002. 계약의 주인

- 상태: 결정됨
- 날짜: 2026-10-31
- 범위: Bumpist Suite 전체

## 결정

계약은 만드는 쪽 저장소가 소유한다. 스키마는 각 저장소 `schemas/`에 두고 GitHub Pages로 공개한다.

## 이유

계약을 바꾸는 사람과 그 계약을 지키는 코드가 같은 곳에 있어야 어긋나지 않는다.

## 고려한 대안

별도 계약 저장소: 계약과 구현이 떨어져 어긋남.

## 후속

C1·C2 → bumpist-design, C3 → bumpist-code, C4·C6 → bumpist-agents, C5 → bumpist-ship.
