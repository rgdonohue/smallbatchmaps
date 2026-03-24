# MIGRATION.md

Analysis of current site vs. POSITIONING.md, with a minimum-change plan to reach the target content hierarchy.

---

## 1. Stack Inventory

| Layer | Current | POSITIONING.md Target |
|---|---|---|
| Framework | Vanilla HTML/CSS/JS | Astro, Hugo, or equivalent |
| Styling | Hand-written CSS + custom properties | Tailwind |
| Build | None (open index.html directly) | Implicit build step |
| Deployment | GitHub Pages (CNAME) | Netlify or Vercel |
| Icons | Phosphor Icons (CDN) | — |
| Fonts | Google Fonts (Playfair, Inter, JetBrains Mono) | — |
| Contact form | Web3Forms | — |
| Maps | None currently embedded | MapLibre GL JS |

**Stack migration is a separate track.** The content changes can be done on the existing vanilla stack first and ported later. A rebuild into Astro/Tailwind before the content is right is premature. Recommendation: fix content now, migrate stack later if performance or authoring friction demands it.

---

## 2. Page / Route Structure

| File | Purpose |
|---|---|
| `index.html` | Single-page application — all sections |
| `agentic-workflows.html` | Deep-dive AI workflows case study (linked from services card) |
| `cvs/donohue-cv-dec-2024.md` | CV (not linked from nav) |

No routing library. Navigation is smooth-scroll anchors within `index.html`.

---

## 3. Content Inventory

### Sections in current `index.html`

| Section | Anchor | Nav link |
|---|---|---|
| Hero | `#hero` | (logo) |
| Services | `#services` | Services |
| Projects | `#projects` | Projects |
| About | `#about` | About |
| Experience | `#experience` | Experience |
| Contact | `#contact` | Contact |

### Copy

- **Hero title:** "Small Batch Maps"
- **Hero subtitle:** "Fast, transparent geospatial tooling for climate, public health, and conservation teams."
- **Services subtitle:** "AI-enhanced spatial workflows, guided by care & domain expertise"
- **Three service cards:** Geospatial Data Science · Web Cartography · AI-Assisted Workflows (each has long expandable detail)
- **Six project cards:** WHO Dashboard · Satellite Embeddings · FlowFinder · Cartographic Style Editor · MBTiles Viewer · Ghost Forest Watcher
- **About:** Three paragraphs (PhD background, open to full-time/contract, personal/outdoors)
- **Experience:** Two accordion entries — University of Kentucky (2014–2024), WHO (2015–2020)

### Images

| File | Current use | Keep? |
|---|---|---|
| `logo-point-2.png` | Nav + hero compass rose | Yes |
| `richard.png` | About section headshot | Yes |
| `who-dashboard.png` / `who-map.png` | Experience section | Conditional (WHO not in homepage case studies) |
| `phm.png` | Web Cartography expansion | Conditional |
| `tilecraft-small.png` | AI-Assisted Workflows card | No — Tilecraft is anti-goal |
| `mockup-geodatascience.png` | Geo Data Science card | Conditional |
| `workflow.png` / `web-cartography*.png` / `map*.png` | Service expansions | Conditional |

### JavaScript

- `script.js` — 773 lines, SBM namespace
- Behaviors: mobile menu, smooth scroll, service card expansion, experience accordion, form validation, Web3Forms submit, intersection observer animations, parallax, active nav highlighting

---

## 4. Keep vs. Conflicts

### Keep (no changes needed)

- Brand palette (terracotta/sage/teal/cream) and typography tokens
- Logo and compass rose graphic
- Mobile hamburger menu behavior
- Smooth scroll + active nav highlighting
- Form validation logic + Web3Forms integration
- Intersection Observer fade-in animations
- Footer copy
- CSS custom properties system

### Conflicts with POSITIONING.md

| Current | Problem | Required change |
|---|---|---|
| Hero subtitle references "AI-enhanced" | Anti-goal: no AI-first positioning | Rewrite hero copy |
| Hero has two CTA buttons | Not in content hierarchy | Simplify to one CTA or remove |
| Services section (expandable cards) | Not in content hierarchy; "AI-Assisted Workflows" as a featured service violates anti-goal | Remove section entirely |
| AI-Assisted Workflows card deep-dive + TileCraft case study | Anti-goals: no AI-first, no Tilecraft | Remove |
| `agentic-workflows.html` linked from main nav area | Same anti-goal | De-link (keep file, don't promote) |
| 6 project cards (none match the 3 specified) | "Three on the homepage, period"; wrong projects | Replace with 3 specified case studies |
| About: 3 paragraphs + "open to full-time" | "Two sentences of background, not a CV" | Rewrite to 2 sentences |
| Experience section (CV-style accordion) | Not in content hierarchy | Remove section |
| Nav: Services · Projects · About · Experience · Contact | Services and Experience being removed | Update nav links |
| No "How I work" section | Missing from required content hierarchy | Add new section |
| Three specified case studies have no images or copy yet | CTA Penguin Detection, Isodistance Coverage, TAVA Route Finder need content | New content required |

---

## 5. Migration Plan

### Phase 0 — Content prep (do before touching code)

Before writing any HTML, gather or draft:

1. **CTA Penguin Detection** — screenshot or rendered map image, 1–2 sentence description, tech stack tags (LiDAR, thermal, drone)
2. **Isodistance Coverage Mapping** — screenshot or embedded demo URL, 1–2 sentence description, tech tags (OpenRouteService, web mapping)
3. **TAVA Route Finder** — screenshot or demo URL, 1–2 sentence description, tech tags (elevation, routing, geospatial engineering)
4. **Hero copy** — one sentence what you do, one sentence who it's for (see draft below)
5. **About copy** — two sentences, no CV language
6. **How I work copy** — 3–5 sentences on open-source, transparent, lightweight

Draft hero copy to work from:
> *"I build custom geospatial tools — data pipelines, interactive web maps, and spatial analysis — for organizations that need maps done right."*
> *"Conservation teams, public health agencies, and research groups hire me when they have a spatial data problem and no in-house GIS developer."*

---

### Phase 1 — Content migration on existing stack

Work entirely within `index.html`, `styles.css`, `script.js`. No new dependencies.

**Step 1.1 — Update `<head>`**
- Rewrite `<title>` and `<meta name="description">` to reflect positioning (remove "AI assist" from description)

**Step 1.2 — Rewrite hero**
- Replace subtitle with the two-sentence what+who copy
- Remove "AI-enhanced" language
- Reduce to one CTA button: "See my work" → scrolls to `#work`

**Step 1.3 — Remove Services section**
- Delete the entire `#services` section from `index.html`
- Remove the "Services" nav link
- Delete the service card expansion JS logic from `script.js` (reduces by ~150 lines)
- Delete service-related CSS rules from `styles.css`

**Step 1.4 — Replace Projects section with Selected Work**
- Rename `#projects` → `#work`, update nav link from "Projects" → "Work"
- Replace 6 project cards with 3 case study cards (CTA Penguin, Isodistance, TAVA)
- Each card: project image, title, 1–2 sentence description, tech tags, link (GitHub or demo)
- Reuse existing card CSS — structure is compatible
- Remove the 3 project cards that have no case study equivalent (WHO Dashboard, Satellite Embeddings, FlowFinder, Style Editor, MBTiles Viewer, Ghost Forest Watcher — these can go to a future `/work` page per POSITIONING.md)

**Step 1.5 — Add "How I work" section**
- New section between `#work` and `#about`
- Anchor: `#process`
- Simple: section heading + 3 short statements (open-source tools, transparent process, lightweight delivery)
- No new JS needed — existing Intersection Observer will animate it
- Minimal new CSS (reuse existing section spacing)

**Step 1.6 — Rewrite About**
- Replace 3-paragraph about copy with 2 sentences
- Remove "open to full-time" language (consulting framing, not job seeking)
- Keep headshot image
- Remove the `#experience` section entirely
- Remove "About" accordion / "Experience" nav link

**Step 1.7 — Update Contact section**
- Retitle to "Get in touch" or keep as-is — form infrastructure unchanged
- Update invitation copy to match positioning tone (remove "spatial ethics" philosophizing)

**Step 1.8 — Update nav**
- Remove: Services, Experience
- Rename: Projects → Work
- Final nav: Work · About · Contact

**Step 1.9 — Cleanup**
- Remove `tilecraft-small.png` reference from HTML
- Remove service-card-related CSS (estimate: ~200 lines of `styles.css`)
- Remove service card JS (estimate: ~150 lines of `script.js`)
- Remove experience accordion JS (estimate: ~30 lines)
- Update footer if it references services

---

### Phase 2 — Stack migration (optional, later)

Only do this if Phase 1 content is solid and there's a concrete reason (authoring friction, performance, Netlify features).

Steps would be:
1. Init Astro project, copy content + images
2. Migrate CSS custom properties → Tailwind config
3. Port interactive JS to Astro islands or vanilla scripts
4. Configure Netlify deploy (already has CNAME, just update DNS)
5. Preserve Web3Forms key in env var

This is a non-trivial migration with no content benefit. Skip unless the authoring experience becomes a bottleneck.

---

## Summary: What "done" looks like after Phase 1

```
Header: [logo] Work · About · Contact

Hero
  "I build custom geospatial tools..."
  "Conservation teams... hire me when..."
  [See my work →]

Selected Work
  [CTA Penguin Detection] [Isodistance Coverage] [TAVA Route Finder]

How I Work
  Open-source tools. Transparent process. Lightweight delivery.

About
  [headshot] Two sentences. No CV.

Contact
  [form]

Footer
```

Nav links: 3 (Work, About, Contact)
Sections: 5 (Hero, Work, Process, About, Contact)
Case studies: 3
Everything else: removed
