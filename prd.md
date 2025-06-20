# Small Batch Maps - Product Requirements Document

**Version:** 1.0  
**Project:** Simple Static Website for Geospatial Consultancy  

---

## Project Overview

A clean, single-page website for Small Batch Maps with four main sections. The site showcases artisanal cartography services with a focus on converting visitors to consultation requests.

**Goal:** Professional web presence that generates leads for geospatial consulting services.

---

## Design System

### Brand Colors (from mockup)
- **Terracotta Orange:** `#CD5C40` (CTAs, accents)
- **Sage Green:** `#7A8B7A` (secondary elements)
- **Cream:** `#F5F2E8` (backgrounds)
- **Deep Teal:** `#2C5F5D` (text, headers)
- **Warm White:** `#FEFCF8` (cards, highlights)

### Typography
- **Headers:** Playfair Display (serif, elegant)
- **Body:** Inter (clean, readable)
- **Accent:** JetBrains Mono (technical elements)

### Visual Style
- Organic, topographic-inspired shapes
- Subtle contour line elements
- Compass rose motifs
- Earth tone palette
- Handcrafted feel with modern tech

---

## Site Structure

### Single Page Layout
1. **Hero Section** - Brand intro + main CTA
2. **Services Section** - 3 service cards
3. **About Section** - Personal bio
4. **Contact Section** - Form + social links

### Navigation
- Fixed header with smooth scroll to sections
- Mobile hamburger menu
- Logo links to top

---

## Section Requirements

### 1. Hero Section
**Content:**
- Main headline: "Bespoke Cartography for the Digital Age"
- Subheadline: "AI-powered GIS solutions with a human touch"
- Background: Artistic topographic map illustration (like mockup)
- Primary CTA: "Explore Services" (scrolls to services)

**Visual Elements:**
- Large topographic background illustration
- Compass rose accent
- Organic contour line patterns

### 2. Services Section
**Three Service Cards:**

**Card 1: Geospatial Data Science**
- Icon: Data/analytics symbol
- Brief description
- "Learn More" button → expands to show:
  - AI-assisted geoprocessing
  - Spatial prediction modeling
  - Time-series analysis
  - ESDA (Exploratory Spatial Data Analysis)

**Card 2: Web Cartography**
- Icon: Interactive map symbol
- Brief description  
- "Learn More" button → expands to show:
  - Custom web maps (MapLibre, Leaflet)
  - Interactive dashboards
  - Data storytelling
  - Responsive mapping apps

**Card 3: AI-Assisted Workflows**
- Icon: AI/automation symbol
- Brief description
- "Learn More" button → expands to show:
  - Autonomous GIS agents
  - RAG pipelines for spatial data
  - Technical infrastructure
  - Docker + FastAPI solutions

**Interaction:**
- Cards expand/collapse on click
- Smooth animations
- Mobile-friendly accordion style

### 3. About Section
**Content:**
- Professional headshot or workspace photo
- Personal bio focusing on:
  - Background in GIS/data science
  - Mission and values
  - Approach to work
  - Location (if relevant)
- Keep it personal but professional

### 4. Contact Section
**Contact Form:**
- Name (required)
- Email (required)
- Project type (dropdown: Data Science, Web Mapping, AI Workflows, Other)
- Project description (textarea)
- Budget range (optional dropdown)
- Submit button

**Social Links:**
- Email address
- GitHub profile
- Instagram
- Any other relevant platforms

**Additional Info:**
- Response time expectation
- Consultation process overview

---

## Technical Specifications

### Tech Stack
- **HTML/CSS/JavaScript** (simple static approach)
- **OR Next.js** if you want React components
- **Tailwind CSS** for styling
- **Framer Motion** for animations (if using React)
- **Vercel** for hosting

### Agent Instructions for Development

**When building components, always:**
- Use the exact brand colors specified
- Follow mobile-first responsive design
- Include smooth scroll behavior
- Add hover/focus states for interactivity
- Ensure accessibility (proper ARIA labels, keyboard navigation)
- Keep animations subtle and performance-friendly

**Component Structure:**
```
Header (fixed navigation)
├── Hero Section
├── Services Section
│   ├── Service Card 1 (expandable)
│   ├── Service Card 2 (expandable)
│   └── Service Card 3 (expandable)
├── About Section
└── Contact Section
    ├── Contact Form
    └── Social Links
```

**Responsive Breakpoints:**
- Mobile: < 768px (stack everything)
- Tablet: 768px - 1024px (2-column layouts)
- Desktop: > 1024px (full layouts)

---

## Content Guidelines

### Tone of Voice
- Professional but approachable
- Emphasize craft and quality
- Technical competence without jargon
- Mission-driven and ethical

### Key Messages
- Artisanal quality meets modern technology
- Custom solutions, not cookie-cutter approaches
- Ethical data practices
- AI-enhanced but human-centered

---

## Success Metrics
- Time on site > 2 minutes
- Services section engagement (card expansions)
- Contact form completion rate > 15%
- Mobile usability score > 90%

---

## Agent Prompting Template

```
Build a [section name] that:
- Uses Small Batch Maps brand colors: terracotta (#CD5C40), sage (#7A8B7A), cream (#F5F2E8), teal (#2C5F5D)
- Follows mobile-first responsive design
- Includes smooth animations and hover states
- Maintains the artisanal cartography aesthetic
- Is accessible and keyboard navigable
- [specific section requirements from above]
```

---

*This PRD covers everything needed for a clean, effective static website that showcases your geospatial services and converts visitors to leads.*
