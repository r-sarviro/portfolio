# Roman Sarviro — Portfolio

**Language:** [EN](README.md) · [RU](README.ru.md)

Personal portfolio (HTML/CSS/JS): RU/EN, light/dark theme; GitHub Pages.

**Live:** https://r-sarviro.github.io/portfolio/

Hosted on GitHub Pages from the `main` branch (root). Deploy is automatic on push. No build step.

## Features

- Light / dark theme (persisted in `localStorage`, default dark)
- Responsive layout with mobile nav
- Resume PDF download and share (Contact)
- SEO: Open Graph, Twitter cards, JSON-LD, sitemap, hreflang
- Pageviews via [GoatCounter](https://www.goatcounter.com/) — dashboard: https://r-sarviro.goatcounter.com

## Stack

- HTML / CSS / JS (static site, no bundler)

## Requirements

- Any static file server (or Python 3)

## Quick start

```bash
python3 -m http.server 8080
```

Open http://localhost:8080/ (or any static file server / Live Server).

- RU: `/` or `index.html`
- EN: `/en/`

## Project structure

```text
index.html          # RU page
en/index.html       # EN page
css/                # tokens, base, layout, components
js/main.js          # theme, nav, scroll header, reveal, share
assets/             # portrait, OG covers, resume PDFs, certificate
favicon.svg / .ico
robots.txt
sitemap.xml
```

## License

MIT
