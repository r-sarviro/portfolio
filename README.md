# Roman Sarviro — Portfolio

Static personal portfolio (HTML / CSS / JS) for GitHub Pages.

**Live (after Pages is enabled):** https://r-sarviro.github.io/portfolio/

## Locales

| Path | Language |
|------|----------|
| `/` or `index.html` | Russian |
| `/en/` | English |

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

1. Push this repository to `https://github.com/r-sarviro/portfolio.git`
2. Settings → Pages → Source: **Deploy from a branch**
3. Branch: `main` / folder: `/` (root)
4. Wait for the Pages build; site will be at `https://r-sarviro.github.io/portfolio/`

No build step is required.

## Content sources

Professional facts are derived from the resume materials. Contact links and the GREEN-API certificate details match the provided personal materials.
