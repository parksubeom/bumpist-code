# ADR-001. 저장소 구성

- 상태: 결정됨
- 날짜: 2026-10-31
- 범위: Bumpist Suite 전체

## 결정

처음부터 독립 저장소 5개(bumpist-design, bumpist-agents, bumpist-code, bumpist-ship, claude-distill). 각 저장소 안은 필요하면 pnpm 모노레포.

## 이유

각 층을 다른 층 없이 쓸 수 있어야 하고, 저장소 자체가 개별로 존재해야 한다는 요구.

## 고려한 대안

하나의 모노레포로 시작해 v1에 분리: 초기 비용은 낮지만 요구와 맞지 않음.

## 후속

공통 ship 워크플로·Renovate 프리셋·로컬 통합 작업 공간(dev-workspace.sh)·야간 통합 테스트로 유지 비용을 줄인다.
