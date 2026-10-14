# Data model (initial sketch)

## Users
- id (PK, uuid)
- email (unique)
- hashed_password
- first_name, last_name
- date_of_birth
- role (enum: guest, host, admin)
- created_at, updated_at

Index: email (unique)

## Profiles
- user_id (FK -> users.id)
- display_name
- avatar_url
- bio

## Properties
- id (PK)
- owner_id (FK -> users.id)
- title, description
- property_type
- address fields (street, city, region, country, lat, lng)
- capacity (guests)
- base_price (per-night or per-month)
- currency
- published (bool)
- created_at, updated_at

Indexes: owner_id, published, (lat,lng)

## PropertyImages
- id
- property_id (FK)
- url
- order
- uploaded_at

## Amenities
- id
- name

## PropertyAmenities
- property_id, amenity_id (composite PK)

## AvailabilityBlocks
- id
- property_id
- start_date, end_date
- type (blocked, unavailable, maintenance)

## PricingRules (optional)
- id, property_id, start_date, end_date, price_modifier

## Bookings
- id (PK)
- property_id (FK)
- guest_id (FK -> users)
- check_in, check_out
- guests_count
- status (enum: pending, confirmed, cancelled, completed, rejected)
- total_amount_cents
- currency
- created_at, updated_at

Constraints
- Enforce non-overlapping confirmed bookings per property via exclusion constraint (Postgres) or transactional locking.

## LongTermApplications
- id, property_id, applicant_id, start_date, end_date, status, submitted_at, reviewed_at

## Favorites
- user_id, property_id (PK)

## Conversations / Messages
- conversation_id, property_id?, participant_ids
- messages: id, conversation_id, sender_id, content, created_at

## Reviews
- id, property_id, author_id, rating, body, created_at
- Eligibility rules enforced at application layer

## Payments / Transactions
- id, booking_id, provider_id, provider_charge_id, status, amount_cents, currency, created_at

## Notifications and Audit Logs
- notification records and immutable audit entries for admin actions


This model is intentionally conservative; add entities only when justified by frontend requirements. Next: map frontend pages to API endpoints and produce an implementation plan for Phase 1.