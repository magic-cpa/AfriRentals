# Backend implementation plan (Phase 0 -> Phase 1 handoff)

## Phase 0 deliverables (this PR)
- Repository audit report (files under docs/backend/*)
- Frontend-to-backend integration matrix
- Proposed architecture and stack decisions
- Data model initial sketch
- List of decisions requiring approval

Acceptance: docs exist, reviewable, and map frontend pages to endpoints.

## Phase 1 — Backend foundation (next PR)
Goals: boot a Django project, connect to PostgreSQL, add migrations, basic auth, and CI checks.

Tasks:
1. Create Django project `afrirentals_api` and app `core`.
2. Add Dockerfile and docker-compose.dev.yml (Postgres, Redis, local S3 emulator optional)
3. Configure settings via environment variables; add .env.example with required vars (DATABASE_URL, SECRET_KEY, S3_* etc.)
4. Add DRF, SimpleJWT, and set up `/api/v1/auth/` endpoints (signup, login, logout, me)
5. Create initial models: User (custom or AbstractUser), Property (skeleton), PropertyImage, Booking (skeleton)
6. Add migrations and seed script for dev fixtures
7. Add basic test coverage for auth flows and migration path
8. Add healthcheck endpoint `/healthz` and liveness/readiness checks
9. CI: minimal pipeline running lint, tests, and migrations in check mode
10. Document local-development.md with start instructions

Validation:
- Developer can run backend locally using documented commands
- Migrations run cleanly on a fresh DB
- Auth flows work (signup/login/me)

## Timeline & PR sizing
- PR-1 (this): docs + audit
- PR-2: backend skeleton, auth endpoints, migrations
- PR-3: properties & media basic CRUD

## Risks & mitigations
- Booking concurrency: plan DB-level constraints and transaction patterns; include test coverage
- Mapbox token leakage: propose proxy or server-side token management
- Payments: do not implement until booking lifecycle is stable


Next step: open a branch/PR with these docs (already on branch yazid120-phase-0-repo-audit). When approved, start implementing Phase 1 skeleton.