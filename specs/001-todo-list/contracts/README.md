# Contracts — TODO List

This feature is client-only for the MVP and does not require a server-side API. Therefore there are no runtime HTTP contracts
that must be implemented for the P1 scope.

If a backend API is added later for cross-device sync, an OpenAPI specification should be added here under `openapi/`.

## Suggested future stub
- `openapi/todo.yaml` — when server sync is needed, provide endpoints: `GET /tasks`, `POST /tasks`, `PATCH /tasks/:id`, `DELETE /tasks/:id`.
