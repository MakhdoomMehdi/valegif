# Val

`Val` is a playful Valentine-themed web app built with Next.js and React.  
It walks the user through a cute 3-step interaction:

1. A welcome screen with animated words and bee stickers.
2. A "Will you be my valentine?" choice screen where the `No` button runs away.
3. A celebration screen that shows a collage of animated Tenor GIFs.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS (installed in project)

## Prerequisites

Before running the app, install:

- Node.js 20+ (recommended LTS)
- npm (comes with Node.js)

## Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd val
npm install
```

## Setup

No environment variables are required for local development right now.

If you later add API keys or secrets, create a `.env.local` file in the project root and keep it out of version control.

## Run Locally (Development)

Start the dev server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Production Build

Create an optimized production build:

```bash
npm run build
```

Run the production server:

```bash
npm run start
```

## Lint

Run ESLint:

```bash
npm run lint
```
