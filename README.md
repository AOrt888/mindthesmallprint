# Mind The Small Print

Your law blog, as a plain HTML/CSS/JS website. No build tools, no
frameworks, no account required to edit it — just files you can open in
any text editor (VS Code, Notepad, TextEdit) and a browser to preview.

## Viewing it right now

Double-click `index.html` and it opens in your browser. Every link
between pages works locally, so you can click around the whole site
before publishing anything.

## File structure

```
index.html              Homepage
articles.html            "All Articles" page with category filters + search
about.html                About page
articles/                 One HTML file per article
  tackling-premier-league-piracy.html
  bosman-ruling-at-30.html
  doping-bans-and-due-process.html
  gpt-6-astra-and-the-law.html
css/style.css              All styling — colours, fonts, layout, lives here
js/main.js                  Mobile-friendly filter/search behaviour for the Articles page
js/articles-data.js         A list of your articles' metadata (kept here so it's in one place)
assets/                     Your logo files + favicon
404.html                    Shown if someone follows a broken link
robots.txt, sitemap.xml     Small SEO helpers for search engines
```

## Editing existing content

Every page is normal HTML — open the file, find the text between the
tags, change it, save, refresh your browser. A few common edits:

- **Fix a typo in an article** — open the relevant file in `articles/`,
  find the `<p>...</p>` paragraph, edit the text inside it.
- **Change your bio or contact details** — edit `about.html`, inside the
  `.author-card` section.
- **Change colours** — open `css/style.css` and edit the values at the
  very top, under `:root { ... }` (for example `--blue: #2f6fcb;` is
  the accent colour used for badges, links and buttons throughout the
  whole site — change it once here and it updates everywhere).

## Adding a new article

There's no CMS or database — adding an article means three copy/paste
steps:

1. **Duplicate an article file.** Copy `articles/gpt-6-astra-and-the-law.html`,
   rename it to your new article's slug (e.g. `articles/unfair-dismissal-basics.html`),
   and replace the title, badge, meta line and body paragraphs with your
   own content. Keep the `<h2>`, `<p>` and `<blockquote>` tags — that's
   what gives it the article styling.
2. **Add a card to `articles.html`.** Copy one `<article class="card">...</article>`
   block, update its `data-category`, badge text/class, title, link,
   excerpt, date and read time to match your new article.
3. **Optionally add it to `index.html`** too, if you want it to show in
   the "Recent articles" section on the homepage (swap out one of the
   existing three cards, or make it the hero by editing the `.hero`
   section).

Category badge colours are already defined in `css/style.css` — reuse
one of these classes on the badge span:

| Category | CSS class |
|---|---|
| Sports Law | `category-sports` |
| Intellectual Property Law | `category-ip` |
| Media & Entertainment Law | `category-media` |
| Criminal Law | `category-criminal` |
| The Wider Legal Landscape | `category-wider` |

`js/articles-data.js` isn't required for the site to work — it's just a
single-file reference list of your articles' metadata, kept up to date
as a convenience for future editing (and for anything you build on top
of the site later, like an RSS feed).

## Publishing it for free

Once you're happy with it, two easy free options to get it live and
linkable on your CV:

**GitHub Pages** (recommended if you're open to using GitHub)
1. Create a new repository on GitHub and upload every file in this
   folder to it (keeping the folder structure).
2. In the repository, go to Settings → Pages, set the source to your
   main branch, and save.
3. GitHub gives you a live URL like `https://yourname.github.io/repo-name/`
   within a minute or two.

**Netlify Drop** (no account, no GitHub needed)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag
   this whole folder onto the page.
2. Netlify gives you a live URL immediately. You can create a free
   account afterwards to keep the site and re-deploy it later by
   dragging an updated folder on again.

Either way, once you have a real domain/URL, update the `og:image` and
`sitemap.xml` entries with your actual address so link previews and
search engines pick it up correctly — search for `example.com` in
`sitemap.xml` to find where.

## Notes

- Every article ends with a short "not legal advice" disclaimer — sensible
  to keep on a public law blog.
- Fonts (Playfair Display + Inter) load from Google Fonts via
  `css/style.css`, so the site needs an internet connection to show the
  exact fonts — it'll fall back to a similar serif/sans-serif if offline.
- The hero and article-header illustrations are plain inline SVG line
  art (no external images), so nothing to license or attribute.
