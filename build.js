// Runs automatically on Vercel before deploy (see vercel.json "buildCommand").
// Reads Firebase config from environment variables and writes the real
// firebase-init.js — which is gitignored, so the actual key values are
// never stored in your repository or its history.
const fs = require("fs");

const required = [
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_STORAGE_BUCKET",
  "FIREBASE_MESSAGING_SENDER_ID",
  "FIREBASE_APP_ID",
];

const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
  console.error("Missing required environment variables:", missing.join(", "));
  console.error("Set these in Vercel: Project Settings -> Environment Variables");
  process.exit(1);
}

let template = fs.readFileSync("firebase-init.template.js", "utf8");
template = template
  .replace("__FIREBASE_API_KEY__", process.env.FIREBASE_API_KEY)
  .replace("__FIREBASE_AUTH_DOMAIN__", process.env.FIREBASE_AUTH_DOMAIN)
  .replace("__FIREBASE_PROJECT_ID__", process.env.FIREBASE_PROJECT_ID)
  .replace("__FIREBASE_STORAGE_BUCKET__", process.env.FIREBASE_STORAGE_BUCKET)
  .replace("__FIREBASE_MESSAGING_SENDER_ID__", process.env.FIREBASE_MESSAGING_SENDER_ID)
  .replace("__FIREBASE_APP_ID__", process.env.FIREBASE_APP_ID);

fs.writeFileSync("firebase-init.js", template);
console.log("firebase-init.js generated from environment variables.");
