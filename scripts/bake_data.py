#!/usr/bin/env python3
"""Regenerate the GitHub stats FALLBACK snapshot (static/data/github.json).

The site fetches live GitHub stats client-side (assets/js/gh-stats.js);
this snapshot is only used when the API is unreachable or rate-limited.
Refresh it occasionally so the fallback stays reasonable:

Usage:  python3 scripts/bake_data.py
Needs:  Python 3 stdlib only. Optional GITHUB_TOKEN env var raises rate limit.
Output: static/data/github.json
"""
import json, os, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "static", "data", "github.json")
UA = {"User-Agent": "rk-site-bake", "Accept": "application/vnd.github+json"}
if os.environ.get("GITHUB_TOKEN"):
    UA["Authorization"] = "Bearer " + os.environ["GITHUB_TOKEN"]

def get(url):
    return json.load(urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30))

def rec(r):
    return {"stars": r["stargazers_count"], "forks": r["forks_count"],
            "language": r["language"], "license": (r["license"] or {}).get("spdx_id"),
            "desc": r["description"], "topics": r.get("topics", []),
            "pushed": r["pushed_at"][:10], "url": r["html_url"],
            "homepage": r.get("homepage"), "archived": r["archived"]}

def main():
    import re, glob
    repos = get("https://api.github.com/users/rajkumaar23/repos?per_page=100&sort=pushed")
    out = {r["name"].lower(): rec(r) for r in repos}

    # Source of truth: externalUrl of every project page (handles renamed repos
    # and org-hosted projects; key = URL slug used by the gh-stats.js fallback)
    for md in glob.glob(os.path.join(ROOT, "content", "projects", "*.md")):
        t = open(md).read()
        m = re.search(r'externalUrl:\s*"https://github\.com/([^/"]+)/([^"/]+)"', t)
        if not m:
            continue
        owner, slug = m.group(1), m.group(2).lower()
        try:
            r = get(f"https://api.github.com/repos/{owner}/{m.group(2)}")
        except Exception as e:
            print("skip", owner, slug, e); continue
        e = rec(r)
        if not e["language"]:  # linguist null → /languages, prefer non-HTML primary
            langs = get(f"https://api.github.com/repos/{owner}/{m.group(2)}/languages")
            cand = [(k, v) for k, v in langs.items() if k not in ("Dockerfile", "HTML")] or list(langs.items())
            e["language"] = max(cand, key=lambda kv: kv[1])[0] if cand else None
        out[slug] = e
        out[r["name"].lower()] = e

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    json.dump(out, open(OUT, "w"), indent=1)
    print("baked fallback snapshot:", len(out), "repos ->", os.path.relpath(OUT, ROOT))

if __name__ == "__main__":
    main()
