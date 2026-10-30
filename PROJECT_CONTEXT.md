# PennyLog — project context (written for Claude)

**Read this first.** It replaces re-reading the old conversation. Keep it updated at the end of every piece of work (changelog + any new rule).

## Where we are right now (handoff summary, update every session)
- **Shipped: v3.1** (app, tests, this file). Features built in order: Google sign-in fix, rupee logo, History search/filters + printable statement, PIN lock, charts, dark mode, budget alerts, undo-after-delete, editable quick presets, recurring income + editable recurring items, per-person lending view, CSV bank-statement import, year in review. On the last check the user's GitHub repo was still at v2.7 (he had not yet pushed 2.8 to 3.1), so confirm what is actually deployed.
- **User's workflow:** I deliver changed files; he copies them into his local repo and pushes (Vercel auto-deploys). He sometimes uploads only some files, so compare the clone with what I delivered. He prefers short, direct replies.
- **Next up (his call):** (1) the 5-minute Firebase security check (restrict API key by referrer, confirm Firestore rules so only the owner reads their doc); (2) frequent-entry suggestions; (3) split-a-bill; (4) `public/` folder restructure; also `git rm logo-options.png` and commit this file so a plain clone has it. See "To-do" below.
- **Not verified in a real browser:** the sandbox has no browser, so UI work is covered by `tests.js` only. Ask him to eyeball new screens (both themes) and fix what he reports.

## Quick start (every session)
The sandbox resets between turns, so always start by cloning:
```
git clone https://github.com/naveen-yonko/Pennylogv2.1 && cd Pennylogv2.1
node tests.js        # 503 checks, no install needed; must end with "0 failed"
```
Compare the clone with the last files you delivered to confirm the user applied them (he sometimes uploads only some of the files).
New chat? The user can start one any time: say "clone github.com/naveen-yonko/Pennylogv2.1 and read PROJECT_CONTEXT.md first". If the repo is ever made private, `git clone` will fail and he must upload a zip instead.

## What it is
PennyLog is a personal expense / income / savings / loan tracker for one person (NaveenYonko, an Indian CS student): installable PWA, INR (₹), DD/MM/YYYY style dates, 80C tax logic for PPF/ELSS. It is NOT a framework app: plain HTML + CSS + vanilla JS, no build tooling except one tiny script for secrets.

- Repo (public): github.com/naveen-yonko/Pennylogv2.1
- Live: pennylogv21.vercel.app (Vercel auto-deploys on every commit to the repo)
- Backend: Firebase free tier. Email/password auth + one Firestore doc per user: `pennylog/{uid}`. Rules only allow `request.auth.uid == userId`.
- Secrets: Firebase config is NOT in git. Vercel env vars `FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID`. `build.js` (run by `vercel.json` → `npm run build`) fills `firebase-init.template.js` and writes the gitignored `firebase-init.js`. Never commit keys.

## Files
| File | Purpose |
|---|---|
| `index.html` | markup only (plus the empty `#printArea` used for the printable statement); loads `style.css`, `firebase-init.js` (module), `app.js` |
| `app.js` | ALL app logic + views (~1,900 lines). Global functions, inline `onclick="..."` handlers |
| `style.css` | all styles; CSS variables in `:root` (ink/paper palette; income teal, expense rust, saving green, withdraw amber, loan blue) |
| `firebase-init.template.js` / `build.js` / `vercel.json` / `package.json` / `.gitignore` | secret injection (see above). The template also exposes `signInWithGoogle` (popup, falls back to redirect) and `wipeFirestoreCache` (used by Reset this device) on `window.__fb` |
| `sw.js` | service worker, **network-first** (so updates show immediately), cache name `pennylog-v4` |
| `manifest.json`, `icon-*.png` | PWA install |
| `tests.js` | regression suite; stubs the DOM, fakes today = 2026-10-12 |
| `README.md` | Firebase/Vercel setup steps for the user |

## How app.js works (architecture rules)
- State: `DB = { txns[], goals{}, recurring[] }`, `UI` (screen state), `AUTH`. Persisted to `localStorage["pennylog-db-v1"]` and, when signed in, `setDoc(pennylog/{uid}, DB)` on every `saveDB()`. `onSnapshot` pulls changes from other devices (`suppressNextSnapshotEcho` skips our own echo). **Everything lives in one Firestore doc** (limit 1 MiB ≈ 6k+ transactions; split by year if it ever gets close).
- New settings go inside `DB.goals` (the snapshot handler only copies `txns/goals/recurring`). `normalizeDB()` fills defaults/migrations and runs on load and on every snapshot. Use **fixed ids** for default items so two devices migrating don't diverge.
- Rendering: `render()` rebuilds `#root.innerHTML` from state. Sheets (add entry, withdraw, transfer, accounts, loan form, loan pay) are overlays with **uncontrolled inputs**: read values in the submit handler. Never call `render()` on keystroke; for in-sheet changes mutate the DOM (see `setSheetType`, `refreshSheetExtras`, `togglePwVisible`).
- Inline handlers must not embed user text in strings (an apostrophe breaks them). Pass **ids or list indexes** (`onBudgetChange(index, v)`, `renameCategory(type, idx, v)`).
- **Dates are local time**: use `todayIso()/localIso()/monthKeyOffset()`. Never `toISOString()` for dates (UTC put IST entries on the wrong day).
- Tabs: Home, Income, Spend, Savings, Loans, History, Goals, About. Bottom nav shows all but About; sidebar (desktop) and slide-in drawer (mobile) show all.

## Data model
Transaction (`DB.txns`, newest first): `{ id, type, amount, category, date "YYYY-MM-DD", note, account?, source?, from?, to?, loanId? }`
- `income` (+cash), `expense` (−cash), `saving` (−cash if `source!=="external"`; `external` = side-hustle money that never sat in your accounts), `withdrawal` (savings → cash, `category` = which saving), `transfer` (between accounts, net 0), `borrow` (+cash, loan received), `repay` (−cash, loan principal), plus loan **interest** = an `expense` with `category "Loan interest"` and `loanId`.
- Lending mirrors borrowing: a loan has `dir` (`"borrow"` = you owe, the default for older loans; `"lend"` = owed to you) and `lender` always holds the other person's name. `lend` (−cash when you hand money over), `collect` (+cash, principal coming back), and **interest you receive** = an `income` with `category "Interest"` and `loanId`. Interest owed *to* you never reduces safe-to-spend.
- `account` = account id; entries without one use `goals.defaultAccount` (migrated old data → "Bank / UPI").
- Entries with `loanId` are read-only in lists; manage them on the Loans tab.

`DB.goals`: `monthlyBudgets{cat:amt}`, `monthlySalary`, `custom[]` savings goals `{id,name,target,date "YYYY-MM"}`, `accounts[] {id,name,opening,credit?}`, `defaultAccount`, `expenseCats[]`, `incomeCats[]`, `presets[] {id,label,amount,type,category}`, `loans[] {id,lender,principal,date,rate(% per month),note,status open|closed,closedDate,waived}`, `migratedV3`, legacy `sportsTarget`.
`DB.recurring[]`: `{id,type,amount,category,day,note,source?,account?,lastLoggedMonth}`.

## Money rules (do not break these)
1. `cashEffect(t)` is the single truth for cash. `cashInHand = openingTotal() + Σ cashEffect`. Sum of account balances must always equal cash in hand (`accountEffects` mirrors `cashEffect`; transfers net 0).
2. **Ledger** (`buildLedger`): per month `closing = opening + income − expense − savedFromCash + withdrawn + borrowed − repaid`; `running` starts at `openingTotal()`. A negative balance carried into a month becomes `clearance` = an automatic expense "Previous balance" (virtual row, flagged `auto`, never stored, counted in "Spent"). A positive carry is a "Balance brought forward" row. `leftover = carry + monthLeftover` and always equals cash in hand.
3. "Saved this month" = gross saved (withdrawals shown as a note). Goal progress = saved − withdrawn per category. 80C = PPF+ELSS this financial year (Apr–Mar) minus withdrawals.
4. Accounts: balances come from entries; "set balance" adjusts `opening` (a plug). Deleting an account moves its entries/opening to the default account. `credit:true` accounts may go negative.
5. **Overdraft guards**: transfers from an account with too little money are **blocked**; expenses / savings / recurring log-now / loan payments **ask to confirm** (`overdrawMessage`). Credit accounts are exempt.
6. Categories: "Other" and "Loan interest" (expense), "Salary" and "Other" (income) are locked. Rename/delete updates past entries, budgets, presets, recurring; delete moves entries to "Other". "Previous balance" is reserved.
7. Sync safety: always send Firestore `cloudCopy()` (JSON round-trip) because Firestore rejects `undefined`. Own saves echo back as snapshots with `metadata.hasPendingWrites` and are ignored. Each sign-in closes the previous snapshot listener. The device remembers its owner (`pennylog-owner`): a different account never inherits another person's local data, and Sign out wipes local data. Writes are last-write-wins on the whole doc.
8. Money is rounded to 2 decimals (`round2`) in balances, closings and left over; `fmtINR` shows whole rupees and never "−₹0".
9. Loans (both directions share `loanStats`, which picks `repay/expense` or `collect/income` by `dir`): simple interest, charged each full month on what you still owed at the start of that month (`loanStats`). Pay interest only, repay principal, or close (principal + interest due; interest can be lowered = waived). Borrowed money is not income; repaid principal is not an expense; interest is an expense. A loan auto-closes at 0 owed and reopens if a payment is undone. Suggestions (`loanSuggestions`): highest interest first, never spend cash on an interest-free loan while a costlier one is out of reach. "Safe to spend" subtracts pending recurring bills + loan interest due.

## Security model: what is public, what is secret
- **Everything the browser downloads is public**: `index.html`, `app.js`, `style.css`, and the generated `firebase-init.js` (anyone can open `/firebase-init.js`). Vercel env vars keep the Firebase config out of **git**, not out of the browser. That is fine: the Firebase web config is an identifier, not a password.
- **What actually protects the data**: Firestore rules (a user can only touch `pennylog/{their uid}`), Firebase Auth, and the authorized-domains list. Hardening still open for the user to do in consoles: restrict the web API key by HTTP referrer (`pennylogv21.vercel.app/*`, `localhost`) in Google Cloud Console → APIs & Services → Credentials; optionally App Check; optionally rules that also check the doc shape; optionally stop new sign-ups once his accounts exist.
- **Real secrets, never in the repo or any browser file**: Firebase Admin/service-account JSON, Vercel and GitHub tokens, Supabase `service_role` key, database passwords, paid third-party API keys (AI, SMS, email). They belong only in server-side env vars of a serverless function. A key committed once stays in git history: rotate it.
- The repo is public and Vercel serves every file in the repo root, so docs/tests/build scripts are readable. Nothing secret is in them. Optional cleanup (not done yet): move the site files into `public/` and set `"outputDirectory": "public"` in `vercel.json`, with `build.js` writing `public/firebase-init.js`, so only the site is served.
- Making the repo private hides code and docs from search, but the deployed JavaScript is still downloadable, and Claude could no longer clone it.

## Architecture decision: no separate backend (yet)
Firebase (Auth + Firestore + rules) already is the backend, and the JavaScript is light (~130 KB, loops over a few thousand entries). Real limits to watch: one Firestore doc ≤ 1 MiB, the whole doc is rewritten on every save (20K writes/day on the free plan), last-write-wins between devices, full re-render on each action.
Add a server only for: scheduled jobs (auto-log recurring bills and loan interest, reminders/push), AI features that need a paid key, server-side validation, or when the single doc gets too big.
Free options as of Oct 2026 (from web search; re-check before relying): **Vercel Hobby** serverless functions (no card, personal use only, cron once a day); **Supabase Free** (Postgres 500 MB + auth + row-level security + edge functions; pauses after 7 days idle); **Firebase Cloud Functions need the Blaze plan** (a billing card, even though free quotas still apply); **Azure for Students** ($100 credit, no card, via GitHub Student Pack); the DigitalOcean student credit reportedly ended 31 Jul 2026.
Migration path: keep all storage behind `saveDB / normalizeDB / onAuthChange`, move to per-month docs (`pennylog/{uid}/months/{YYYY-MM}`) first, then add functions only where needed.

## Working with the user
- Replies: concise, direct. He is not a Git expert and sends phone screenshots; plain steps, no jargon.
- Delivery format: give the **full changed files** (not line-number patches). Files are copied in the sandbox, so a full file costs almost no extra tokens, while hand-pasting patches at line numbers is error-prone (line numbers drift). He now commits from his own machine, so give plain file names and a one-line git recipe (`git add -A && git commit -m "..." && git push`). A `git diff` patch is optional.
- **Claude cannot push to GitHub** (no connector; the GitKraken plugin was suggested but never became active). Deliver only the changed files with `present_files`; he uploads them on GitHub (Add file → Upload files → Commit) and hard-refreshes (Ctrl+Shift+R). Vercel redeploys by itself.
- Method that works: edit with Python patch scripts using exact-count string replaces (fail loudly on mismatch) → syntax check (`node -e "new Function(fs.readFileSync('app.js','utf8'))"`) → add tests to `tests.js` → `node tests.js` → copy changed files to `/mnt/user-data/outputs/`.
- This file and `tests.js` live in the repo; deliver them whenever they change. Keep the to-do list below current.
- Don't put secrets or real keys in the repo, chat summaries or this file.

## Changelog (newest first)
- **3.1** **People view** (Loans > "People" chip): `loanPeople()` groups loans by `personKey(lender)` (case/space-insensitive), shows owed-to-you / you-owe totals, a net status per person, and expands (`UI.personOpen`) to that person's open loan cards and closed loans. **CSV bank-statement import** (Goals > "Import bank statement (CSV)"): `parseCsv` (quotes, BOM, `, ; tab |`), header-row and column guessing, three amount modes (one signed column / debit+credit / amount+type, incl. PennyLog's own export), date formats d/m/y or m/d/y, optional keyword category guessing (`CSV_KEYWORDS`), choice of account, preview with per-row tick boxes, one-to-one duplicate detection (same date + type + amount as an existing entry; ticked off by default), 3 MB file cap and a guard against the ~1 MiB Firestore document limit, whole import is one Undo. Only income/expense rows import; transfers and loan rows are skipped with a reason. State lives in the global `CSV`, the sheet in `viewCsvSheet()`. **Year in review** (History > "Year in review", `UI.tab = "review"`, not in the nav): totals, savings rate, 12-month bars, best / toughest / highest-spend month, average spend, biggest income, category donut, top 5 expenses, year chips. `groupedBars` bar width now adapts to the number of months.
- **3.0** **Quick presets are editable** (pencil button on each preset opens the same form pre-filled, "Save changes" updates in place; `UI.editingPresetId`). **Recurring income**: the recurring form has an Income tab ("Goes into" account), it shows in Due this month and logs as income; pending income is not counted as a bill in safe-to-spend. **Recurring items are editable** too (`UI.editingRecId`; changing the type drops fields the new type does not use; `lastLoggedMonth` is kept). New `edit` (pencil) icon.
- **2.9** **Undo after delete**: entries, transfers, loan entries, recurring items and goals are deleted without a confirm prompt and show an "Undo" toast for 8 s (`takeSnap()` before the change, `showToast(msg, snap)` after `saveDB()`, `doUndo()` restores the snapshot). Accounts, categories and loans keep their confirm prompt and also get Undo. The Undo is retired by any later save and by a remote change from another device (otherwise it would overwrite it). **Budget alerts**: Home "Budget alerts" card for categories at 80%+ of their monthly budget (amber, red when over) and a toast when an expense you save crosses 80% / 100%. Toast lives in `#toast` (index.html), outside `#root`.
- **2.8** **Dark mode** (About > Appearance: Auto / Light / Dark, per device in `localStorage["pennylog-theme"]`; `:root[data-theme="dark"]` in `style.css` overrides every colour variable; an inline script in `index.html` sets `data-theme` before first paint so there is no flash). Rule from now on: **never hard-code colours in CSS or app.js, use the variables** (`--ink`, `--card`, `--line`, `--track`, `--tint-neutral`, ...). Surfaces that stay dark in both themes (cover, login brand panel, lock screen) use `--cover-bg` / `--on-dark`, not `--ink` / `--paper`. `tests.js` fails if the dark block misses a variable.
- **2.7** History **search + filters** (text, category, account, date range; typing redraws only `#histResults`, never the whole page) with a money in/out summary and **Print / save PDF statement** (fills `#printArea`, browser print dialog; `@media print` hides the app); **PIN lock** (4-digit, SHA-256 + salt in localStorage on this device only, 5 wrong tries then timed lockout that survives reload, auto-lock setting, removed on sign out / account switch, About > App lock; it is a privacy lock, not encryption); **charts**: Home "Income vs spending" grouped bars (6 months) and Spend page "Where your money went" donut (follows This month / All time); new app icon (gold rupee in coin ring).
- **2.6** Lending ("Owed to me" view on the Loans tab, interest you receive counts as income, net position card); Google sign-in; About page "Account & device" card with Sign out, **Reset this device** (signs out, clears localStorage, Firestore offline copy, caches, service worker, IndexedDB, reloads: like Android "clear app data", cloud data kept) and Erase all my data (cloud + all devices); loan code generalised to both directions.
- **2.5** "Clear all data" (typed DELETE) + Download/Restore backup (JSON); fixed cloud sync breaking on empty fields (older recurring bills/loans), data leaking between accounts on one device, duplicate sync listeners, fragile own-save detection; sign-out wipes local data; rounding (no "−₹0", 0.1+0.2); FY check uses local dates; safe-to-spend wording; savings rate counts only savings out of income.
- **2.4** Loans tab (interest, repay, close, suggestions); overdraft guards; credit-card account flag; "Saved this month" now gross (was confusing/negative); About page fixed (repo link, contact email, version); `PROJECT_CONTEXT.md` + `tests.js` added.
- **2.3** Payment accounts + Transfer; quick presets; custom expense/income categories.
- **2.2** Customizable savings goals (old Hyrox/IRONMAN fund migrated); "Previous balance" as an automatic expense; safe-to-spend card.
- **2.1** Balance carry-over, History tab, Add buttons on every page, local-time dates, network-first service worker, delete confirmations.
- Earlier: password-eye fix, mobile drawer, sidebar, Firebase env-var setup, withdraw from savings, "outside income" savings, recurring bills, 80C tracker, CSV export, About page, redesigned login.

## Known limitations / gotchas
- CSV import assumes bank-style CSV (not Excel/PDF). Amounts use `.` as the decimal point. Duplicate detection ignores the description on purpose (manual entries rarely match bank text).
- PIN lock is per device and casual: someone with browser dev tools on an unlocked device can bypass it. "Forgot PIN" = sign out (PIN is removed), cloud data is untouched.
- Printable statement relies on the browser's Print dialog (choose "Save as PDF"); it lists real entries only, not the automatic "Previous balance" rows.
- Two deficit months in a row: the older shortfall shows in both months' "Spent" (cash figures stay correct).
- Account "set balance" shifts the opening balance, so older month-end balances shift too.
- Future-dated entries count in cash in hand immediately.
- CSV export lists real entries only (not the automatic "Previous balance" rows).
- Everything in the repo root is served publicly, including this file (nothing secret in it; see Security model).
- Two devices editing at the same time: last save wins for the whole doc.

## To-do list (keep current)
**Done:** per-person lending view; CSV import; year in review; editable presets; recurring income + editing; dark mode; search + filters + printable statement; PIN lock; income-vs-spend and category charts; accounts + transfers; presets; custom categories; goals; previous-balance expense; loans with interest + close suggestions; lending (owed to me); Google sign-in; overdraft guards; History; backup/restore/clear data; Reset this device; About fixes; project context + tests.
**Do next (user action in consoles, 5 min):** turn on the **Google** provider in Firebase → Authentication → Sign-in method (needs a support email); restrict the Firebase web API key by referrer; confirm Firestore rules; add `pennylogv21.vercel.app` to Auth authorized domains (done earlier).
**Open, by priority:**
1. Optional `public/` folder restructure so docs/tests are not served (see Security model).
2. (done: search/filters/statement, PIN lock, charts, dark mode, budget alerts, undo, per-person lending, CSV import, year in review)
4. Interest reminders / due-date nudges on loans (needs a server or push; see Architecture decision).
6. Split Firestore data into per-month docs (needed only when near 1 MiB, or before adding a backend).
7. Backend only if a trigger in "Architecture decision" appears (reminders, AI, scheduled jobs).
8. Split-a-bill; frequent-entry suggestions.
