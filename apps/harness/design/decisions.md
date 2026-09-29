<!--
3단계 산출물. 축 하나에 시안 A/B/C. 축을 섞어 보여준 시안은 여기 기록하지 않는다.
-->

# Decisions

## 축별 반응·선택

허브 취향 탭 4개(색상 / 모양·간격 / 글자·확정 표시 / 부모 화면 글자), feedback/axis-1..7, 2026-09-14 22:09~22:10. 선택은 폰 화면 클릭(text: 추천이면 "추천대로", 아니면 "직접 선택"). 세부 의견 칸 없음.

### 축 1 — 밝기·색온도
- 시안 페이지: design/probes/taste-color.html
- 가장 좋은 것: B
- 가장 싫은 것: 없음 (묻지 않음)
- 이유·번호 원문: "추천대로" (feedback/axis-1)
- 선택값: 라이트, 따뜻함 — bg #FDFBF7, surface-1 #F5F0E8, surface-2 #EBE4D8, text #1F1B16, text-muted #7A6F63, border #E7E0D4
- 근거: 추천 수락. 부모 세대가 오래 봐도 눈이 편한 따뜻한 바탕. 레퍼런스 5개가 전부 라이트라 도메인 관례와도 맞음

### 축 4 — 강조색 성격
- 시안 페이지: design/probes/taste-color.html
- 가장 좋은 것: B
- 가장 싫은 것: 없음
- 이유·번호 원문: "직접 선택" (feedback/axis-4). 추천은 A(차분한 파랑)였음
- 선택값: 선명한 단일 강조 — accent #F97316 (orange), accent-pressed #DB6513, accent-soft #F97316 @0.10, on-accent #FFFFFF. primary 버튼·활성 탭·활성 날짜 칩·D-day 배지에만
- 근거: 사용자 직접 선택. 따뜻한 바탕(축 1 B)과 같은 계열이라 조화. danger #DC2626과 구분되도록 오류 문구는 아이콘 동반

### 축 3 — 형태
- 시안 페이지: design/probes/taste-shape.html
- 가장 좋은 것: B
- 이유·번호 원문: "추천대로" (feedback/axis-3)
- 선택값: soft — radius 8(버튼) / 12(카드) / 4(칩·배지) / full(pill 아바타), border 1px, shadow sm (0 1px 2px rgba(0,0,0,.06))
- 근거: 추천 수락. 끌어 옮기는 화면이라 경계는 또렷하게, 가족 앱이라 너무 딱딱하지 않게

### 축 2 — 정보 밀도
- 시안 페이지: design/probes/taste-shape.html
- 가장 좋은 것: B
- 이유·번호 원문: "추천대로" (feedback/axis-2)
- 선택값: comfortable — 기본 간격 8/16, 카드 패딩 16, 목록 행 56, 본문 15px, 화면 좌우 여백 16, 날짜 칩 높이 52
- 근거: 추천 수락. 계획자는 하루 일정을 한눈에 보되 손가락으로 끌어 옮기니 행이 촘촘하면 안 됨

### 축 5 — 타이포 성격
- 시안 페이지: design/probes/taste-type.html
- 가장 좋은 것: B
- 이유·번호 원문: "직접 선택" (feedback/axis-5). 추천은 A(균일)였음
- 선택값: 강한 대비 — Pretendard(iOS SF·Android Roboto 폴백). display 36/700, h1 32/700, h2 20/600, h3 17/600, body 15/400, body-sm 14/400, caption 12/400, label 13/500. 제목 line-height 1.25, 본문 1.5
- 근거: 사용자 직접 선택. 날짜 헤더·D-day 같은 제목이 크게 잡혀 부모 화면(축 7 C)과 한 방향

### 추가 축 6 — 확정/후보 표시
- 시안 페이지: design/probes/taste-type.html
- 가장 좋은 것: B
- 이유·번호 원문: "직접 선택" (feedback/axis-6). 추천은 A(배지+흐리게, 트랩플랜 ② 방식)였음
- 선택값: 왼쪽 색 띠, 배지 없음 — 확정 = 왼쪽 4px accent 실선 띠, 정하는 중 = 왼쪽 4px border 색 점선 띠 + 제목 text-muted. 항목 오른쪽 "확정으로" 텍스트 버튼은 유지. 보는 사람 웹에서는 정하는 중 항목을 "아직 정하는 중" 한 줄(점선 띠)로만
- 근거: 사용자 직접 선택. 레퍼런스에서 가져온 "배지" 부품은 쓰지 않는다(brief §4 첫 줄 기준 갱신: 색만이 아니라 **띠 형태(실선/점선)**로도 구분되므로 색약 대응은 유지됨)

### 추가 축 7 — 부모 화면 글자 크기 (이 프로젝트 한정, docs/eval.md 교차 검증용)
- 시안 페이지: design/probes/taste-parent.html
- 가장 좋은 것: C
- 이유·번호 원문: "직접 선택" (feedback/axis-7). 추천은 B(한 단계)였음
- 선택값: 두 단계 크게 — 웹 본문 20/400, 날짜 헤더 26/700, 보조 16, 버튼 높이 56, 한 화면에 이틀
- 근거: 사용자 직접 선택. PRD §3 "부모는 여러 단계 조작이 답답" + 눈높이 차이를 글자 크기로 가장 직접적으로 해결
- 교차 검증(축 2 대조): comfortable + 두 단계 큼 → 충돌 조합(compact + 두 단계)이 아님. 2차 시안 없이 통과. 웹 화면은 앱 밀도 규칙 대신 web.* 규칙(간격 12/24, 행 64)을 따른다

## 레퍼런스 반응 (brief §3 요약)
- 추천 3개(트랩플랜·Wanderlog·Chorsee) "추천대로", 접힌 2개(트리플·Cozi) 반응 없음 → 추천 그대로 (2026-09-14 21:50).
- 취향 시안에 들어간 레퍼런스 부품: 축 6 A(배지+흐리게) → **탈락**, 축 6 C(섹션 접기) → 탈락, 축 7(Cozi 저밀도·큰 글씨) → C로 더 강하게 채택.

## 아이콘
- 시안 페이지: design/probes/icons.html (feedback/icons, 2026-09-14 21:51)
- 선택: 40개 전부 추천대로 (changed: 없음). design/icons.md 그대로 확정.

## 2차 시안 (있을 때만)

| 축 | 1차 충돌 이유 | 2차 시안 | 선택 |
|---|---|---|---|
| — | 충돌 없음 (축 2 B + 축 7 C는 허용 조합) | — | — |

## 남은 트레이드오프

| 토큰 | 축 쌍 | A (현재) | B (대안) | 섹션 | 결과 |
|---|---|---|---|---|---|
| color.accent | 축 4 (CTA) ↔ 축 6 (확정 띠) | 확정 띠 accent #F97316 | 확정 띠 text #1F1B16 | 규칙 미리보기 5 | **A 유지** — feedback/section-5 pick.stripe="accent", reaction good (2026-09-15 03:43) |
| type.roles ↔ web.type | 축 5 (강한 대비) ↔ 축 7 (두 단계) | 웹 날짜 헤더 26/700, 한 화면 이틀 | — | 규칙 미리보기 10 | **통과** — section-10 good. 계산상 809px로 이틀 수용, 사용자 육안 확인 |

규칙 미리보기 결과: 11섹션 전부 good, "전체 추천대로" (feedback/overall). design-rules.md `status: confirmed` 2026-09-15.
