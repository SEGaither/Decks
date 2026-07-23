# Daychanger Decks

Website for Daychanger Decks, Albertville/Guntersville/Boaz, Alabama.

Built with Next.js (App Router) and TypeScript. Deployed on Vercel.

## Local setup

**Prerequisites:** Node.js 18+ and npm.

```bash
npm install
cp .env.example .env.local
# Fill in .env.local with real values before running email features
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values. Never commit `.env.local`.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key for email delivery (obtain from resend.com) |
| `LEAD_NOTIFICATION_EMAIL` | Address that receives quote-request leads |
| `LEAD_FROM_EMAIL` | Verified sender address (must match your Resend domain) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL without trailing slash |

Production email and domain configuration will be added in a later phase.
For Vercel deployment, add these variables in the Vercel project dashboard under Settings → Environment Variables.

## Source materials

`Mailer.docx` and extracted assets in `_source/` are design references only and are not shipped in the production bundle.

## Project structure

```
app/          Next.js App Router pages and layouts
components/   Shared UI components
lib/          Utilities and server actions
types/        TypeScript type definitions
public/       Static assets (images, icons)
_source/      Source-only design materials (not deployed)
```
