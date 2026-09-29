<!--
5단계 HTML 산출물(최종 미리보기)의 구성표. brief.md §1로 초안, 최종 미리보기 탭에서 "빼요 / 다른 걸로"로 고친 뒤 확정.
최종 HTML(final-preview.html)은 이 표를 그대로 마크업한다: slug = data-screen, 구성 열 컴포넌트명 = data-component, 상태 프레임 열 = data-state.
html_audit.py 가 이 표와 HTML을 대조한다 (component.manifest, state.frames).
-->

status: draft
confirmed_at:

# Screens

구성은 위→아래 순서. 원문자 번호는 최종 미리보기 default 폰 프레임의 라벨과 같다 (화면당 최대 5개). 구성 열의 컴포넌트명은 HTML `data-component` 값과 1:1로 정확히 같아야 한다(규칙 미리보기 견본 이름). 상태 프레임 열에는 필수 7종을 모든 행에 적고, FormField 화면은 `keyboard`, 웹 예외 화면(보는 사람 웹 ⑤⑥⑧)은 `guest-name`을 더한다.

컴포넌트 목록(규칙 미리보기 견본): AppBar · TripHeader · DateChips · ScheduleItem · BottomCTA · TabBar · TodoItem · MemberProgress · NewsItem · MemberRow · FormField · TentativeToggle · WebAddressBar · WebSegment · NameButton · DayFlowCard · TentativeLine · EmptyState · Snackbar · Sheet · Dialog · Chip · Button · IconButton

| 순번 | 화면 | slug | 구성 (위→아래) | 상태 프레임 |
|---|---|---|---|---|
| 1 | 여행 홈 | home | ① AppBar(제목 "여행") · ② TripHeader(제주 가족여행 D-52 카드 — 열기 = primary) · ③ TodoItem×2(오늘 남은 할 일) · ④ TabBar(일정 활성) | default·empty·loading·error·long-title·many-items·text-120 |
| 2 | 여행 만들기 | create | ① AppBar(닫기, 제목 "새 여행") · ② FormField×2(목적지 · 기간) · ③ Chip×4(함께 가는 가족 — 영호·미숙·민재·하린, + 추가) · ④ BottomCTA(만들기) | default·empty·loading·error·long-title·many-items·text-120·keyboard |
| 3 | 일정 편집 | plan-edit | ① AppBar(뒤로, 제목 "제주 가족여행", 가족 화면 eye) · ② DateChips(20~24, 21 활성) · ③ ScheduleItem×4(확정 띠 / 정하는 중 점선 띠, 손잡이, "확정으로") · ④ BottomCTA(항목 추가) · ⑤ TabBar(일정 활성) | default·empty·loading·error·long-title·many-items·text-120 (+ default@360, default@430) |
| 4 | 일정 항목 편집 | item-edit | ① AppBar(닫기, 제목 "항목", 삭제) · ② Chip×3(종류: 이동·숙박·활동) · ③ FormField×3(시간 · 장소 · 메모) · ④ TentativeToggle(아직 후보예요, 켜짐) · ⑤ BottomCTA(저장) | default·empty·loading·error·long-title·many-items·text-120·keyboard |
| 5 | 여행 흐름 (웹) | flow-view | ① WebAddressBar · ② WebSegment(흐름 활성 · 내 준비 · 소식) · ③ DayFlowCard×2(20일·21일, 두 단계 큰 글자, 확정 항목만) · ④ TentativeLine(아직 정하는 중 한 줄) · ⑤ BottomCTA(오늘로 이동) | default·empty·loading·error·long-title·many-items·text-120·guest-name |
| 6 | 내 준비 (웹) | my-prep | ① WebAddressBar · ② WebSegment(내 준비 활성) · ③ TodoItem×3(영호 님이 챙길 것 — 체크가 주 행동, primary 0개: `data-primary-exempt="web.primary"`) · ④ DayFlowCard(언제 어디에 — 20일 08:00 김포공항) | default·empty·loading·error·long-title·many-items·text-120·guest-name |
| 7 | 할 일·준비물 | todo | ① AppBar(제목 "할 일", 내 것만 eye) · ② MemberProgress(지수 3/5 · 영호 1/2 · 미숙 0/1 · 민재 0/1) · ③ TodoItem×4(담당자 아바타·기한) · ④ BottomCTA(할 일 추가) · ⑤ TabBar(할 일 활성) | default·empty·loading·error·long-title·many-items·text-120 |
| 8 | 변경 소식 (웹) | news | ① WebAddressBar · ② WebSegment(소식 활성) · ③ NewsItem×2(22일 저녁 흑돼지 식당 확정 · 렌터카 민재가 확인 중) · ④ BottomCTA(확인했어요) | default·empty·loading·error·long-title·many-items·text-120·guest-name |
| 9 | 가족·역할 | family | ① AppBar(제목 "가족") · ② MemberRow×5(지수 계획자 · 영호·미숙·민재·하린 보는 사람, 역할 Chip) · ③ Chip×2(알림 빈도: 하루 1회 저녁 활성 · 확정 즉시) · ④ BottomCTA(구성원 초대) · ⑤ TabBar(가족 활성) | default·empty·loading·error·long-title·many-items·text-120 |

- 계획자 앱의 "소식" 탭은 ⑧과 같은 NewsItem 목록을 AppBar·TabBar로 감싼 것이라 별도 화면으로 두지 않는다(가정 로그). "가족 화면" 미리보기(planner.preview)는 ⑤를 앱 안에 띄우는 것이라 별도 화면 아님.
- Sheet(초대 링크·숙소 상세)·Dialog(삭제 확인)·Snackbar(되돌리기·"오늘 저녁 소식에 담겨요")는 상태 프레임 안에서만 등장하고 default 최상위 구성에는 넣지 않는다.

## 사용자 수정 이력

최종 미리보기 탭에서 들어온 remove / swap 을 그대로 적는다. 출처는 `feedback/screen-<slug>`.

| 화면 | 변경 | 원문 | 회차 |
|---|---|---|---|
