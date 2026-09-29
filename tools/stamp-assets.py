#!/usr/bin/env python3
"""Stamp local asset URLs in index.html with a hash of their contents.

Why this exists: the cache-busting query was hand-written as ?v=1.0.0 and
never bumped while kumo-design.css changed across three deploys. Browsers and
the Pages CDN kept serving the first version, so a correct site shipped with
its stylesheet stuck in the past — badges rendered as bare list items and the
language flags collapsed to zero width.

A hash cannot be forgotten the way a version number can: the URL changes when,
and only when, the bytes change.

Run after editing anything under assets/, before committing:

    python3 tools/stamp-assets.py
"""
import hashlib
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGE = ROOT / "index.html"

# src="./assets/x.js?v=..."  /  href="./assets/x.css?v=..."
REF = re.compile(r'((?:src|href)=")(\.?/?assets/[^"?]+\.(?:css|js))(\?v=[^"]*)?(")')


def digest(path: pathlib.Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()[:10]


def main() -> int:
    html = PAGE.read_text(encoding="utf-8")
    changed, missing = [], []

    def stamp(m):
        prefix, url, old, suffix = m.groups()
        target = ROOT / url.lstrip("./")
        if not target.is_file():
            missing.append(url)
            return m.group(0)
        new = f"?v={digest(target)}"
        if old != new:
            changed.append((url, (old or "")[3:] or "none", new[3:]))
        return f"{prefix}{url}{new}{suffix}"

    out = REF.sub(stamp, html)

    if missing:
        print("referenced but not on disk:", *missing, sep="\n  ")
        return 1

    if out != html:
        PAGE.write_text(out, encoding="utf-8")

    for url, before, after in changed:
        print(f"  {url}\n      {before} -> {after}")
    print(f"{len(changed)} asset URL(s) restamped")
    return 0


if __name__ == "__main__":
    sys.exit(main())
