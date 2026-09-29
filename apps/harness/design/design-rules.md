<!--
4단계 산출물. references/design-rules.md 표를 복사해 값 열을 채운 것.
초안(2026-09-14): 항목 전부 기본값 + 1단계 구조 답 반영.
덮어쓰기(2026-09-15): 3단계 취향 축 1~7(design/decisions.md) 선택값으로 §A 색·간격·radius·그림자·글꼴·타이포와
그 파생 행(§B 버튼·밀도·칩·카드, §C badge.status·web.tentative·web.type·web.guest)을 덮어썼다.
출처 열 형식: "3단계: 축 n 선택 X (추천대로|직접 선택)". 1단계 출처 행은 그대로 두었다.
사용자가 규칙 미리보기(probes/rules-preview.html)를 확인하면 메인 대화가 아래 두 줄을 채운다.
figma-builder·최종 미리보기는 status: confirmed 가 없으면 시작하지 않는다.
-->

status: confirmed
confirmed_at: 2026-09-15 (규칙 미리보기 11섹션 전부 good, feedback/section-1..11 + overall "전체 추천대로", 확정 띠 pick=accent)
preview: design/probes/rules-preview.html

# Design Rules

## A. 토큰

| 키 | 값 | 출처 |
|---|---|---|
| color.bg | #FDFBF7 | 3단계: 축 1 선택 B (추천대로) |
| color.surface-1 | #F5F0E8 | 3단계: 축 1 선택 B (추천대로) |
| color.surface-2 | #EBE4D8 | 3단계: 축 1 선택 B (추천대로) |
| color.text | #1F1B16 | 3단계: 축 1 선택 B (추천대로) |
| color.text-muted | #7A6F63 | 3단계: 축 1 선택 B (추천대로) |
| color.border | #E7E0D4 | 3단계: 축 1 선택 B (추천대로) |
| color.accent | #F97316 | 3단계: 축 4 선택 B (직접 선택) |
| color.accent-pressed | #DB6513 (accent를 12% 어둡게) | 3단계: 축 4 선택 B (직접 선택) |
| color.accent-soft | rgba(249,115,22,.10) (accent 10% 불투명) | 3단계: 축 4 선택 B (직접 선택) |
| color.on-accent | #FFFFFF | 3단계: 축 4 선택 B (직접 선택) |
| color.danger | #DC2626 | 고정 |
| color.danger-pressed | #C22121 | 자동 |
| color.secondary-pressed | #D8D3CC | 자동 |
| color.overlay | rgba(0,0,0,.5) 하나만. 바텀시트·다이얼로그·로딩 전부 동일 | 고정 |
| space.scale | 4 / 8 / 12 / 16 / 24 / 32 / 48 (4 배수만 허용). comfortable 기본 간격 8 / 16 | 3단계: 축 2 선택 B (추천대로) |
| space.screen-padding | 16 (화면 좌우) | 3단계: 축 2 선택 B (추천대로) |
| space.section | 24 | 3단계: 축 2 선택 B (추천대로) |
| space.card-padding | 16 | 3단계: 축 2 선택 B (추천대로) |
| radius | sm 4 / md 8 / lg 12 / xl 16 / full 9999 — soft: 버튼·날짜 칩 md · 카드 lg · 칩·배지 sm · 시트 상단 xl · 아바타 full | 3단계: 축 3 선택 B (추천대로) |
| shadow | sm 0 1px 2px rgba(0,0,0,.06) / md 0 4px 12px rgba(0,0,0,.08) — soft: 카드 sm · 시트·다이얼로그·끌어 옮기는 행 md | 3단계: 축 3 선택 B (추천대로) |
| font.family | "Pretendard", Roboto, -apple-system, sans-serif | 3단계: 축 5 선택 B (직접 선택) — iOS SF·Android Roboto 폴백 |
| type.roles | display 36/700 · h1 32/700 · h2 20/600 · h3 17/600 · body 15/400 · body-sm 14/400 · caption 12/400 · label 13/500 (line-height 1.5, 제목 1.25). 본문 최소 14 | 3단계: 축 5 선택 B (직접 선택) |
| z.scale | base 0 · sticky 100 · app-bar 200 · tab-bar 200 · overlay 300 · sheet 400 · dialog 500 · snackbar 600 | 고정 |
| motion | 200ms ease-out. 시트 열림 250ms. 이미지 교체 crossfade 150ms | 고정 |
| device.frame | 390×844 기준. 검증 폭 360 / 390 / 430. 폰 세로만 (태블릿·가로 모드 없음) | 1단계: tablet=no |
| safe-area | 상단 상태바 44(노치 기기 47) · 하단 홈 인디케이터 34. 콘텐츠·고정 바는 이 안쪽 | 고정 |
| tap.min | 44×44. 인접 탭 영역 간격 최소 8 | 고정 |
| platform | 계획자 앱 = iOS·Android 공통 1벌 (시안은 iOS 390×844 기준) / 보는 사람 = 앱 설치·로그인 없이 링크로 여는 모바일 웹. 차이는 §C platform.both · web.* | 1단계: platform=both, parent=web-link |

파생 색 계산: accent-pressed = accent × 0.88 · danger-pressed = danger × 0.88 · secondary-pressed = surface-1 × 0.88 (button.states pressed "배경 12% 명도 변화"). on-accent는 accent·danger 바탕 위 글자·아이콘.

## B. 컴포넌트 규칙

| 키 | 값 | 출처 | 사용 여부 |
|---|---|---|---|
| button.sizes | sm 36h / px12 / text14 · md 44h / px16 / text15 · lg 52h / px20 / text16 (풀폭 CTA). sm은 탭 영역 44 (위아래 투명 여백 4) | 기본값 | 사용 |
| button.radius | radius.md 8 (soft) | 3단계: 축 3 선택 B (추천대로) | 사용 |
| button.variants | primary(accent #F97316 바탕, on-accent 흰 글자) · secondary(surface-1 바탕 + border 1px, text 글자) · ghost(투명, accent 글자) · danger(danger 바탕, on-accent 글자) | 3단계: 축 4 선택 B (직접 선택) | 사용 |
| button.states | default · pressed(배경만 12% 어둡게: primary → accent-pressed · secondary → secondary-pressed · ghost → accent-soft · danger → danger-pressed. 글자·아이콘 색 유지, 절대 검정 전환 없음) · selected(accent-soft 바탕 + accent 1px border + accent 글자) · disabled(opacity .4) · loading(스피너 loader-circle 20, 라벨 숨김, 폭 유지) | 기본값 + 3단계: 축 4 선택 B (직접 선택) | 사용 |
| button.row-rule | 같은 줄의 버튼은 같은 size·radius. 두 개면 secondary 왼쪽, primary 오른쪽 | 기본값 | 사용 |
| button.text | 한 줄. 넘치면 문구를 줄인다. 줄바꿈 금지 | 기본값 | 사용 |
| button.primary-per-screen | 화면당 primary 1개. 기본 위치는 하단 고정 바 (엄지 영역). 화면별 CTA는 2단계 투어 후 확정. 보는 사람 웹 예외는 §C web.primary | 기본값 | 사용 |
| button.duplicate | 같은 동작의 버튼을 앱바와 본문에 이중 배치하지 않는다. 범위가 다르면 라벨에 범위를 쓴다 | 기본값 | 사용 |
| accent.use | accent 채움은 primary 버튼 · 활성 탭(아이콘·글자) · 활성 날짜 칩 · D-day 배지 · 확정 띠(§C badge.status)에만. 선택 상태(accent-soft + accent 테두리)와 ghost 글자는 button.states·variants를 따른다. 그 밖(진행률 막대·토글 켜짐·스낵바 액션)은 text 색 | 3단계: 축 4 선택 B (직접 선택) · 축 6 선택 B (직접 선택) | 사용 |
| density | comfortable — 기본 간격 8 / 16 · 카드 패딩 16 · 목록 행 56 · 본문 15 · 화면 좌우 16 · 날짜 칩 높이 52 · 칩 높이 28 | 3단계: 축 2 선택 B (추천대로) | 사용 |
| list.row | 목록 행(일정 항목·할 일·구성원·설정·시트 선택지) 최소 높이 56. 카드 안 행 사이 border 1px. 행 전체가 탭 영역, 행 안 액션은 오른쪽 끝 | 3단계: 축 2 선택 B (추천대로) | 사용 |
| card | surface-1 바탕 + border 1px(border 색) + radius.lg 12 + shadow.sm + 패딩 16. 카드 안 요소는 surface-2까지 (layout.surface-tiers) | 3단계: 축 3 선택 B (추천대로) · 축 2 선택 B (추천대로) | 사용 |
| chip | 높이 28 · 좌우 8 · radius.sm 4 · 글자 label 13/500 · 아이콘 16 · 바탕 surface-2. 선택 = accent-soft + accent 글자(button.states selected). 탭 가능한 칩은 탭 영역 44 (칩 위아래 투명 여백 8) | 3단계: 축 2 선택 B (추천대로) · 축 3 선택 B (추천대로) | 사용 |
| date-chip | 날짜 칩(DateChips) 높이 52 · 5칸 균등 폭 · 간격 8 · radius.md 8. 날짜 숫자 h3 17/600 + 요일 caption 12. 활성 = accent 바탕 + on-accent 글자 · 비활성 = surface-1 + border 1px | 3단계: 축 2 선택 B (추천대로) · 축 4 선택 B (직접 선택) | 사용 |
| icon.set | lucide-react 단일. lucide 공식 SVG를 `Icon/<lucide-name>`으로 만든 것만 쓴다. 벡터 직접 그리기·변형·조합 금지. 다른 세트 혼용 금지 | 기본값 | 사용 |
| icon.allowlist | 프로젝트당 design/icons.md 허용 목록 1개 (40개). 액션·상태마다 lucide 이름 1개 고정. 목록에 없는 아이콘은 쓰지 않고, 필요하면 목록에 먼저 추가하고 사용자 확인 | 기본값 | 사용 |
| icon.one-meaning | 의미 1개 = 아이콘 1개. 같은 액션에 화면마다 다른 아이콘 금지. 같은 아이콘을 다른 의미로 재사용 금지 | 기본값 | 사용 |
| icon.size-by-text | 옆 텍스트 역할이 크기를 정한다. caption·label(12~13) → 16 / body·body-sm(14~15) → 20 / h3 이상·앱바·탭바(17+) → 24. 단독 아이콘 버튼은 버튼 size를 따른다 (sm→16, md→20, lg→24) | 기본값 | 사용 |
| icon.sizes | 16 / 20 / 24 | 기본값 | 사용 (빈 상태 장식 48만 state.empty 예외) |
| icon.stroke | 16→1.5 / 20→1.75 / 24→2 | 기본값 | 사용 |
| icon.color | currentColor. 텍스트 색 변수를 그대로 바인딩. 아이콘 전용 색 변수 만들지 않는다 | 기본값 | 사용 |
| icon.gap | 텍스트와 8px, 수직 중앙 정렬 | 기본값 | 사용 |
| icon-button.hit | 탭 영역 44×44 정사각. 그림은 icon.sizes. 앱바 아이콘 버튼은 시각 24 / 탭 44 | 기본값 | 사용 |
| icon-button.name | 아이콘만 있는 버튼은 접근성 라벨 필수. 탭바 아이콘은 텍스트 라벨 동반 | 기본값 | 사용 |
| icon.state | 버튼 상태 색을 아이콘도 따른다 | 기본값 | 사용 |
| icon.overflow-menu | 자주 쓰는 액션은 점 세 개 뒤에 숨기지 않는다. 앱바 액션은 최대 2개 노출 | 기본값 | 사용 |
| icon.proximity | 액션 아이콘은 대상 제목·내용 바로 옆. 목록 행의 액션은 우측 끝 | 기본값 | 사용 |
| tap.feedback | 탭 가능한 모든 요소에 pressed 시각 반응. 반응 없는 탭 가능 요소 금지 (iOS·Android 차이는 §C platform.both) | 기본값 + 1단계: platform=both | 사용 |
| tap.long-press | 롱프레스는 보조 액션에만. 유일한 진입 경로로 쓰지 않는다 | 기본값 | 사용 |
| image.fit-by-purpose | 상세·미리보기 = contain + surface-2 배경 · 목록 카드 = cover, 중심 피사체 잘림은 C단계에서 확인 | 기본값 | (미사용) |
| image.aspect | 컨테이너에 비율 고정. 로딩 전에도 높이 유지 (레이아웃 이동 금지) | 기본값 | (미사용) |
| thumbnail.spec | 프로젝트당 규격 1개: 기본 1:1, 3열 그리드(390에서 폭 (390-32-16)/3 ≈ 114), gap 8, radius.md | 기본값 | (미사용) |
| thumbnail.strip | 가로 스트립일 때 높이 96, 첫 항목 좌측 패딩 16, 마지막 항목 뒤 여백 16 | 기본값 | (미사용) |
| thumbnail.title | 제목 위치 프로젝트당 1개: 기본 아래 1줄 말줄임. 옆·위 혼용 금지 | 기본값 | (미사용) |
| thumbnail.pressed | overlay 8% | 기본값 | (미사용) |
| thumbnail.selected | border accent 2px + accent-soft overlay + 체크 배지 20 우상단. pressed와 반드시 구분 | 기본값 | (미사용) |
| thumbnail.selected-visible | 선택 항목이 스크롤 밖이면 가운데로 스크롤. 이미 보이면 스크롤하지 않는다 | 기본값 | (미사용) |
| image.transition | 다음 이미지가 준비될 때까지 이전 이미지 유지, crossfade 150ms. 영역 크기 불변 | 기본값 | (미사용) |
| image.placeholder | 로딩 = surface-2 스켈레톤, 실패 = surface-2 + 아이콘 image-off 24 | 기본값 | (미사용) |
| text.role-lock | 같은 역할 = 같은 type.role. 화면마다 임의 크기 금지 | 기본값 | 사용 |
| text.truncate | 카드 제목 2줄 line-clamp, 목록 제목 1줄, 설명 3줄. 장소명·항목 제목은 2줄 | 기본값 + 1단계: 가정 로그 '긴 텍스트' | 사용 |
| text.short-copy | 버튼·짧은 안내는 한 줄. 넘치면 문구를 줄인다 | 기본값 | 사용 |
| text.long-copy | 긴 안내는 body-sm, 별도 행, 화면 패딩 안에서 자동 줄바꿈 | 기본값 | 사용 |
| text.scale | 시스템 글자 확대 120%에서도 버튼·탭바가 깨지지 않게 높이 auto | 기본값 | 사용 |
| copy.user-language | 내부 화면 명칭 금지. 사용자가 하는 행동과 화면에 보이는 이름으로 쓴다 ("후보" 대신 "정하는 중") | 기본값 | 사용 |
| copy.error | 실패 문구는 이유 + 다시 할 수 있는 조건 | 기본값 | 사용 |
| copy.i18n | 한국어만. 폭 검증은 한국어 문구 기준 | 1단계: lang=ko | 사용 |
| layout.left-edge | 한 화면의 모든 섹션 좌측 시작선 = space.screen-padding | 기본값 | 사용 |
| layout.section-gap | space.section 하나만 | 기본값 | 사용 |
| layout.surface-tiers | bg → surface-1(카드·패널) → surface-2(패널 안 요소). 3단 이상 금지 | 기본값 | 사용 |
| layout.device-widths | 360 / 390 / 430에서 같은 레이아웃. 열 수 고정, 폭만 늘어남 | 기본값 | 사용 |
| layout.tablet | 미지원. 폰 세로만 | 1단계: tablet=no | 사용 |
| layout.thumb-zone | primary CTA·자주 쓰는 액션은 화면 하단 1/3. 앱바 우측 액션은 보조에만 | 기본값 | 사용 |
| scroll.single | 세로 스크롤 컨테이너 화면당 1개. 중첩 세로 스크롤 금지. 가로 스트립은 허용 | 기본값 | 사용 |
| scroll.last-item | 스크롤 영역 하단 여백 = 고정 바 높이 + safe-area 하단 + 16 | 기본값 | 사용 |
| fixed.bottom-cta | 높이 56 + safe-area 34, 배경 bg, 상단 border. 본문 하단 여백 106 | 기본값 | 사용 |
| fixed.tab-bar | 계획자 앱: 높이 49 + safe-area 34, 탭 4개 (일정·할 일·소식·가족), 아이콘 24 + 라벨 caption. 보는 사람 웹: 탭바 없음 (§C web.nav) | 1단계: tabbar=4, parent=web-link | 사용 |
| fixed.no-clip | 고정 바·탭바가 마지막 항목·옵션을 가리지 않음을 C단계에서 확인 | 기본값 | 사용 |
| keyboard | 입력 화면은 키보드 높이(약 300)만큼 본문이 올라오고 primary CTA는 키보드 위에 붙는다 | 기본값 | 사용 |
| sheet.sizes | half(화면 50%) / full(safe-area 상단까지). 상단 그랩바 36×4 | 기본값 | 사용 |
| sheet.structure | 헤더 56(제목 + 닫기) · 본문 스크롤 · 푸터 CTA 56 + safe-area. 조작부는 푸터에 고정, 본문 아래로 밀리지 않는다 | 기본값 | 사용 |
| sheet.use | 옵션 선택·필터·부가 입력은 바텀시트. 새 작업 흐름은 풀스크린 푸시 | 기본값 | 사용 |
| dialog | 확인·경고만. 폭 화면-48, 가운데, 제목 h3 + 본문 body + 버튼 2개(취소 왼쪽) | 기본값 | 사용 |
| dialog.dismiss | 시트는 오버레이 탭·아래로 드래그로 닫힘. 다이얼로그는 버튼으로만 | 기본값 | 사용 |
| app-bar | 높이 56. 뒤로(24) · 제목 h3 · 우측 액션 최대 2개 | 기본값 | 사용 |
| help.inline | 툴팁 없음. 설명은 필드 아래 caption 또는 정보 아이콘 탭 → 바텀시트 | 기본값 | 사용 |
| snackbar | 하단 고정 바 위 16. 높이 48, 4초, 액션 1개 | 기본값 | 사용 |
| layer.order | z.scale 준수. 스낵바(600) > 다이얼로그(500) > 시트(400). 시트 위 다이얼로그 허용, 시트 위 시트 금지 | 기본값 | 사용 |
| state.required | 모든 화면·목록·카드에 초기 · 빈 · 로딩 · 성공 · 실패 · 비활성 6상태 정의 | 기본값 | 사용 |
| state.empty | 일러스트 없이 아이콘 48 (icons.md "빈 상태") + 안내 1줄 + primary 버튼 1개, 화면 세로 중앙 | 기본값 + 1단계: 가정 로그 '빈 상태' | 사용 |
| state.loading | 스켈레톤(surface-2). 배경색은 성공 상태와 동일. 풀스크린 스피너 금지 | 기본값 | 사용 |
| state.error | 이유 + 재시도 버튼. 네트워크 오류는 스낵바로 | 기본값 | 사용 |
| state.offline | 앱바 아래 배너 1줄 | 기본값 | 사용 |
| data.range | 제목 짧음/김, 항목 0/1/많음, 글자 확대 120% 조합으로 C단계 검증. 이 프로젝트: 여행 3~8일, 하루 항목 0~8개, 구성원 4~6명, 이미지 없음 | 기본값 + 1단계: 가정 로그 '항목 수 범위' | 사용 |
| data.ownership | 상세·정보 시트는 현재 선택 대상의 정보만 표시 | 기본값 | 사용 |
| change.scope | 요청된 결함만 고친다. 기본 상태 변경 ≠ 조작 제거. 닫기·취소·뒤로·재선택은 유지 | 고정 | 사용 |
| change.relation | 위치 요청은 대상·기준·순서로 확인된 문장만 실행 | 고정 | 사용 |
| change.propagate | 컴포넌트를 고치면 그 인스턴스가 있는 모든 화면을 다시 스크린샷 | 고정 | 사용 |
| change.no-dup | 새 공통 요소 추가 전 같은 액션이 이미 있는지 확인 | 고정 | 사용 |

## C. 프로젝트 전용 규칙

도메인에만 있는 기준(플랫폼 차이, 태블릿, 제스처 등). 인터뷰에서 새로 정의된 것.

| 키 | 값 | 출처 |
|---|---|---|
| platform.both | 계획자 앱은 iOS·Android 공통 1벌. 차이: Android 시스템 뒤로가기 = 앱바 뒤로와 같은 동작 · pressed 반응은 iOS 하이라이트 / Android 머티리얼 리플 · 시스템 폰트 폴백 -apple-system / Roboto | 1단계: platform=both |
| web.guest | 보는 사람(부모 등)은 카톡 초대 링크 하나로 모바일 웹 진입. 로그인 없음. 첫 방문에 "누구세요?" 이름 버튼(구성원 수만큼, 높이 56 = web.type 버튼 높이, secondary, 글자 20, 모두 같은 variant) → 브라우저에 기억. 이 이름 고르기 화면이 상태 프레임 `guest-name` | 1단계: parent=web-link, 가정 로그 '웹 페이지 식별' · 3단계: 축 7 선택 C (직접 선택) |
| web.nav | 보는 사람 웹은 탭바 없음. 상단 세그먼트 3개 (흐름·내 준비·소식), 칸 높이 44, 아이콘 24 + 글자, 부모에 data-tap-group. 앱바 뒤로 없음 | 1단계: parent=web-link, 가정 로그 '보는 사람 웹의 내비' |
| web.address-bar | 웹 화면 프레임은 상태바 44 아래 브라우저 주소창 띠 36 (surface-2 바탕, 도메인 caption 가운데)을 그려 앱 화면과 구분한다. 주소창 띠는 탭 영역이 아니다 | 1단계: parent=web-link (2단계 투어와 같은 높이) |
| web.type | 두 단계 크게 (보는 사람 웹 ⑤⑥⑧): 본문 20/400 · 날짜 헤더 26/700 · 보조 16/400 · 버튼 높이 56 · 웹 간격 12 / 24 · 웹 행 64 · 한 화면에 이틀. line-height는 앱과 같음(본문 1.5, 제목 1.25). CSS 변수 `--web-body` · `--web-body-weight` · `--web-date` · `--web-date-weight` · `--web-sub` · `--web-sub-weight` · `--web-button-h` · `--web-gap-sm` · `--web-gap` · `--web-row-h`. 웹 화면은 앱 밀도 규칙 대신 이 값을 따른다 | 3단계: 축 7 선택 C (직접 선택) · 1단계: brief §0 "확정된 큰 흐름만 큰 글씨로" |
| web.icons | 보는 사람 웹 아이콘은 옆 글자를 따라 한 단계 위 (16→20, 20→24, 24 유지). 크기는 16/20/24 밖으로 나가지 않는다. 모든 아이콘에 라벨 동반 | 1단계: parent=web-link + icons.md |
| web.primary | primary 예외 키 (`data-primary-exempt="web.primary"`). 보는 사람 웹 ⑥ 내 준비는 체크 행 자체가 주 행동이라 Button primary 0개 허용. ⑤ 여행 흐름은 "오늘로 이동" 1개가 primary (위치는 2단계 투어 결과), ⑧ 변경 소식은 하단 CTA "확인했어요"가 primary (예외 아님). `guest-name` 프레임의 이름 버튼은 동등한 선택지라 primary 없음 | 1단계: brief §1 ⑤⑥⑧ primary 열 |
| badge.status | 배지 없음 — 행 왼쪽 색 띠로 표시. 확정 = 행 왼쪽 4px accent 실선 띠 · 정하는 중 = 행 왼쪽 4px border 색 점선 띠 + 제목 text-muted. 띠 모양(실선/점선)으로도 구분되므로 색만으로 구분하지 않는다. 정하는 중 행 오른쪽 "확정으로" 텍스트 버튼(secondary sm, 탭 영역 44)은 유지. 키 이름은 호환을 위해 유지. 남은 트레이드오프: 확정 띠를 text(#1F1B16) 실선으로 바꾸는 대안 — 규칙 미리보기 5번 섹션에서 선택 (기본 accent) | 3단계: 축 6 선택 B (직접 선택) · 1단계: brief §1 ③④ "확정/후보 토글" |
| web.tentative | 보는 사람 웹에서 정하는 중 항목은 내용 없이 "아직 정하는 중" 한 줄로만 (circle-dashed 20 + text-muted 글자 + 왼쪽 4px border 색 점선 띠, badge.status와 같은 표시). 같은 날·같은 시간대 후보가 여러 개여도 한 줄로 합친다 (예: "21일 오후 · 아직 정하는 중") | 3단계: 축 6 선택 B (직접 선택) · 1단계: 가정 로그 '보는 사람 화면의 미확정 표시' |
| planner.preview | 계획자 앱 일정 편집(③) 앱바 우측 "가족 화면"(eye) → 보는 사람 웹 ⑤를 앱 안에서 그대로 보여 준다. 상단 띠 "가족이 보는 화면" + 닫기(x) | 1단계: parent=web-link "계획자 앱에는 가족 화면 미리보기" |
| notify.digest | 알림은 확정된 변경만, 하루 1회 저녁 묶음. 항공·숙소 확정은 즉시. 정하는 중 변경은 알리지 않는다. 확정 전환 시 스낵바 "오늘 저녁 소식에 담겨요" | 1단계: 가정 로그 '알림 정책' + 2단계 시나리오 1·3 |
