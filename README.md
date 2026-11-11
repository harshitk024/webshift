# Webshift

Portfolio and business site for Webshift, an independently operated web design and development studio.

Tagline: **Better websites. Better business opportunities.**

The site is a studio presence for local businesses — not a personal résumé and not a large-agency pitch. Concept projects are labelled as concepts. No testimonials, statistics, or personal credentials are invented.

## Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS 4
- Motion for React
- React Router
- Lucide React

## Scripts

```bash
npm install
npm run dev      # local preview
npm run build    # typecheck and production build
npm run preview  # serve the production build
```

Do not deploy without permission.

## Structure

```
src/
  components/     shared UI, mockups, form, chrome
  sections/       homepage sections
  pages/          routes
  data/           projects, services, process, FAQ
  config/         contact details and brand strings
  styles/         Tailwind theme and global CSS
public/           favicon, Open Graph image, sitemap, robots
```

Design decisions live in `DESIGN_SPEC.md`.

## React Bits Pro

The shadcn registry configuration is in `components.json`. It registers both React Bits Pro registries and resolves the authorization token from `REACTBITS_LICENSE_KEY`.

1. Copy `.env.example` to `.env.local`.
2. Replace the placeholder with your React Bits Pro license key. Keep `.env.local` local; it is ignored by Git.
3. From the project root, install the Tailwind variant:

```bash
npx shadcn@latest add @reactbits-starter/gradient-carousel-tw
```

The project has the `@` source alias and a shared `cn` helper ready for registry components. The CLI reports the installed component path; import from that generated path when wiring it into a section.

## Configure before launch

Edit `src/config/site.ts`:

- `contact.email`
- `contact.whatsapp` (digits only, country code, no `+`) and `whatsappDisplay`
- `founderLabel` if a public name should appear
- `socials[].href` — empty links are not rendered
- `url` if the production domain is not `webshift.studio`

Also update the canonical URL, Open Graph URL, `public/sitemap.xml`, and `public/robots.txt` if the domain changes.

## Contact form

The form validates in the browser and then opens the visitor’s mail app with a `mailto:` draft (Prepare email). It does **not** submit to a server and does not pretend to.

To make submission work without a mail app:

1. Add a form endpoint (for example Formspree, Getform, or a small serverless function).
2. Point the form `action` or a `fetch` in `src/components/ContactForm.tsx` at that endpoint.
3. Keep the email and WhatsApp links as fallbacks.
4. Do not claim the message was delivered until the endpoint returns success.

WhatsApp and email links are live as soon as `site.ts` has real values. The floating WhatsApp button uses the same config.

## SEO

- Title and description are set in `index.html` and updated per route by `PageMeta`.
- Open Graph tags and `public/og.svg` are included.
- `public/sitemap.xml` and `public/robots.txt` list the public routes.
- JSON-LD for a `ProfessionalService` is rendered from the homepage meta component.

## Motion

Hero headlines mask in on load. The mockup cluster floats and tilts slightly with the pointer on fine-pointer devices. Buttons pull toward the cursor within a short radius. Section content fades up once.

All of this is disabled or reduced under `prefers-reduced-motion`. Touch devices skip the magnetic and tilt behaviour. There is no WebGL scene.

## Concept work

| Project | Industry | Route |
| --- | --- | --- |
| Jaswant Telecom | Mobile repair | `/work/jaswant-telecom` |
| Northline Air | Home services / AC repair | `/work/northline-air` |
| Helio Field Solar | Renewable energy | `/work/helio-field-solar` |

Mockups are built in code so they stay sharp. They are studies, not client deliveries.
