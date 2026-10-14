Phase 1 kickoff tasks (short-lived PR)

This PR will introduce the backend foundation work described in docs/backend/implementation-plan.md. It is intentionally small and focused:

- Add PostgreSQL support instructions and env examples
- Wire DRF authentication settings already started
- Add healthcheck endpoint and README for backend
- Add CI skeleton in a follow-up incremental PR

Acceptance criteria for this kickoff commit:
- Repo has Phase 1 branch with a small, reviewable commit that documents intent and provides run instructions
- Subsequent PRs will implement code changes referenced by the plan
