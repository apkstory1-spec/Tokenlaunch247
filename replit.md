# Overview

Token Launch App is a multi-platform token launchpad built with Next.js. It allows users to deploy AI agent tokens across multiple blockchains (BSC, Base, Solana) through six different launchpad integrations (4claw, Kibu, Clawnch, SynthLaunch, Molaunch, FourClaw.Fun) and six posting agents (Moltx, Moltbook, 4claw.org, Clawstr, BapBook, Direct API). The app supports manual token launches, automated launches from trending data, and cloud-based scheduled auto-launches.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend

- **Framework**: Next.js with App Router (`app/` directory), using React Server Components where applicable and `"use client"` directives for interactive components.
- **Language**: TypeScript throughout.
- **Styling**: Tailwind CSS v4 with CSS variables for theming (dark mode default, light mode toggle). Global styles in `app/globals.css` using `@import "tailwindcss"` and `@theme inline` syntax.
- **UI Components**: shadcn/ui component library installed in `components/ui/`. Uses Radix UI primitives underneath with `class-variance-authority` for variants. The `cn()` utility from `lib/utils.ts` merges Tailwind classes.
- **Fonts**: Space Grotesk (sans) and JetBrains Mono (mono) loaded via `next/font/google`.
- **Data Fetching**: SWR (`useSWR`) for client-side API polling with auto-refresh. Components like trending tokens, recent launches, health checks, and agent feeds all use SWR to hit internal API routes.
- **State Management**: Module-level in-memory stores for cross-component state (deployed tokens list in `deployed-tokens-box.tsx`, global activity logs in `global-activity-feed.tsx`). These use listener patterns to trigger React re-renders without a state management library.

### Key Pages & Components

- `app/page.tsx` — Main dashboard. Password-gated. Contains the launch form, trending memecoins, auto-launch panels, deployed tokens tracker, health checks, activity feeds, and token tracker.
- `components/password-gate.tsx` — Simple client-side password gate (password: `xppage`) using cookies for persistence (30-day expiry).
- `components/launch-form.tsx` — Manual token launch form supporting all six launchpads and six agents with chain selection, tax configuration, and wallet settings.
- `components/auto-launch.tsx` — Client-side automated launching that cycles through trending tokens.
- `components/cloud-auto-launch.tsx` — Cloud-based auto-launch with cron/edge/server modes. Supports multiple instances.
- `components/trending-auto-launch.tsx` — Auto-launch from trending token data across chains.
- `components/trending-memecoins.tsx` — Displays trending tokens from GeckoTerminal and CoinGecko with chain filtering.
- `components/recent-launches.tsx` — Shows recently launched tokens across all launchpad sources with market data.
- `components/health-check.tsx` — Status dashboard checking availability of all launchpads, agents, data sources, and chain RPCs.
- `components/token-tracker.tsx` — Tracks deployed token performance with market cap milestones.

### Backend / API

- API routes live under `app/api/` (Next.js App Router API routes, not fully visible in the provided files but referenced by components).
- Key API endpoints referenced: `/api/health-check`, `/api/cloud-launch/cron`, `/api/token-tracker`, `/api/agent-posts`, and various launchpad-specific endpoints.
- A Vercel cron job is configured in `vercel.json` to hit `/api/cloud-launch/cron` every minute.

### Database

- **PostgreSQL** via the `pg` library (not Drizzle ORM). Connection configured through `DATABASE_URL` environment variable.
- Database module in `lib/db.ts` exports a `query()` function and `initDb()` for table creation.
- Current schema includes a `tokens` table with columns: `id` (serial), `address` (unique text), `name`, `symbol`, `decimals`, `created_at`.
- SSL is enabled with `rejectUnauthorized: false` for cloud database compatibility.

### Authentication

- Client-side only password gate — not a secure auth system. The password `xppage` is hardcoded in the component. A cookie (`xp_auth`) stores the authenticated state.
- A default admin wallet address (`0x9c6111C77CBE545B9703243F895EB593f2721C7a`) is used across launch components.

### Build & Dev

- Package manager: pnpm preferred (based on README), npm lockfile also present.
- Dev server: `next dev --turbo` (Turbopack enabled).
- Build: `next build` / `next start`.
- TypeScript config targets ES6 with bundler module resolution and path alias `@/*` mapping to project root.

## External Dependencies

### Third-Party Services & APIs

- **Launchpad APIs**: 4claw (4claw.fun), Kibu (kibu.bot), Clawnch (clawn.ch), SynthLaunch (synthlaunch.fun), Molaunch, FourClaw.Fun — external token launch platforms.
- **Posting Agents**: Moltx (moltx.io), Moltbook (moltbook.com), BapBook (bapbook.com), 4claw.org, Clawstr — social/agent platforms for announcing launches.
- **Market Data**: GeckoTerminal, CoinGecko, DexScreener — for trending tokens, price data, and pool information.
- **Blockchain RPCs**: BSC, Base, and Solana chain RPCs for on-chain interactions.
- **Ethers.js** (`ethers` v6): For Ethereum/EVM blockchain interactions.
- **Upstash Redis** (`@upstash/redis`): Listed as a dependency, likely used for rate limiting or caching.

### Database

- **PostgreSQL**: Primary data store. Requires `DATABASE_URL` environment variable.

### Key npm Packages

- `next` — Framework
- `react`, `react-dom` — UI library
- `swr` — Client-side data fetching
- `pg` — PostgreSQL client
- `ethers` — Blockchain interaction
- `@upstash/redis` — Redis client
- `recharts` — Charting library
- `vaul` — Drawer component
- `sonner` — Toast notifications
- `react-day-picker` — Calendar component
- `embla-carousel-react` — Carousel
- `react-hook-form` + `@hookform/resolvers` — Form handling
- `lucide-react` — Icons
- Full shadcn/ui Radix primitive set

### Environment Variables

- `DATABASE_URL` (required) — PostgreSQL connection string