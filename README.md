# Synq landing website

Production-ready Next.js landing site for the Synq beta, with a real early-access form, secure server-side Firestore storage, and a protected admin dashboard for viewing and exporting registrations.

## What’s included

- Responsive App Router website built with TypeScript, Tailwind CSS, and ESLint
- Editable site copy and sample data in [`src/content/site.ts`](C:\Users\ibram\OneDrive\Desktop\SynqPay Landing\landing\src\content\site.ts)
- HTML5 explainer video section with poster, captions placeholder, and development fallback
- Early-access signup form with validation, honeypot protection, optional Turnstile support, and friendly duplicate handling
- Server-side `/api/early-access` endpoint using Zod and Firebase Admin SDK
- Firestore collection storage in `earlyAccessSignups`
- Protected admin dashboard at `/admin/signups` using Firebase Authentication plus an `ADMIN_EMAILS` allowlist
- Search, filters, signup status updates, and CSV export for visible registrations
- SEO metadata, `robots.txt`, `sitemap.xml`, Open Graph and Twitter sharing images
- Basic tests for validation and the signup API

## Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Firebase Auth
- Firebase Admin SDK
- Firestore
- Zod
- Vitest

## 1. Install dependencies

```bash
npm install
```

## 2. Run the website locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 3. Add the explainer video and poster

You have two options:

- Set `NEXT_PUBLIC_DEMO_VIDEO_URL` to a hosted MP4 URL.
- Or add local files in the `public` folder:

```text
public/synq-explainer.mp4
public/synq-video-poster.jpg
```

Captions placeholder lives at [`public/synq-captions.vtt`](C:\Users\ibram\OneDrive\Desktop\SynqPay Landing\landing\public\synq-captions.vtt). Replace it with final timed captions before launch.

If the video or poster is missing, the page shows a safe development placeholder instead of breaking.

## 4. Create a Firebase project

1. Go to the Firebase console.
2. Create a new project for Synq.
3. Keep the project ID handy for both client and admin environment variables.

## 5. Enable Firestore

1. In Firebase, open Firestore Database.
2. Create the database.
3. Choose production mode.
4. Pick the region that best matches where you want the app hosted.

## 6. Create Firebase Admin credentials

1. In Firebase project settings, open the service accounts section.
2. Generate a new private key JSON file.
3. Copy the `project_id`, `client_email`, and `private_key` values into your environment variables.
4. Keep the private key secret and never commit it to Git.

This project handles escaped newline characters in `FIREBASE_PRIVATE_KEY` automatically.

## 7. Enable Google sign-in for the admin

1. In Firebase Authentication, enable Google as a sign-in provider.
2. Add the administrator email address you want to allow.
3. Put the same email address in `ADMIN_EMAILS`.

The admin dashboard rejects signed-in users whose verified email is not on the allowlist.

## 8. Set environment variables

Copy [`.env.example`](C:\Users\ibram\OneDrive\Desktop\SynqPay Landing\landing\.env.example) to `.env.local` and fill in the values:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_DEMO_VIDEO_URL`
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`
- `ADMIN_EMAILS`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `NEXT_PUBLIC_ANALYTICS_ID`

Notes:

- `NEXT_PUBLIC_DEMO_VIDEO_URL` is optional if you serve the MP4 from `public/`.
- Turnstile is optional during local development. In production, set both `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`; the signup API rejects submissions if either value is missing.
- Create a managed Turnstile widget in Cloudflare for `synq.co.za` and `www.synq.co.za`. The public site key is safe to expose to the browser; the secret key belongs only in `.env.local` and Render's environment settings.
- `NEXT_PUBLIC_ANALYTICS_ID` keeps analytics disabled by default until you intentionally enable it.

## 9. Apply Firestore rules

This project includes [`firestore.rules`](C:\Users\ibram\OneDrive\Desktop\SynqPay Landing\landing\firestore.rules), which denies direct public reads and writes to `earlyAccessSignups`.

Deploy those rules from your own Firebase project:

```bash
firebase deploy --only firestore:rules
```

## 10. Test signup submission

1. Run the site locally.
2. Open the early-access form.
3. Submit a real test email.
4. Submit the same email again to confirm the duplicate-friendly response.

All public form submissions go through `/api/early-access`. The browser never writes directly to Firestore.

## 11. View registrations in Firebase

Open the `earlyAccessSignups` collection in Firestore to confirm new documents are being created. Each document ID is a deterministic hash of the normalized email address, which prevents duplicate signups for the same email.

## 12. Access the admin dashboard

1. Visit `/admin/signups`.
2. Sign in with Google.
3. Make sure the signed-in account’s verified email is listed in `ADMIN_EMAILS`.

If Firebase Auth or Admin credentials are not configured yet, the page shows a clear setup state instead of insecure mock authentication.

## 13. Export signups

Use the `Export visible CSV` button on `/admin/signups`. Export respects the current search and filters, and CSV values are escaped safely.

## 14. Deploy to Vercel

1. Push the code to your private GitHub repository.
2. Import the repository into Vercel.
3. Add the same environment variables in the Vercel project settings.
4. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
5. Deploy.

## 15. Alternative deployment through Firebase App Hosting

1. Connect the repository to Firebase App Hosting.
2. Add all required environment variables.
3. Confirm Firestore and Auth are enabled in the same Firebase project.
4. Deploy the app.

## 16. Connect a custom domain

You can connect your own domain from either Vercel or Firebase App Hosting after the app is deployed.

## 17. Update DNS records

Your hosting provider will provide the exact DNS records. Typical steps are:

1. Add the required `A`, `CNAME`, or verification records at your domain registrar.
2. Wait for DNS propagation.
3. Confirm the domain inside your hosting dashboard.

## 18. Replace website wording through `content/site.ts`

All main website copy, contact details, navigation items, social links, video configuration, and interface sample data are centralized in [`src/content/site.ts`](C:\Users\ibram\OneDrive\Desktop\SynqPay Landing\landing\src\content\site.ts).

Update that file whenever you want to change wording without hunting through components.

## 19. Basic POPIA-conscious handling of signup information

- Collect only what you need for early-access communication and research.
- Do not store raw IP addresses.
- Do not sell personal information.
- Restrict admin access to trusted, allowlisted accounts.
- Delete records when a user asks you to do so.
- Review the final privacy wording and operational process before public launch.

## Useful commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run test
npm run build
```

## Important file locations

- Landing page: [`src/app/page.tsx`](C:\Users\ibram\OneDrive\Desktop\SynqPay Landing\landing\src\app\page.tsx)
- Site content: [`src/content/site.ts`](C:\Users\ibram\OneDrive\Desktop\SynqPay Landing\landing\src\content\site.ts)
- Signup API: [`src/app/api/early-access/route.ts`](C:\Users\ibram\OneDrive\Desktop\SynqPay Landing\landing\src\app\api\early-access\route.ts)
- Admin page: [`src/app/admin/signups/page.tsx`](C:\Users\ibram\OneDrive\Desktop\SynqPay Landing\landing\src\app\admin\signups\page.tsx)
- Admin APIs: [`src/app/api/admin`](C:\Users\ibram\OneDrive\Desktop\SynqPay Landing\landing\src\app\api\admin)
- Firebase helpers: [`src/lib/firebase-admin.ts`](C:\Users\ibram\OneDrive\Desktop\SynqPay Landing\landing\src\lib\firebase-admin.ts) and [`src/lib/firebase-client.ts`](C:\Users\ibram\OneDrive\Desktop\SynqPay Landing\landing\src\lib\firebase-client.ts)
- Firestore rules: [`firestore.rules`](C:\Users\ibram\OneDrive\Desktop\SynqPay Landing\landing\firestore.rules)

## Secrets and Git

Environment secrets must never be committed to Git. Commit only `.env.example`, never `.env.local` or real credential files.
