# Jeyajothi D — Portfolio

A single-page portfolio for Jeyajothi D, Full Stack Developer from Madurai, India, drawn in a hand-sketched style: marker headings, notebook paper, sticky notes, tape and wobbly pencil borders.

Built with React, Vite, Tailwind CSS 4, GSAP (ScrollTrigger) with Lenis smooth scrolling, and lucide-react. No backend: it builds to static files you can host on Vercel, Netlify or any static host.

## Run it locally

You need Node.js 20 or newer.

```bash
npm install
```

```bash
npm run dev
```

Open http://localhost:5173. The page reloads as you save.

```bash
npm run build
```

```bash
npm run preview
```

`build` writes the finished site to `dist/`, and `preview` serves that folder at http://localhost:4173 so you can check the production version.

## Edit the content

Every word on the site lives in **`src/data/portfolio.js`**. You never need to open a component to change text.

| To change | Edit in `portfolio.js` |
| --- | --- |
| Name, role, tagline, location, email, social links | `profile` |
| Browser tab title, search description, social preview | `site` |
| Navbar links and the Resume button label | `nav` |
| "Hello, I'm", typing words, buttons, the "start here!" note, the notebook | `hero` |
| The zoom heading, the circled word, bio, polaroid caption, quick facts | `about` |
| The stack diagram: boxes, arrow labels, the pinned Tools note | `skills` |
| Jobs and internships | `experience.items` |
| Projects and filter tabs | `projects.items`, `projects.filters` |
| Degrees | `education.items` |
| Contact text, the "say hi!" note, form labels, Formspree ID | `contact` |
| Footer line | `footer` |

**Placeholders.** Anything written in `[SQUARE BRACKETS]` is a placeholder. It shows on the page in yellow highlighter with a red dashed underline until you replace it. Search the file for `[` to find them all.

**Add a project.** Copy one object in `projects.items` and fill it in:

```js
{
  title: 'Task Board',
  description: 'A drag-and-drop task board with real-time sync for small teams.',
  tags: ['React', 'Node.js', 'Socket.io'],
  category: 'Full Stack',            // must match one of projects.filters
  image: '/projects/task-board.jpg', // put the file in public/projects/ (16:9 works best)
  liveUrl: 'https://task-board.vercel.app',
  codeUrl: 'https://github.com/jeyajothi08/task-board',
},
```

With `image: ''` the card shows a pencil-hatched stand-in. A link left as a `[PLACEHOLDER]` shows a dashed, greyed-out circle, so there are no dead links.

**The stack diagram (Skills).** Groups are drawn in order as boxes joined by arrows: Frontend → Backend → Database. `skills.flowLabels` are the words written on those arrows. A group with `pinned: true` (AI & ML, Tools) is stuck to the sheet as a post-it instead. The `icon` can be `frontend`, `backend`, `database`, `tools` or `ai`; to use another, import it from `lucide-react` in `src/components/Skills.jsx` and add it to the `icons` map.

**Add a job.** Add an object to `experience.items`. When `end` is `'Present'`, its timeline dot pulses.

### Files in `public/`

| File | What to do |
| --- | --- |
| `profile.jpg` | Your photo in the polaroid (portrait, 800×1000). If it is ever removed, the polaroid shows a "JD" sketch instead. Restart `npm run dev` after replacing it. |
| `resume.pdf` | Your resume. Replace it with a newer one any time and keep the same name; visitors download it as `Jeyajothi_D_Resume.pdf` (set in `profile.resumeDownloadName`). |
| `og-image.png` | The 1200×630 image shown when the link is shared on LinkedIn, WhatsApp and similar apps. |
| `favicon.svg` | The hand-drawn "JD" browser-tab icon. |

### Contact form (Formspree)

1. Create a free form at [formspree.io](https://formspree.io).
2. Copy its ID: the part after `/f/` in the endpoint, e.g. `xyzabcde`.
3. Set `contact.formspreeId: 'xyzabcde'` in `portfolio.js`.

Until the ID is set, pressing **Send message** opens the visitor's email app with the message already written, and a small highlighted note under the form says so.

### Site address

After the first deploy, set `site.url` to your live address, e.g. `'https://jeyajothi.vercel.app'`. Link previews and the canonical URL use it. The title, description and Open Graph tags are written into `index.html` at build time from `site` and `profile`.

> Saving `portfolio.js` makes the dev server restart for a moment, because it also builds the `<head>` tags from that file. This is expected.

## The design system

All colours, radii and shadows are defined once, at the top of **`src/index.css`**, and every component uses them through Tailwind classes:

| Token | Value | Tailwind class |
| --- | --- | --- |
| Paper (background) | `#fdfbf7` | `bg-paper` |
| Pencil (text, borders) | `#2d2d2d` | `text-ink`, `border-ink` |
| Soft pencil (secondary text) | `#5a5a5a` | `text-ink-soft` |
| Old paper | `#e5e0d8` | `bg-muted` |
| Red marker (strokes, circles, tacks) | `#ff4d4d` | `text-marker`, `bg-marker` |
| Red marker, pressed hard (red text, red fills behind white text) | `#cc2b2b` | `text-marker-ink`, `bg-marker-ink` |
| Blue ballpoint | `#2d5da1` | `text-pen`, `bg-pen` |
| Post-it | `#fff9c4` | `bg-postit` |
| Wobbly edges | irregular `border-radius` | `rounded-wobbly`, `rounded-wobbly-md`, `rounded-blob` |
| Hard offset shadows | `4px 4px 0` (and `2px`, `8px`) | `shadow-sketch`, `shadow-sketch-sm`, `shadow-sketch-lg` |

The bright marker red `#ff4d4d` only reaches 3.2:1 against paper, which fails WCAG AA for text. It is kept for drawn marks, and red text and red buttons use the deeper `#cc2b2b` (5.3:1).

Fonts: **Kalam** (headings, like a felt-tip marker) and **Patrick Hand** (body), from Google Fonts.

Reusable pieces live in `src/components/ui/`:

- `Sketch.jsx`: `SketchButton` (presses flat on click), `StickyNote`, `RoughCircle`, `Tape`, `Tack`, `CornerMarks`
- `Doodles.jsx`: `Underline`, `CircleScribble`, `Arrow`, `FlowArrow`, `Squiggle`, `Star`, `Loop`, `Tick`
- `Reveal.jsx`: drops content onto the page as it scrolls into view

## Motion

- **Smooth scrolling** uses Lenis, driven by GSAP's ticker so the scroll scenes stay in step. Native scrolling is kept underneath, so keyboard scrolling, sticky sections and `#anchor` links all work. Anchor links glide to their section and stop below the navbar.
- **Hero:** on load the post-it is stuck on, the name is written and underlined, and the notebook drops onto the desk. As you scroll away, the notebook comes forward (scroll to zoom).
- **About (scroll to zoom):** "Building beyond the code" starts far too big for the screen and settles to size while the section is held in place, then "beyond" gets circled in marker.
- **Skills (scroll to expand):** a small tilted sheet grows to fill the screen, then the stack boxes are dealt onto it, the arrows draw themselves and the Tools post-it is stuck on.
- **Everywhere else:** sections drop in as they arrive, the experience timeline is drawn down in marker as you scroll, project cards are dealt like cards and re-dealt when you change the filter, and a red marker line under the navbar fills as you read.

The two held scenes only run on screens at least 1280px wide and 640px tall. On phones and tablets the same sections show as normal stacked content with lighter animations.

With "reduce motion" turned on in the operating system, smooth scrolling is off, nothing is held or zoomed, and all content is simply there.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new), sign in with GitHub and import the repository.
3. Vercel detects Vite on its own. The settings should read:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Click **Deploy**. Every push to the main branch redeploys the site.
5. Copy the live URL into `site.url` in `portfolio.js`, then commit and push.

Or deploy from the terminal with the Vercel CLI:

```bash
npx vercel --prod
```

## Deploy to Netlify

`netlify.toml` already sets the build command (`npm run build`) and publish folder (`dist`). Import the repository at [app.netlify.com](https://app.netlify.com/start), or run `npm run build` and drag the `dist` folder onto the Netlify dashboard.

## Project structure

```
public/                 favicon, Open Graph image, resume, robots.txt (and your profile.jpg)
src/
  data/portfolio.js     all site content (edit this)
  components/           Navbar, Hero, About, Skills, Experience, Projects, Education, Contact, Footer
  components/ui/        sketch pieces, doodles, scroll reveal, section heading, placeholder highlight, brand icons
  lib/gsap.js           GSAP setup and the media conditions for the scenes
  lib/hooks.js          smooth scroll, active section, typing effect, reduced-motion check
  index.css             design tokens, fonts, paper textures
index.html              page shell
vite.config.js          builds the <head> SEO tags from portfolio.js
```

## Quality notes

- Lighthouse on the production build: performance 91–96 on simulated mobile (it varies with how fast Google Fonts answers) and 96–97 on desktop, with 100 for accessibility, best practices and SEO.
- No horizontal scrolling at any width from 360px up.
- Semantic sections with headings, alt text, a skip link, dashed blue focus rings, and a mobile menu that works by keyboard (Escape closes it and returns focus to the button).
