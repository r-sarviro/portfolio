# Roman Sarviro — Портфолио

**Язык:** [EN](README.md) · [RU](README.ru.md)

Личное портфолио (HTML/CSS/JS): RU/EN, светлая/тёмная тема; GitHub Pages.

**Live:** https://r-sarviro.github.io/portfolio/

Хостинг на GitHub Pages из ветки `main` (корень). Деплой автоматический при push. Без шага сборки.

## Возможности

- Светлая / тёмная тема (сохраняется в `localStorage`, по умолчанию тёмная)
- Адаптивная вёрстка и мобильная навигация
- Скачивание и шаринг PDF-резюме (Contact)
- SEO: Open Graph, Twitter cards, JSON-LD, sitemap, hreflang
- Просмотры через [GoatCounter](https://www.goatcounter.com/) — дашборд: https://r-sarviro.goatcounter.com

## Стек

- HTML / CSS / JS (статический сайт, без бандлера)

## Требования

- Любой статический файловый сервер (или Python 3)

## Быстрый старт

```bash
python3 -m http.server 8080
```

Откройте http://localhost:8080/ (или любой static file server / Live Server).

- RU: `/` или `index.html`
- EN: `/en/`

## Структура проекта

```text
index.html          # RU-страница
en/index.html       # EN-страница
css/                # токены, base, layout, components
js/main.js          # тема, навигация, sticky header, reveal, share
assets/             # портрет, OG-обложки, PDF резюме, сертификат
favicon.svg / .ico
robots.txt
sitemap.xml
```

## Лицензия

MIT
