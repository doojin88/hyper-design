# prompt-log — practice-wedding (연습 실행)

- 하네스: 현재 `main` 빈 템플릿(`.claude/skills/oss-design-harness/SKILL.md`, TODO 상태 그대로, 수정 안 함)
- 모델·에이전트: Claude Code / claude-sonnet-5-5
- 총 개입 횟수: 2 / 5 (PRD 입력 포함)
- 특이사항: 처음 cmux 워커에 위임했으나 워커 산출이 없어, 사용자가 "cmux 아니다. prd 읽고 작업 수행"으로 직접 수행을 지시함. 이 지시가 사실상 2회차 개입.

## 1회 (PRD 입력)
> "연습용 PRD(wedding-meetup)로 현재 템플릿을 시험 실행하기" — prd/wedding-meetup.md 내용 기준

## 2회
> (AI 질문 없음 — 진행 방식 변경 지시)
> (사용자 원문) cmux 아니다. prd 읽고 작업 수행

## AI가 던진 질문
- 없음. 0단계에서 질문 대신 가정을 `brief.md`에 명시하고 진행함.

## 메모 (템플릿 관찰)
- SKILL.md 전 단계가 TODO라 A/C 기준값·재시도 상한이 없음 → 검증을 임의로 수행함(JS 구문·콘솔 오류, 데스크톱/모바일 스크린샷).
- C단계에서 실제로 잡은 결함 2건: 캘린더 이벤트 접두어("점/저") 의미 불명, 지인 시점 화면에 신랑·신부용 탭바 노출.
