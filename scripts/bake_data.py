#!/usr/bin/env python3
"""Regenerate build-time data snapshots (GitHub repo stats, GitHub profile,
Literal.club reading log). Run before `hugo` when you want fresh numbers.

Usage:  python3 scripts/bake_data.py
Needs:  Python 3 stdlib only. Optional GITHUB_TOKEN env var raises rate limit.
Outputs: data/github.json, data/user.json, data/books.json
"""
import json, os, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "data")
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
    # and org-hosted projects; key = URL slug used by the layouts)
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

    u = get("https://api.github.com/users/rajkumaar23")
    json.dump({"name": u["name"], "bio": u["bio"], "followers": u["followers"],
               "public_repos": u["public_repos"], "avatar": u["avatar_url"],
               "twitter": u.get("twitter_username"), "blog": u.get("blog")},
              open(os.path.join(DATA, "user.json"), "w"), indent=1)

    # Literal.club reading log (GraphQL, same query the shelf page uses)
    Q = ("query booksByReadingStateAndHandle($limit: Int!, $offset: Int!, $readingStatus: ReadingStatus!, $handle: String!) "
         "{ booksByReadingStateAndHandle(limit: $limit, offset: $offset, readingStatus: $readingStatus, handle: $handle) "
         "{ ...BookParts __typename } } fragment BookParts on Book { id slug title subtitle description isbn10 isbn13 language "
         "pageCount publishedDate publisher physicalFormat cover authors { ...AuthorMini __typename } gradientColors workId __typename } "
         "fragment AuthorMini on Author { id name slug __typename }")
    books = {}
    for status, key in [("IS_READING", "currentlyReading"), ("FINISHED", "finished"), ("WANTS_TO_READ", "wantToRead")]:
        body = json.dumps({"query": Q, "variables": {"handle": "rajkumaar23", "readingStatus": status, "limit": 10000, "offset": 0}}).encode()
        req = urllib.request.Request("https://api.literal.club/", data=body,
                                     headers={"Content-Type": "application/json", "User-Agent": "rk-site-bake"}, method="POST")
        d = json.load(urllib.request.urlopen(req, timeout=30))["data"]["booksByReadingStateAndHandle"]
        books[key] = [{"title": b["title"], "authors": [a["name"] for a in b["authors"]], "cover": b["cover"], "slug": b["slug"]} for b in d]
    json.dump(books, open(os.path.join(DATA, "books.json"), "w"), indent=1)
    print("baked:", len(out), "repos |", ", ".join(f"{k}={len(v)}" for k, v in books.items()))

if __name__ == "__main__":
    main()
