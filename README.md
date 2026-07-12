# Personal OS

> A premium personal website specification built for AI-assisted development.

---

# Overview

Personal OS is a long-term personal website designed to become the owner's digital home.

This project is not intended to function as:

- a portfolio
- a résumé
- a landing page
- a company website
- a Linktree replacement
- a dashboard

Instead, Personal OS is a carefully designed website that combines authentic personal content with real-time online activity to create a living digital identity.

The website should feel closer to a premium desktop application than a traditional webpage.

---

# Project Goals

The implementation must satisfy the following goals.

## GOAL-001

Create a memorable browsing experience through interaction, motion and atmosphere.

---

## GOAL-002

Present the owner's real personality instead of promoting professional achievements.

---

## GOAL-003

Remain maintainable for many years.

The website should grow together with the owner.

---

## GOAL-004

Use only authentic personal content.

No fake data.

No AI-generated memories.

No placeholder galleries.

No fictional repositories.

---

## GOAL-005

Integrate real-time information from official services where appropriate.

Examples include:

- Spotify
- Discord
- GitHub
- Weather
- Visitor Analytics

---

# Repository Structure

```
PERSONAL-OS/

README.md

docs/

00_PROJECT_VISION.md
01_DESIGN_DNA.md
02_UI_LAYOUT_SYSTEM.md
03_WIDGET_SPEC.md
04_BACKGROUND_SYSTEM.md
05_MOTION_SYSTEM.md
06_CONTENT_SYSTEM.md
07_TECH_ARCHITECTURE.md
08_API_INTEGRATION.md
09_ADMIN_SYSTEM.md
10_IMPLEMENTATION_RULES.md
11_FINAL_ACCEPTANCE.md
```

---

# Reading Order

The implementation must read every document completely before generating any source code.

Required order:

1. README.md
2. 00_PROJECT_VISION.md
3. 01_DESIGN_DNA.md
4. 02_UI_LAYOUT_SYSTEM.md
5. 03_WIDGET_SPEC.md
6. 04_BACKGROUND_SYSTEM.md
7. 05_MOTION_SYSTEM.md
8. 06_CONTENT_SYSTEM.md
9. 07_TECH_ARCHITECTURE.md
10. 08_API_INTEGRATION.md
11. 09_ADMIN_SYSTEM.md
12. 10_IMPLEMENTATION_RULES.md
13. 11_FINAL_ACCEPTANCE.md

No implementation should begin before every document has been processed.

---

# Technology Stack

Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS v4
- Motion
- GSAP (only when necessary)
- React Three Fiber
- Three.js
- shadcn/ui
- Lucide React
- next/image

Backend

- Next.js Route Handlers
- Supabase
- PostgreSQL
- Prisma (optional)
- UploadThing or Supabase Storage

State Management

- Zustand
- TanStack Query

Deployment

- Vercel

Analytics

- Vercel Analytics

---

# Design Principles

Every design decision must follow these principles.

1. Authenticity
2. Simplicity
3. Consistency
4. Performance
5. Accessibility
6. Maintainability

Beauty must never reduce usability.

Motion must never reduce performance.

Technology must never replace personality.

---

# Content Philosophy

The owner creates content.

The platform presents content.

The system synchronizes live information.

Artificial Intelligence builds the application.

Artificial Intelligence must never fabricate personal identity.

---

# Real-Time Philosophy

Only official APIs should provide live information.

Supported integrations include:

- Spotify
- Discord (Lanyard)
- GitHub
- Weather
- Visitor Analytics

When a service becomes unavailable, the interface should display an appropriate empty state.

The application must never generate fake live data.

---

# Personal Content

The following information always belongs to the owner.

- Avatar
- Banner
- Biography
- Gallery
- Albums
- Timeline
- Projects
- Quotes
- Social Links
- Favorite Links

The implementation must provide management tools for this content.

The implementation must never generate replacement content.

---

# Implementation Rules

Unless explicitly marked as optional:

Every requirement inside every document is mandatory.

The implementation should prioritize correctness over creativity.

Whenever ambiguity exists, the implementation should preserve authenticity.

---

# Deliverable

The final deliverable must be a production-ready website.

The application must be fully functional.

The application must not resemble a template.

The owner should be able to deploy the project and use it immediately after providing their own personal content and API credentials.

---

# Success Definition

The project is considered successful when:

- the owner enjoys maintaining it;
- visitors enjoy exploring it;
- the website remains useful for years;
- every piece of personal content belongs to the owner;
- every live widget reflects real information;
- the interface feels premium, expressive and highly polished without sacrificing performance.
