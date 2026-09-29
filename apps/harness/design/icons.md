<!--
4단계 산출물. 아이콘 이름은 lucide 공식 이름(kebab-case)만. https://lucide.dev/icons (SVG 원본: lucide-react v0.577.0 __iconNode)
figma-builder는 이 표에 있는 아이콘만 Icon/<name> 컴포넌트로 만든다. 표에 없는 아이콘은 만들지 않는다.
허용 목록 = "lucide 이름" 열만. "대안 2" 열은 아이콘 탭(probes/icons.html, feedback/icons)에서 고를 수 있는 후보이고 허용 목록이 아니다.
아이콘 탭에서 대안을 고르면: 그 이름을 "lucide 이름" 열로 올리고, 원래 추천은 "대안 2" 열로 내린다.
대안 120개 이름은 행끼리 겹치지 않는다 → 어떤 대안을 골라도 "같은 아이콘에 두 의미"가 생기지 않는다.
status: draft (아이콘 탭 반응 대기)
-->

# Icons

- 세트: lucide-react
- 크기 규칙: 옆 텍스트 역할이 정함. caption·label → 16 / body → 20 / h3·앱바·탭바 → 24
- 선 두께: 16→1.5 / 20→1.75 / 24→2 (빈 상태 장식 48→1.5)
- 보는 사람 웹(⑤⑥⑧)은 옆 글자가 한 단계 크므로(design-rules §C `web.type`) 아이콘도 한 단계 위: 16→20, 20→24, 24는 24 그대로. 허용 크기 16/20/24 밖으로 나가지 않는다. 웹은 모든 아이콘에 라벨을 함께 쓴다(행 전체가 탭 영역인 "열기"는 행 글자가 라벨).
- 웹 상단 세그먼트(흐름·내 준비·소식)는 아이콘 24 + 글자. "소식"은 앱 탭바와 같은 뜻이라 같은 아이콘.
- 버튼 문구만 있는 CTA: "만들기"(②), "여행 열기"(① 카드 자체), 이름 고르기 버튼(⑤ guest-name)은 아이콘 없이 글자만.

## 허용 목록

의미 1개 = 아이콘 1개. 같은 행의 "쓰이는 곳"이 여러 화면이어도 아이콘은 하나다. 크기 "—"는 그 쪽(앱/웹)에서 쓰지 않음.

rows 40 names 120
| 그룹 | 의미 | lucide 이름 | 대안 2 | 크기 (앱) | 크기 (웹) | 쓰이는 곳 | 라벨 동반 |
|---|---|---|---|---|---|---|---|
| 이동·앱바 | 뒤로 | chevron-left | arrow-left · circle-chevron-left | 24 | — | 앱바 (②③④⑨) | 아니오 (접근성 라벨) |
| 이동·앱바 | 닫기 | x | circle-x · chevron-down | 24 | 24 | 바텀시트·다이얼로그·가족 화면 미리보기 띠 | 아니오 (접근성 라벨) |
| 이동·앱바 | 더보기 | ellipsis-vertical | ellipsis · menu | 20 | — | 일정 항목 행 (③)·할 일 행 (⑦) | 아니오 (접근성 라벨) |
| 이동·앱바 | 열기 | chevron-right | arrow-right · circle-chevron-right | 20 | 24 | 여행 카드 (①)·흐름 항목 (⑤)·소식 행 "해당 일정으로" (⑧)·설정 행 (⑨) | 아니오 (접근성 라벨) |
| 이동·앱바 | 가족 화면 미리보기 | eye | scan-eye · glasses | 24 | — | 일정 편집 앱바 우측 "가족 화면" (③) | 예 |
| 이동·앱바 | 오늘로 이동 | locate-fixed | locate · crosshair | 20 | 24 | 여행 흐름 상단 (⑤) | 예 |
| 탭·세그먼트 | 일정·날짜 | calendar | calendar-days · calendar-range | 24 | — | 앱 탭바 "일정"·여행 만들기 기간 칸 (②, 20) | 예 |
| 탭·세그먼트 | 할 일 | list-checks | list-todo · clipboard-check | 24 | — | 앱 탭바 "할 일" (⑦) | 예 |
| 탭·세그먼트 | 소식 | bell | newspaper · megaphone | 24 | 24 | 앱 탭바 "소식"·웹 세그먼트 "소식" (⑧) | 예 |
| 탭·세그먼트 | 가족 | users | users-round · contact-round | 24 | — | 앱 탭바 "가족" (⑨) | 예 |
| 탭·세그먼트 | 흐름 | route | waypoints · milestone | — | 24 | 웹 세그먼트 "흐름" (⑤) | 예 |
| 탭·세그먼트 | 내 준비 | backpack | clipboard-list · package | — | 24 | 웹 세그먼트 "내 준비" (⑥) | 예 |
| 편집 액션 | 추가 | plus | circle-plus · square-plus | 20 | 24 | "새 여행 만들기" (①)·"항목 추가" (③)·"할 일 추가" (⑦)·"항목 추가" (⑥) | 예 |
| 편집 액션 | 저장·확인 | check | circle-check-big · save | 20 | 24 | 하단 CTA "저장" (④)·"확인했어요" (⑧) | 예 |
| 편집 액션 | 삭제 | trash-2 | trash · circle-minus | 20 | — | 항목 편집 (④)·일정 행 더보기 시트 (③) | 예 |
| 편집 액션 | 순서 바꾸기 손잡이 | grip-vertical | grip-horizontal · grip | 20 | — | 일정 항목 행 왼쪽 (③) | 아니오 (접근성 라벨) |
| 편집 액션 | 구성원 초대 | user-plus | user-round-plus · mail-plus | 20 | — | "구성원 초대" (⑨)·"함께 가는 가족" 추가 (②) | 예 |
| 편집 액션 | 역할 바꾸기 | arrow-left-right | repeat · user-cog | 20 | — | 구성원 행 역할 칩 (⑨) | 예 |
| 편집 액션 | 알림 빈도 | sliders-horizontal | bell-ring · settings-2 | 20 | — | 가족·역할 설정 행 (⑨) | 예 |
| 시트 액션 | 지도로 보기 | map | map-pinned · navigation | — | 24 | 항목 상세 시트 (⑤) | 예 |
| 시트 액션 | 물어보기 | message-circle | message-square · message-circle-question-mark | — | 24 | 항목 상세 시트 "지수에게 물어보기" (⑤) | 예 |
| 시트 액션 | 초대 링크 복사 | link | copy · link-2 | 20 | — | 초대 링크 시트 (②⑨) | 예 |
| 시트 액션 | 카톡으로 보내기 | send | share · message-square-share | 20 | — | 초대 링크 시트 (②⑨) | 예 |
| 일정 상태 | 확정 | circle-check | badge-check · stamp | 16 | 20 | 배지 "확정" (③⑤⑧)·행 액션 "확정으로" (③) | 예 |
| 일정 상태 | 정하는 중 | circle-dashed | circle-dot-dashed · circle-question-mark | 16 | 20 | 배지 "정하는 중" (③)·"아직 후보예요" 토글 (④)·"아직 정하는 중" (⑤) | 예 |
| 항목 종류·정보 | 이동 (비행) | plane | plane-takeoff · plane-landing | 20 | 24 | 항목 종류 (③④⑤) | 예 |
| 항목 종류·정보 | 이동 (차량) | car | car-front · bus | 20 | 24 | 항목 종류 (③④⑤) | 예 |
| 항목 종류·정보 | 숙박 | bed | bed-double · hotel | 20 | 24 | 항목 종류 (③④⑤) | 예 |
| 항목 종류·정보 | 활동 | compass | ticket · mountain | 20 | 24 | 항목 종류 (③④⑤) | 예 |
| 항목 종류·정보 | 장소 | map-pin | pin · flag | 16 | 20 | 항목 장소 줄 (④⑤)·목적지 칸 (②)·집합 장소 (⑥) | 예 |
| 항목 종류·정보 | 시간·기한 | clock | clock-3 · alarm-clock | 16 | 20 | 항목 시간 줄 (④⑤)·할 일 기한 (⑦) | 예 |
| 항목 종류·정보 | 메모 | sticky-note | notebook-pen · file-text | 16 | — | 항목 편집 메모 칸 (④) | 예 |
| 할 일 | 완료 | square-check | square-check-big · check-check | 20 | 24 | 할 일·준비물 체크 (⑥⑦) | 예 |
| 할 일 | 미완료 | square | circle · square-dashed | 20 | 24 | 할 일·준비물 체크 (⑥⑦) | 예 |
| 할 일 | 담당자 | user | user-round · circle-user | 16 | 20 | 할 일 행 담당자 칩 (⑦)·"담당자 바꾸기" (⑥) | 예 |
| 화면 상태 | 빈 상태 | luggage | inbox · tree-palm | 48 | 48 | 빈 상태 (①③⑥⑦⑧, 예외 크기·장식) | 예 |
| 화면 상태 | 로딩 | loader-circle | loader · hourglass | 20 | 24 | 버튼 로딩 스피너 (목록은 스켈레톤) | 아니오 (접근성 라벨) |
| 화면 상태 | 다시 시도 | rotate-cw | refresh-cw · rotate-ccw | 20 | 24 | 실패 상태 "다시 시도" 버튼 | 예 |
| 화면 상태 | 오류 | circle-alert | triangle-alert · octagon-alert | 20 | 24 | 실패 문구 옆 | 예 |
| 화면 상태 | 오프라인 | wifi-off | cloud-off · unplug | 16 | 20 | 오프라인 배너 | 예 |

## 제외 목록

비슷해서 헷갈리는 아이콘. 쓰지 않는다. (아이콘 탭에서 대안으로 고르면 이 표에서도 뺀다)

| 쓰지 않음 | 이유 |
|---|---|
| arrow-left | 뒤로는 chevron-left 하나만 |
| circle-x | 닫기는 x 하나만 |
| ellipsis | 더보기는 ellipsis-vertical 하나만 |
| circle-check-big, badge-check | 확정은 circle-check 하나만. 저장·확인은 check |
| calendar-days, calendar-range | 일정·날짜는 calendar 하나만. 오늘로 이동은 locate-fixed |
| bell-ring | 소식은 bell, 알림 빈도는 sliders-horizontal |
| house | 홈 탭이 없다. 가족은 users |
| share-2 | 초대는 링크 복사(link)·카톡으로 보내기(send) 두 개로 나눈다 |
| hotel, bed-double | 숙박은 bed 하나만 |
| image-off | 이미지(썸네일)가 없는 서비스라 미사용 |
