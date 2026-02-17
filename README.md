# Token Launch App

This project is a token launch platform built with Next.js.

## Cloud Setup

This app is configured to use a PostgreSQL database for persistent storage, replacing the previous RAM-based storage.

### Environment Variables

Required secrets:
- `DATABASE_URL`: Your PostgreSQL connection string.

### Deployment

To deploy to GitHub or other cloud providers:
1. Push the code to a GitHub repository.
2. Connect the repository to your cloud provider (e.g., Vercel, Replit).
3. Set the `DATABASE_URL` environment variable in your deployment settings.

## Local Development

1. Install dependencies: `pnpm install`
2. Run dev server: `pnpm dev`
