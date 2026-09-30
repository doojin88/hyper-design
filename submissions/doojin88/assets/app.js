/* 화면과 동작. 데이터는 data.js 의 SEED 하나이고, 역할별 화면은 같은 데이터를 다르게 그린다. */
(function () {
  'use strict';

  var BRAND = { name: '도장', line: '정해진 것만 건너가는 가족여행 수첩' };
  var KEY = 'dojang-family-trip-v3';
  var ME = { planner: 'jh', parent: 'mom', member: 'mj' };
  var WD = ['일', '월', '화', '수', '목', '금', '토'];
  var ORD = ['첫째', '둘째', '셋째', '넷째', '다섯째', '여섯째'];
  var KIND = { move: '이동', stay: '숙박', act: '활동' };
  var NAV = {
    planner: [['plan', '일정', 'cal'], ['news', '소식 보내기', 'send'], ['tasks', '할 일', 'list'], ['family', '가족 반응', 'users']],
    parent: [['home', '여행', 'cal'], ['pack', '챙길 것', 'bag'], ['news', '소식', 'bell']],
    member: [['me', '내 일정', 'cal'], ['tasks', '내 할 일', 'list'], ['news', '소식', 'bell']]
  };
  var ICON = {
    cal: 'M4 7h16v13H4zM4 11h16M8 4v4M16 4v4',
    bell: 'M6 17v-6a6 6 0 0112 0v6l2 2H4zM10 21h4',
    list: 'M9 6h11M9 12h11M9 18h11M4 6h1M4 12h1M4 18h1',
    users: 'M9 11a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6M16 4.5a3.5 3.5 0 010 6.5M18 14.5c2 .8 3.5 2.8 3.5 5.5',
    bag: 'M5 8h14l1 12H4zM9 8V6a3 3 0 016 0v2',
    move: 'M3 12l18-8-6 16-3-7z',
    stay: 'M3 18v-9M3 14h18v4M21 14v-1a3 3 0 00-3-3h-7v4M6 11h2',
    act: 'M12 21s-6-6.2-6-11a6 6 0 0112 0c0 4.8-6 11-6 11zM12 12a2 2 0 100-4 2 2 0 000 4z',
    up: 'M12 19V6M6 12l6-6 6 6',
    down: 'M12 5v13M6 12l6 6 6-6',
    edit: 'M4 20h4L19 9l-4-4L4 16zM13 7l4 4',
    lock: 'M6 11h12v9H6zM9 11V8a3 3 0 016 0v3',
    ask: 'M12 3a9 9 0 100 18 9 9 0 000-18zM9.5 9.5a2.5 2.5 0 114 2c-1 .7-1.5 1.3-1.5 2.5M12 17v.5',
    check: 'M5 12.5l4.5 4.5L19 7.5',
    plus: 'M12 5v14M5 12h14',
    next: 'M9 5l7 7-7 7',
    back: 'M15 5l-7 7 7 7',
    send: 'M4 12l16-8-6 16-3-7z',
    reset: 'M4 12a8 8 0 108-8H7M7 4L4 7l3 3',
    stamp: 'M9 4h6v4l2 6H7l2-6zM5 14h14v3H5zM5 20h14'
  };

  var app = document.getElementById('app');
  var demo = document.getElementById('demo');
  var DB = load();
  var V = DB;            /* 지금 그리는 데이터. 상태 변형(?state=)일 때는 일회용 복제본 */
  var lastHash = null;
  var UI = { edit: null, add: null, cand: null, toast: '' };

  /* ---------- 기본 도구 ---------- */
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function load() {
    try { var s = window.localStorage.getItem(KEY); if (s) return JSON.parse(s); } catch (e) { /* 저장소를 못 쓰면 메모리로만 */ }
    return clone(SEED);
  }
  function save() {
    if (V !== DB) return;
    try { window.localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) { /* 무시 */ }
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function D(s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function md(s) { var d = D(s); return (d.getMonth() + 1) + '월 ' + d.getDate() + '일(' + WD[d.getDay()] + ')'; }
  function sd(s) { var d = D(s); return (d.getMonth() + 1) + '/' + d.getDate() + '(' + WD[d.getDay()] + ')'; }
  function diff(a, b) { return Math.round((D(b) - D(a)) / 864e5); }
  function ktime(t) {
    var p = t.split(':'), h = +p[0], m = +p[1];
    if (isNaN(h) || isNaN(m)) return t;
    return (h < 12 ? '오전 ' : '오후 ') + (h % 12 === 0 ? 12 : h % 12) + '시' + (m ? ' ' + m + '분' : '');
  }
  function ic(n) { return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="' + ICON[n] + '"/></svg>'; }
  function mark(k) {
    var t = { fixed: '확정', cand: '후보', wait: '정하는 중', warn: '마감 임박', changed: '바뀜', done: '끝남' }[k];
    return '<span class="mark mark--' + k + '">' + t + '</span>';
  }
  function who(db, id) { return db.members.filter(function (m) { return m.id === id; })[0]; }
  function call(db, id) { var m = who(db, id); return m.role === 'parent' ? m.rel : m.name.slice(1); }
  function avatar(db, id) { return '<span class="avatar" aria-hidden="true">' + esc(call(db, id).slice(0, 1)) + '</span>'; }
  function dayOf(db, n) { return db.days.filter(function (d) { return d.n === n; })[0]; }
  function slotOf(db, id) { return db.slots.filter(function (s) { return s.id === id; })[0]; }
  function itemOf(db, id) { return db.items.filter(function (i) { return i.id === id; })[0]; }
  function sortItems(db) { db.items.sort(function (a, b) { return a.day - b.day || (a.time < b.time ? -1 : a.time > b.time ? 1 : 0); }); }
  function dleft(db) { return diff(db.today, db.trip.start); }
  function nights(db) { return diff(db.trip.start, db.trip.end); }
  function uid(p) { return p + Date.now().toString(36) + Math.floor(Math.random() * 1e3); }

  /* 하루를 "확정 항목"과 "후보가 모인 자리" 단위로 묶는다. 계획자와 부모 화면이 같이 쓴다 */
  function units(db, n) {
    var out = [], seen = {};
    db.items.forEach(function (it) {
      if (it.day !== n) return;
      if (it.status === 'cand') {
        if (!seen[it.slot]) { seen[it.slot] = { type: 'slot', slot: slotOf(db, it.slot), items: [], time: it.time }; out.push(seen[it.slot]); }
        seen[it.slot].items.push(it);
      } else out.push({ type: 'item', item: it, time: it.time });
    });
    return out;
  }
  function pending(db) { return db.changes.filter(function (c) { return !c.news; }); }
  function unseenNews(db, id) { return db.news.filter(function (n) { return n.seen.indexOf(id) < 0; }); }
  function changesOf(db, n) { return db.changes.filter(function (c) { return c.news === n; }); }
  function meetOf(db, n) {
    var it = db.items.filter(function (i) { return i.day === n && i.status === 'fixed' && i.meet; })[0];
    return it ? { time: it.meetTime || it.time, place: it.meetPlace || it.place, was: it.meetTime === it.time ? it.was : '' } : null;
  }
  function dueText(db, t) {
    var d = diff(db.today, t.due);
    if (d < 0) return '마감 지남 · ' + sd(t.due);
    if (d === 0) return '오늘까지';
    if (d === 1) return '내일까지';
    if (d <= 7) return d + '일 남음 · ' + sd(t.due);
    return sd(t.due) + '까지';
  }
  function urgent(db, t) { return !t.done && diff(db.today, t.due) <= 1; }
  function changeLine(c) { return c.from === '정하는 중' ? '새로 정해졌어요' : '전에는 ' + esc(c.from) + (c.why ? ' · ' + esc(c.why) : ''); }

  /* ---------- 상태를 바꾸는 행동 ---------- */
  function addChange(db, o) {
    db.changes.push({ id: uid('c'), at: db.today, kind: o.kind, text: o.text, to: o.to, from: o.from, why: o.why || '', news: 0, meet: !!o.meet });
  }
  function confirmItem(db, id) {
    var it = itemOf(db, id), slot = slotOf(db, it.slot);
    db.items = db.items.filter(function (i) { return i.slot !== it.slot || i.id === id; });
    db.slots = db.slots.filter(function (s) { return s.id !== slot.id; });
    db.asks.forEach(function (a) { if (a.slot === slot.id) a.answered = true; });
    it.status = 'fixed'; delete it.slot;
    addChange(db, { kind: it.kind, text: slot.label, to: it.title + ' ' + it.time, from: '정하는 중' });
  }
  function swapTime(db, n, idx, dir) {
    var u = units(db, n), a = u[idx], b = u[idx + dir];
    if (!a || !b || isLocked(a) || isLocked(b) || a.time === b.time) return false;
    var ta = a.time, tb = b.time;
    [[a, tb], [b, ta]].forEach(function (p) {
      (p[0].type === 'slot' ? p[0].items : [p[0].item]).forEach(function (it) {
        if (it.status === 'fixed') addChange(db, { kind: it.kind, text: it.title + ' 시각', to: p[1], from: it.time, meet: it.meet });
        else db.draftEdits++;
        it.time = p[1];
      });
    });
    sortItems(db);
    return true;
  }
  function isLocked(u) { return u.type === 'item' && u.item.locked; }
  function sendNews(db, title) {
    var n = db.news.length + 1;
    pending(db).forEach(function (c) { c.news = n; });
    db.news.push({ n: n, at: db.today, title: title, seen: [] });
    db.draftEdits = 0;
    return n;
  }
  function defaultTitle(db) {
    var p = pending(db);
    if (p.some(function (c) { return c.meet; })) return '모이는 시각이 바뀌었어요';
    if (p.some(function (c) { return c.from === '정하는 중'; })) return '새로 정해진 것이 있어요';
    return '바뀐 것을 알려요';
  }

  /* 화면 목록의 ?state= 변형. 저장하지 않는 복제본에만 적용한다 */
  function resolveAll(db) {
    db.slots.slice().forEach(function (s) {
      var first = db.items.filter(function (i) { return i.slot === s.id; })[0];
      if (first) confirmItem(db, first.id);
    });
    db.changes.forEach(function (c) { if (!c.news) c.news = 4; });
    db.news.forEach(function (n) { n.seen = ['dad', 'mom', 'jun', 'mj']; });
    db.news.push({ n: 4, at: '2026-10-31', title: '남은 일정이 모두 정해졌어요', seen: ['dad', 'mom', 'jun', 'mj'] });
    db.asks = []; db.draftEdits = 0;
  }
  function applyState(db, r) {
    var s = r.q.state;
    if (s === 'empty' && r.key === 'planner/plan') { db.items = []; db.slots = []; db.changes = []; db.news = []; db.asks = []; db.tasks = []; db.draftEdits = 0; }
    if (s === 'empty' && r.key === 'planner/news') { db.changes.forEach(function (c) { if (!c.news) c.news = 3; }); }
    if (s === 'empty' && r.key === 'parent/pack') { db.tasks.forEach(function (t) { if (t.who === 'mom') t.done = true; }); }
    if (s === 'new') { sendNews(db, defaultTitle(db)); }
    if (s === 'dday') {
      db.today = '2026-11-11'; resolveAll(db);
      db.tasks.forEach(function (t) { if (!t.who) t.who = 'jun'; t.done = !(t.id === 't12' || t.id === 't13'); });
    }
    if (s === 'due') {
      db.today = '2026-11-05'; resolveAll(db);
      db.tasks.forEach(function (t) {
        if (t.id === 't06') t.done = true;
        if (t.id === 't14' || t.id === 't15') { t.who = 'jun'; t.done = true; }
      });
    }
    return db;
  }

  /* ---------- 공통 조각 ---------- */
  function emptyBlock(title, body, btn) {
    return '<div class="empty"><span class="empty-ic">' + ic('stamp') + '</span><p class="empty-title">' + title + '</p><p class="empty-body">' + body + '</p>' + (btn || '') + '</div>';
  }
  function head(title, sub, extra) {
    return '<header class="page-head"><div><h1 class="h1">' + title + '</h1>' + (sub ? '<p class="sub">' + sub + '</p>' : '') + '</div>' + (extra || '') + '</header>';
  }
  function tripSpan(db) { return md(db.trip.start) + ' ~ ' + md(db.trip.end) + ' · ' + nights(db) + '박 ' + (nights(db) + 1) + '일'; }

  /* ---------- 계획자 ---------- */
  function fixedRow(db, u, idx, n, total) {
    var it = u.item;
    if (UI.edit === it.id) return editForm(db, it, idx, n);
    var mv = it.locked
      ? '<span class="lock" title="예약이 끝나 순서를 바꾸지 않아요">' + ic('lock') + '<span>예약 끝</span></span>'
      : moveBtns(db, n, idx, total);
    return '<li class="row">' +
      '<span class="time">' + esc(it.time) + '</span>' +
      '<div class="row-main"><p class="row-title"><span class="kind">' + ic(it.kind) + '<span class="sr">' + KIND[it.kind] + '</span></span>' + esc(it.title) + ' ' + mark('fixed') + '</p>' +
      '<p class="row-sub">' + esc(it.place) + (it.was ? ' · <span class="was">전에는 ' + esc(it.was) + '</span>' : '') + '</p></div>' +
      '<div class="row-acts">' + mv + '<button class="icon-btn" data-act="edit" data-id="' + it.id + '" aria-label="' + esc(it.title) + ' 고치기">' + ic('edit') + '</button></div></li>';
  }
  function moveBtns(db, n, idx, total) {
    var u = units(db, n);
    var upOff = idx === 0 || isLocked(u[idx - 1]), dnOff = idx === total - 1 || isLocked(u[idx + 1]);
    return '<span class="move">' +
      '<button class="icon-btn" data-act="move" data-day="' + n + '" data-idx="' + idx + '" data-dir="-1" aria-label="위로 옮기기"' + (upOff ? ' disabled' : '') + '>' + ic('up') + '</button>' +
      '<button class="icon-btn" data-act="move" data-day="' + n + '" data-idx="' + idx + '" data-dir="1" aria-label="아래로 옮기기"' + (dnOff ? ' disabled' : '') + '>' + ic('down') + '</button></span>';
  }
  function slotBlock(db, u, idx, n, total) {
    var s = u.slot, asks = db.asks.filter(function (a) { return a.slot === s.id; });
    var h = '<li class="slot"><div class="slot-head"><span class="time">' + esc(u.time) + '</span>' +
      '<div class="row-main"><p class="row-title">' + esc(s.label) + ' ' + mark('wait') + '</p>' +
      '<p class="row-sub">' + md(s.by) + '까지 정하기 · 부모님 화면에는 이 한 줄만 보여요</p></div>' +
      '<div class="row-acts">' + moveBtns(db, n, idx, total) + '</div></div>';
    if (asks.length) h += '<p class="quiet-ask">' + ic('ask') + asks.map(function (a) { return call(db, a.who); }).join('·') + '께서 이 자리를 궁금해하세요</p>';
    h += '<ul class="cands">' + u.items.map(function (it) {
      if (UI.edit === it.id) return editForm(db, it, idx, n);
      return '<li class="cand"><div class="row-main"><p class="row-title">' + esc(it.title) + ' ' + mark('cand') + '</p><p class="row-sub">' + esc(it.place) + '</p></div>' +
        '<div class="row-acts"><button class="btn btn--line btn--sm" data-act="confirm" data-id="' + it.id + '">이걸로 확정</button>' +
        '<button class="icon-btn" data-act="edit" data-id="' + it.id + '" aria-label="' + esc(it.title) + ' 고치기">' + ic('edit') + '</button></div></li>';
    }).join('') + '</ul>';
    if (UI.cand === s.id) {
      h += '<form class="form form--inline" data-form="cand" data-slot="' + s.id + '"><label class="field field--grow"><span>후보 이름</span><input class="input" name="title" required placeholder="예: 하카타 역 앞 초밥집"></label>' +
        '<div class="form-acts"><button type="button" class="btn btn--quiet btn--sm" data-act="cancel">취소</button><button class="btn btn--line btn--sm">후보로 적기</button></div></form>';
    } else h += '<button class="btn btn--quiet btn--sm" data-act="cand-open" data-slot="' + s.id + '">' + ic('plus') + '후보 더 적기</button>';
    return h + '</li>';
  }
  function editForm(db, it, idx, n) {
    var fixed = it.status === 'fixed';
    return '<li class="row row--edit"><form class="form" data-form="edit" data-id="' + it.id + '">' +
      '<label class="field"><span>시각</span><input class="input input--time" name="time" value="' + esc(it.time) + '" required pattern="[0-2][0-9]:[0-5][0-9]"></label>' +
      '<label class="field field--grow"><span>무엇을</span><input class="input" name="title" value="' + esc(it.title) + '" required></label>' +
      '<label class="field field--grow"><span>장소·메모</span><input class="input" name="place" value="' + esc(it.place) + '"></label>' +
      '<p class="hint">' + (fixed ? '확정 항목을 고치면 "가족에게 보낼 소식"에 담겨요. 바로 알림이 가지는 않아요.' : '후보를 고친 것은 가족에게 가지 않아요. 마음 편히 고치세요.') + '</p>' +
      '<div class="form-acts">' + (it.locked ? '' : '<button type="button" class="btn btn--quiet btn--sm" data-act="del" data-id="' + it.id + '">지우기</button>') +
      '<button type="button" class="btn btn--quiet btn--sm" data-act="cancel">취소</button><button class="btn btn--line btn--sm">저장</button></div></form></li>';
  }
  function addForm(n) {
    return '<form class="form form--add" data-form="add" data-day="' + n + '">' +
      '<label class="field"><span>시각</span><input class="input input--time" name="time" value="12:00" required pattern="[0-2][0-9]:[0-5][0-9]"></label>' +
      '<label class="field field--grow"><span>무엇을</span><input class="input" name="title" required placeholder="예: 유후인 역 앞 족욕"></label>' +
      '<label class="field"><span>종류</span><select class="input" name="kind"><option value="act">활동</option><option value="move">이동</option><option value="stay">숙박</option></select></label>' +
      '<label class="field"><span>상태</span><select class="input" name="status"><option value="cand">후보로 적기</option><option value="fixed">확정으로 적기</option></select></label>' +
      '<div class="form-acts"><button type="button" class="btn btn--quiet btn--sm" data-act="cancel">취소</button><button class="btn btn--line btn--sm">적기</button></div></form>';
  }
  function bundleCard(db) {
    var p = pending(db);
    if (!p.length) {
      return '<section class="card"><h2 class="h3">가족에게 보낼 소식</h2><p class="hint">지금은 보낼 것이 없어요. 확정 항목을 고치거나 후보를 확정하면 여기에 쌓여요.</p>' +
        (db.draftEdits ? '<p class="hint">후보를 더하고 고친 ' + db.draftEdits + '번은 가족에게 가지 않았어요.</p>' : '') + '</section>';
    }
    return '<section class="card card--bundle"><h2 class="h3">가족에게 보낼 소식 ' + p.length + '건</h2>' +
      '<ul class="mini">' + p.map(function (c) { return '<li><b>' + esc(c.text) + '</b><span>' + esc(c.to) + (c.from === '정하는 중' ? ' 으로 정함' : ' ← ' + esc(c.from)) + '</span></li>'; }).join('') + '</ul>' +
      (p.some(function (c) { return c.meet; }) ? '<p class="hint hint--warn">모이는 시각이 바뀌는 소식이 들어 있어요. 오래 미루지 않는 편이 좋아요.</p>' : '') +
      '<p class="hint">후보를 더하고 고친 ' + db.draftEdits + '번은 들어가지 않아요.</p>' +
      '<a class="btn btn--fill" href="#/planner/news">' + ic('send') + '소식 ' + p.length + '건 확인하고 보내기</a></section>';
  }
  function plannerPlan(db) {
    var nFixed = db.items.filter(function (i) { return i.status === 'fixed'; }).length;
    var nCand = db.items.length - nFixed;
    var legend = '<p class="legend">' + mark('fixed') + '<b>' + nFixed + '</b>' + mark('cand') + '<b>' + nCand + '</b>' + mark('wait') + '<b>' + db.slots.length + '곳</b></p>';
    var h = head('일정', tripSpan(db) + ' · 출발까지 ' + dleft(db) + '일', legend);
    h += '<div class="cols"><div class="col-main">';
    if (!db.items.length) {
      h += emptyBlock('아직 적은 일정이 없어요', '날짜는 ' + md(db.trip.start) + '부터 ' + (nights(db) + 1) + '일이 잡혀 있어요. 비행기나 숙소처럼 이미 정해진 것부터 적어 보세요. 후보로 적은 것은 부모님께 이름이 보이지 않아요.',
        UI.add === 1 ? '' : '<button class="btn btn--fill" data-act="add-open" data-day="1">' + ic('plus') + '첫 항목 적기</button>');
    }
    db.days.forEach(function (d) {
      var u = units(db, d.n);
      h += '<section class="day"><header class="day-head"><span class="day-n">' + d.n + '일째</span><h2 class="h2">' + md(d.date) + '</h2>' +
        '<span class="day-area">' + esc(d.area) + (d.sleep ? ' · 잠 ' + esc(d.sleep) : '') + '</span></header>';
      if (u.length) h += '<ul class="rows">' + u.map(function (x, i) { return x.type === 'slot' ? slotBlock(db, x, i, d.n, u.length) : fixedRow(db, x, i, d.n, u.length); }).join('') + '</ul>';
      h += UI.add === d.n ? addForm(d.n) : '<button class="btn btn--quiet btn--sm" data-act="add-open" data-day="' + d.n + '">' + ic('plus') + '이 날에 적기</button>';
      h += '</section>';
    });
    h += '</div><aside class="col-rail">' + bundleCard(db);
    var asks = db.asks.filter(function (a) { return !a.answered; });
    if (asks.length) h += '<section class="card"><h2 class="h3">조용히 온 물음 ' + asks.length + '건</h2><ul class="mini">' + asks.map(function (a) {
      var s = slotOf(db, a.slot); return '<li><b>' + call(db, a.who) + '</b><span>' + esc(s ? s.label : '') + ' · ' + sd(a.at) + '</span></li>';
    }).join('') + '</ul><a class="link" href="#/planner/family">가족 반응 보기' + ic('next') + '</a></section>';
    return h + '</aside></div>';
  }

  function parentNewsRows(db, list) {
    return '<ul class="rows">' + list.map(function (c) {
      return '<li class="row"><span class="kind kind--lg">' + ic(c.kind) + '</span><div class="row-main"><p class="row-title">' + esc(c.text) + ' <b class="to">' + esc(c.to) + '</b></p><p class="row-sub">' + changeLine(c) + '</p></div></li>';
    }).join('') + '</ul>';
  }
  function plannerNews(db) {
    var p = pending(db), recv = db.members.filter(function (m) { return m.role !== 'planner' && m.role !== 'child'; });
    var h = head('소식 보내기', '고친 것은 쌓아 두었다가, 보낼 때 한 묶음으로 알려요. 알림은 한 번만 울려요.');
    h += '<div class="cols"><div class="col-main">';
    if (!p.length) {
      h += emptyBlock('보낼 소식이 없어요', '확정 항목을 고치거나 후보를 확정하면 여기에 쌓여요.' + (db.draftEdits ? ' 후보를 더하고 고친 ' + db.draftEdits + '번은 가족에게 가지 않았어요.' : ''),
        '<a class="btn btn--fill" href="#/planner/plan">일정으로 가기</a>');
    } else {
      h += '<section class="card card--bundle"><h2 class="h2">이번에 보낼 것 ' + p.length + '건</h2>' +
        '<ul class="rows">' + p.map(function (c) {
          return '<li class="row"><span class="kind kind--lg">' + ic(c.kind) + '</span><div class="row-main"><p class="row-title">' + esc(c.text) + ' <b class="to">' + esc(c.to) + '</b>' + (c.meet ? ' ' + mark('changed') : '') + '</p>' +
            '<p class="row-sub">' + changeLine(c) + ' · ' + sd(c.at) + '에 고침</p></div></li>';
        }).join('') + '</ul>' +
        '<form class="form form--send" data-form="send"><label class="field field--grow"><span>소식 제목</span><input class="input" name="title" value="' + esc(defaultTitle(db)) + '" required></label>' +
        '<p class="hint">받는 사람 ' + recv.length + '명: ' + recv.map(function (m) { return call(db, m.id); }).join(' · ') + '. 서윤이 몫은 준호에게 가요. 후보를 더하고 고친 ' + db.draftEdits + '번은 들어가지 않아요.</p>' +
        '<button class="btn btn--fill">' + ic('send') + '소식 보내기 · 알림 1번</button></form></section>';
    }
    h += '<section class="sec"><h2 class="h2">보낸 소식 ' + db.news.length + '번</h2>';
    if (!db.news.length) h += '<p class="hint">아직 보낸 소식이 없어요.</p>';
    h += '<ul class="rows rows--card">' + db.news.slice().reverse().map(function (n) {
      var not = recv.filter(function (m) { return n.seen.indexOf(m.id) < 0; });
      return '<li class="row"><span class="time">' + n.n + '번째</span><div class="row-main"><p class="row-title">' + esc(n.title) + '</p><p class="row-sub">' + md(n.at) + ' · ' + changesOf(db, n.n).length + '건 · ' +
        (not.length ? not.map(function (m) { return call(db, m.id); }).join('·') + ' 아직 안 봄' : '모두 봤어요') + '</p></div></li>';
    }).join('') + '</ul></section></div>';
    h += '<aside class="col-rail"><section class="card"><h2 class="h3">어머니 휴대폰에는 이렇게 가요</h2><div class="preview">' +
      (p.length ? '<p class="push">' + ic('bell') + '<span><b>지현</b> ' + esc(defaultTitle(db)) + ' · ' + p.length + '가지</span></p>' + parentNewsRows(db, p)
        : '<p class="hint">보낼 소식이 생기면 여기서 미리 볼 수 있어요.</p>') +
      '</div><p class="hint">후보 이름은 어디에도 나오지 않아요.</p></section></aside></div>';
    return h;
  }

  function taskRow(db, t, opt) {
    opt = opt || {};
    var sub = (opt.showWho && t.who ? call(db, t.who) + ' · ' : '') + (t.kind === 'pack' ? '준비물' : '할 일') + ' · ' + (t.done ? '끝남' : dueText(db, t));
    var right = '';
    if (opt.assign) right = '<label class="sr" for="as-' + t.id + '">맡길 사람</label><select class="input input--sm" id="as-' + t.id + '" data-change="assign" data-id="' + t.id + '"><option value="">맡길 사람 고르기</option>' +
      db.members.filter(function (m) { return m.role !== 'child'; }).map(function (m) { return '<option value="' + m.id + '">' + call(db, m.id) + '</option>'; }).join('') + '</select>';
    if (opt.take) right = '<button class="btn btn--line btn--sm" data-act="take" data-id="' + t.id + '">내가 맡기</button>';
    var box = opt.assign || opt.take ? '<span class="box box--none" aria-hidden="true"></span>'
      : '<button class="box' + (t.done ? ' is-on' : '') + '" role="checkbox" aria-checked="' + (t.done ? 'true' : 'false') + '" data-act="toggle" data-id="' + t.id + '" aria-label="' + esc(t.title) + (t.done ? ' 끝냄 취소' : ' 끝냄 표시') + '">' + ic('check') + '</button>';
    return '<li class="row' + (t.done ? ' is-done' : '') + '">' + box + '<div class="row-main"><p class="row-title">' + esc(t.title) + (urgent(db, t) ? ' ' + mark('warn') : '') + '</p><p class="row-sub">' + sub + '</p></div>' + (right ? '<div class="row-acts">' + right + '</div>' : '') + '</li>';
  }
  function plannerTasks(db) {
    var done = db.tasks.filter(function (t) { return t.done; }), none = db.tasks.filter(function (t) { return !t.who && !t.done; });
    var h = head('할 일·준비물', db.tasks.length + '건 중 ' + done.length + '건 끝 · 맡은 사람 없음 ' + none.length + '건');
    h += '<form class="form form--inline form--bar" data-form="task"><label class="field field--grow"><span>새 할 일</span><input class="input" name="title" required placeholder="예: 부모님 여행 가방 바퀴 확인"></label><button class="btn btn--fill">' + ic('plus') + '할 일 적기</button></form>';
    if (none.length) h += '<section class="sec sec--warn"><h2 class="h2">아직 맡은 사람 없음 ' + none.length + '건</h2><p class="hint">누군가는 해야 하는 일이에요. 맡길 사람을 고르면 그 사람 화면에 바로 나타나요.</p><ul class="rows rows--card">' + none.map(function (t) { return taskRow(db, t, { assign: true }); }).join('') + '</ul></section>';
    h += '<div class="grid">';
    db.members.filter(function (m) { return m.role !== 'child'; }).forEach(function (m) {
      var mine = db.tasks.filter(function (t) { return t.who === m.id && !t.done; });
      h += '<section class="sec"><h2 class="h3 who">' + avatar(db, m.id) + call(db, m.id) + ' <span class="count">' + (mine.length ? mine.length + '건 남음' : '남은 것 없음') + '</span></h2>';
      h += mine.length ? '<ul class="rows rows--card">' + mine.map(function (t) { return taskRow(db, t); }).join('') + '</ul>' : '<p class="hint">맡은 일을 모두 끝냈어요.</p>';
      h += '</section>';
    });
    h += '</div>';
    if (done.length) h += '<section class="sec"><h2 class="h2">끝난 것 ' + done.length + '건</h2><ul class="rows rows--card">' + done.map(function (t) { return taskRow(db, t, { showWho: true }); }).join('') + '</ul></section>';
    return h;
  }

  function plannerFamily(db) {
    var asks = db.asks.filter(function (a) { return !a.answered; }), last = db.news[db.news.length - 1];
    var h = head('가족 반응', '따로 물어보지 않아도 누가 어디까지 봤는지 알 수 있어요.');
    h += '<div class="cols"><div class="col-main"><section class="sec"><h2 class="h2">조용히 온 물음 ' + asks.length + '건</h2><p class="hint">부모님이 "궁금해요"를 누르면 알림 소리 없이 여기에만 쌓여요. 그 자리를 정하면 다음 소식에 답이 담겨요.</p>';
    if (!asks.length) h += emptyBlock('온 물음이 없어요', '정하는 중인 자리마다 정하는 날짜가 부모님 화면에 적혀 있어요.', '<a class="btn btn--line" href="#/planner/plan">일정 보기</a>');
    else h += '<ul class="rows rows--card">' + asks.map(function (a, i) {
      var s = slotOf(db, a.slot);
      return '<li class="row">' + avatar(db, a.who) + '<div class="row-main"><p class="row-title">' + call(db, a.who) + ' · ' + esc(s.label) + '</p><p class="row-sub">' + sd(a.at) + '에 누름 · ' + md(s.by) + '까지 정하기로 한 자리</p></div>' +
        '<div class="row-acts"><a class="btn ' + (i === 0 ? 'btn--fill' : 'btn--line') + ' btn--sm" href="#/planner/plan">정하러 가기</a></div></li>';
    }).join('') + '</ul>';
    h += '</section></div><aside class="col-rail"><section class="sec"><h2 class="h2">소식을 어디까지 봤는지</h2>';
    if (!last) h += '<p class="hint">아직 보낸 소식이 없어요.</p>';
    else h += '<ul class="rows rows--card">' + db.members.filter(function (m) { return m.role !== 'planner' && m.role !== 'child'; }).map(function (m) {
      var seen = last.seen.indexOf(m.id) >= 0, mine = db.tasks.filter(function (t) { return t.who === m.id; });
      return '<li class="row">' + avatar(db, m.id) + '<div class="row-main"><p class="row-title">' + call(db, m.id) + ' ' + (seen ? mark('done').replace('끝남', '봤어요') : mark('wait').replace('정하는 중', '아직 안 봄')) + '</p>' +
        '<p class="row-sub">' + last.n + '번째 소식 · 준비 ' + mine.filter(function (t) { return t.done; }).length + '/' + mine.length + '건 끝</p></div></li>';
    }).join('') + '</ul><p class="hint">서윤이(7)는 앱을 쓰지 않아요. 서윤이 몫은 준호에게 가요.</p>';
    return h + '</section></aside></div>';
  }

  /* ---------- 부모 ---------- */
  function parentHome(db) {
    var left = dleft(db), news = unseenNews(db, ME.parent), mine = db.tasks.filter(function (t) { return t.who === ME.parent && !t.done; });
    var h = '<header class="hero">';
    if (left <= 1) {
      var m = meetOf(db, 1), fl = db.items.filter(function (i) { return i.day === 1 && i.locked && i.kind === 'move'; })[0];
      h += '<p class="sub">내일 떠나요 · ' + md(db.trip.start) + '</p><h1 class="h0">' + ktime(m.time) + '</h1><p class="lead">' + esc(m.place) + '에서 만나요</p>' +
        '<p class="sub">비행기는 ' + ktime(fl.time) + ' · 돌아오는 날 ' + md(db.trip.end) + '</p>';
    } else {
      h += '<p class="sub">' + esc(db.trip.name) + ' · 여섯 식구</p><h1 class="h0">출발까지 ' + left + '일</h1><p class="lead">' + md(db.trip.start) + '에 가서 ' + md(db.trip.end) + '에 와요</p>';
    }
    h += '</header>';
    var nChanges = news.reduce(function (s, n) { return s + changesOf(db, n.n).length; }, 0);
    if (news.length) h += '<a class="btn btn--fill btn--big" href="#/parent/news">' + ic('bell') + '새 소식 ' + nChanges + '가지 보기</a>';
    h += '<ul class="flow">' + db.days.map(function (d) {
      var waits = units(db, d.n).filter(function (u) { return u.type === 'slot'; }).length, dt = D(d.date);
      return '<li><a class="flow-row" href="#/parent/day?d=' + d.n + '"><span class="flow-date">' + dt.getDate() + '일<small>' + WD[dt.getDay()] + '요일</small></span>' +
        '<span class="row-main"><span class="row-title">' + esc(d.area) + '</span><span class="row-sub">' + (d.sleep ? '잠 · ' + esc(d.sleep) : '저녁에 집에 도착해요') + (waits ? ' · 정하는 중 ' + waits + '곳' : '') + '</span></span>' + ic('next') + '</a></li>';
    }).join('') + '</ul>';
    if (!news.length) h += mine.length ? '<a class="btn btn--fill btn--big" href="#/parent/pack">' + ic('bag') + '챙길 것 ' + mine.length + '가지 보기</a>' : '<p class="hint hint--center">챙길 것을 모두 챙기셨어요.</p>';
    return h;
  }
  function parentDay(db, r) {
    var n = Math.min(Math.max(parseInt(r.q.d, 10) || 1, 1), db.days.length), d = dayOf(db, n), u = units(db, n), m = meetOf(db, n);
    var waits = u.filter(function (x) { return x.type === 'slot'; });
    var asked = waits.length && waits.every(function (x) { return db.asks.some(function (a) { return a.who === ME.parent && a.slot === x.slot.id; }); });
    var h = '<a class="link link--back" href="#/parent/home">' + ic('back') + '여행 전체</a>' +
      '<header class="hero hero--sm"><p class="sub">' + ORD[n - 1] + ' 날 · ' + esc(d.area) + '</p><h1 class="h1">' + md(d.date) + '</h1>' +
      '<p class="lead">' + (d.sleep ? esc(d.sleep) + '에서 자요' : '저녁에 집에 도착해요') + '</p>' +
      (m ? '<p class="meet">' + ktime(m.time) + '에 ' + esc(m.place) + '에서 모여요</p>' : '') + '</header>';
    h += '<ul class="rows">' + u.map(function (x) {
      if (x.type === 'slot') return '<li class="row row--wait"><span class="time">' + ktime(x.time).split(' ')[0] + '</span><div class="row-main"><p class="row-title">' + esc(x.slot.label) + ' ' + mark('wait') + '</p><p class="row-sub">' + md(x.slot.by) + '까지 정해요</p></div></li>';
      var it = x.item;
      return '<li class="row"><span class="time">' + ktime(it.time) + '</span><div class="row-main"><p class="row-title">' + esc(it.title) + '</p><p class="row-sub">' + esc(it.place) + (it.was ? ' · <span class="was">전에는 ' + esc(it.was) + '</span>' : '') + '</p></div></li>';
    }).join('') + '</ul>';
    if (waits.length) {
      h += asked ? '<button class="btn btn--line btn--big" disabled>' + ic('check') + '지현이에게 전했어요</button><p class="hint hint--center">정해지면 소식으로 알려 드려요.</p>'
        : '<button class="btn btn--fill btn--big" data-act="ask" data-day="' + n + '">' + ic('ask') + '정하는 중인 곳이 궁금해요</button><p class="hint hint--center">누르면 지현이에게 조용히 전해져요. 글을 쓰지 않아도 돼요.</p>';
    }
    h += '<div class="pager">' + (n > 1 ? '<a class="btn btn--line" href="#/parent/day?d=' + (n - 1) + '">' + ic('back') + '이전 날</a>' : '<span></span>') +
      (n < db.days.length ? '<a class="btn btn--line" href="#/parent/day?d=' + (n + 1) + '">다음 날' + ic('next') + '</a>' : '<span></span>') + '</div>';
    return h;
  }
  function parentPack(db) {
    var mine = db.tasks.filter(function (t) { return t.who === ME.parent; }), leftMine = mine.filter(function (t) { return !t.done; });
    var others = db.tasks.filter(function (t) { return t.who !== ME.parent && !t.done; });
    var h = '';
    if (!leftMine.length) {
      h += emptyBlock('챙길 것이 남지 않았어요', '맡으신 ' + mine.length + '가지를 모두 챙기셨어요. 새로 챙길 것이 생기면 여기에 나타나요.', '<a class="btn btn--fill btn--big" href="#/parent/home">여행 일정 보기</a>');
    } else {
      h += '<header class="hero hero--sm"><p class="sub">어머니가 맡으신 것만 모았어요</p><h1 class="h1">챙길 것 ' + leftMine.length + '가지</h1></header>';
    }
    h += '<ul class="rows rows--check">' + mine.map(function (t) {
      return '<li class="row' + (t.done ? ' is-done' : '') + '"><button class="box box--big' + (t.done ? ' is-on' : '') + '" role="checkbox" aria-checked="' + (t.done ? 'true' : 'false') + '" data-act="toggle" data-id="' + t.id + '" aria-label="' + esc(t.title) + (t.done ? ' 챙김 취소' : ' 챙겼어요') + '">' + ic('check') + '</button>' +
        '<div class="row-main"><p class="row-title">' + esc(t.title) + '</p><p class="row-sub">' + (t.done ? '챙겼어요' : md(t.due) + '까지') + '</p></div></li>';
    }).join('') + '</ul>';
    h += '<p class="hint hint--center">나머지 ' + others.length + '가지는 다른 식구들이 나눠 맡았어요. 신경 쓰지 않으셔도 돼요.</p>';
    return h;
  }
  function pastNews(db, skip) {
    var list = db.news.filter(function (n) { return skip.indexOf(n) < 0; }).reverse();
    if (!list.length) return '';
    return '<section class="sec"><h2 class="h3">지난 소식</h2><ul class="rows">' + list.map(function (n) {
      return '<li class="row"><div class="row-main"><p class="row-title">' + esc(n.title) + '</p><p class="row-sub">' + md(n.at) + ' · ' + changesOf(db, n.n).length + '가지</p></div></li>';
    }).join('') + '</ul></section>';
  }
  function parentNews(db) {
    var news = unseenNews(db, ME.parent), h = '';
    if (!news.length) {
      var next = db.slots.map(function (s) { return s.by; }).sort()[0];
      h += emptyBlock('새 소식이 없어요', '정해지는 것이 생기면 지현이가 한꺼번에 알려 드려요.' + (next ? ' 가장 가까운 정하는 날은 ' + md(next) + '이에요.' : ''), '<a class="btn btn--fill btn--big" href="#/parent/home">여행 일정 보기</a>');
    } else {
      var list = []; news.forEach(function (n) { list = list.concat(changesOf(db, n.n)); });
      var lastN = news[news.length - 1];
      h += '<header class="hero hero--sm"><p class="sub">지현이가 ' + md(lastN.at) + '에 보낸 소식</p><h1 class="h1">바뀐 것 ' + list.length + '가지</h1></header>' + parentNewsRows(db, list) +
        '<button class="btn btn--fill btn--big" data-act="seen">' + ic('check') + '다 봤어요</button><p class="hint hint--center">누르면 지현이가 따로 묻지 않아도 보셨다는 것을 알아요.</p>';
    }
    return h + pastNews(db, news);
  }

  /* ---------- 동행 구성원 ---------- */
  function memberMe(db) {
    var left = dleft(db), m = meetOf(db, 1), mine = db.tasks.filter(function (t) { return t.who === ME.member && !t.done; });
    var soon = mine.slice().sort(function (a, b) { return a.due < b.due ? -1 : 1; })[0];
    var h = '<header class="hero"><p class="sub">' + (left <= 1 ? '내일 가야 할 곳' : '다음에 가야 할 곳 · 출발까지 ' + left + '일') + '</p><h1 class="h0">' + esc(m.time) + '</h1>' +
      '<p class="lead">' + md(db.trip.start) + ' · ' + esc(m.place) + '</p>' + (m.was ? '<p class="sub"><span class="was">전에는 ' + esc(m.was) + '</span> · 비행기 시각이 바뀌어서</p>' : '') + '</header>';
    h += mine.length ? '<a class="btn btn--fill btn--big" href="#/member/tasks">' + ic('list') + '내 할 일 ' + mine.length + '건 · 가까운 마감 ' + sd(soon.due) + '</a>' : '<p class="hint hint--center">맡은 일을 모두 끝냈어요.</p>';
    h += '<section class="sec"><h2 class="h3">날마다 모이는 시각과 장소</h2><ul class="rows">' + db.days.map(function (d) {
      var mt = meetOf(db, d.n), u = units(db, d.n), waits = u.filter(function (x) { return x.type === 'slot'; });
      var fixed = u.filter(function (x) { return x.type === 'item' && !x.item.meet; }).slice(0, 2).map(function (x) { return x.item.time + ' ' + x.item.title; });
      if (waits.length) fixed.push('정하는 중 ' + waits.length + '곳');
      return '<li class="row"><span class="time">' + (mt ? esc(mt.time) : '미정') + '</span><div class="row-main"><p class="row-title">' + sd(d.date) + ' ' + (mt ? esc(mt.place) : '모이는 시각 정하는 중') + '</p><p class="row-sub">' + esc(fixed.join(' · ')) + '</p></div></li>';
    }).join('') + '</ul></section>';
    return h;
  }
  function memberTasks(db) {
    var mine = db.tasks.filter(function (t) { return t.who === ME.member; }), todo = mine.filter(function (t) { return !t.done; }), done = mine.filter(function (t) { return t.done; });
    var none = db.tasks.filter(function (t) { return !t.who && !t.done; }), hot = todo.filter(function (t) { return urgent(db, t); });
    var h = '<header class="hero hero--sm"><p class="sub">민재가 맡은 것만 모았어요 · 끝낸 것 ' + done.length + '건</p><h1 class="h1">내 할 일 ' + todo.length + '건</h1>' +
      (hot.length ? '<p class="meet">' + dueText(db, hot[0]) + ' 끝내야 하는 것이 ' + hot.length + '건 있어요</p>' : '') + '</header>';
    h += todo.length ? '<ul class="rows">' + todo.map(function (t) { return taskRow(db, t); }).join('') + '</ul>'
      : emptyBlock('남은 할 일이 없어요', '맡은 ' + mine.length + '건을 모두 끝냈어요.', '<a class="btn btn--line" href="#/member/me">내 일정 보기</a>');
    if (none.length) h += '<section class="sec sec--warn"><h2 class="h3">아직 맡은 사람 없음 ' + none.length + '건</h2><ul class="rows">' + none.map(function (t) { return taskRow(db, t, { take: true }); }).join('') + '</ul></section>';
    if (done.length) h += '<section class="sec"><h2 class="h3">끝낸 것 ' + done.length + '건</h2><ul class="rows">' + done.map(function (t) { return taskRow(db, t); }).join('') + '</ul></section>';
    return h;
  }
  function memberNews(db) {
    var news = unseenNews(db, ME.member);
    var h = '<header class="hero hero--sm"><p class="sub">지현이가 묶어서 보낸 소식 ' + db.news.length + '번</p><h1 class="h1">' + (news.length ? '안 본 소식 ' + news.length + '번' : '모두 확인했어요') + '</h1></header>';
    if (news.length) h += '<button class="btn btn--fill btn--big" data-act="seen">' + ic('check') + '확인했어요</button>';
    db.news.slice().reverse().forEach(function (n) {
      var isNew = news.indexOf(n) >= 0;
      h += '<section class="sec"><h2 class="h3">' + n.n + '번째 · ' + esc(n.title) + (isNew ? ' ' + mark('changed').replace('바뀜', '새 소식') : '') + '</h2><p class="hint">' + md(n.at) + '</p><ul class="rows">' + changesOf(db, n.n).map(function (c) {
        return '<li class="row"><span class="kind kind--lg">' + ic(c.kind) + '</span><div class="row-main"><p class="row-title">' + esc(c.text) + ' <b class="to">' + esc(c.to) + '</b></p><p class="row-sub">' + changeLine(c) + '</p></div></li>';
      }).join('') + '</ul></section>';
    });
    return h;
  }

  /* ---------- 소개 ---------- */
  function intro() {
    var steps = [
      ['#/planner/plan', '지현이 후보를 확정한다', '첫날 저녁 후보 둘 중 하나에서 "이걸로 확정"을 누릅니다. 보낼 소식이 3건에서 4건이 됩니다.'],
      ['#/planner/news', '소식을 한 묶음으로 보낸다', '"소식 보내기"를 누르면 알림은 한 번만 울립니다. 후보를 고친 14번은 들어가지 않습니다.'],
      ['#/parent/home', '어머니가 새 소식을 본다', '첫 화면에 "새 소식 4가지 보기"가 생깁니다. 다 읽고 "다 봤어요"를 누릅니다.'],
      ['#/parent/day?d=4', '어머니가 미정인 날을 궁금해한다', '넷째 날은 두 곳이 정하는 중입니다. 글을 쓰지 않고 "궁금해요" 한 번만 누릅니다.'],
      ['#/planner/family', '지현이 묻지 않고 확인한다', '누가 소식을 봤는지, 누가 어느 자리를 궁금해하는지 조용히 쌓여 있습니다.'],
      ['#/member/tasks', '민재가 남은 일을 맡는다', '맡은 사람 없는 할 일에서 "내가 맡기"를 누르면 계획자 화면에도 민재 몫으로 옮겨집니다.'],
      ['#/parent/home?state=dday', '출발 전날', '어머니 첫 화면의 가장 큰 글자가 모이는 시각과 장소로 바뀝니다.']
    ];
    var roles = [
      ['#/planner/plan', '계획자', '박지현 · 첫째 · 38', '노트북과 휴대폰', '후보를 마음 편히 적고 고칩니다. 확정한 것만 골라 한 묶음으로 알립니다.', [['#/planner/plan', '일정'], ['#/planner/news', '소식 보내기'], ['#/planner/tasks', '할 일·준비물'], ['#/planner/family', '가족 반응']]],
      ['#/parent/home', '부모', '김순자 · 어머니 · 65', '휴대폰만', '묻지 않아도 언제 어디로 가는지 한 화면에서 봅니다. 글자 입력이 없습니다.', [['#/parent/home', '여행'], ['#/parent/day?d=4', '하루 보기'], ['#/parent/pack', '챙길 것'], ['#/parent/news', '소식']]],
      ['#/member/me', '동행 구성원', '박민재 · 둘째 · 33', '휴대폰', '내가 언제 어디에 있어야 하는지, 무엇을 맡았는지만 봅니다.', [['#/member/me', '내 일정'], ['#/member/tasks', '내 할 일'], ['#/member/news', '소식']]]
    ];
    var states = [['#/planner/plan?state=empty', '계획자 · 일정이 비어 있을 때'], ['#/planner/news?state=empty', '계획자 · 보낼 소식이 없을 때'], ['#/parent/news?state=new', '부모 · 새 소식이 왔을 때'], ['#/parent/pack?state=empty', '부모 · 다 챙겼을 때'], ['#/parent/home?state=dday', '부모 · 출발 전날'], ['#/member/me?state=dday', '구성원 · 출발 전날'], ['#/member/tasks?state=due', '구성원 · 마감이 임박했을 때']];
    return '<div class="intro">' +
      '<header class="intro-hero"><div><p class="eyebrow">부모 세대와 함께 가는 가족여행 계획</p><h1 class="h0">' + BRAND.name + '<span class="brand-line">' + BRAND.line + '</span></h1>' +
      '<p class="lead">자녀가 연필로 적고 고치는 후보는 자녀에게만 보입니다. 도장을 찍어 확정한 것만 부모에게 건너가고, 아직 연필인 자리는 "언제 정해지는지"만 건너갑니다.</p>' +
      '<p class="intro-cta"><a class="btn btn--fill" href="#/planner/plan">계획자 화면부터 보기' + ic('next') + '</a></p></div>' +
      '<div class="intro-art" aria-hidden="true"><div class="art-page"><p class="art-line">' + mark('fixed') + '<span>10:25 인천 → 후쿠오카 비행기</span></p><p class="art-line">' + mark('fixed') + '<span>15:00 호텔 닛코 후쿠오카</span></p><p class="art-line art-line--cand">' + mark('cand') + '<span>모츠나베 오오야마 본점</span></p><p class="art-line art-line--cand">' + mark('cand') + '<span>우동 타이라</span></p><p class="art-cap">지현의 수첩</p></div>' +
      '<div class="art-page"><p class="art-line">' + mark('fixed') + '<span>오전 10시 25분 비행기</span></p><p class="art-line">' + mark('fixed') + '<span>호텔 닛코 후쿠오카에서 자요</span></p><p class="art-line art-line--cand">' + mark('wait') + '<span>저녁 식사 · 10월 10일까지 정해요</span></p><p class="art-cap">어머니의 휴대폰</p></div></div></header>' +

      '<section class="intro-sec"><h2 class="h2">서로 배려하다가 생기는 일</h2><div class="grid grid--2">' +
      '<blockquote class="quote"><p>이번 여행이 어떻게 되어 가는지 궁금하지만, 자꾸 캐묻는 게 미안해서 참는다.</p><cite>부모 · 50~70대</cite></blockquote>' +
      '<blockquote class="quote"><p>아직 다 정해지지 않았는데 자주 알리면 부모님이 신경 쓰실까 봐 조심스럽다.</p><cite>자녀 · 20~40대</cite></blockquote></div>' +
      '<p class="lead">양쪽 다 참다가 정작 필요한 순간에 정보가 건너가지 않습니다. ' + BRAND.name + '은 세 가지 장치로 이 침묵을 풉니다.</p>' +
      '<ol class="devices"><li><b>후보는 계획자에게만, 부모에게는 날짜만</b><span>부모 화면에는 후보 이름이 나오지 않습니다. 그 자리에는 "정하는 중 · 10월 10일까지 정해요" 한 줄만 있습니다. 묻기 전에 답이 와 있습니다.</span></li>' +
      '<li><b>고치는 것과 알리는 것을 나눈다</b><span>후보는 몇 번을 고쳐도 알림이 가지 않습니다. 확정 항목이 바뀐 것만 쌓였다가, 계획자가 보낼 때 한 묶음으로 한 번 울립니다.</span></li>' +
      '<li><b>말 대신 누르는 "궁금해요"와 "다 봤어요"</b><span>부모는 글을 쓰지 않고 한 번 눌러 궁금함을 전하고, 자녀는 되묻지 않고도 부모가 봤는지 압니다.</span></li></ol></section>' +

      '<section class="intro-sec"><h2 class="h2">누가 쓰나요</h2><p class="sub">같은 일정을 세 사람이 서로 다르게 봅니다. 데모 가족은 여섯 식구, 규슈 5박 6일(2026년 11월 12일 목요일 ~ 17일 화요일)입니다.</p><div class="grid grid--3">' +
      roles.map(function (r) {
        return '<article class="card role-card"><p class="eyebrow">' + r[1] + '</p><h3 class="h3">' + r[2] + '</h3><p class="sub">' + r[3] + '</p><p>' + r[4] + '</p><ul class="chips">' +
          r[5].map(function (l) { return '<li><a class="chip" href="' + l[0] + '">' + l[1] + '</a></li>'; }).join('') + '</ul></article>';
      }).join('') + '</div></section>' +

      '<section class="intro-sec"><h2 class="h2">순서대로 따라가 보기</h2><p class="sub">한 사람이 누른 것이 다른 사람 화면에 나타납니다. 화면 맨 위 "시연용" 막대로 사람을 바꿀 수 있습니다.</p><ol class="steps">' +
      steps.map(function (s, i) { return '<li><a class="step" href="' + s[0] + '"><span class="step-n">' + (i + 1) + '</span><span class="row-main"><span class="row-title">' + s[1] + '</span><span class="row-sub">' + s[2] + '</span></span>' + ic('next') + '</a></li>'; }).join('') + '</ol></section>' +

      '<section class="intro-sec"><h2 class="h2">특별한 순간의 화면</h2><ul class="chips">' + states.map(function (s) { return '<li><a class="chip" href="' + s[0] + '">' + s[1] + '</a></li>'; }).join('') + '</ul></section></div>';
  }

  /* ---------- 틀 ---------- */
  var ROUTES = {
    'planner/plan': plannerPlan, 'planner/news': plannerNews, 'planner/tasks': plannerTasks, 'planner/family': plannerFamily,
    'parent/home': parentHome, 'parent/day': parentDay, 'parent/pack': parentPack, 'parent/news': parentNews,
    'member/me': memberMe, 'member/tasks': memberTasks, 'member/news': memberNews
  };
  /* PC 폭에서 휴대폰 화면 옆에 두는 시연 설명. 제품 화면이 아니다 */
  var NOTES = {
    'parent/home': ['어머니 김순자 님(65)의 휴대폰', ['스크롤하지 않고 여섯 날의 "어디에 있고 어디서 자는지"가 다 보입니다.', '후보 이름은 나오지 않고 "정하는 중 몇 곳"만 보입니다.', '날짜를 누르면 그 하루로 한 번에 갑니다.']],
    'parent/day': ['어머니 김순자 님(65)의 휴대폰', ['정해진 것은 시각과 장소로, 미정인 자리는 정하는 날짜로 보입니다.', '"궁금해요"는 글을 쓰지 않는 한 번 누르기입니다. 계획자에게 조용히 쌓입니다.']],
    'parent/pack': ['어머니 김순자 님(65)의 휴대폰', ['어머니가 맡은 것만 나옵니다. 남의 할 일은 섞이지 않습니다.', '네모를 누르면 계획자의 "가족 반응"에 바로 반영됩니다.']],
    'parent/news': ['어머니 김순자 님(65)의 휴대폰', ['바뀐 것은 새 값과 이전 값이 함께 보입니다.', '"다 봤어요"를 누르면 자녀가 되묻지 않아도 확인했다는 것을 압니다.']],
    'member/me': ['둘째 박민재 님(33)의 휴대폰', ['가장 큰 글자는 다음에 가야 할 시각과 장소입니다.', '날마다 모이는 시각과 장소가 한 줄씩 정리됩니다.']],
    'member/tasks': ['둘째 박민재 님(33)의 휴대폰', ['내가 맡은 것만 나옵니다.', '"내가 맡기"를 누르면 맡은 사람 없는 일이 내 몫이 되고, 계획자 화면에도 옮겨집니다.']],
    'member/news': ['둘째 박민재 님(33)의 휴대폰', ['부모 화면과 같은 소식을 더 촘촘하게, 묶음마다 펼쳐서 봅니다.']]
  };
  function navHtml(r) {
    return NAV[r.role].map(function (n) {
      var on = n[0] === r.screen || (r.screen === 'day' && n[0] === 'home');
      return '<a class="nav-link' + (on ? ' is-on' : '') + '" href="#/' + r.role + '/' + n[0] + '"' + (on ? ' aria-current="page"' : '') + '>' + ic(n[2]) + '<span>' + n[1] + '</span></a>';
    }).join('');
  }
  function shell(r, body) {
    var toast = UI.toast ? '<div class="toast" role="status">' + UI.toast + '</div>' : '';
    if (r.role === 'planner') {
      return '<div class="shell"><nav class="nav nav--side" aria-label="계획자 메뉴"><p class="brand">' + ic('stamp') + BRAND.name + '</p><p class="nav-trip">' + esc(V.trip.name) + '<small>' + sd(V.trip.start) + ' ~ ' + sd(V.trip.end) + '</small></p>' +
        '<div class="nav-links">' + navHtml(r) + '</div><p class="nav-me">' + avatar(V, 'jh') + '<span>박지현<small>계획을 짜는 사람</small></span></p></nav><main class="main">' + body + '</main>' + toast + '</div>';
    }
    var note = NOTES[r.key];
    return '<div class="stage"><aside class="note"><p class="note-tag">시연 설명</p><p class="note-who">' + note[0] + '</p><ul>' + note[1].map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></aside>' +
      '<div class="phone' + (r.role === 'parent' ? ' phone--big' : '') + '"><main class="main">' + body + '</main>' + toast + '<nav class="nav nav--tabs" aria-label="메뉴">' + navHtml(r) + '</nav></div></div>';
  }
  function demoBar(r) {
    var links = [['', '소개', '#/'], ['planner', '계획자', '#/planner/plan'], ['parent', '부모', '#/parent/home'], ['member', '구성원', '#/member/me']];
    demo.innerHTML = '<span class="demo-tag">시연용</span><span class="demo-links">' + links.map(function (l) {
      return '<a href="' + l[2] + '"' + ((r.role || '') === l[0] ? ' class="is-on" aria-current="true"' : '') + '>' + l[1] + '</a>';
    }).join('') + '</span><button data-act="reset" aria-label="처음 상태로 되돌리기">' + ic('reset') + '<span>처음 상태로</span></button>';
  }
  function parse() {
    var h = (window.location.hash || '#/').slice(1), i = h.indexOf('?'), path = i < 0 ? h : h.slice(0, i), q = {};
    if (i >= 0) h.slice(i + 1).split('&').forEach(function (kv) { var p = kv.split('='); q[p[0]] = decodeURIComponent(p[1] || ''); });
    var parts = path.split('/').filter(Boolean);
    return { role: parts[0] || '', screen: parts[1] || '', key: parts.join('/'), q: q, full: h };
  }
  function render() {
    var r = parse();
    if (r.full !== lastHash) {
      V = r.q.state ? applyState(clone(DB), r) : DB;
      UI.edit = UI.add = UI.cand = null; UI.toast = '';
      window.scrollTo(0, 0);
      lastHash = r.full;
    }
    document.body.className = 'role-' + (r.role || 'intro');
    demoBar(r);
    if (!r.key) app.innerHTML = intro();
    else if (ROUTES[r.key]) app.innerHTML = shell(r, ROUTES[r.key](V, r));
    else app.innerHTML = '<div class="intro">' + emptyBlock('없는 화면이에요', '주소 ' + esc('#' + r.full) + ' 에 해당하는 화면이 없어요.', '<a class="btn btn--fill" href="#/">소개로 가기</a>') + '</div>';
    document.title = BRAND.name + ' — ' + BRAND.line;
  }
  function done(msg) { UI.toast = msg || ''; save(); render(); }

  /* ---------- 이벤트 ---------- */
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el || el.disabled) return;
    var act = el.getAttribute('data-act'), id = el.getAttribute('data-id'), r = parse();
    if (act === 'reset') {
      try { window.localStorage.removeItem(KEY); } catch (err) { /* 무시 */ }
      DB = clone(SEED); lastHash = null; render(); UI.toast = '처음 상태로 되돌렸어요'; render(); return;
    }
    if (act === 'edit') { UI.edit = id; UI.add = UI.cand = null; return done(); }
    if (act === 'cancel') { UI.edit = UI.add = UI.cand = null; return done(); }
    if (act === 'add-open') { UI.add = +el.getAttribute('data-day'); UI.edit = UI.cand = null; return done(); }
    if (act === 'cand-open') { UI.cand = el.getAttribute('data-slot'); UI.edit = UI.add = null; return done(); }
    if (act === 'confirm') { var t = itemOf(V, id).title; confirmItem(V, id); return done('"' + esc(t) + '" 확정. 보낼 소식에 담았어요. 알림은 아직 가지 않았어요.'); }
    if (act === 'move') { var ok = swapTime(V, +el.getAttribute('data-day'), +el.getAttribute('data-idx'), +el.getAttribute('data-dir')); return done(ok ? '순서를 바꾸고 시각을 맞바꿨어요.' : ''); }
    if (act === 'del') {
      var it = itemOf(V, id); V.items = V.items.filter(function (i) { return i.id !== id; });
      if (it.status === 'cand') { V.draftEdits++; if (!V.items.some(function (i) { return i.slot === it.slot; })) V.slots = V.slots.filter(function (s) { return s.id !== it.slot; }); }
      else addChange(V, { kind: it.kind, text: it.title, to: '빠졌어요', from: it.time + ' ' + it.title });
      UI.edit = null; return done('지웠어요.');
    }
    if (act === 'toggle') { var tk = V.tasks.filter(function (x) { return x.id === id; })[0]; tk.done = !tk.done; return done(tk.done ? '끝냄으로 표시했어요. 지현이 화면에도 반영돼요.' : ''); }
    if (act === 'take') { V.tasks.filter(function (x) { return x.id === id; })[0].who = ME.member; return done('민재 몫으로 옮겼어요. 계획자 화면에도 반영돼요.'); }
    if (act === 'seen') { V.news.forEach(function (n) { if (n.seen.indexOf(ME[r.role]) < 0) n.seen.push(ME[r.role]); }); return done('지현이에게 확인했다고 전했어요.'); }
    if (act === 'ask') {
      units(V, +el.getAttribute('data-day')).forEach(function (u) {
        if (u.type === 'slot' && !V.asks.some(function (a) { return a.who === ME.parent && a.slot === u.slot.id; })) V.asks.push({ id: uid('a'), who: ME.parent, slot: u.slot.id, at: V.today });
      });
      return done('지현이에게 조용히 전했어요.');
    }
  });
  document.addEventListener('submit', function (e) {
    var f = e.target.closest('[data-form]');
    if (!f) return;
    e.preventDefault();
    var kind = f.getAttribute('data-form'), val = function (n) { return f.elements[n] ? f.elements[n].value.trim() : ''; };
    if (kind === 'edit') {
      var it = itemOf(V, f.getAttribute('data-id')), time = val('time'), title = val('title');
      if (it.status === 'fixed' && (time !== it.time || title !== it.title)) {
        addChange(V, { kind: it.kind, text: time !== it.time ? it.title + ' 시각' : it.title, to: time !== it.time ? time : title, from: time !== it.time ? it.time : it.title, meet: it.meet });
        it.was = time !== it.time ? it.time : it.title;
        if (it.meetTime && it.meetTime === it.time) it.meetTime = time;
      } else if (it.status === 'cand') V.draftEdits++;
      it.time = time; it.title = title; it.place = val('place');
      sortItems(V); UI.edit = null;
      return done(it.status === 'fixed' ? '고쳤어요. 보낼 소식에 담았어요.' : '고쳤어요. 후보라서 가족에게 가지 않아요.');
    }
    if (kind === 'cand') {
      var s = f.getAttribute('data-slot'), first = V.items.filter(function (i) { return i.slot === s; })[0];
      V.items.push({ id: uid('i'), day: first.day, kind: first.kind, time: first.time, title: val('title'), place: '', status: 'cand', slot: s });
      sortItems(V); V.draftEdits++; UI.cand = null;
      return done('후보로 적었어요. 가족에게는 가지 않아요.');
    }
    if (kind === 'add') {
      var n = +f.getAttribute('data-day'), st = val('status'), item = { id: uid('i'), day: n, kind: val('kind'), time: val('time'), title: val('title'), place: '', status: st };
      if (st === 'cand') {
        var slot = { id: uid('s'), day: n, label: ORD[n - 1] + ' 날 ' + val('time') + ' 무렵', by: V.slots.length ? V.slots[V.slots.length - 1].by : '2026-10-31' };
        V.slots.push(slot); item.slot = slot.id; V.draftEdits++;
      } else addChange(V, { kind: item.kind, text: ORD[n - 1] + ' 날에 더함', to: item.time + ' ' + item.title, from: '정하는 중' });
      V.items.push(item); sortItems(V); UI.add = null;
      return done(st === 'cand' ? '후보로 적었어요. 부모님께는 "정하는 중"으로만 보여요.' : '확정으로 적었어요. 보낼 소식에 담았어요.');
    }
    if (kind === 'send') { var num = sendNews(V, val('title')); return done(num + '번째 소식을 보냈어요. 가족 화면에 새 소식으로 나타나요.'); }
    if (kind === 'task') { V.tasks.push({ id: uid('t'), title: val('title'), who: '', due: '2026-11-11', done: false, kind: 'todo' }); return done('적었어요. 맡을 사람을 골라 주세요.'); }
  });
  document.addEventListener('change', function (e) {
    var el = e.target.closest('[data-change="assign"]');
    if (!el || !el.value) return;
    V.tasks.filter(function (x) { return x.id === el.getAttribute('data-id'); })[0].who = el.value;
    done(call(V, el.value) + ' 몫으로 맡겼어요. 그 사람 화면에 바로 나타나요.');
  });
  window.addEventListener('hashchange', render);
  render();
})();
