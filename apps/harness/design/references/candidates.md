# 레퍼런스 후보

도메인 키워드: 가족여행 일정 공유 · 그룹 여행 플래너(공동 편집) · 가족 캘린더·할 일 분담
수집일: 2026-09-14 · 방법: WebSearch 4회 → `apps.apple.com/kr/app/id<n>` curl로 링크 유효성 확인(9개 모두 HTTP 200) → 스크린샷 확보
- 트랩플랜 · 트리플 · Wanderlog · Cozi: 2026-09-12 수집본(`design-archive-20260913/references/`)을 링크 재확인 후 재사용(폭 390). 이번 판본 번호는 사용 순서대로 다시 매겼다.
- Chorsee: 신규. 스토어 페이지 HTML의 `mzstatic` 스크린샷 URL(`…/iPhone_14_Plus_-_n.jpg/600x1300bb-60.jpg`)을 curl로 받아 `sips`로 390×844 리사이즈(7장 중 4장 사용).
스크린샷은 내부 비교용. 산출물에 재배포하지 않는다.

## 선정 5개 = 직접 3 (트랩플랜 · Wanderlog · 트리플) + 간접 2 (Chorsee · Cozi)

| # | 앱 | 스토어 링크 | 직접/간접 | 추천 | 왜 골랐는지 (한 줄) | 볼 곳 (컴포넌트) | 스크린샷 파일 | 스타일 메모 |
|---|---|---|---|---|---|---|---|---|
| 1 | 트랩플랜 (Travplan) | https://apps.apple.com/kr/app/id6744748490 | 직접 | ★ 추천 | 국내 "같이 만드는 여행" 앱. 항목별 "완료" 배지·사람별 칩 필터가 확정/후보·내 준비에 가장 가깝다 | ① 사람별 칩 필터 · ② "완료" 상태 배지 + 흐린 항목 · ③ 여행 헤더 카드(기간·예산·참여 인원) · ④ 일차 탭 + 일정추가 · ⑤ 홈 여행 카드(참여자수·필요 준비물) | trapplan-1 ~ 3.png | 다크 지도 + 라이트 목록, 밀도 중간. 둥근 카드 |
| 2 | Wanderlog | https://apps.apple.com/kr/app/id1476732439 | 직접 | ★ 추천 | 해외 대표 공동 편집 플래너. "ON SCHEDULE" 예약 배지·접히는 섹션·Undo 스낵바가 계획자 편집 화면의 확정 표시·후보 접기·되돌리기에 바로 쓰인다 | ① 세그먼트 탭 + 날짜 칩 · ② 접히는 섹션 헤더 · ③ 참여자 아바타 + Share · ④ "ON SCHEDULE" 예약 확정 배지 · ⑤ 되돌리기(Undo) 스낵바 | wanderlog-1 ~ 3.png | 라이트, 밀도 높음(계획자 도구). 강한 브랜드색 |
| 3 | Chorsee: Chores Tracker | https://apps.apple.com/kr/app/id1611068600 | 간접 | ★ 추천 | 가족 집안일 분담 앱. **기기별 Admin(부모) / Child 모드** — 아이 기기는 자기 할 일만 보고 수정 불가. "같은 데이터, 역할별 다른 뷰"를 실제로 가진 유일한 후보 | ① 할 일 행 + 담당자 아바타 · ② 담당자 지정 + 나눠 맡는 방식(Everyone/Anyone/Rotate) · ③ 사람별 위젯 "Emily 0/2"(내 할 일만) · ④ 구성원별 오늘 할 일 수 | chorsee-1 ~ 4.png | 라이트, iOS 기본 스타일, 밀도 중간~낮음. 파랑 강조 |
| 4 | 트리플 (Triple) | https://apps.apple.com/kr/app/id1225499481 | 직접 | 접음 | 국내 1위 여행계획 앱. 날짜 칩 + 항목 카드 + 번호 핀 동선 지도가 일정 편집의 기본형 | ① 날짜 칩 탭 · ② 번호 핀 동선 지도 · ③ 일정 항목 카드 | triple-1 ~ 2.png | 라이트, 흰 바탕 + 회색 카드, 밀도 중간 |
| 5 | Cozi Family Organizer | https://apps.apple.com/kr/app/id407108860 | 간접 | 접음 | 가족 오거나이저의 원조. 큰 글씨 "오늘/내일" 요약과 "3 more notifications" 묶음 알림이 부모용 흐름·변경 소식의 저밀도 기준점 | ① 오늘/내일 요약 리스트 · ② 사람 이름이 들어간 알림 문장 · ③ "3 more" 묶음 알림 | cozi-1 ~ 2.png | 라이트, 밀도 낮음, 큰 글씨. 파랑 브랜드 |

스타일 대비: 밀도 높음(Wanderlog) ↔ 낮음(Cozi) / 다크 요소는 트랩플랜 지도뿐 — 앱 전체가 다크인 레퍼런스는 없다(이 도메인 스토어 스크린샷은 전부 라이트).

## 미선정 후보

| 앱 | 스토어 링크 | 직접/간접 | 뺀 이유 |
|---|---|---|---|
| TimeTree | https://apps.apple.com/kr/app/id952578473 | 간접 | 가족 공유 캘린더 1위. 건별 즉시 알림은 우리가 피하는 방식이고 멤버 아바타 행은 Chorsee·트랩플랜과 겹침. 이전 판본 스크린샷은 `design-archive-20260913/references/timetree-*.png`에 남아 있음 |
| TripIt | https://apps.apple.com/kr/app/id311035142 | 직접 | 예약 이메일 자동 정리형. 확정 예약만 다루고 후보 편집 UI가 없음 |
| GroupCal | https://apps.apple.com/kr/app/id1472335927 | 간접 | 그룹 공유 캘린더. 권한 관리는 있으나 화면이 TimeTree와 겹침 |
| Neat Kid | https://apps.apple.com/kr/app/id6480269902 | 간접 | 가족 루틴·할 일 배정. Chorsee와 역할이 겹치고 아이 대상 게임형 UI라 부모 뷰와 거리 있음 |
| 러블 – 커플 공유 캘린더&투두 | https://apps.apple.com/kr/app/id6748125408 | 간접 | 공유 투두는 있으나 2인 전용 |

검색에 나왔지만 스토어 링크를 확인하지 않아 후보에서 뺀 것: WePlanify, Tripsil, Stippl, 네이버 여행(앱 아님 — 서비스 기능).

## 추천 3개 — 가져오면 좋을 번호

1. **트랩플랜 ② ① ⑤** — ② 항목 옆 상태 배지 + 흐리게 → "확정 / 정하는 중" 배지(일정 편집), 부모 흐름에선 "정하는 중"을 한 줄로 접기. ① 사람별 칩 → ⑥ 내 준비 / ⑦ 담당자별 보기. ⑤ 홈 카드의 "필요 준비물 14" → ① 여행 홈 카드. 가계부·커뮤니티 피드는 범위 밖.
2. **Wanderlog ④ ② ⑤** — ④ "ON SCHEDULE" 배지는 확정 항목 표시의 좋은 예(항공·숙소 확정). ② 접히는 섹션 → 계획자 화면에서 후보 묶음 접기. ⑤ Undo 스낵바 → 자주 고치는 계획자의 되돌리기. 고밀도·브랜드색은 안 가져온다.
3. **Chorsee ③ ② ④** — ③ 사람별 "내 할 일만" 위젯 → ⑥ 내 준비의 형태이자 "역할별 다른 뷰"의 실제 예. ② 담당자 체크 + 나눠 맡기 방식 → ⑦ 할 일 배정. ④ 구성원별 오늘 할 일 수 → ⑦ 진행률 / ⑨ 가족 목록 행.

접은 2개 참고 번호: 트리플 ① ③ (날짜 칩·항목 카드 — 부모 뷰는 썸네일 빼고 글씨만 키우면 "큰 흐름" 카드) · Cozi ③ ① (묶음 알림 → ⑧ 변경 소식, 오늘/내일 큰 글씨 → ⑤ 여행 흐름 밀도).

**역할별 다른 뷰를 가진 앱: 있음 — Chorsee(기기별 Admin/Child 모드, 아이 기기는 자기 할 일만 보고 수정 불가). 단 스토어 스크린샷에는 Child 모드 화면이 없고 사람별 위젯(③)·구성원별 목록(④)으로만 간접 확인. 여행 앱 4개(트랩플랜·Wanderlog·트리플·TimeTree)에는 역할별 뷰가 없다.**

## 출처 URL

스토어
- https://apps.apple.com/kr/app/id6744748490 (트랩플랜)
- https://apps.apple.com/kr/app/id1476732439 (Wanderlog)
- https://apps.apple.com/kr/app/id1611068600 (Chorsee — Admin/Child 모드는 스토어 설명 "INSTANT SYNCING BETWEEN DEVICES" 단락)
- https://apps.apple.com/kr/app/id1225499481 (트리플)
- https://apps.apple.com/kr/app/id407108860 (Cozi)
- https://apps.apple.com/kr/app/id952578473 (TimeTree) · https://apps.apple.com/kr/app/id311035142 (TripIt) · https://apps.apple.com/kr/app/id1472335927 (GroupCal) · https://apps.apple.com/kr/app/id6480269902 (Neat Kid) · https://apps.apple.com/kr/app/id6748125408 (러블)

검색
- https://www.skyscanner.co.kr/destinations/advice/5-best-travel-guide-apps
- https://kr.trip.com/guide/info/%EC%97%AC%ED%96%89+%ED%94%8C%EB%9E%98%EB%84%88.html
- https://www.weplanify.com/en/alternatives/best-group-trip-planner-apps
- https://www.airalo.com/blog/best-group-travel-apps
- https://nomadcrew.uk/blog/best-group-trip-planning-apps-2026/
- https://www.do-more.io/best-chore-apps-for-families/
- https://kikaroo.app/blog/best-chore-apps-for-kids/
