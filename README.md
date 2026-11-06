# Event Management Platform  
**PAPER FASHION WALK 2026** – Reusable Full-Stack Event Website

A complete, production-ready event management system built with Next.js, Prisma, Neon PostgreSQL, and Vercel. Designed so college students can deploy it **without using a terminal**.

---

## What is included

- Public event website (Home, About, Agenda, Venue, Registration, Contact)
- Configurable event branding and content
- Team registration engine (Open / RSVP / Invitation modes)
- Unique registration ID + ticket number + QR code per registrant
- Confirmation email via Resend
- SPOC (Single Point of Contact) support
- Admin dashboard with live registration metrics
- QR ticket verification & check-in
- Role-based access (Super Admin, Event Manager, Check-in Staff, etc.)
- One-time browser setup that creates Super Admin + seeds PAPER FASHION WALK data
- Reminder and email support (manual / on-demand)

---

## Student-Friendly Deployment (No Terminal Required)

### Step 1 – Download & Extract
1. Download the ZIP file.
2. Extract it on your computer. You will see a folder named `event-management-platform`.

### Step 2 – Create a GitHub Repository
1. Go to [https://github.com/new](https://github.com/new).
2. Repository name: `event-management-platform` (or any name).
3. Choose **Public**.
4. **Do not** check “Add a README”.
5. Click **Create repository**.
6. On the next page click **uploading an existing file**.
7. Drag **all files and folders** from the extracted `event-management-platform` folder into the browser.
8. Click **Commit changes**.

### Step 3 – Create a Neon Database
1. Go to [https://console.neon.tech](https://console.neon.tech) and sign up / log in.
2. Create a new project (any name).
3. After creation, open the project → **Connection Details**.
4. Copy the connection string that starts with `postgresql://…`.  
   Keep it safe – you will paste it into Vercel.

### Step 4 – Deploy on Vercel
1. Go to [https://vercel.com](https://vercel.com) and sign up / log in (use your GitHub account).
2. Click **Add New… → Project**.
3. Import the GitHub repository you just created.
4. Leave the Framework Preset as **Next.js**.
5. Click **Environment Variables** and add the following:

| Name | Value | Notes |
|------|-------|-------|
| `DATABASE_URL` | (paste Neon connection string) | Required |
| `NEXTAUTH_SECRET` | (long random string) | Required – generate at https://generate-secret.vercel.app/32 |
| `NEXT_PUBLIC_APP_URL` | `https://your-project-name.vercel.app` | Use the URL Vercel will give you (you can update it after first deploy) |
| `RESEND_API_KEY` | (from resend.com) | Optional – needed for real emails |
| `RESEND_FROM_EMAIL` | `onboarding@resend.dev` | Optional |
| `RESEND_FROM_NAME` | `PAPER FASHION WALK` | Optional |

6. Click **Deploy**.

Vercel will automatically run `npm install`, generate the Prisma client, and build the app.

### Step 5 – First-Time Setup (Create Admin + Seed Event)
1. After deployment finishes, open your live site: `https://your-project.vercel.app/setup`
2. Enter a name, email and password (min 8 characters) for the Super Admin.
3. Click **Complete Setup**.
4. You will be redirected to the login page.
5. Log in with the credentials you just created.
6. You are now in the Admin Dashboard. The PAPER FASHION WALK 2026 event is already seeded.

### Step 6 – (Optional) Enable Real Emails
1. Create a free account at [https://resend.com](https://resend.com).
2. Create an API key.
3. Add `RESEND_API_KEY`, `RESEND_FROM_EMAIL` and `RESEND_FROM_NAME` in Vercel → Settings → Environment Variables.
4. Redeploy (Vercel → Deployments → … → Redeploy).

---

## Local Development (Optional – only if you have Node.js)

```bash
npm install
cp .env.example .env.local
# edit .env.local with your DATABASE_URL and NEXTAUTH_SECRET
npx prisma db push
npm run dev
```

Then open http://localhost:3000/setup

---

## Important URLs after deployment

| URL | Purpose |
|-----|---------|
| `/` | Public homepage |
| `/register` | Team registration form |
| `/setup` | One-time Super Admin + event seed |
| `/auth/login` | Admin login |
| `/admin` | Dashboard |
| `/verify?token=…` | Ticket verification (used by QR codes) |

---

## Default Seeded Event

- **Name**: PAPER FASHION WALK 2026  
- **Theme**: REIMAGINE • RECYCLE • RAMP WALK  
- **Date**: Saturday, 7 November 2026  
- **Venue**: Classroom 3, PG Building, KLE CBALC, Belagavi  
- **Teams**: 8 slots, 2–5 members each  
- **Entry**: Free  
- **Ticket type**: Team Participation  

You can change all of this later from the Admin dashboard.

---

## Security Notes

- Never commit real secrets to GitHub.
- Always set `NEXTAUTH_SECRET` to a long random value.
- The `/api/setup` endpoint only works when **zero users** exist.
- All admin routes check the user’s role on the server.

---

## Troubleshooting

**“Database not connected”**  
→ Check that `DATABASE_URL` is correct in Vercel and that the Neon project is active.

**Build fails on Vercel**  
→ Open the build log. Most issues are missing environment variables or an incorrect `DATABASE_URL`.

**Emails not sending**  
→ `RESEND_API_KEY` is optional. Without it, registration still works; only the confirmation email is skipped.

**QR codes**  
→ Generated automatically on successful registration. The QR points to `/verify?token=…`.

---

## Tech Stack

- Next.js 15 (App Router) + TypeScript  
- Tailwind CSS  
- Prisma ORM + Neon Serverless PostgreSQL  
- NextAuth (Credentials)  
- Resend (email)  
- QRCode library  
- Deployed on Vercel  

---

Built as a reusable, student-deployable event management platform.
