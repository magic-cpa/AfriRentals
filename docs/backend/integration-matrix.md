# Frontend-to-Backend Integration Matrix (initial)

Home (/)
- Uses: featured stays, search box
- Endpoints: GET /api/v1/properties (featured/paginated) ; GET /api/v1/search?q=...
- Notes: client currently uses Mapbox geocoding for location suggestions (keep client token or move to server-side proxy)

Authentication
- Signup page: POST /api/v1/auth/signup (signup.tsx calls 127.0.0.1:8000/api/signup)
- Login page: POST /api/v1/auth/login (login.tsx calls /api/login)
- Current user: GET /api/v1/auth/me
- Logout: POST /api/v1/auth/logout
- Notes: standardize axios base URL usage (src/services/api.ts points to http://127.0.0.1:8000)

Become a host
- Trigger: link -> signup then dashboard
- Endpoints: POST /api/v1/properties to create, GET /api/v1/properties?owner=<id>

Search box and location input
- Frontend uses Mapbox forward geocoding client with an embedded public token
- Server-side alternative: POST /api/v1/geocode (proxy) to avoid exposing token or to centralize rate limits

Property details and listing pages (not yet implemented in frontend)
- GET /api/v1/properties/:id
- Images served from S3/CDN

Bookings
- Reservation flow: POST /api/v1/properties/:id/bookings
- Booking status retrieval: GET /api/v1/bookings/:id

Media uploads
- POST /api/v1/properties/:id/images (multipart/form-data)
- Server returns signed upload URLs or accepts uploads directly and stores on S3

Notes and quick wins
- Standardize axios usage: replace direct absolute URLs with src/services/api.ts and ensure baseURL is configurable
- Add client-side error handling for API responses and show validation errors returned by the server

Next: Implementation plan with tasks to set up local dev, migrations, and basic auth endpoints.