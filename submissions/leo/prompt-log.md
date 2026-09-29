# prompt-log — leo

- 하네스: 이 레포 `main` 빈 템플릿(`.claude/skills/oss-design-harness/SKILL.md`, TODO 상태 그대로, 수정 안 함)
- 모델·에이전트: Claude Code / claude-sonnet-5-5
- 총 개입 횟수: 1 / 5 (PRD 입력)

## 1회 (PRD 입력)
> "family-trip.md PRD 을 읽고 작업 시작." — prd/family-trip.md 내용 기준

## AI가 던진 질문
- 없음. 질문 대신 가정을 `brief.md`에 명시하고 진행함.

## 메모
- 갈등 해법: 후보 편집은 무알림 / 확정만 부모에게 노출 / 알림은 묶음 1건(항공·숙소·집합만 즉시) / 부모 화면은 탭 3개·큰 글씨.
- 검증: JS 구문 검사, 콘솔 오류 없음(favicon 404 제외), 모바일·PC 스크린샷 육안 확인, 클릭 흐름(후보 확정 → 알림 큐 → 묶음 발송 → 부모 소식 수신) 확인.
- 렌더 중 잡은 결함: 사이드바 아이콘 과대, 부모 홈 날짜 줄바꿈, 알림 문구의 "이(가)" 표기.
