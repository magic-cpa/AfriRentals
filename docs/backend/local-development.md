# Local development (backend)

This covers running the minimal Django skeleton created in Phase 1.

Prereqs
- Python 3.10+ (recommended)
- pip
- (Optional) PostgreSQL for full-stack testing

Quickstart (sqlite + Tailwind via CDN)
1. cd backend
2. python -m venv .venv
3. .\.venv\Scripts\Activate.ps1 (Windows PowerShell) or .venv\Scripts\activate for cmd
4. pip install -r requirements.txt
5. python manage.py migrate
6. python manage.py runserver
7. Open http://127.0.0.1:8000/ to view the skeleton page (Tailwind loaded via CDN for prototyping)

Notes on Tailwind
- The skeleton uses the official Tailwind CDN for rapid prototyping. For production or to match the frontend build, replace the CDN usage with a compiled Tailwind build (npm + postcss) and serve generated CSS from static files or a CDN.
- Recommended path for full Tailwind integration:
  - Create a separate frontend-build (npm) or integrate into the Django static build pipeline.
  - Use Tailwind CLI or PostCSS to generate a production stylesheet and collectstatic.

Next steps
- Replace sqlite with PostgreSQL (set DATABASE_URL in env and update settings)
- Add DRF endpoints and authentication (SimpleJWT) in Phase 1
- Add Docker Compose for local services (postgres, redis)
