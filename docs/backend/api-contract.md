# API contract — AfriRentals (initial)

Base URL: /api/v1/
Content-Type: application/json
Authentication: Bearer JWT in Authorization header or HttpOnly cookie (recommended)

## Auth
POST /auth/signup
- Body: { first_name, last_name, email, date_of_birth, password }
- Success: 201 { id, email, first_name, last_name }
- Errors: 400 validation, 409 email exists

POST /auth/login
- Body: { email, password }
- Success: 200 { access_token, refresh_token, user: { id, email, first_name, last_name } }
- Errors: 401 invalid credentials

POST /auth/logout
- Body: none (or refresh token)
- Success: 204

GET /auth/me
- Auth required
- Success: 200 { id, email, profile: { display_name, avatar_url, role } }

## Users / Profiles
GET /users/:id
- Public: limited profile

PUT /users/:id
- Auth required (self)
- Validates mutable profile fields

## Properties
GET /properties
- Query: ?q=destination&check_in=YYYY-MM-DD&check_out=YYYY-MM-DD&guests=&page=&page_size=&amenities=&min_price=&max_price=
- Success: 200 { results: [property], pagination }

GET /properties/:id
- Success: 200 full property details (public if published)

POST /properties
- Auth required (host)
- Body: property fields (title, description, address, price, capacity, amenities[])
- Success: 201 { id }

PUT /properties/:id
- Auth required (owner)

PATCH /properties/:id/publish
- Auth required (owner)
- Changes visibility

## Media
POST /properties/:id/images
- Auth required (owner)
- Accepts multipart/form-data file uploads; validate content-type and size
- Response: 201 { image_url, id }

## Bookings / Reservations
POST /properties/:id/bookings
- Body: { check_in, check_out, guests, payment_intent_id? }
- Server computes price and availability; uses transactions/locking to prevent double-bookings
- Success: 201 { booking_id, status: pending }

GET /bookings/:id
- Auth required (user or host related)

PATCH /bookings/:id/cancel
- Valid transition enforcement

## Search
GET /search
- Delegates to /properties with availability-aware filters

## Webhooks
POST /webhooks/payments
- Verify signature; idempotent processing


Notes
- Use consistent error format: { code, message, details? }
- Use pagination: { results: [], total, page, page_size }
- All endpoints must validate input schema and enforce authorization.
