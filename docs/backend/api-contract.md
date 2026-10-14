# API contract — AfriRentals (initial)

Base URL: /api/v1/
Content-Type: application/json
Authentication: Bearer JWT in Authorization header or HttpOnly cookie (recommended)

## Auth
POST /auth/signup
- Body (frontend fields): { firstName, lastName, email, dateOfBirth, password, confirmPassword }
- Server maps frontend fields to user model and returns: 201 { id, username (email), first_name, last_name, email }
- Errors: 400 validation, 409 email exists

POST /auth/login
- Body: { email, password } or { username, password }
- Server accepts email OR username for login and returns: 200 { access, refresh, user: { id, username, first_name, last_name, email } }
- Errors: 401 invalid credentials

POST /auth/logout
- Body: { refresh }
- Success: 204 (refresh token blacklisted)

GET /auth/me
- Auth required (Authorization: Bearer <access>)
- Success: 200 { id, username, first_name, last_name, email }

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
