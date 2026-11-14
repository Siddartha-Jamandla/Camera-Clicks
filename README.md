# Camera Clicks — fixed & rebuilt (14 Nov 2026)

A photography website: categories, galleries, services and camera
equipment, with a working booking form. Open `index.html` in any
browser, or upload the whole folder to any static host (GitHub Pages,
Netlify, …). No build step, no server, no external dependencies.

## What was broken — and what was fixed

| Problem found | Fix |
|---|---|
| No homepage: `index.html` did not exist, and `home.html` redirected to it | Built a full homepage — hero, categories, galleries, services, about, booking form |
| 13 of the 17 linked pages were missing (all 5 categories, Nature / HD Wallpapers / Beach, Modelling / Event / Fashion shoots, Tripods / Studio Equipment) | Created all 13, with real copy and every available photo used |
| `css/styles.css` and `js/script.js` were linked on every page but did not exist — the site had no styling and no behaviour at all | Wrote a complete professional stylesheet and script (see below) |
| 17 broken image links across the 4 surviving pages | Fixed every one: wrong extensions corrected (`w3.jfif` → `w3.jpg`, `w6.jfif` → `w6.jpg`, `w8.jfif` → `w8.jpg`, `w9.jfif` → `w9.avif`, `w1.jpg`/`w5.jpg`/`w10.jpg`/`w12.jpeg` → the matching real files) |
| 8 image slots pointed at files that never existed (Lenses 13–14, Lighting 7–9, 14, 16–17) | Removed those empty slots instead of showing broken images — Lenses now shows its 22 real photos, Lighting its 18 |
| Wedding page referenced 4 photos that do not exist in any form (`w1.jpg`, `w5.jpg`, `w10.jpg`, `w12.jpeg`) | Gallery now shows the 7 real wedding photos; no flower photos were substituted in |
| `wildlife9.jpg` was a 0-byte (empty) file | Removed |
| `n8.jfif` was a byte-for-byte duplicate of `n4.jfif` | Removed the duplicate; the photo still appears once, in Nature |
| 132 of the 193 photos were never shown anywhere | Every usable photo is now on a page — 189 gallery photos in total |
| No contact/booking route — only a phone number in the footer | Added a Contact page + booking form on the home and contact pages (saves in the browser, then sends via WhatsApp; see below) |
| No SEO, sitemap, 404 page or favicon wiring | Added per-page titles/descriptions, Open Graph tags, `sitemap.xml`, `robots.txt`, `404.html`, and JSON-LD business data on the home page |
| Copyright said 2025 | Now uses the current year automatically |
| Tiny thumbnail images would have been stretched full-width | Gallery uses a fixed aspect-ratio grid with `object-fit: cover`, so small images stay sharp |
| “Potrait” / “Fasions” misspellings | Visible text corrected to Portrait / Fashion (original file names kept, so no links break) |

## What was added

- `css/styles.css` — full design system: dark header with gold accent,
  responsive navigation with dropdowns, hero, cards, gallery grid,
  lightbox styles, forms, footer, mobile layout, reduced-motion support.
- `js/script.js` — mobile menu, dropdown menus (mouse, touch and
  keyboard), a full lightbox (click, arrows, Escape, prev/next), a
  broken-image safety net, and the booking form.
- `index.html` — homepage. `contact.html` — contact + booking.
  `404.html` — styled not-found page. `sitemap.xml`, `robots.txt`.
- Booking form: validates name / phone / service, saves the request in
  the browser (localStorage), and builds a pre-filled WhatsApp message
  to 89190 02486. There is no server and no email address in the
  project, so nothing is sent until the visitor taps WhatsApp or calls.

## File map

```
index.html            home (hero, categories, galleries, services, about, booking)
maggie1–5.html        Categories: Portrait, Landscape, Fashion, Wildlife, Macro
a1–a4.html            Galleries: Flowers, Nature, HD Wallpapers, Beach
prem.html             Modelling Shoots        prem2.html  Wedding Commercial
prem3.html            Public Event Coverage   prem4.html  Fashion Shoots
v1sub.html            Tripods & Stabilisation v2sub.html  Lenses
v3sub.html            Lighting                v4sub.html  Studio Equipment
contact.html          Contact + booking form  404.html    Not-found page
home.html             Redirect to index.html (kept from the original)
css/styles.css        js/script.js            images/     562 photographs
sitemap.xml           robots.txt              README.md   this file
```

## Known limits (honest notes)

- Most source photos are small thumbnails (many under 400 px wide).
  They display fine at gallery size, but for print or a real
  “HD Wallpapers” offer, replace them with the full-resolution originals.
- The two `.avif` photos (`w9.avif`, `puppy.avif`) need a modern browser.
- Bookings are not stored on a server — a visitor must tap WhatsApp or
  call to actually reach the studio. To take bookings online properly,
  connect the form to a form service or a small backend later.
- No prices are listed anywhere, because the original project had none.
  Add them only when the studio confirms them — do not guess.
- No email address is shown, because the original project had none.
  The only contact on file is the phone number 89190 02486.
