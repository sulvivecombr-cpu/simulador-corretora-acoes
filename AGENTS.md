# Base44 Setup Notes

## Architecture
- **Frontend**: Vue 3 + Vue CLI 5 (webpack-dev-server, NOT Vite). Dev server on port 8080, mapped to host port 3000.
- **Backend**: Node.js + Express on port 3000 (internal). Uses `nodemon` for live reload.
- **Database**: MySQL 8. The backend auto-initializes the DB on every startup via `config/init-db.js` — it **drops and recreates** `simulador_corretora` each boot, so all data is lost on backend restart.

## Key Details
- The frontend proxies `/api` requests to the backend via `vue.config.js` (`devServer.proxy`). The proxy target is set by the `API_PROXY_TARGET` env var (defaults to `http://localhost:3000` for local dev; set to `http://backend:3000` in compose).
- Some frontend views originally hardcoded `http://localhost:3000/api/...` — these were changed to relative `/api/...` so the dev-server proxy handles them in the preview.
- Stock prices are fetched from a public GitHub raw URL (`acoesService.js`) — no credentials needed.
- `nodemailer` is listed as a dependency but is never imported or used.
- `JWT_SECRET` is required at boot (used by `jsonwebtoken` for auth). A dev placeholder is generated; see `.base44/environment.json`.
- The actual DB schema lives in `backend/config/database.sql` (not `scripts/init-db.sql`).

## Verification
- The app serves a login page at `/`. Create an account via the "Cadastre-se" link, then log in.
- Health: backend `GET /` returns JSON; frontend `GET /` returns the Vue app HTML.
- Run: `docker compose -f docker-compose.base44.yml up -d --build`
