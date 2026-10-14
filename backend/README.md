AfriRentals — Backend (Phase 1)

This directory contains the Django backend skeleton and development instructions.

Phase 1 goals (short):
- Harden auth and DRF configuration
- Add PostgreSQL configuration and migrations
- Add healthchecks and basic CI
- Add initial models for users, properties, and bookings

See docs/backend/implementation-plan.md for full Phase 1 tasks and acceptance criteria.

Quick start (development):
1. python -m venv .venv
2. .\.venv\Scripts\Activate.ps1
3. pip install -r requirements.txt
4. python manage.py migrate
5. python manage.py runserver

Notes:
- The current setup uses sqlite for quick local development. Switch DATABASES in afrirentals_api/settings.py to use PostgreSQL in production.
