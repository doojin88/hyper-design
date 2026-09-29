<!-- 5~7단계 기록. 메인 대화(html-audit), design-auditor(오디트), probe-renderer(fix), figma-builder(figma, 선택)가 이어서 쓴다. -->

# Build Log

## html-audit
- 실행: <날짜>
- 정적: `html_audit.py --design-dir design` exit <n>
- 렌더: `html_audit.py --design-dir design --render` exit <n>
- 실패 규칙: <규칙 키 / 화면·상태 / 요소> (없으면 없음)
- 스크린샷: design/screenshots/html/ (<n>장)

## 오디트 #1
- 대상: HTML
- A단계: html_audit --render 결과 요약
- C단계 실패:
- 진단: 통과 | 국소 결함 | 방향 오류 | 반복 실패
- 다음 행동:

## fix #1
- 입력: design/html-fix-list.md | 오디트 #1 결함 표
- fixed: <규칙 키> <화면/상태/요소> <전 → 후>
- 영향 화면:
- 재검: html_audit 정적 exit <n> · 렌더 exit <n>

## figma (선택 — 사용자가 "Figma 생성"을 지시했을 때만)

figma_file: <파일 키 또는 URL>
figma_read_calls_today: 0

### STAGE=tokens
- 실행: <날짜>
- 변수·스타일 ID 표
- parity:

### STAGE=components
- 컴포넌트 ID 표
- 누락·질문:
- parity:

### STAGE=screens
- 프레임 ID 표 (화면 × default, STATES= 요청분)
- 누락 컴포넌트:
- parity: figma_parity.py exit <n>

### STAGE=fix #1
- fixed: <결함> → <노드> <전/후>

## html-audit #1
- 실행: 2026-09-15 · 대상 design/probes/final-preview.html (KIND=preview, 495,914 B) + rules-preview.html
- probes(허브 제외, 임시 폴더): `check_phase.py --phase probes` exit 0
- 정적: `html_audit.py --design-dir design` exit 0 — 파일 2개 / 화면 섹션 9개 / 상태 프레임 70개 / 실패 0건
- 렌더: `html_audit.py --design-dir design --render --fix-list design/html-fix-list.md --screenshots design/screenshots/html` exit 0 — 스크린샷 70장 / 실패 0건 (html-fix-list.md = (없음))
- 인라인 JS `node --check` exit 0
- fix 라운드: 0회 (정적·렌더 첫 실행부터 결함 0건 → html-fix-list 항목 없음, fixed 줄 없음)
- 스크린샷 육안 확인 후 크롬(프레임 밖)만 조정 — 감사 결함 아님, 규칙 값 변경 없음:
  - 페이지 헤더 sticky → static: 요소 스크린샷에 헤더·경고 띠가 프레임 위로 찍혀 들어감
  - db 없음(localStorage 폴백) 알림: 로드 시 토스트 → 헤더 경고 띠(로드 시) + 저장할 때 토스트 문구에 덧붙임 (로드 직후 토스트가 스크린샷에 찍힘)
  - 번호 배지 22px(−10/−10) → 18px(−14/−12, 고정 바 영역 2/2): 제목 첫 글자를 가림
- 가정:
  - 고정 바(BottomCTA·TabBar)는 flex 흐름 안에 둔다 → `data-scroll` 본문이 바 위에서 끝나 scroll.last-item(바 + 34 + 16)을 구조로 만족. 본문 하단 여백은 16
  - ⑦ 할 일: 구성표 "TodoItem×4" → 5개. 같은 행 MemberProgress(지수 3/5·영호 1/2·미숙 0/1·민재 0/1)의 남은 합계 5와 맞춤
  - ⑦ AppBar "내 것만": 구성표 괄호의 eye 대신 user 아이콘 — icon.one-meaning(eye = 가족 화면 미리보기, icons.md) 충돌 회피
  - ⑥ 내 준비 TodoItem×3: 투어의 영호 것 2개(상비약 ✓·신분증) + "겉옷 한 벌(가족 모두)" — 영호 진행률 1/2 유지
  - ⑤ TentativeLine은 구성표대로 DayFlowCard 밖 최상위(21일 카드 아래 "21일 오후 · 아직 정하는 중")
  - 키보드 높이 `--kb-h:300px`(자유 변수, §B keyboard "약 300") 추가. §A 토큰은 rules-preview `:root` 그대로
  - "전체 의견" 패널·feedback/preview-overall 없음(probe-renderer "전체 의견 패널은 넣지 않는다" + 위임 db 경로 2종) — 끝에 "이대로 확정해 주세요"만
  - 구성표 행 id = 원문자(①…), "다른 걸로" 후보는 같은 종류 견본만(카드↔목록 행, BottomCTA↔AppBar 액션, TabBar↔WebSegment, FormField↔Sheet 등)
- 누락 구성: 없음 (Sheet·Dialog는 상태 프레임에도 쓰지 않음, Snackbar는 create·item-edit error 프레임에만)
