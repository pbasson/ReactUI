# ReactUI  
### by Preetpal Basson

## Overview
ReactUI is a demonstration project exploring the **React framework using Next.js**.  
The goal of this repository is to experiment with and demonstrate frontend UI patterns, component structure, and interactive behaviour using modern React tooling.

This project serves as a **learning and portfolio project** while developing familiarity with the React ecosystem.

---

## Technologies

- React
- Next.js
- TypeScript
- React-Bootstrap
- Tailwind CSS

---

## Features

Current functionality includes:

- Component-based UI structure
- Interactive UI elements
- Loading states and spinners
- Page refresh functionality
- Modular component organisation

Additional features and improvements will be added as the project evolves.

---

## Getting Started

Clone the repository and install dependencies.


## Steps

### Locally: 

1. Install Packages

```
npm install
```

2. Build the Project

```
npm run build
```

3. Start the development server

```
npm run dev
```

4. Open your browser and navigate to:

```
http://localhost:3000
```

### Docker (production)

Run from the project root:

```sh
docker compose up --build -d
```

Open http://localhost:3001. Re-run the command after changing application code.

View logs or stop the container:

```sh
docker compose logs -f myapp
docker compose down
```

The image builds the app and runs the Next.js standalone server.

### Docker (local development with live files)

```sh
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

Open http://localhost:3001. The project root is mounted at `/app`, so source edits
are picked up by the development server without rebuilding the image. Separate
Docker volumes hold Linux dependencies and the `.next` development cache.
Dependencies are installed from the lockfile at startup; restart the service after
changing `package.json` and `package-lock.json`.

Stop the development service with:

```sh
docker compose -f docker-compose.yml -f docker-compose.dev.yml down
```

Development and production use the same service and port; run one mode at a time.

### GitHub Actions build pipeline

`.github/workflows/nextjs.yml` runs for pushes to `master` or `development`,
pull requests targeting `master`, version tags (`v*`), and manual runs. Merging
a pull request into `master` triggers a new build through the push event.
It installs dependencies and builds Next.js from `src`, builds the Dockerfile's
production `runtime` stage, and checks that the container serves the homepage.
The smoke check does not test backend API connectivity.

Successful runs upload `reactui-image-<commit SHA>` containing a compressed
Docker image, its tag, and a SHA-256 checksum. Artifacts are retained for 14 days.
The workflow does not push to a registry or deploy automatically, and does not
require API secrets during the build.

To deploy, download and extract the artifact on a Docker host, then run:

```sh
sha256sum -c SHA256SUMS
docker load --input reactui-image.tar.gz
docker run -d --name reactui --restart unless-stopped \
  --env-file /path/to/deployment.env \
  -p 3001:3001 "$(cat image-tag.txt)"
```

Set `NODE_ENV=production`, `API_BASE_URL`, `API_BASE_PORT`, `API_MAIN_URL`,
`API_HEALTH_URL`, and `XAPI_KEY` as needed in the deployment environment file.
The API hostname must be reachable from the container. If it is another Docker
service, also pass `--network <shared-network>` to `docker run`.

# END