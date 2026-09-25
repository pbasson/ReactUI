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

# END