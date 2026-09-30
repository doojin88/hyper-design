#!/usr/bin/env python3
"""shoot.py — C단계용 렌더러. brief.md "화면 목록"의 모든 경로를 두 폭으로 찍고 렌더 결과를 검사한다.

    python3 .claude/skills/oss-design-harness/scripts/shoot.py <산출물 폴더> [--out <폴더>]
    python3 .claude/skills/oss-design-harness/scripts/shoot.py <산출물 폴더> --files candidates/a.html candidates/b.html

--files 를 주면 화면 목록 대신 그 파일들(산출물 폴더 기준 상대 경로)을 찍는다. B단계 후보 비교용.

표준 라이브러리 + 설치된 Chrome/Chromium(헤드리스)만 쓴다. 스크린샷은 레포 밖 임시 폴더에 둔다.
종료 코드: 0 결함 없음 / 1 결함 있음 / 2 실행 오류(브라우저 없음 등)

렌더 검사
    render.blank      경로를 열었는데 본문 글자가 거의 없다
    render.leak       화면에 undefined · NaN · [object Object] 가 보인다
    render.duplicate  서로 다른 경로가 같은 화면을 그린다 (라우트 누락 → 첫 화면으로 떨어짐)
"""
import argparse
import glob
import hashlib
import html
import os
import re
import shutil
import socket
import subprocess
import sys
import tempfile
import time
from pathlib import Path

VIEWPORTS = {"mobile": (390, 844), "desktop": (1280, 800)}
ROUTE = re.compile(r"`(#/[^`\s]*)`")
# 헤드리스 전용 셸을 먼저 쓴다 — 일반 Chrome 은 스크린샷을 쓰고도 종료하지 않는 경우가 있다.
PLAYWRIGHT_CACHES = ["~/Library/Caches/ms-playwright", "~/.cache/ms-playwright"]
CHROME_CANDIDATES = [
    *[p for c in PLAYWRIGHT_CACHES for p in sorted(glob.glob(os.path.expanduser(
        f"{c}/chromium_headless_shell-*/*/chrome-headless-shell")), reverse=True)],
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
]


def find_chrome():
    found = next((p for p in CHROME_CANDIDATES if os.path.exists(p)), None)
    if found:
        return found
    return next((shutil.which(n) for n in ("google-chrome", "chromium", "chromium-browser", "chrome")
                 if shutil.which(n)), None)


def run_chrome(args, done, timeout=25):
    """Chrome 을 띄우고, 스스로 끝나거나 done() 이 참이 되면(또는 timeout) 정리한다. stdout 을 돌려준다."""
    with tempfile.TemporaryFile("w+", encoding="utf-8", errors="replace") as out:
        proc = subprocess.Popen(args, stdout=out, stderr=subprocess.DEVNULL)
        end = time.time() + timeout
        while proc.poll() is None and time.time() < end:
            time.sleep(0.2)
            if done():
                time.sleep(0.5)  # 파일 쓰기가 끝날 여유
                break
        if proc.poll() is None:
            proc.kill()
            proc.wait()
        out.seek(0)
        return out.read()


def screen_routes(brief):
    routes, on = [], False
    for line in brief.splitlines():
        if line.startswith("#"):
            on = "화면 목록" in line
        elif on:
            routes += [r for r in ROUTE.findall(line) if r not in routes]
    return routes


def visible_text(dom):
    dom = re.sub(r"<(script|style|template)[^>]*>.*?</\1>", " ", dom, flags=re.S | re.I)
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", dom))).strip()


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("dir")
    ap.add_argument("--out")
    ap.add_argument("--files", nargs="+")
    a = ap.parse_args()
    root = Path(a.dir).resolve()
    chrome = find_chrome()
    if not chrome:
        print("실행 오류: Chrome/Chromium 없음 — 브라우저 도구(Playwright MCP 등)로 같은 경로·폭을 직접 찍는다")
        return 2
    if a.files:
        missing = [f for f in a.files if not (root / f).exists()]
        if missing:
            print(f"실행 오류: 파일 없음 {', '.join(missing)}")
            return 2
        routes = list(a.files)
    else:
        routes = screen_routes((root / "brief.md").read_text(encoding="utf-8"))
        if not routes:
            print("실행 오류: brief.md '화면 목록'에 `#/...` 경로 없음")
            return 2

    out = Path(a.out or tempfile.mkdtemp(prefix="harness-shots-"))
    out.mkdir(parents=True, exist_ok=True)
    profile = tempfile.mkdtemp(prefix="harness-chrome-")
    with socket.socket() as s:
        s.bind(("127.0.0.1", 0))
        port = s.getsockname()[1]
    server = subprocess.Popen([sys.executable, "-m", "http.server", str(port), "--bind", "127.0.0.1"],
                              cwd=root, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    time.sleep(0.8)
    headless = [] if "headless-shell" in chrome else ["--headless=new"]
    base = [chrome, *headless, "--disable-gpu", "--hide-scrollbars", "--no-first-run",
            f"--user-data-dir={profile}", "--virtual-time-budget=4000"]
    fails, seen = [], {}
    try:
        for i, route in enumerate(routes, 1):
            url = f"http://127.0.0.1:{port}/" + (route if a.files else f"index.html{route}")
            slug = f"{i:02d}-" + (re.sub(r"[^\w가-힣]+", "-", route).strip("-") or "home")
            for vp, (w, h) in VIEWPORTS.items():
                png = out / f"{slug}.{vp}.png"
                run_chrome(base + [f"--window-size={w},{h}", f"--screenshot={png}", url],
                           done=lambda: png.exists() and png.stat().st_size > 0)
                if not png.exists():
                    fails.append(f"[FAIL] render.blank: {route} ({vp}) 스크린샷 실패")
            dom = run_chrome(base + ["--window-size=390,844", "--dump-dom", url], done=lambda: False, timeout=12)
            text = visible_text(dom)
            if len(text) < 80:
                fails.append(f"[FAIL] render.blank: {route} 본문 {len(text)}자 → 화면이 그려져야 함")
            leak = re.findall(r"\bundefined\b|\bNaN\b|\[object Object\]", text)
            if leak:
                fails.append(f"[FAIL] render.leak: {route} 에 {', '.join(sorted(set(leak)))} 노출")
            digest = hashlib.md5(text.encode()).hexdigest()
            if digest in seen:
                fails.append(f"[FAIL] render.duplicate: {route} 와 {seen[digest]} 가 같은 화면 → 라우트 확인")
            seen.setdefault(digest, route)
    finally:
        server.terminate()
        shutil.rmtree(profile, ignore_errors=True)

    for line in fails:
        print(line)
    print(f"렌더: 경로 {len(routes)}개 × 폭 {len(VIEWPORTS)}개 · FAIL {len(fails)}")
    print(f"스크린샷 폴더: {out}  (검증이 끝나면 지운다)")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
