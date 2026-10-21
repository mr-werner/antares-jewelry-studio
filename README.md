# Antares Jewelry Studio — Blueprint WebStudio Concept

Independent, non-official redesign concept for http://antaresjewelry.com/ (Loveland, CO).
Preview: https://ajs.blueprintwebstudio.com (noindex; the demo code lives in the Neon `demos` table).

Custom build, not the shared concept layout. Content and layout are in `src/App.jsx`, styles in `src/styles.css`, and the Blueprint WebStudio concept widget in `src/concept.jsx`.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

Vercel project `antares-jewelry-studio` (framework: Vite, team mrwerner-s-projects). Pushes to `main` deploy automatically.
Domain `ajs.blueprintwebstudio.com` is a CNAME at Porkbun pointing to the target Vercel shows for this project.

Environment variables (all optional): `VITE_CONCEPT_END_DATE` (countdown end, 2026-11-25). The "I'm Interested" form posts to `api/demo-interest.js`, which proxies to the main studio site. The "Start a design or repair" form posts to `api/contact.js` (demo mode until `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` are set).

## Design

- The current site has no logo (just the theme's text title), so the concept uses a wordmark: "ANTARES" in spaced Cormorant Garamond capitals with an eight-point star mark whose center is Antares red. The favicon is the same star.
- Palette starts from the current theme's blue (#1f567d), deepened into a night-sky navy (#08131f / #0e2133), with Antares red (#d2553a) for the star and calls to action and a warm gold (#cfae6b) for metal.
- Cormorant Garamond (headings, italic accents), Jost (body), Space Mono (catalogue numbers and star-chart labels).
- Motif: Antares is the red supergiant at the heart of Scorpius. The hero is a circular star chart of Scorpius with a pulsing, glowing Antares, twinkling field stars and real coordinates (RA 16h 29m, Dec −26° 25′), with their own falcon pendant set in a round "lens". The four custom-design steps are plotted as stars on a constellation line ending in a red star, and the repair menu is a numbered "star catalogue" (AJS·01–15).
- Section order: hero star chart → contact strip (both phones, email, address) → "Many jewelers outsource. Antares doesn't." → custom design process (sketch → design → wax model → cast & finish, plus mail-in ideas) → gallery of their own pieces → repair catalogue (jewelry, stones, chains/pearls/finishing, watches) → trade-in / layaway / special orders → products + memberships + Google link → visit (contact list, map, request form) → footer.

## What changed from the current site

- Replaces the WordPress 3.9 "Big Brother" blog theme (it still shows "Proudly powered by WordPress"), whose homepage leads with a small stock wedding photo and a plain bulleted text list.
- The "Our Location" sidebar map is blank: it calls the Google Maps API without a key, so the address (1400 Falls Court) never appears as text anywhere on the site. The concept prints the address and adds a working map link.
- The navigation lists "Home" twice and in alphabetical order, with About first and Home in the middle; services are split over four thin pages (Jewelry Repair is one sentence). The concept puts everything on one page with a short nav.
- Pages load over http:// only, with `?page_id=` URLs and no meta description.
- "Special Orders" shows a bare URL (http://AntaresJewelry.jewelershowcase.com) instead of a link label; the concept gives it a proper button.
- The About page repeats every service page word for word, with small wording differences ("out source" vs "outsource").
- Adds tap-to-call buttons, a request form and a layout that works at 390px with no sideways scrolling.

## Owner should confirm

- Address: "1400 Falls Court, Loveland" appears only inside the site's map-widget code (not as visible text). Confirm it is current, and the ZIP (80538 per Yellow Pages, not used on the page).
- Hours: none are listed anywhere on the current site; the concept says "Please call ahead to confirm studio hours". Add real hours, and whether visits are by appointment.
- That the toll-free 800-647-6337 number is still in service, and the fax number (the site says ideas can be sent by fax but lists no fax number).
- That the falcon and cross pendants were made by Antares (they are on the homepage without captions), and their metals if they should be named. The wedding-ring photo looks like stock and should be replaced.
- Owner/designer name and any founding year or story to add (none appear on the current site).
- Jewelers of America and Loveland Chamber of Commerce memberships are still current (no badge images on the site; shown as text).
- Layaway terms beyond "10% down" (length, deposit refund), and trade-in rules for gold and platinum.
- Whether the jewelershowcase.com special-orders catalog is still the one to link.
- Reviews: the current site shows none, so none are quoted; the page links to a Google search only. Confirm the Google listing before adding a rating.
- Photos are their own images downloaded from antaresjewelry.com into `src/assets` (cropped scan of the cross pendant); replace with higher-resolution originals before launch.
