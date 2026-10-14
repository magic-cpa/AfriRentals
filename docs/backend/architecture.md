# Backend architecture for AfriRentals

## Overview
Recommended stack: Django + Django REST Framework (DRF) + PostgreSQL. Use DRF for stable JSON APIs and Django's mature ecosystem (auth, admin, migrations).

Components
- Web/API: Django + DRF, versioned API under `/api/v1/`
- Auth: DRF SimpleJWT (access + refresh) with HttpOnly secure cookies, optional session-based for server-rendered flows
- Persistence: PostgreSQL (managed like RDS/Cloud SQL) with explicit FKs and migration workflows
- Media: S3-compatible object store (AWS S3, DigitalOcean Spaces) for property images
- Background jobs: Celery + Redis for long-running tasks (email, webhook processing, image processing)
- Web server: Gunicorn + Nginx (or ASGI via Uvicorn/Daphne if using async endpoints)
- Caching: Redis for rate-limiting, short-term caching, and Celery broker
- Observability: Structured JSON logs, Prometheus metrics, Sentry for errors

Why this fits
- Frontend is React+Vite; DRF returns predictable JSON for existing axios calls.
- Django provides batteries-included security features and mature migration tooling.
- PostgreSQL supports relational constraints and transactional concurrency needed for bookings.

Security & operational notes
- Never commit secrets; provide a .env.example and require runtime validation.
- Enforce HTTPS, validate webhook signatures, and verify uploaded files' type/size.
- Use DB constraints and transactional booking operations to prevent double-bookings.

Decisions requiring approval
- Token model: JWT (SimpleJWT + HttpOnly cookies) vs server sessions (Django sessions) — recommend JWT cookies for API-first frontends.
- Object storage provider and CORS policy for uploads.
- Payment provider choices for target African markets.

Next: API contract, data model, integration matrix, and implementation plan documents.