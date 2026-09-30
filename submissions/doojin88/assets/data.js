/* 더미 데이터 — brief.md "규모 수치" 그대로. 가족 6명, 5박 6일, 일정 29개(확정 17·후보 12), 할 일 16건, 변경 이력 9건. */
var SEED = {
  today: '2026-09-30',
  draftEdits: 14,
  trip: {
    name: '규슈 가족여행',
    start: '2026-11-12',
    end: '2026-11-17',
    prepStart: '2026-08-20',
    route: ['후쿠오카', '유후인', '벳푸']
  },
  members: [
    { id: 'dad', name: '박영수', rel: '아버지', age: 68, role: 'parent' },
    { id: 'mom', name: '김순자', rel: '어머니', age: 65, role: 'parent' },
    { id: 'jh', name: '박지현', rel: '첫째', age: 38, role: 'planner' },
    { id: 'jun', name: '이준호', rel: '사위', age: 40, role: 'member' },
    { id: 'mj', name: '박민재', rel: '둘째', age: 33, role: 'member' },
    { id: 'sy', name: '이서윤', rel: '손주', age: 7, role: 'child' }
  ],
  days: [
    { n: 1, date: '2026-11-12', area: '인천 → 후쿠오카', sleep: '호텔 닛코 후쿠오카' },
    { n: 2, date: '2026-11-13', area: '후쿠오카', sleep: '호텔 닛코 후쿠오카' },
    { n: 3, date: '2026-11-14', area: '후쿠오카 → 유후인', sleep: '료칸 산스이칸' },
    { n: 4, date: '2026-11-15', area: '유후인', sleep: '료칸 산스이칸' },
    { n: 5, date: '2026-11-16', area: '유후인 → 벳푸', sleep: '스기노이 호텔' },
    { n: 6, date: '2026-11-17', area: '벳푸 → 인천', sleep: '' }
  ],
  /* kind: move 이동 / stay 숙박 / act 활동.  status: fixed 확정 / cand 후보.  slot: 후보가 모인 자리 */
  items: [
    { id: 'i01', day: 1, kind: 'move', time: '07:40', title: '인천공항 1터미널 집합', place: '3층 H카운터 앞', status: 'fixed', meet: true, meetTime: '07:40', meetPlace: '인천공항 1터미널 3층 H카운터 앞', was: '06:30' },
    { id: 'i02', day: 1, kind: 'move', time: '10:25', title: '인천 → 후쿠오카 비행기', place: '대한항공 KE787 · 11:50 도착', status: 'fixed', locked: true, was: '09:10' },
    { id: 'i03', day: 1, kind: 'move', time: '13:00', title: '공항에서 호텔까지 택시 2대', place: '후쿠오카공항 국제선 1층', status: 'fixed' },
    { id: 'i04', day: 1, kind: 'stay', time: '15:00', title: '호텔 닛코 후쿠오카 체크인', place: '하카타역 걸어서 3분 · 2박', status: 'fixed', locked: true },
    { id: 'i05', day: 1, kind: 'act', time: '18:30', title: '모츠나베 오오야마 본점', place: '호텔에서 걸어서 8분 · 좌식 아님', status: 'cand', slot: 's1' },
    { id: 'i06', day: 1, kind: 'act', time: '18:30', title: '우동 타이라', place: '줄이 길 수 있음 · 예약 불가', status: 'cand', slot: 's1' },

    { id: 'i07', day: 2, kind: 'act', time: '09:30', title: '다자이후 텐만구', place: '전철로 40분 · 평지 위주', status: 'fixed', meet: true, meetTime: '08:40', meetPlace: '호텔 1층 로비' },
    { id: 'i08', day: 2, kind: 'act', time: '13:30', title: '규슈 국립박물관', place: '에스컬레이터로 이동', status: 'fixed' },
    { id: 'i09', day: 2, kind: 'act', time: '16:00', title: '오호리 공원 산책', place: '호수 한 바퀴 2km', status: 'cand', slot: 's2' },
    { id: 'i10', day: 2, kind: 'act', time: '16:00', title: '캐널시티 하카타', place: '실내 · 비 오면 여기', status: 'cand', slot: 's2' },
    { id: 'i11', day: 2, kind: 'act', time: '16:00', title: '후쿠오카 타워 전망대', place: '택시로 20분', status: 'cand', slot: 's2' },
    { id: 'i12', day: 2, kind: 'act', time: '19:00', title: '나카스 포장마차 거리', place: '자리가 좁음 · 서윤이는 어려울 수도', status: 'cand', slot: 's3' },
    { id: 'i13', day: 2, kind: 'act', time: '19:00', title: '야키니쿠 타규', place: '6명 방 예약 가능', status: 'cand', slot: 's3' },

    { id: 'i14', day: 3, kind: 'move', time: '09:17', title: '특급 유후인노모리 1호', place: '하카타역 → 유후인역 11:31 · 지정석 6장', status: 'fixed', meet: true, meetTime: '08:50', meetPlace: '호텔 1층 로비' },
    { id: 'i15', day: 3, kind: 'act', time: '12:00', title: '유노쓰보 거리 점심과 산책', place: '역에서 걸어서 10분', status: 'fixed' },
    { id: 'i16', day: 3, kind: 'stay', time: '15:00', title: '료칸 산스이칸 체크인', place: '엘리베이터 있음 · 침대방 · 2박', status: 'fixed', locked: true, was: '료칸 하나무라' },
    { id: 'i17', day: 3, kind: 'act', time: '18:30', title: '료칸 가이세키 저녁', place: '숙박에 포함 · 2층 식당', status: 'fixed' },

    { id: 'i18', day: 4, kind: 'act', time: '09:30', title: '긴린코 호수 아침 산책', place: '료칸에서 걸어서 15분', status: 'cand', slot: 's4' },
    { id: 'i19', day: 4, kind: 'act', time: '09:30', title: '유후인 플로럴 빌리지', place: '서윤이가 좋아할 곳', status: 'cand', slot: 's4' },
    { id: 'i20', day: 4, kind: 'act', time: '13:00', title: '아소산 드라이브', place: '렌터카 필요 · 왕복 3시간', status: 'cand', slot: 's5' },
    { id: 'i21', day: 4, kind: 'act', time: '13:00', title: '고코노에 꿈의 현수교', place: '버스 50분 · 계단 적음', status: 'cand', slot: 's5' },
    { id: 'i22', day: 4, kind: 'act', time: '18:30', title: '료칸 저녁', place: '숙박에 포함 · 2층 식당', status: 'fixed' },

    { id: 'i23', day: 5, kind: 'move', time: '10:30', title: '유후인 → 벳푸 버스', place: '가메노이 버스 유후린 · 50분', status: 'fixed', meet: true, meetTime: '10:00', meetPlace: '료칸 현관' },
    { id: 'i24', day: 5, kind: 'act', time: '13:00', title: '벳푸 지옥 순례', place: '바다 지옥 · 가마솥 지옥 두 곳만', status: 'fixed' },
    { id: 'i25', day: 5, kind: 'stay', time: '16:00', title: '스기노이 호텔 체크인', place: '전망 온천 · 1박', status: 'fixed', locked: true },
    { id: 'i26', day: 5, kind: 'act', time: '18:30', title: '도요켄 토리텐', place: '닭튀김 원조집 · 택시 10분', status: 'cand', slot: 's6' },

    { id: 'i27', day: 6, kind: 'move', time: '09:00', title: '벳푸 → 후쿠오카공항 고속버스', place: '벳푸 기타하마 정류장 · 2시간', status: 'fixed', meet: true, meetTime: '08:30', meetPlace: '호텔 1층 로비' },
    { id: 'i28', day: 6, kind: 'move', time: '14:40', title: '후쿠오카 → 인천 비행기', place: '대한항공 KE788 · 16:10 도착', status: 'fixed', locked: true, was: '19:50 저녁 비행기' },
    { id: 'i29', day: 6, kind: 'move', time: '17:00', title: '인천공항에서 집까지', place: '준호 차 1대 · 공항 리무진 1대', status: 'fixed' }
  ],
  /* 후보가 모인 자리. by: 이 날까지 정한다 */
  slots: [
    { id: 's1', day: 1, label: '첫날 저녁 식사', by: '2026-10-10' },
    { id: 's2', day: 2, label: '둘째 날 오후', by: '2026-10-17' },
    { id: 's3', day: 2, label: '둘째 날 저녁 식사', by: '2026-10-17' },
    { id: 's4', day: 4, label: '넷째 날 오전', by: '2026-10-24' },
    { id: 's5', day: 4, label: '넷째 날 오후', by: '2026-10-24' },
    { id: 's6', day: 5, label: '다섯째 날 저녁 식사', by: '2026-10-31' }
  ],
  /* 할 일·준비물 16건: 끝남 5, 진행 8, 맡은 사람 없음 3 */
  tasks: [
    { id: 't01', title: '여권 유효기간 확인 (6명)', who: 'jh', due: '2026-08-25', done: true, kind: 'todo' },
    { id: 't02', title: '왕복 항공권 결제', who: 'jh', due: '2026-08-22', done: true, kind: 'todo' },
    { id: 't03', title: '숙소 3곳 예약', who: 'jh', due: '2026-09-05', done: true, kind: 'todo' },
    { id: 't04', title: '유후인노모리 지정석 6장 예매', who: 'mj', due: '2026-09-25', done: true, kind: 'todo' },
    { id: 't05', title: '여행자 보험 가입 (6명)', who: 'jun', due: '2026-09-28', done: true, kind: 'todo' },
    { id: 't06', title: '료칸에 침대방·어린이 식사 요청 메일', who: 'jh', due: '2026-10-15', done: false, kind: 'todo' },
    { id: 't07', title: '엔화 환전 15만 엔', who: 'mj', due: '2026-11-06', done: false, kind: 'todo' },
    { id: 't08', title: '휴대폰 데이터 로밍 신청 (부모님 2대 포함)', who: 'mj', due: '2026-11-09', done: false, kind: 'todo' },
    { id: 't09', title: '서윤이 멀미약·어린이 상비약', who: 'jun', due: '2026-11-10', done: false, kind: 'pack' },
    { id: 't10', title: '부모님 댁 공항 리무진 시간 확인', who: 'jun', due: '2026-11-11', done: false, kind: 'todo' },
    { id: 't11', title: '아버지 혈압약 6일 치와 여분 2일 치', who: 'mom', due: '2026-11-11', done: false, kind: 'pack' },
    { id: 't12', title: '온천용 작은 수건과 세면 주머니', who: 'mom', due: '2026-11-11', done: false, kind: 'pack' },
    { id: 't13', title: '오래 걸어도 편한 운동화와 얇은 패딩', who: 'dad', due: '2026-11-11', done: false, kind: 'pack' },
    { id: 't14', title: '렌터카 예약 (아소산으로 정해질 경우)', who: '', due: '2026-10-24', done: false, kind: 'todo' },
    { id: 't15', title: '국제운전면허증 발급', who: '', due: '2026-10-30', done: false, kind: 'todo' },
    { id: 't16', title: '벳푸 지옥 순례 공통 입장권 6장', who: '', due: '2026-11-05', done: false, kind: 'todo' }
  ],
  /* 변경 이력 9건: 항공 2, 숙소 2, 현지 일정 5.  news: 몇 번째 소식 묶음으로 나갔는지 (0 = 아직 안 보냄) */
  changes: [
    { id: 'c1', at: '2026-08-23', kind: 'move', text: '돌아오는 비행기', to: '11/17(화) 14:40', from: '19:50 저녁 비행기', why: '집에 밤늦게 도착하지 않도록', news: 1 },
    { id: 'c2', at: '2026-09-04', kind: 'stay', text: '유후인 숙소', to: '료칸 산스이칸', from: '료칸 하나무라', why: '계단이 많아 엘리베이터 있는 곳으로', news: 2 },
    { id: 'c3', at: '2026-09-05', kind: 'stay', text: '벳푸 1박 추가', to: '스기노이 호텔', from: '유후인 3박', why: '마지막 날 공항까지 이동이 짧아지도록', news: 2 },
    { id: 'c4', at: '2026-09-12', kind: 'act', text: '둘째 날 오전', to: '다자이후 텐만구', from: '야나가와 뱃놀이', why: '배 타고 내리기가 어려워서', news: 3 },
    { id: 'c5', at: '2026-09-13', kind: 'act', text: '벳푸 지옥 순례', to: '두 곳만 보기', from: '일곱 곳 모두', why: '걷는 거리를 줄이려고', news: 3 },
    { id: 'c6', at: '2026-09-19', kind: 'act', text: '셋째 날 점심', to: '유노쓰보 거리 점심과 산책', from: '역 앞 도시락', why: '', news: 3 },
    { id: 'c7', at: '2026-09-26', kind: 'move', text: '가는 비행기 출발 시각', to: '10:25', from: '09:10', why: '항공사 시간표 변경', news: 0, meet: true },
    { id: 'c8', at: '2026-09-26', kind: 'move', text: '인천공항 집합 시각', to: '07:40', from: '06:30', why: '비행기가 늦춰져서', news: 0, meet: true },
    { id: 'c9', at: '2026-09-28', kind: 'move', text: '유후인 가는 기차', to: '특급 유후인노모리 1호 09:17', from: '고속버스', why: '지정석 6장 예매 끝', news: 0 }
  ],
  /* 가족에게 보낸 소식 묶음 3번. seen: 읽음 표시를 누른 사람 */
  news: [
    { n: 1, at: '2026-08-23', title: '날짜와 비행기가 정해졌어요', seen: ['dad', 'mom', 'jun', 'mj'] },
    { n: 2, at: '2026-09-06', title: '숙소 세 곳을 예약했어요', seen: ['dad', 'mom', 'jun', 'mj'] },
    { n: 3, at: '2026-09-20', title: '둘째 날과 벳푸 일정이 정해졌어요', seen: ['mom', 'jun', 'mj'] }
  ],
  /* 부모·구성원이 누른 "궁금해요" */
  asks: [
    { id: 'a1', who: 'dad', slot: 's5', at: '2026-09-27' }
  ]
};
