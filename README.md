# Roman Sarviro — Portfolio

Static personal portfolio (HTML / CSS / JS). No build step.

**Live:** https://r-sarviro.github.io/portfolio/

Hosted on GitHub Pages from the `main` branch (root). Deploy is automatic on push.

## Locales

| Path                | Language |
| ------------------- | -------- |
| `/` or `index.html` | Russian  |
| `/en/`              | English  |

## Features

- Light / dark theme (persisted in `localStorage`, default dark)
- Responsive layout with mobile nav
- Resume PDF download and share (Contact)
- SEO: Open Graph, Twitter cards, JSON-LD, sitemap, hreflang
- Pageviews via [GoatCounter](https://www.goatcounter.com/) — dashboard: https://r-sarviro.goatcounter.com

## Run locally

```bash
python3 -m http.server 8080
```

Open http://localhost:8080/ (or any static file server / Live Server).

## Structure

```
index.html          # RU page
en/index.html       # EN page
css/                # tokens, base, layout, components
js/main.js          # theme, nav, scroll header, reveal, share
assets/             # portrait, OG covers, resume PDFs, certificate
favicon.svg / .ico
robots.txt
sitemap.xml
```

## Content sources

Professional facts are derived from the resume materials. Contact links and the GREEN-API certificate details match the provided personal materials.
