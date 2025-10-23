# Security Test Plan: Broken Access Control - DELETE /articles/{slug}

Objective
- Verify User A cannot delete User B’s article.

Preconditions
- User A and User B exist; User B owns an article with slug `b-slug`.

Steps
1) Login as User A (POST /users/login) and capture token `A_Token`.
2) Send DELETE /articles/b-slug with header `Authorization: Token A_Token`.
3) Observe status and response body.

Expected Result
- 403 Forbidden (or 401 Unauthorized) and article remains accessible via GET /articles/b-slug.

Negative/Edge Cases
- Attempt with no token (401), malformed token (401), expired token (401), different method (PUT/PATCH) should also be blocked.

Notes
- Respect rate limits; do not brute-force; log correlation IDs if present.