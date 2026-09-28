# ReactUI

By Preetpal Basson

ReactUI is a learning and portfolio project built with React, Next.js, and
TypeScript. It provides a dashboard for viewing API health, users, and image
gallery records. This README describes the current implementation and will be
updated as more functionality is added.

## Current functionality

### Dashboard

- Three tabs: **Main page**, **Users**, and **Image Gallery**.
- Main page displays the current date/time, API health, and module record counts.
- Users and gallery components pass their counts to the dashboard through
  callbacks, without separate requests just to retrieve counts.
- A centred, responsive layout with status cards, section headings, and count badges.

### API health

- Checks `/health/live` and `/health/ready` in parallel.
- Live is green for a successful HTTP response; failures are red.
- Ready is green only for a successful response containing `Healthy`
  (ignoring case and surrounding whitespace); other results are red.
- Displays a neutral checking state before the first result.
- Each request has a five-second timeout. The next check starts five seconds
  after the previous check finishes, while the component is mounted.

### Users

- Displays username, full name, date of birth, and email in a scrollable table.
- Uses the API response object: `{ records: User[], totalRecords: number }`.
- Displays the API-provided total, including in the dashboard summary.
- Refresh button reloads data without reloading the page.

### Image Gallery

- Displays gallery names and paths in a scrollable table.
- Refresh button reloads the gallery records and updates the dashboard count.
- Currently lists gallery metadata; image previews and uploads are not implemented.
- The gallery service currently derives its displayed count from `records.length`.

### Shared UI and services

- Reusable `RequestStatus` and `SpinnerComponent` handle loading and error displays.
- Both data tabs have empty states and disable Refresh while loading.
- Request identifiers prevent stale responses from replacing newer data or
  updating state after component cleanup.
- Shared CSS Modules provide responsive cards, count badges, table scrolling,
  sticky table headings, and wrapping for long values.
- Server functions call the backend through a shared GET helper. It adds the
  optional `X-API-KEY` header, bypasses the fetch cache, checks HTTP status, and
  applies a default ten-second timeout.
- API keys remain on the server rather than being passed to browser components.

## Technology

- Next.js 16 and React 19
- TypeScript
- React Bootstrap, Bootstrap CSS, and Bootstrap Icons
- CSS Modules
- React Router for existing page navigation
- Docker and Docker Compose
- GitHub Actions

Tailwind dependencies are present, but its global CSS import is currently disabled.

## Project structure

```text
.github/workflows/nextjs.yml  Build and package pipeline
src/
  app/                      Next.js entry points and global styles
  components/
    common/                 Shared request status and spinner
    feature/                Dashboard, users, gallery, and demonstration components
    layout/                 Shared page and navigation components
    StyleSheets/            Shared CSS Module
  constants/                Shared text/constants
  models/                   TypeScript API response types
  services/                 API client and server functions
  Dockerfile                Development, build, and production stages
  package.json              App dependencies and scripts
docker-compose.yml          Production container configuration
docker-compose.dev.yml      Development override
```

## API configuration

For Docker, create `.env` in the repository root. For local npm development,
place the settings in `src/.env.local` instead. Keep API keys out of source control.

Example for the API on the shared Docker network:

```dotenv
NODE_ENV=development
API_BASE_URL=http://mysqlcore.api
API_BASE_PORT=5820
API_MAIN_URL=api
API_HEALTH_URL=health
XAPI_KEY=replace-with-your-api-key
```

| Setting | Purpose |
| --- | --- |
| `NODE_ENV` | Use `development` for development and `production` for production. |
| `API_BASE_URL` | API scheme and hostname, without an API path prefix. |
| `API_BASE_PORT` | Optional port override, from 1 to 65535. Omit or leave blank to preserve the URL's port/default. |
| `API_MAIN_URL` | Path prefix for data requests, normally `api`. |
| `API_HEALTH_URL` | Health path prefix, normally `health`. |
| `XAPI_KEY` | API key sent in the `X-API-KEY` header when configured. |

With these settings, the data endpoints are `/api/user` and `/api/image-gallery`.
The health endpoints use the same host and port with the `health` prefix.

For an Azure HTTPS endpoint, use its public URL and omit `API_BASE_PORT`:

```dotenv
API_BASE_URL=https://your-api.azurecontainerapps.io
API_MAIN_URL=api
API_HEALTH_URL=health
```

HTTPS uses port 443 by default. Azure's internal target port is configured in
Azure, separately from the public URL.

Choose a hostname reachable from where Next.js runs:

- Local npm: `http://localhost` with `API_BASE_PORT=5820` for a locally published API.
- Shared Docker network: `http://mysqlcore.api` with `API_BASE_PORT=5820`.
- Hosted API: its reachable HTTPS address, normally without a port override.

Inside a container, `localhost` refers to that container. After changing the
root `.env`, rerun the appropriate Compose `up -d` command to recreate the service
with the new settings. Restart the local dev server after changing `src/.env.local`.

## Run locally

Use Node.js 22, matching the Docker image and CI pipeline. From the repository root:

```sh
cd src
npm ci
npm run dev
```

Open http://localhost:3000. Install dependencies in `src` even when developing
with Docker if your editor needs local React and TypeScript types.

To check the app, run from `src`:

```sh
npm run lint
npx tsc --noEmit
npm run build
```

## Run with Docker

Run Compose commands from the repository root. Docker Compose loads settings
from the root `.env`; it is not included in the built image.

### Development

The development override requires the external `mysqlcore_network` network.
Start the backend stack that provides it first. If using only a hosted API and
that network does not exist, create it once:

```sh
docker network create mysqlcore_network
```

Start the UI:

```sh
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build -d
```

Open http://localhost:3001. The override mounts `./src` at `/app` for live edits,
with separate volumes for dependencies and the Next.js cache. Dependencies are
installed from the lockfile each time the container starts.

```sh
docker compose logs -f myapp
docker compose -f docker-compose.yml -f docker-compose.dev.yml down
```

### Production

Set `NODE_ENV=production` in the root `.env`, then run:

```sh
docker compose up --build -d
```

The multi-stage Dockerfile builds the app and runs the Next.js standalone server
as a non-root user on port 3001. Open http://localhost:3001.

The base production Compose file does not join `mysqlcore_network`. Use a
reachable hosted API, or configure the shared network for production when using
Docker service names. Development and production share a service and host port;
run one mode at a time.

```sh
docker compose logs -f myapp
docker compose down
```

## GitHub Actions pipeline

[The workflow](.github/workflows/nextjs.yml) runs on:

- Pushes to `master` or `development`.
- Pull requests targeting `master`.
- Version tags matching `v*`.
- Manual runs from GitHub Actions.

Merging a PR into `master` triggers a build through the push event.
The pipeline installs dependencies and runs `npm run build` in `src`, builds the
production Docker image, and smoke-tests the homepage. The smoke test does not
verify backend connectivity or authenticated API calls.

Successful runs upload `reactui-image-<commit SHA>` under the workflow run's
**Artifacts** section. It contains a compressed Docker image, its commit-based
tag, and a SHA-256 checksum, retained for 14 days.

The workflow prepares a deployment artifact. It does not push to a registry,
deploy to Azure, or publish to GitHub Pages. The current app requires a Next.js
server for its server functions and API calls.

To run an artifact, download and extract it on a Docker host:

```sh
sha256sum -c SHA256SUMS
docker load --input reactui-image.tar.gz
docker run -d --name reactui --restart unless-stopped \
  --env-file /path/to/deployment.env \
  -p 3001:3001 "$(cat image-tag.txt)"
```

Use production environment settings and a reachable API address. Add
`--network <shared-network>` when connecting to an API through a Docker service name.

## Possible future additions

These are ideas, not implemented features:

- Search, filtering, sorting, and pagination for record tables.
- Image previews and upload functionality.
- Create, edit, and delete actions.
- Consistent dark-theme styling across all components.
- Automated deployment to an Azure hosting target.
