# Roman Sarviro — Portfolio

Static personal portfolio (HTML / CSS / JS) for GitHub Pages.

**Live (after Pages is enabled):** https://r-sarviro.github.io/portfolio/

## Locales

| Path                | Language |
| ------------------- | -------- |
| `/` or `index.html` | Russian  |
| `/en/`              | English  |

## Run locally

From this directory:

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080/

Or use any static file server / Live Server.

## Structure

```
index.html          # RU page
en/index.html       # EN page
css/                # design tokens + layout + components
js/main.js          # nav, scroll header, reveal + reduced motion
assets/             # portrait and media
favicon.svg
robots.txt
sitemap.xml
```

## GitHub Pages

Code is on `main`. Enable hosting once:

1. Open https://github.com/r-sarviro/portfolio/settings/pages
2. **Source:** Deploy from a branch
3. **Branch:** `main` / folder: `/` (root) → Save
4. Site URL: https://r-sarviro.github.io/portfolio/

No build step is required.

## Content sources

Professional facts are derived from the resume materials. Contact links and the GREEN-API certificate details match the provided personal materials.
