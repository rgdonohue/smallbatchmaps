# Website Update.md (Small Batch Maps)

Date: 2026-01-20  
Scope: Fix credibility leaks, unify positioning, strengthen proof, and clarify whether the site is primarily for consulting, job-search, or both.

---

## 1) Positioning: choose your primary audience (and separate if needed)

### Concern
The site currently tries to serve **consulting clients** and **hiring managers** at the same time. This creates mixed signals and reduces conversion for both.

### Recommendation
Pick a primary mode and support the other via a distinct page or small banner.

- **Option A: Consulting-first (default)**
  - Keep strong POV + skeptical AI stance.
  - Add a lightweight “Open to roles” note in About or Contact.

- **Option B: Job-search-first**
  - Reduce edgy language.
  - Add a clear “Hire me” CTA and a “Resume / Case Studies” path.

- **Option C: Dual-track (best balance)**
  - Keep homepage consulting-first.
  - Add `/work` or `/hire` page tuned for employment: concise, professional, resume-aligned, project proof, and direct CTA.

**Action items**
- Decide primary audience for homepage.
- Add secondary audience accommodation:
  - Consulting-first: a small banner or footer line: “Open to full-time or contract roles (remote / Mountain West).”
  - Job-first: a “Services” link becomes secondary; “Experience / Case Studies / Resume” becomes primary.

---

## 2) Tone: eliminate tone whiplash

### Concern
Copy swings between edgy/casual and professional, which can read as inconsistent or risky to employers.

### Recommendation
Define a consistent style rule and stick to it across sections.

**Suggested tone rule**
- Keep the skeptical stance, but reduce profanity and “gotcha” language on core pages.
- Confine sharper rhetoric to a dedicated page (e.g., `/principles` or `/writing`) where it’s clearly “voice,” not sales copy.

**Action items**
- Audit for phrases like:
  - “do their damn job”, “snake oil”, “techno-theology”, “no black boxes allowed”
- Replace with:
  - “no hype”, “transparent systems”, “auditable workflows”, “reproducible methods”
- Keep one or two signature lines max. Remove the rest.

---

## 3) Consistency: reconcile numbers with resume

### Concern
Mismatch between site and resume (e.g., “14 years” vs “15+ years”) erodes trust.

### Recommendation
Choose one version and use it everywhere.

**Action items**
- Standardize:
  - years of experience
  - role titles
  - dates
  - client/org naming
- Create a single “Facts & Figures” canonical snippet used by site + resume.

---

## 4) Claims audit: verify or soften anything that can be challenged

### Concern
Statements that sound impressive but aren’t verifiable can backfire with employers and sophisticated clients.

### High-risk claims to review
- “award-winning online graduate program” (what award? where documented?)
- “graduates placed at USGS, Cornell, and The New York Times” (true + attributable?)
- “50+ certificate students” (accurate count?)
- “multiple live systems” for WHO (can you name or safely describe them?)

### Recommendation
For each claim, choose one:
- **Verify + cite** (preferred): link to an award page, program page, public outcomes, or other proof
- **Rephrase to defensible**: remove superlatives, keep true core
- **Remove** if unverifiable

**Action items**
- Build a `claims.yml` or `claims.md` with:
  - Claim text
  - Evidence link or source note
  - Approved phrasing

---

## 5) Projects: convert “titles” into proof (repo links, screenshots, outcomes)

### Concern
A list of projects without proof reads like ideas rather than shipped work.

### Recommendation
Every project displayed should have at least one of:
- GitHub repo link
- live demo link
- screenshot / video / diagram
- short “delivered outcome” sentence
- dates + status label

**Action items**
- Add a status tag to each project:
  - `Shipped`, `Active`, `Prototype`, `Concept`
- For each listed project, include:
  - **What it is** (1 sentence)
  - **Stack** (short)
  - **Artifact** (repo/demo/screenshot)
  - **Outcome** (what changed / what user gets)

**Project reality check**
- Confirm which projects are public:
  - FlowFinder
  - Tilecraft
  - Geomockery
- Confirm which are deployed vs just scoped:
  - Ghost Forest Watcher
  - ESDA Web Mapping
  - DEM Hillshade Generator
- If not public, label clearly as `Prototype` or `Private client work (details available on request)`.

---

## 6) Employment signal: add a clear path if job search matters

### Concern
If employment is a priority, the site currently reads mostly as consulting.

### Recommendation
Add an explicit, low-drama statement.

**Action items**
- Add a small block near About/Contact:
  - “Open to full-time roles (remote/hybrid) and short-term consulting.”
- Add a `/hire` page:
  - headline: what role you want
  - 3 bullet “I’m strong at…”
  - 3 case studies
  - link to resume
  - contact CTA

---

## 7) Copy cleanup: fix awkward or broken phrasing

### Concern
Some phrasing doesn’t parse or reads rushed.

### Recommendation
Line edit for clarity and professionalism.

**Action items**
- Replace phrases like:
  - “Founded curriculum development” → “Led curriculum development” / “Built the curriculum for…”
- Fix typos and truncations across sections (do a full pass).

---

## 8) UX/credibility polish checklist (fast wins)

- Fix any accessibility helper text showing visibly (sr-only leakage / CSS issue).
- Ensure CTAs are repeated and consistent (“Contact”, “Book a call”, “Email”).
- Add 2–6 visuals: maps, diagrams, or screenshots (proof beats prose).
- Add a short “Selected Clients / Orgs” strip (logos if allowed).
- Ensure page titles/meta descriptions are unique and search-friendly.

---

## Suggested execution order (highest ROI first)

1. Fix visible UI artifacts + typos/truncations  
2. Decide audience + add a `/hire` or `/work-with-me` page  
3. Tone audit + consistent style pass  
4. Claims audit + verify/soften/remove  
5. Projects proof pass (repo/demo/status/screenshot)  
6. Final consistency sweep (numbers, dates, titles)

---

## Definition of Done

- No unverifiable superlatives without a source link.
- Every project has proof + status label.
- Tone consistent across core pages.
- Resume and website facts match.
- Clear CTA for consulting and/or employment exists within 10 seconds of landing on homepage.
