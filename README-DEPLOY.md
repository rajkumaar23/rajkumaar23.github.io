# rajkumaar.co.in — reimagined (Congo theme retained)

Hugo site on the **Congo theme v2.14.0** (`colorScheme = "congo"`), reimagined
with a custom layer that uses only Congo's own design tokens.

## Preview locally
Unzip `rk-site-preview.zip`, then in that folder:

    python3 -m http.server 8080

Open http://localhost:8080 (don't double-click index.html — SRI integrity
checks require a same-origin http:// context).

## Deploy
`rk-site-deploy.zip` is the production build (baseURL `https://rajkumaar.co.in/`) —
drop its contents into your GitHub Pages repo / `public/` artifact.

## Source (this repo layout)
Build: `hugo --gc --minify` (Hugo extended ≥ 0.164, Go ≥ 1.20 for the Congo module).
No pre-build step needed — all live data is fetched in the browser:

- **Project stats** (stars/forks/language): `assets/js/gh-stats.js` hits
  `api.github.com` at page load (1 request per owner, 10-min sessionStorage
  cache) and re-sorts the grid by live stars. If the API is unreachable or
  rate-limited it falls back to the committed snapshot `static/data/github.json`.
  Refresh that snapshot occasionally (optional): `python3 scripts/bake_data.py`
- **Books shelf**: `layouts/books/single.html` queries the Literal.club GraphQL
  API live at page load.

## What's custom (everything else is stock Congo)
| Area | File |
|---|---|
| Custom homepage (aurora hero, typing terminal, CTA) | `layouts/_partials/home/custom.html` + `config: homepage.layout = "custom"` |
| Design system on Congo tokens (`--color-primary-*` etc.) | `assets/css/custom.css` |
| Scroll reveal + terminal typing (no layout shift, reduced-motion aware) | `assets/js/site.js` |
| Live GitHub stats hydration + snapshot fallback | `assets/js/gh-stats.js`, `static/data/github.json` |
| Card partials + fingerprinted asset hook | `layouts/_partials/rk/*`, `extend-head.html` |
| Project grid, post card grid (cover + gradient placeholder), about timeline, 404 | `layouts/{projects,posts,about}/list.html`, `404.html` |
| Hand-written config data (language colors, terminal script, timeline) | `data/` |

Mobile: grids collapse 3→2→1 at 960/620 px, hero/decorations have a 640 px
path, no horizontal overflow (audited at 390×844). Dark mode follows Congo's
appearance switcher; no extra fonts or JS deps.
