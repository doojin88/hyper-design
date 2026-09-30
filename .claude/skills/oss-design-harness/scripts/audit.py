#!/usr/bin/env python3
"""audit.py — A단계(구조적 사실) 검사기. 표준 라이브러리만 쓴다.

    python3 .claude/skills/oss-design-harness/scripts/audit.py <산출물 폴더> --prd <PRD 파일>

종료 코드: 0 결함 없음 / 1 결함 있음 / 2 실행 오류
출력 한 줄: [FAIL|WARN] <규칙 키>: 현재 → 기대

규칙 키
    files.required   index.html · brief.md · decisions.md · critique.md · prompt-log.md · elapsed.txt
    b.candidates     candidates/ 에 후보 HTML 5개 이상 (구조 3 + 무드 2)
    trace.rows       brief.md 추적표 행 수 >= PRD 목록 항목 수
    trace.screen     추적표 각 행에 화면 경로(`#/...`) 또는 "해당 없음(사유)"
    trace.route      추적표에 쓴 경로가 화면 목록에 있다
    screens.count    화면 목록 경로 수 >= --min-screens
    color.token      색 리터럴은 토큰 선언(--이름) 안에만
    type.token       font-size 리터럴은 토큰 선언 안에만
    font.family      font-family 선언 1종
    space.grid       여백 px 값은 4의 배수 (1·2px 예외)
    state.coverage   :hover · :focus-visible · disabled · empty 상태
    responsive       @media 폭 분기 존재
    js.syntax        스크립트 `node --check` 통과
    text.slop        조사 병기·lorem·빈 구호 문구 없음
    inline.style     style="" 남용 (WARN)
"""
import argparse
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

REQUIRED = ["index.html", "brief.md", "decisions.md", "critique.md", "prompt-log.md", "elapsed.txt"]
ROUTE = re.compile(r"`(#/[^`\s]*)`")
COLOR = re.compile(r"#[0-9a-fA-F]{3,8}\b|\b(?:rgb|hsl)a?\(\s*[\d.]")
SPACE_PROPS = re.compile(r"^(padding|margin|gap|row-gap|column-gap|inset|top|right|bottom|left)(-|$)")
SLOP = [
    (r"[가-힣]\s?(이\(가\)|을\(를\)|은\(는\)|와\(과\)|\(으\)로|\(이\))", "조사 병기"),
    (r"(?i)lorem ipsum", "lorem"),
    (r"지금 (바로 )?시작하세요|혁신적인|새로운 경험을", "빈 구호 문구"),
]

fails, warns = [], []


def fail(key, msg):
    fails.append(f"[FAIL] {key}: {msg}")


def warn(key, msg):
    warns.append(f"[WARN] {key}: {msg}")


def table_rows(md, heading_word):
    """heading_word 가 들어간 제목 아래 첫 표의 본문 행(셀 목록)을 돌려준다."""
    rows, on, seen_table = [], False, False
    for line in md.splitlines():
        if line.startswith("#"):
            if seen_table:
                break
            on = heading_word in line
            continue
        if not on:
            continue
        if line.strip().startswith("|"):
            seen_table = True
            cells = [c.strip() for c in line.strip().strip("|").split("|")]
            if set("".join(cells)) <= set("-: "):
                continue
            rows.append(cells)
        elif seen_table and line.strip():
            break
    return rows[1:]  # 머리글 행 제외


def prd_items(prd):
    """PRD 의 번호·불릿 목록 항목 수 (인용문 제외)."""
    return sum(1 for l in prd.splitlines() if re.match(r"^\s{0,3}(\d+\.|-)\s+\S", l))


def collect_sources(root):
    html = (root / "index.html").read_text(encoding="utf-8")
    pages = {"index.html": html}
    for p in sorted(root.rglob("*.html")):
        if p.name != "index.html" and "candidates" not in p.parts:
            pages[str(p.relative_to(root))] = p.read_text(encoding="utf-8")
    css, js = [], []
    for name, text in pages.items():
        css += re.findall(r"<style[^>]*>(.*?)</style>", text, re.S)
        js += [(name, s) for s in re.findall(r"<script(?![^>]*\bsrc=)[^>]*>(.*?)</script>", text, re.S) if s.strip()]
    for p in sorted(root.rglob("*.css")):
        if "candidates" not in p.parts:
            css.append(p.read_text(encoding="utf-8"))
    for p in sorted(root.rglob("*.js")):
        if "candidates" not in p.parts:
            js.append((str(p.relative_to(root)), p.read_text(encoding="utf-8")))
    return pages, "\n".join(css), js


def declarations(css):
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    for prop, value in re.findall(r"(?:^|[;{])\s*([\w-]+)\s*:\s*([^;{}]+)", css):
        yield prop.lower(), value.strip()


def check_css(css):
    colors, sizes, families, offgrid = [], set(), set(), []
    for prop, value in declarations(css):
        if prop.startswith("--"):
            continue  # 토큰 선언은 어디에 있든 허용
        if COLOR.search(value):
            colors.append(f"{prop}: {value}")
        if prop == "font-size" and re.search(r"[1-9]", value) and "var(" not in value and "clamp(" not in value:
            sizes.add(value)
        if prop == "font-family" and "var(" not in value and value not in ("inherit", "monospace"):
            families.add(value)
        if SPACE_PROPS.match(prop):
            for n in re.findall(r"(?<![\w.#-])-?(\d+(?:\.\d+)?)px", value):
                if float(n) % 4 and float(n) not in (1, 2):
                    offgrid.append(f"{prop}: {value}")
                    break
    if colors:
        fail("color.token", f"토큰 밖 색 리터럴 {len(colors)}건 (예: {'; '.join(colors[:3])}) → var(--토큰)")
    if sizes:
        fail("type.token", f"font-size 리터럴 {len(sizes)}종 ({', '.join(sorted(sizes)[:6])}) → var(--fs-*)")
    if len(families) > 1:
        fail("font.family", f"{len(families)}종 → 1종")
    if offgrid:
        fail("space.grid", f"4pt 밖 여백 {len(offgrid)}건 (예: {'; '.join(offgrid[:3])}) → 4의 배수")
    missing = [s for s, pat in [(":hover", r":hover"), (":focus-visible", r":focus-visible"),
                                ("disabled", r":disabled|\[disabled\]|aria-disabled")] if not re.search(pat, css)]
    if missing:
        fail("state.coverage", f"없음: {', '.join(missing)}")
    if not re.search(r"@media[^{]*(min|max)-width", css):
        fail("responsive", "@media 폭 분기 0건 → 모바일·PC 분기")


def check_js(js):
    node = shutil.which("node")
    if not node:
        warn("js.syntax", "node 없음 — 건너뜀")
        return
    for name, code in js:
        with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as f:
            f.write(code)
        r = subprocess.run([node, "--check", f.name], capture_output=True, text=True)
        Path(f.name).unlink(missing_ok=True)
        if r.returncode:
            fail("js.syntax", f"{name}: {r.stderr.strip().splitlines()[-1] if r.stderr.strip() else '구문 오류'}")


def check_trace(brief, prd, min_screens):
    screens = {r for row in table_rows(brief, "화면 목록") for r in ROUTE.findall(" ".join(row))}
    if len(screens) < min_screens:
        fail("screens.count", f"화면 목록 경로 {len(screens)}개 → {min_screens}개 이상 (`#/역할/화면` 형식, 백틱)")
    rows = table_rows(brief, "추적표")
    need = prd_items(prd) if prd else 0
    if len(rows) < max(need, 1):
        fail("trace.rows", f"추적표 {len(rows)}행 → PRD 목록 항목 {need}개 이상")
    for row in rows:
        joined = " ".join(row[2:])
        routes = ROUTE.findall(joined)
        if not routes and "해당 없음" not in joined:
            fail("trace.screen", f"{row[0]}: 화면 경로 없음 → `#/...` 또는 '해당 없음(사유)'")
        for r in routes:
            if r not in screens:
                fail("trace.route", f"{row[0]}: {r} 가 화면 목록에 없음")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("dir")
    ap.add_argument("--prd")
    ap.add_argument("--min-screens", type=int, default=8)
    a = ap.parse_args()
    root = Path(a.dir)
    if not (root / "index.html").exists():
        print(f"실행 오류: {root}/index.html 없음")
        return 2

    for name in REQUIRED:
        if not (root / name).exists():
            fail("files.required", f"{name} 없음")

    n_cand = len(list((root / "candidates").glob("*.html")))
    if n_cand < 5:
        fail("b.candidates", f"candidates/ 후보 HTML {n_cand}개 → 5개 이상 (structure-a·b·c, mood-a·b)")

    pages, css, js = collect_sources(root)
    check_css(css)
    check_js(js)

    everything = "\n".join(pages.values()) + "\n".join(code for _, code in js)
    if not re.search(r"empty", everything):
        fail("state.coverage", "empty 상태 없음 → 빈 목록마다 '무엇이 없는지 + 다음 행동'")
    for pat, label in SLOP:
        hits = re.findall(pat, everything)
        if hits:
            fail("text.slop", f"{label} {len(hits)}건")
    n_inline = len(re.findall(r"style=[\"']", everything))
    if n_inline > 25:
        warn("inline.style", f"style 속성 {n_inline}건 → 공통 클래스로")

    if (root / "brief.md").exists():
        prd = Path(a.prd).read_text(encoding="utf-8") if a.prd else ""
        check_trace((root / "brief.md").read_text(encoding="utf-8"), prd, a.min_screens)

    for line in fails + warns:
        print(line)
    print(f"A단계: FAIL {len(fails)} · WARN {len(warns)}")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
