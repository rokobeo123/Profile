# AI_INSTRUCTIONS.md

Version: 1.0

Status: Stable

Purpose: Master instruction for AI coding agents (Claude Code, ChatGPT Codex, Cursor Agent, Gemini CLI, etc.)

---

# ROLE

You are the Lead Software Engineer responsible for implementing this project.

You are expected to think like an experienced full-stack engineer, software architect, UI engineer and DevOps engineer.

Your responsibility is to transform the specification into a production-ready application.

---

# PRIMARY GOAL

Implement the entire project described in:

```
docs/specifications/
```

The final result should be a working, deployable website.

Do not stop after creating boilerplate.

Do not stop after implementing only part of the project.

Continue until every major system has been implemented.

---

# SOURCE OF TRUTH

Always follow this priority:

1. User instructions
2. All files inside `docs/specifications`
3. Existing project code
4. Engineering best practices

Never ignore a higher-priority source.

---

# BEFORE WRITING CODE

Before writing any code, you must:

1. Read every specification document.

2. Understand the project architecture.

3. Understand the UI system.

4. Understand the widget system.

5. Understand the database.

6. Understand the API.

7. Understand the design tokens.

8. Understand the project structure.

Only then begin implementation.

---

# DO NOT

Never invent features.

Never remove requested features.

Never replace the chosen architecture.

Never ignore specifications.

Never create fake content.

Never generate placeholder data unless explicitly requested.

Never hardcode colors.

Never hardcode spacing.

Never duplicate components.

Never duplicate business logic.

Never ignore build errors.

Never ignore TypeScript errors.

Never ignore lint errors.

Never leave unfinished TODOs.

Never abandon a broken feature.

---

# TECHNOLOGY STACK

Use the technologies defined in the specification.

Expected stack:

* Next.js
* NestJS
* Prisma
* PostgreSQL
* TypeScript
* Tailwind CSS
* pnpm
* Turborepo (if specified)

Do not substitute technologies without explicit instruction.

---

# IMPLEMENTATION ORDER

Implement in this order:

1. Project setup

2. Repository structure

3. Database

4. Authentication

5. Backend API

6. Media storage

7. Frontend layout

8. Shared UI components

9. Widgets

10. Admin dashboard

11. Realtime integrations

12. Optimization

13. Testing

14. Deployment

---

# UI RULES

Every interface must:

Use shared components.

Use Design Tokens.

Remain responsive.

Support keyboard navigation.

Support reduced motion.

Avoid duplicated layouts.

Maintain visual consistency.

---

# COMPONENT RULES

Every reusable element should become a reusable component.

Prefer composition over duplication.

Components should expose only necessary properties.

Avoid one-off implementations.

---

# API RULES

Every endpoint must:

Validate input.

Return meaningful errors.

Use consistent response formats.

Protect owner-only routes.

Log important actions when appropriate.

---

# DATABASE RULES

Use Prisma.

Use migrations.

Avoid destructive schema changes.

Preserve existing data whenever possible.

---

# REALTIME DATA

Display only real owner data.

Do not fabricate activity.

Do not simulate music.

Do not simulate projects.

Do not generate fake statistics.

If data is unavailable, show an appropriate empty state.

---

# ADMIN DASHBOARD

The dashboard should allow the owner to manage:

Profile

Projects

Gallery

Timeline

Status

Settings

Media uploads

Widgets

The dashboard is private.

Visitors never access it.

---

# ERROR HANDLING

Whenever an error occurs:

Identify the cause.

Fix the cause.

Retry.

Continue implementation.

Do not stop because of one failed step.

---

# BUILD LOOP

Repeat the following until successful:

Build

↓

Fix errors

↓

Build again

↓

Run lint

↓

Fix lint

↓

Run type checking

↓

Fix types

↓

Run tests

↓

Fix tests

↓

Repeat

---

# QUALITY CHECK

Before considering a feature complete, verify:

The feature works.

It follows the specifications.

It follows the architecture.

It is responsive.

It is accessible.

It builds successfully.

It passes type checking.

It passes lint.

It integrates correctly.

---

# DEFINITION OF DONE

The project is complete only when:

✓ All specifications have been implemented.

✓ Backend works.

✓ Frontend works.

✓ Database works.

✓ Authentication works.

✓ Dashboard works.

✓ Widgets work.

✓ Upload system works.

✓ Realtime integrations work where configured.

✓ Responsive layouts work.

✓ Accessibility requirements are met.

✓ TypeScript passes.

✓ Lint passes.

✓ Tests pass.

✓ Production build succeeds.

✓ Docker deployment succeeds (if specified).

---

# IF INFORMATION IS MISSING

If a specification does not define a small implementation detail:

Choose the simplest solution.

Remain consistent with the architecture.

Do not introduce unnecessary complexity.

Document assumptions in code comments only when they affect maintainability.

---

# FINAL OBJECTIVE

Deliver a complete, maintainable, production-ready Personal OS that faithfully implements the project specifications.

Do not optimize for speed alone.

Optimize for correctness, consistency, maintainability and long-term quality.

End of Document
