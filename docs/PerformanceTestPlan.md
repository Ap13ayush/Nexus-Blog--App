# Performance Test Plan: POST /articles

- Goal: Measure write performance of RealWorld API POST /articles under load.
- Tool: k6 or Artillery (cloud/local). Environment: public API https://api.realworld.io/api.

Scenario
- Load: 100 virtual users for 1 minute, ramp-up 10s.
- Auth: Each VU logs in once (POST /users/login), reuses token for article creation.
- Request: POST /articles with small JSON body; unique title per request.

Metrics & SLOs
- Avg response time < 500ms, P95 < 1s, error rate < 1%.
- Throughput (RPS), bandwidth, failures by status code.

Risks & Controls
- Public API rate limits; backoff on 429; random jitter between requests; cap max RPS.

Reporting
- Export CSV/JSON; include charts for latency percentiles, RPS, and errors.
