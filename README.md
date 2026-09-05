# PennyLog — standalone expense tracker (with cross-device sync)

A real installable app, backed by a free Firebase project. Your Firebase
config lives in Vercel's environment variables — never in the git repo.


## Step 1 — Create a free Firebase project (~3 minutes)
1. Go to https://console.firebase.google.com and sign in
2. **Add project** → any name → skip Google Analytics if you want
3. Click the **web icon (`</>`)** to register a web app, give it a nickname
4. Copy the six values shown in `firebaseConfig` — you'll need them in Step 4

## Step 2 — Turn on Email/Password sign-in
**Build → Authentication → Get started → Email/Password → Enable → Save**

## Step 3 — Turn on Firestore + set security rules
1. **Build → Firestore Database → Create database → Production mode → Enable**
2. Go to the **Rules** tab, replace everything with this, then **Publish**:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /pennylog/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```
   This is what actually keeps your data private — not the secrecy of the key.

## Step 4 — Add your config as Vercel environment variables
This is the part that keeps the real key out of git entirely.
1. Open your project on https://vercel.com → **Settings → Environment Variables**
2. Add these six, one at a time, using the values from Step 1 (apply to
   Production, Preview, and Development):

   | Name | Value |
   |---|---|
   | `FIREBASE_API_KEY` | from `apiKey` |
   | `FIREBASE_AUTH_DOMAIN` | from `authDomain` |
   | `FIREBASE_PROJECT_ID` | from `projectId` |
   | `FIREBASE_STORAGE_BUCKET` | from `storageBucket` |
   | `FIREBASE_MESSAGING_SENDER_ID` | from `messagingSenderId` |
   | `FIREBASE_APP_ID` | from `appId` |

3. Go to **Authentication → Settings → Authorized domains** in Firebase
   console and add your Vercel domain (e.g. `penny-logv2.vercel.app`)

That's it — Vercel automatically runs `build.js` on every deploy, which
reads these variables and generates the real `firebase-init.js` at build
time. The file with your actual key is never written to git; only
`firebase-init.template.js` (with harmless placeholders) is committed.

## How it works under the hood
- `firebase-init.template.js` — committed to git, contains placeholder
  tokens like `__FIREBASE_API_KEY__`, completely safe to make public
- `build.js` — runs automatically on Vercel before each deploy, swaps the
  placeholders for your real environment variable values, and writes the
  actual `firebase-init.js`
- `firebase-init.js` — the generated file with real values; listed in
  `.gitignore` so it's never committed
- `vercel.json` — tells Vercel to run `npm run build` (which runs
  `build.js`) before serving the site

**Testing locally without Vercel:** copy `firebase-init.template.js` to
`firebase-init.js`, fill in real values by hand. It's gitignored, so it's
safe to do this locally — just don't `git add -f` it.

## Deploying elsewhere (Netlify, GitHub Pages)
Netlify supports the same build-command + env-vars approach (Site settings
→ Environment variables, and set the build command to `npm run build`).
GitHub Pages has **no build step**, so this approach won't work there
directly — you'd need to hardcode the config (acceptable, since the
Firestore rules are the real protection) or use a GitHub Action to inject
secrets before publishing.

## Updating your GitHub repo
Push everything in this folder except what's already gitignored
(`firebase-init.js`, `node_modules/`) — GitHub's secret scanner won't flag
anything this time, since no real key is present in any committed file.

## Files
- `index.html` — page markup and script/style links
- `style.css` — all styling, including sidebar, mobile drawer, and auth screen
- `firebase-init.template.js` — safe-to-commit config template
- `build.js` — generates the real config at Vercel build time
- `app.js` — all app logic
- `vercel.json`, `package.json` — build configuration for Vercel
- `.gitignore` — keeps the real `firebase-init.js` out of git
- `manifest.json`, `sw.js`, `icon-*.png` — PWA install support

## What's new in this version
- **Withdraw from savings** — pull money back into cash in hand from a
  specific savings category (Home quick button or Savings tab)
- **Gift / other income** — a "Gift" category under Income for money
  outside your regular salary
- **Sidebar on desktop, slide-in drawer on mobile** — tap the menu icon
  top-left, or swipe in from the left edge; swipe left or tap outside to close
- **About page** — app info, "Report a bug" (opens a GitHub issue), contact
  email (edit `CONTACT_EMAIL` near the top of `app.js`)
- **Redesigned login/signup** — branding panel on wider screens, working
  password show/hide toggle
- **Persistent login** — stays signed in until you explicitly tap Sign out,
  even after closing the browser or app. Sign out is available in the
  sidebar/drawer footer and the Goals tab
- Fixed a mobile layout bug where Spend/Savings tabs rendered too narrow
