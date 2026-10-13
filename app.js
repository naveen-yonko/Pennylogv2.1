/* ==================== constants ==================== */
const CATS_EXPENSE = ["Food","Transport","Rent","Utilities","Shopping","Health","Entertainment","Other"];
const CATS_SAVING_BASE = ["SIP / Index fund","PPF","ELSS","Emergency fund"];
const LEGACY_SPORTS = "Sports fund (Hyrox/IRONMAN)"; // old hardcoded goal, migrated into a customizable goal
const CLEARANCE_CATEGORY = "Previous balance";
const CATS_INCOME = ["Salary","Freelance","Bonus","Interest","Gift","Other"];
const TAX_80C_LIMIT = 150000;
const GITHUB_REPO = "https://github.com/naveen-yonko/PennyLog";
const CONTACT_EMAIL = "naveenyonko@example.com"; // TODO: replace with your real contact email

const TYPE_META = {
  income:     { label: "Income",     color: "var(--income)",  tint: "var(--income-tint)",  sign: "+" },
  expense:    { label: "Expense",    color: "var(--expense)", tint: "var(--expense-tint)", sign: "\u2212" },
  saving:     { label: "Saving",     color: "var(--saving)",  tint: "var(--saving-tint)",  sign: "+" },
  withdrawal: { label: "Withdrawal", color: "var(--withdraw)", tint: "var(--withdraw-tint)", sign: "+" },
};

const ICONS = {
  home: '<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9h12v-9"/><path d="M10 19v-5h4v5"/>',
  income: '<rect x="3.5" y="9" width="17" height="11" rx="1.5"/><path d="M12 3v9"/><path d="M8.5 8.5 12 12l3.5-3.5"/>',
  expense: '<rect x="3.5" y="9" width="17" height="11" rx="1.5"/><path d="M12 12V3"/><path d="M8.5 6.5 12 3l3.5 3.5"/>',
  savings: '<path d="M12 20c0-5 2.5-8 2.5-11.5A2.5 2.5 0 0 0 12 6a2.5 2.5 0 0 0-2.5 2.5c0 1 .3 1.8.9 2.6"/><path d="M12 20c0-4-2-6.5-4.5-7.5"/><path d="M9 3.5c1 .5 1.6 1.4 2 2.5"/>',
  goals: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.2"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/>',
  about: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5"/><circle cx="12" cy="8" r="0.6" fill="currentColor"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  trash: '<path d="M4 6.5h16"/><path d="M8.5 6.5V5a1.5 1.5 0 0 1 1.5-1.5h4A1.5 1.5 0 0 1 15.5 5v1.5"/><path d="M6.5 6.5 7.3 19a1.5 1.5 0 0 0 1.5 1.4h6.4a1.5 1.5 0 0 0 1.5-1.4l.8-12.5"/><path d="M10.3 10.5v6.2M13.7 10.5v6.2"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  sprout: '<path d="M12 21v-8"/><path d="M12 13c0-3.5-2.5-5.5-6-5.5.3 3.7 2.5 5.7 6 5.5Z"/><path d="M12 10.5c0-3 2.2-4.8 5.3-4.8-.3 3.2-2.2 5-5.3 4.8Z"/>',
  repeat: '<path d="M4 7.5h11.5A3.5 3.5 0 0 1 19 11v1"/><path d="M13 4.5 16 7.5 13 10.5"/><path d="M20 16.5H8.5A3.5 3.5 0 0 1 5 13v-1"/><path d="M11 19.5 8 16.5 11 13.5"/>',
  download: '<path d="M12 4v11"/><path d="M7.5 11 12 15.5 16.5 11"/><path d="M5 18.5h14"/>',
  shield: '<path d="M12 3.5 19 6v5.5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-2.5Z"/><path d="M9 12l2 2 4-4.5"/>',
  user: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c1-4 4.5-6 7-6s6 2 7 6"/>',
  chevron: '<path d="M9 6l6 6-6 6"/>',
  bug: '<circle cx="12" cy="13" r="6"/><path d="M12 7V4M9 4.5 8 3M15 4.5l1-1.5"/><path d="M6 13H3M21 13h-3M7 17l-2.5 2M17 17l2.5 2M7 9l-2.5-2M17 9l2.5-2"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 6.5l8 6 8-6"/>',
  eye: '<path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.5"/>',
  eyeOff: '<path d="M3 3l18 18"/><path d="M10.6 5.7A9.9 9.9 0 0 1 12 5.5c6 0 9.5 6.5 9.5 6.5a13.8 13.8 0 0 1-3 3.6M6.4 6.4C4 8 2.5 10.5 2.5 12c0 0 3.5 6.5 9.5 6.5 1.4 0 2.7-.3 3.8-.9"/><path d="M9.9 10a2.5 2.5 0 0 0 3.5 3.5"/>',
  menu: '<path d="M4 6.5h16M4 12h16M4 17.5h16"/>',
  history: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
};
function icon(name, size) {
  size = size || 18;
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</svg>`;
}
function catIcon(type) { return (type === "income" || type === "withdrawal") ? "income" : type === "saving" ? "sprout" : "expense"; }
// Savings categories = built-ins + your own goals + any older category still used by past entries
function savingCategories() {
  const names = [...CATS_SAVING_BASE];
  (DB.goals.custom || []).forEach(g => { if (!names.includes(g.name)) names.push(g.name); });
  DB.txns.forEach(t => { if ((t.type==="saving"||t.type==="withdrawal") && t.category && t.category!=="Other" && !names.includes(t.category)) names.push(t.category); });
  names.push("Other");
  return names;
}
function catsFor(type) { return type === "income" ? CATS_INCOME : type === "saving" ? savingCategories() : CATS_EXPENSE; }

/* ==================== helpers ==================== */
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
function fmtINR(n) {
  const v = Number(n || 0);
  const sign = v < 0 ? "\u2212" : "";
  return sign + "\u20B9" + Math.abs(v).toLocaleString("en-IN", { maximumFractionDigits: 0 });
}
function fmtDateShort(iso) { const d = new Date(iso + "T00:00:00"); return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }); }
function monthKey(iso) { return iso.slice(0, 7); }
// Local-time dates (toISOString is UTC, which put entries on the wrong day for IST after midnight)
function localIso(d) { return d.getFullYear() + "-" + String(d.getMonth()+1).padStart(2,"0") + "-" + String(d.getDate()).padStart(2,"0"); }
function todayIso() { return localIso(new Date()); }
function monthKeyOffset(offset) { const n = new Date(); return localIso(new Date(n.getFullYear(), n.getMonth()+offset, 1)).slice(0,7); }
function monthLong(key) { const [y,m] = key.split("-"); return new Date(Number(y), Number(m)-1, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" }); }
// How a transaction moves your cash in hand
function cashEffect(t) {
  if (t.type === "income" || t.type === "withdrawal") return t.amount;
  if (t.type === "expense") return -t.amount;
  if (t.type === "saving") return t.source === "external" ? 0 : -t.amount;
  return 0;
}
function sortTxns(list) { return [...list].sort((a,b) => b.date.localeCompare(a.date)); }
function monthLabel(key) { const [y,m] = key.split("-"); return new Date(Number(y), Number(m)-1, 1).toLocaleDateString("en-GB", { month: "short" }); }
function fyRange(now) {
  now = now || new Date();
  const y = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
  return { start: new Date(y,3,1), end: new Date(y+1,2,31,23,59,59), label: `FY ${y}-${String(y+1).slice(2)}` };
}
function inRange(iso, r) { const d = new Date(iso); return d >= r.start && d <= r.end; }
function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c])); }

/* ==================== storage ==================== */
const STORE_KEY = "pennylog-db-v1";
function emptyDB() { return { txns: [], goals: { monthlyBudgets: {}, sportsTarget: 0, monthlySalary: 0, custom: [] }, recurring: [] }; }
// Fills in missing fields and moves the old hardcoded sports fund into a normal, editable goal (once)
function normalizeDB(d) {
  d = d || emptyDB();
  d.txns = d.txns || [];
  d.recurring = d.recurring || [];
  d.goals = Object.assign({ monthlyBudgets: {}, sportsTarget: 0, monthlySalary: 0 }, d.goals || {});
  if (!Array.isArray(d.goals.custom)) d.goals.custom = [];
  if (!d.goals.migratedV3) {
    const used = d.txns.some(t => t.category === LEGACY_SPORTS);
    if ((d.goals.sportsTarget > 0 || used) && !d.goals.custom.some(g => g.name === LEGACY_SPORTS)) {
      d.goals.custom.push({ id: uid(), name: LEGACY_SPORTS, target: d.goals.sportsTarget || 0, date: "" });
    }
    d.goals.migratedV3 = true;
  }
  return d;
}
function loadLocalDB() {
  try { const raw = localStorage.getItem(STORE_KEY); if (raw) return JSON.parse(raw); } catch (e) {}
  return emptyDB();
}
function saveLocalDB() { localStorage.setItem(STORE_KEY, JSON.stringify(DB)); }

let DB = normalizeDB(loadLocalDB());
let UI = { tab: "home", showForm: false, formType: "expense", editingId: null, recurringOpen: false, goalFormOpen: false, formSource: "income", showWithdraw: false, pwVisible: false, mobileMenuOpen: false, listScope: "month", histFilter: "all" };
let AUTH = { user: null, ready: false, mode: "login", error: "", syncState: "offline" };
let suppressNextSnapshotEcho = false;

function saveDB() {
  saveLocalDB();
  if (AUTH.user && window.__fb) {
    const { dbFs, doc, setDoc } = window.__fb;
    suppressNextSnapshotEcho = true;
    setDoc(doc(dbFs, "pennylog", AUTH.user.uid), DB).then(() => {
      AUTH.syncState = "synced"; render();
    }).catch(() => { AUTH.syncState = "error"; render(); });
  }
}

/* ==================== firebase auth wiring ==================== */
window.onAuthChange = function (user) {
  AUTH.user = user;
  AUTH.ready = true;
  if (user && window.__fb) {
    const { dbFs, doc, onSnapshot } = window.__fb;
    onSnapshot(doc(dbFs, "pennylog", user.uid), (snap) => {
      if (suppressNextSnapshotEcho) { suppressNextSnapshotEcho = false; AUTH.syncState = "synced"; render(); return; }
      if (snap.exists()) {
        const data = snap.data();
        DB = normalizeDB({ txns: data.txns || [], goals: data.goals || emptyDB().goals, recurring: data.recurring || [] });
        saveLocalDB();
      } else {
        window.__fb.setDoc(doc(dbFs, "pennylog", user.uid), DB);
      }
      AUTH.syncState = "synced";
      render();
    }, () => { AUTH.syncState = "error"; render(); });
  }
  render();
};

/* ==================== derived stats ==================== */
function computeStats() {
  const txns = DB.txns;
  const thisMonth = todayIso().slice(0, 7);

  const totalIncome = txns.filter(t=>t.type==="income").reduce((s,t)=>s+t.amount,0);
  const totalExpense = txns.filter(t=>t.type==="expense").reduce((s,t)=>s+t.amount,0);
  const totalSavingRaw = txns.filter(t=>t.type==="saving").reduce((s,t)=>s+t.amount,0);
  const totalSavingFromCash = txns.filter(t=>t.type==="saving" && t.source!=="external").reduce((s,t)=>s+t.amount,0);
  const totalSavingExternal = totalSavingRaw - totalSavingFromCash;
  const totalWithdrawn = txns.filter(t=>t.type==="withdrawal").reduce((s,t)=>s+t.amount,0);
  const totalSaving = totalSavingRaw - totalWithdrawn; // net currently saved
  const cashInHand = totalIncome - totalExpense - totalSavingFromCash + totalWithdrawn;

  const monthTxns = txns.filter(t=>monthKey(t.date)===thisMonth);
  const monthIncome = monthTxns.filter(t=>t.type==="income").reduce((s,t)=>s+t.amount,0);
  const ledger = buildLedger();
  const curM = ledger.find(m => m.key === thisMonth) || { carry: 0, clearance: 0, opening: 0 };
  const monthExpenseReal = monthTxns.filter(t=>t.type==="expense").reduce((s,t)=>s+t.amount,0);
  const monthClearance = curM.clearance;
  const monthExpense = monthExpenseReal + monthClearance; // what you "spent" this month, shortfall included
  const monthSavingRaw = monthTxns.filter(t=>t.type==="saving").reduce((s,t)=>s+t.amount,0);
  const monthSavingFromCash = monthTxns.filter(t=>t.type==="saving" && t.source!=="external").reduce((s,t)=>s+t.amount,0);
  const monthWithdrawn = monthTxns.filter(t=>t.type==="withdrawal").reduce((s,t)=>s+t.amount,0);
  const monthSaving = monthSavingRaw - monthWithdrawn;
  // Left over = carried-forward surplus + income - spent (incl. shortfall cleared) - saved + withdrawn
  const openingBalance = curM.opening;
  const monthLeftover = monthIncome - monthExpense - monthSavingFromCash + monthWithdrawn;
  const leftover = curM.carry + monthLeftover;

  const byCat = {};
  monthTxns.filter(t=>t.type==="expense").forEach(t=>{ byCat[t.category]=(byCat[t.category]||0)+t.amount; });
  if (monthClearance > 0) byCat[CLEARANCE_CATEGORY] = monthClearance;

  // net saved per category (all-time inflow minus withdrawals from that category)
  const netByCategory = {};
  txns.filter(t=>t.type==="saving").forEach(t=>{ netByCategory[t.category] = (netByCategory[t.category]||0) + t.amount; });
  txns.filter(t=>t.type==="withdrawal").forEach(t=>{ netByCategory[t.category] = (netByCategory[t.category]||0) - t.amount; });
  const goalProgress = (DB.goals.custom || []).map(g => ({ ...g, saved: netByCategory[g.name] || 0 }));

  const days = [];
  for (let i=13;i>=0;i--) {
    const d = new Date(); d.setDate(d.getDate()-i);
    const iso = localIso(d);
    const net = txns.filter(t=>t.date===iso).reduce((s,t)=>s+cashEffect(t),0);
    days.push(net);
  }
  const months = [];
  for (let i=5;i>=0;i--) {
    const key = monthKeyOffset(-i);
    // month-end balance = everything up to and including that month
    const closing = txns.filter(t=>monthKey(t.date)<=key).reduce((s,t)=>s+cashEffect(t),0);
    months.push({ key, leftover: closing });
  }
  const fy = fyRange();
  const tax80cIn = txns.filter(t=>t.type==="saving" && (t.category==="PPF"||t.category==="ELSS") && inRange(t.date, fy)).reduce((s,t)=>s+t.amount,0);
  const tax80cOut = txns.filter(t=>t.type==="withdrawal" && (t.category==="PPF"||t.category==="ELSS") && inRange(t.date, fy)).reduce((s,t)=>s+t.amount,0);
  const tax80c = Math.max(0, tax80cIn - tax80cOut);

  const lastMonthKey = monthKeyOffset(-1);
  const lastMonthTxns = txns.filter(t=>monthKey(t.date)===lastMonthKey);
  const lastM = ledger.find(m => m.key === lastMonthKey);
  const lastMonthExpense = lastM ? lastM.spent : 0;
  const lastMonthSaving = lastMonthTxns.filter(t=>t.type==="saving").reduce((s,t)=>s+t.amount,0) - lastMonthTxns.filter(t=>t.type==="withdrawal").reduce((s,t)=>s+t.amount,0);
  const expenseDelta = lastMonthExpense>0 ? Math.round(((monthExpense-lastMonthExpense)/lastMonthExpense)*100) : null;
  const savingDelta = lastMonthSaving>0 ? Math.round(((monthSaving-lastMonthSaving)/lastMonthSaving)*100) : null;

  return { thisMonth, cashInHand, openingBalance, openingCarry: curM.carry, monthClearance, monthExpenseReal, leftover, monthWithdrawn, monthSavingFromCash, monthIncome, monthExpense, monthSaving, monthLeftover, byCat, goalProgress, netByCategory, totalSaving, totalSavingFromCash, totalSavingExternal, totalWithdrawn, totalIncome, days, months, tax80c, fy, expenseDelta, savingDelta };
}

// The automatic "Previous balance" expense (calculated, so it can never go stale)
function autoEntry(key, prevKey, amount) {
  return { id: "auto-" + key, type: "expense", amount, category: CLEARANCE_CATEGORY, date: key + "-01", note: "Shortfall from " + monthLabel(prevKey) + " cleared", auto: true };
}
function allExpensesView() { return buildLedger().flatMap(m => m.txns.filter(t => t.auto)); }
// Real entries plus the automatic ones, for display lists
function viewTxns() { return DB.txns.concat(allExpensesView()); }

// Month-by-month ledger: opening balance, movements, closing balance
function buildLedger() {
  const txns = DB.txns;
  const keys = new Set(txns.map(t => monthKey(t.date)));
  keys.add(todayIso().slice(0,7));
  const sorted = [...keys].sort();
  let running = 0, prevKey = null;
  const out = [];
  sorted.forEach(key => {
    const mt = txns.filter(t => monthKey(t.date) === key);
    const income = mt.filter(t=>t.type==="income").reduce((s,t)=>s+t.amount,0);
    const expense = mt.filter(t=>t.type==="expense").reduce((s,t)=>s+t.amount,0);
    const saved = mt.filter(t=>t.type==="saving" && t.source!=="external").reduce((s,t)=>s+t.amount,0);
    const withdrawn = mt.filter(t=>t.type==="withdrawal").reduce((s,t)=>s+t.amount,0);
    const opening = running;
    // A negative balance from the previous month is cleared as an expense in this month.
    // (Cash is unchanged: that shortfall is already inside the running balance.)
    const clearance = Math.max(0, -opening);
    const carry = Math.max(0, opening);
    const closing = opening + income - expense - saved + withdrawn;
    running = closing;
    const rows = sortTxns(mt);
    if (clearance > 0 && prevKey) rows.push(autoEntry(key, prevKey, clearance));
    out.push({ key, prevKey, opening, carry, clearance, closing, income, expense, spent: expense + clearance, saved, withdrawn, txns: rows });
    prevKey = key;
  });
  return out.reverse(); // newest first
}

function dueRecurring(thisMonth) {
  const today = new Date().getDate();
  return DB.recurring.filter(r => r.lastLoggedMonth !== thisMonth && today >= r.day - 5).sort((a,b)=>a.day-b.day);
}

/* ==================== mutations ==================== */
function addTxn(entry) { DB.txns.unshift({ id: uid(), ...entry }); saveDB(); }
function updateTxn(id, entry) { DB.txns = DB.txns.map(t => t.id===id ? {...t, ...entry} : t); saveDB(); }
function deleteTxn(id) { DB.txns = DB.txns.filter(t => t.id!==id); saveDB(); }
function addRecurring(entry) { DB.recurring.unshift({ id: uid(), lastLoggedMonth: null, ...entry }); saveDB(); }
function deleteRecurring(id) { DB.recurring = DB.recurring.filter(r => r.id!==id); saveDB(); }
function logRecurring(id, thisMonth) {
  const item = DB.recurring.find(r=>r.id===id);
  if (!item) return;
  DB.txns.unshift({ id: uid(), type:item.type, amount:item.amount, category:item.category, date:todayIso(), note:item.note||"Recurring", source: item.source || "income" });
  DB.recurring = DB.recurring.map(r => r.id===id ? {...r, lastLoggedMonth: thisMonth} : r);
  saveDB();
}
function saveGoalsPatch(patch) { DB.goals = { ...DB.goals, ...patch }; saveDB(); }

/* ==================== render helpers ==================== */
function sparkline(data) {
  if (!data || data.every(d=>d===0)) return "";
  const w=84,h=34,pad=3;
  const max = Math.max(...data.map(Math.abs),1);
  const step = (w-pad*2)/(data.length-1);
  const pts = data.map((d,i)=>`${pad+i*step},${h/2-(d/max)*(h/2-pad)}`).join(" ");
  return `<svg width="${w}" height="${h}" style="flex-shrink:0">
    <line x1="0" y1="${h/2}" x2="${w}" y2="${h/2}" stroke="rgba(251,248,242,0.15)" stroke-width="1"/>
    <polyline points="${pts}" fill="none" stroke="#C9A85E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}
function trendChart(months) {
  const w=300,h=90,barW=22,gap=(w-barW*months.length)/(months.length+1);
  const max = Math.max(...months.map(m=>Math.abs(m.leftover)),1000);
  let bars = "";
  months.forEach((m,i)=>{
    const barH = Math.max(2,(Math.abs(m.leftover)/max)*(h/2-6));
    const x = gap+i*(barW+gap);
    const positive = m.leftover>=0;
    const y = positive ? h/2-barH : h/2;
    bars += `<rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="3" fill="${positive?'var(--saving)':'var(--expense)'}" opacity="0.85"/>
      <text x="${x+barW/2}" y="${h+13}" text-anchor="middle" font-size="9.5" fill="var(--ink-faint)">${monthLabel(m.key)}</text>`;
  });
  return `<svg width="100%" viewBox="0 0 ${w} ${h+18}" style="display:block">
    <line x1="0" y1="${h/2}" x2="${w}" y2="${h/2}" stroke="var(--line)" stroke-width="1"/>${bars}
  </svg>`;
}
function metricCard(label, value, opts) {
  opts = opts || {};
  let deltaHtml = "";
  if (opts.delta !== null && opts.delta !== undefined) {
    const good = opts.deltaGood === "up" ? opts.delta >= 0 : opts.delta <= 0;
    const color = good ? "var(--saving)" : "var(--expense)";
    const arrow = opts.delta === 0 ? "Same as" : (opts.delta > 0 ? `\u2191 ${Math.abs(opts.delta)}% vs` : `\u2193 ${Math.abs(opts.delta)}% vs`);
    deltaHtml = `<p style="font-size:10.5px;margin:3px 0 0;color:${color}">${arrow} last month</p>`;
  }
  const noteHtml = opts.note ? `<p style="font-size:10.5px;margin:3px 0 0;color:var(--ink-soft)">${esc(opts.note)}</p>` : "";
  const color = opts.highlight && value < 0 ? "var(--danger)" : "var(--ink)";
  return `<div class="metric">
    <p style="font-size:11.5px;color:var(--ink-soft);margin:0 0 5px">${esc(label)}</p>
    <p class="num" style="font-size:18px;font-weight:700;margin:0;color:${color}">${fmtINR(value)}</p>
    ${deltaHtml}${noteHtml}
  </div>`;
}
function txnRow(t, editable) {
  const meta = TYPE_META[t.type];
  if (t.auto) editable = false;
  const clickAttr = editable ? `onclick="openEdit('${t.id}')"` : "";
  const autoTag = t.auto ? `<span class="pill" style="background:var(--brass-tint);color:var(--brass);margin-left:6px;vertical-align:1px">Auto</span>` : "";
  const extTag = (t.type === "saving" && t.source === "external") ? `<span class="pill" style="background:var(--brass-tint);color:var(--brass);margin-left:6px;vertical-align:1px">Outside income</span>` : "";
  const wdTag = t.type === "withdrawal" ? `<span class="pill" style="background:var(--withdraw-tint);color:var(--withdraw);margin-left:6px;vertical-align:1px">To cash</span>` : "";
  return `<button class="row" ${clickAttr} style="${editable?'':'cursor:default'}">
    <div style="display:flex;align-items:center;gap:11px;min-width:0;flex:1">
      <span class="icon-badge" style="background:${meta.tint};color:${meta.color}">${icon(catIcon(t.type),15)}</span>
      <div style="min-width:0;text-align:left">
        <p style="font-size:13.5px;margin:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--ink)">${esc(t.category)}${extTag}${wdTag}${autoTag}</p>
        <p style="font-size:11.5px;color:var(--ink-faint);margin:0">${fmtDateShort(t.date)}${t.note?` \u00b7 ${esc(t.note)}`:""}</p>
      </div>
    </div>
    <span class="num" style="font-size:13.5px;font-weight:700;color:${meta.color};flex-shrink:0">${meta.sign}${fmtINR(t.amount)}</span>
  </button>`;
}
function sectionLabel(text, iconName) {
  return `<div class="section-label">${iconName?icon(iconName,15):""}<span>${esc(text)}</span></div>`;
}

/* ==================== tab views ==================== */
function viewHome(stats) {
  const recent = sortTxns(viewTxns()).slice(0,5);
  const topCats = Object.entries(stats.byCat).sort((a,b)=>b[1]-a[1]).slice(0,4);
  const maxCat = topCats.length ? topCats[0][1] : 1;
  const due = dueRecurring(stats.thisMonth);

  let html = `<div style="display:flex;gap:6px;margin-bottom:14px">
    <button class="quickbtn" onclick="openForm('income')"><span class="badge" style="background:var(--income-tint);color:var(--income)">${icon('plus',15)}</span>Income</button>
    <button class="quickbtn" onclick="openForm('expense')"><span class="badge" style="background:var(--expense-tint);color:var(--expense)">${icon('expense',15)}</span>Expense</button>
    <button class="quickbtn" onclick="openForm('saving')"><span class="badge" style="background:var(--saving-tint);color:var(--saving)">${icon('sprout',15)}</span>Saving</button>
    <button class="quickbtn" onclick="openWithdraw()"><span class="badge" style="background:var(--withdraw-tint);color:var(--withdraw)">${icon('download',15)}</span>Withdraw</button>
  </div>`;

  if (due.length) {
    html += `<div class="card" style="border-color:var(--brass-tint);background:var(--brass-tint)">${sectionLabel("Due this month","repeat")}`;
    due.forEach(r => {
      html += `<div class="row" style="border-bottom-color:rgba(28,27,25,0.08);cursor:default">
        <div><p style="font-size:13px;margin:0">${esc(r.category)}</p><p style="font-size:11.5px;color:var(--ink-soft);margin:0">Day ${r.day} \u00b7 ${fmtINR(r.amount)}</p></div>
        <button class="btn-ghost" style="padding:6px 12px;font-size:12px;background:var(--card)" onclick="event.stopPropagation();doLogRecurring('${r.id}')">Log now</button>
      </div>`;
    });
    html += `</div>`;
  }

  html += `<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-bottom:14px">
    ${metricCard("Income this month", stats.monthIncome)}
    ${metricCard("Spent this month", stats.monthExpense, { delta: stats.expenseDelta, deltaGood: "down" })}
    ${metricCard("Saved this month", stats.monthSaving, { delta: stats.savingDelta, deltaGood: "up" })}
    ${metricCard("Left over", stats.leftover, { highlight: true, note: stats.monthClearance > 0 ? `After clearing ${fmtINR(stats.monthClearance)} from last month` : (stats.openingCarry > 0 ? `Incl. ${fmtINR(stats.openingCarry)} brought forward` : "") })}
  </div>`;

  html += safeToSpendCard(stats);
  html += reconcileCard(stats);

  html += `<div class="card">${sectionLabel("6-month trend \u00b7 month-end balance")}${trendChart(stats.months)}</div>`;

  if (topCats.length) {
    html += `<div class="card">${sectionLabel("Top spending this month")}<div style="display:flex;flex-direction:column;gap:11px">`;
    topCats.forEach(([cat,amt]) => {
      html += `<div><div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:5px"><span style="color:var(--ink-soft)">${esc(cat)}</span><span class="num" style="font-weight:700">${fmtINR(amt)}</span></div>
        <div class="track"><div class="fill" style="width:${(amt/maxCat)*100}%;background:var(--expense)"></div></div></div>`;
    });
    html += `</div></div>`;
  }

  html += homeGoalsCard(stats);

  html += `<div class="card">${sectionLabel("Recent activity")}`;
  if (!recent.length) html += `<p class="muted">Nothing logged yet — use the buttons above to add your first entry.</p>`;
  else recent.forEach(t => html += txnRow(t, true));
  html += `<button class="btn-ghost" style="width:100%;margin-top:10px;padding:9px;font-size:12.5px" onclick="setTab('history')">View full history</button>`;
  html += `</div>`;

  return html;
}

// Shows exactly how "Left over" is built
function reconcileCard(stats) {
  const row = (label, val, sign, color) => `<div style="display:flex;justify-content:space-between;font-size:12.5px;padding:4px 0"><span style="color:var(--ink-soft)">${esc(label)}</span><span class="num" style="font-weight:700;color:${color||'var(--ink)'}">${sign}${fmtINR(Math.abs(val))}</span></div>`;
  const prev = monthLabel(monthKeyOffset(-1));
  let h = `<div class="card">${sectionLabel("This month, line by line")}`;
  if (stats.openingCarry > 0) h += row(`Brought forward from ${prev}`, stats.openingCarry, "+", "var(--saving)");
  h += row("Income", stats.monthIncome, "+", "var(--income)");
  h += row("Spent", stats.monthExpenseReal, "\u2212", "var(--expense)");
  if (stats.monthClearance > 0) h += row(`Previous balance cleared (${prev})`, stats.monthClearance, "\u2212", "var(--danger)");
  if (stats.monthSavingFromCash) h += row("Moved to savings", stats.monthSavingFromCash, "\u2212", "var(--saving)");
  if (stats.monthWithdrawn) h += row("Withdrawn from savings", stats.monthWithdrawn, "+", "var(--withdraw)");
  h += `<div style="display:flex;justify-content:space-between;padding-top:9px;margin-top:6px;border-top:1px solid var(--line);font-size:13px;font-weight:700"><span>Left over</span><span class="num" style="color:${stats.leftover<0?'var(--danger)':'var(--ink)'}">${fmtINR(stats.leftover)}</span></div></div>`;
  return h;
}

// "Safe to spend": what's left after bills you still have to pay this month, spread over the days remaining
function safeToSpendCard(stats) {
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
  const daysLeft = daysInMonth - now.getDate() + 1;
  const pending = DB.recurring.filter(r => r.lastLoggedMonth !== stats.thisMonth);
  const pendingOut = pending.filter(r => r.type === "expense" || (r.type === "saving" && r.source !== "external")).reduce((s,r)=>s+r.amount,0);
  const safe = stats.leftover - pendingOut;
  const rate = stats.monthIncome > 0 ? Math.round((stats.monthSaving / stats.monthIncome) * 100) : null;
  let main;
  if (safe > 0) main = `<span class="num" style="font-size:20px;font-weight:700">${fmtINR(Math.floor(safe / daysLeft))}</span><span style="font-size:12px;color:var(--ink-soft)"> per day for the next ${daysLeft} day${daysLeft===1?"":"s"}</span>`;
  else main = `<span class="num" style="font-size:20px;font-weight:700;color:var(--danger)">${fmtINR(safe)}</span><span style="font-size:12px;color:var(--ink-soft)"> \u2014 over by this much; it will show as "Previous balance" in next month's spending</span>`;
  const sub = [];
  if (pendingOut > 0) sub.push(`after ${fmtINR(pendingOut)} of bills still due`);
  if (rate !== null) sub.push(`savings rate ${rate}%`);
  return `<div class="card">${sectionLabel("Safe to spend")}<div>${main}</div>${sub.length ? `<p style="font-size:11.5px;color:var(--ink-faint);margin:6px 0 0">${sub.join(" \u00b7 ")}</p>` : ""}</div>`;
}

// Months from now until a "YYYY-MM" goal date (inclusive of the current month)
function monthsUntil(ym) {
  if (!ym) return 0;
  const [y, m] = ym.split("-").map(Number);
  const now = new Date();
  return (y - now.getFullYear()) * 12 + (m - 1 - now.getMonth()) + 1;
}
function goalCaption(g) {
  const remaining = Math.max(0, g.target - g.saved);
  if (g.target > 0 && remaining === 0) return "Goal reached";
  if (g.date && g.target > 0) {
    const n = monthsUntil(g.date);
    const label = new Date(g.date + "-01T00:00:00").toLocaleDateString("en-GB", { month: "short", year: "numeric" });
    if (n <= 0) return `${fmtINR(remaining)} still to go \u00b7 target date ${label} has passed`;
    return `${fmtINR(Math.ceil(remaining / n))}/month to reach it by ${label}`;
  }
  return g.target > 0 ? `${fmtINR(remaining)} to go` : "Set a target to track progress";
}
function goalBar(g) {
  const pct = g.target > 0 ? Math.min(100, (g.saved / g.target) * 100) : 0;
  return `<div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px"><span style="color:var(--ink-soft)">${fmtINR(g.saved)}${g.target>0?` of ${fmtINR(g.target)}`:""}</span><span class="num" style="font-weight:700">${g.target>0?Math.round(pct)+"%":""}</span></div>
    <div class="track"><div class="fill" style="width:${pct}%;background:var(--saving)"></div></div>
    <p style="font-size:11.5px;color:var(--ink-faint);margin:6px 0 0">${esc(goalCaption(g))}</p>`;
}
function homeGoalsCard(stats) {
  const goals = stats.goalProgress;
  if (!goals.length) {
    return `<div class="card">${sectionLabel("Savings goals","goals")}<p class="muted" style="margin:0 0 10px">Saving for something specific? Create your own goal \u2014 a race, a gadget, an emergency fund.</p><button class="btn-ghost" style="width:100%;padding:9px;font-size:12.5px" onclick="setTab('goals')">Set up a goal</button></div>`;
  }
  let h = `<div class="card">${sectionLabel("Savings goals","goals")}`;
  goals.forEach((g, i) => { h += `<div style="${i? "margin-top:16px":""}"><p style="font-size:13px;font-weight:700;margin:0 0 8px">${esc(g.name)}</p>${goalBar(g)}</div>`; });
  return h + `</div>`;
}

// Goals tab: add, rename, retarget and delete your own savings goals
function viewGoalList(stats) {
  let h = `<div class="card">${sectionLabel("Your savings goals","goals")}`;
  if (!stats.goalProgress.length && !UI.goalFormOpen) h += `<p class="muted" style="margin:0 0 12px">No goals yet. Add one \u2014 it also becomes a category you can pick when you add a saving.</p>`;
  stats.goalProgress.forEach((g, i) => {
    h += `<div style="${i? "margin-top:16px;padding-top:16px;border-top:1px solid var(--line)":""}">
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px">
        <input type="text" value="${esc(g.name)}" onchange="renameGoal('${g.id}', this.value)" style="flex:1;font-weight:700"/>
        <button onclick="deleteGoal('${g.id}')" aria-label="Delete goal" style="border:none;background:none;cursor:pointer;padding:6px;color:var(--ink-faint)">${icon('trash',15)}</button>
      </div>
      <div class="flex-gap" style="margin-bottom:10px">
        <div style="flex:1"><label class="fl">Target (\u20B9)</label><input type="number" min="0" step="1000" value="${g.target||''}" placeholder="0" onchange="setGoalField('${g.id}','target',this.value)"/></div>
        <div style="flex:1"><label class="fl">Reach it by (optional)</label><input type="month" value="${esc(g.date||'')}" onchange="setGoalField('${g.id}','date',this.value)"/></div>
      </div>
      ${goalBar(g)}
    </div>`;
  });
  if (UI.goalFormOpen) {
    h += `<div style="${stats.goalProgress.length? "margin-top:16px;padding-top:16px;border-top:1px solid var(--line)":""}">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><label class="fl">Goal name</label><input id="goalName" type="text" placeholder="e.g. Hyrox / IRONMAN, New laptop"/></div>
        <div class="flex-gap">
          <div style="flex:1"><label class="fl">Target (\u20B9)</label><input id="goalTarget" type="number" min="0" step="1000" placeholder="0"/></div>
          <div style="flex:1"><label class="fl">Reach it by (optional)</label><input id="goalDate" type="month"/></div>
        </div>
        <p id="goalError" style="font-size:12px;color:var(--danger);margin:0;display:none"></p>
      </div>
      <div class="flex-gap" style="margin-top:12px"><button class="btn-ghost" style="flex:1" onclick="closeGoalForm()">Cancel</button><button class="btn-primary" style="flex:1" onclick="submitGoal()">Add goal</button></div>
    </div>`;
  } else {
    h += `<button class="btn-ghost" style="width:100%;margin-top:${stats.goalProgress.length?'16px':'0'};display:flex;align-items:center;justify-content:center;gap:6px" onclick="openGoalForm()">${icon('plus',14)} Add a goal</button>`;
  }
  return h + `</div>`;
}

function addPageButton(type, label) {
  const meta = TYPE_META[type];
  return `<button class="btn-primary" style="margin-bottom:14px;display:flex;align-items:center;justify-content:center;gap:8px;background:${meta.color}" onclick="openForm('${type}')">${icon('plus',15)} ${esc(label)}</button>`;
}
function scopeChips() {
  const on = (k) => UI.listScope === k ? "on" : "";
  return `<div class="chips"><button class="chip ${on('month')}" onclick="setListScope('month')">This month</button><button class="chip ${on('all')}" onclick="setListScope('all')">All time</button></div>`;
}
function inScope(t) { return UI.listScope === "all" || monthKey(t.date) === todayIso().slice(0,7); }

function viewIncome(stats) {
  const already = DB.txns.some(t=>t.type==="income"&&t.category==="Salary"&&monthKey(t.date)===stats.thisMonth);
  let html = addPageButton("income", "Add income");
  html += `<div class="card">${sectionLabel("Monthly salary")}
    <div style="display:flex;gap:8px;align-items:flex-end">
      <div style="flex:1"><label class="fl">Amount (\u20B9)</label><input id="salaryInput" type="number" min="0" step="1000" placeholder="0" value="${DB.goals.monthlySalary||''}"/></div>
      <button class="btn-ghost" style="height:40px;padding:0 16px" onclick="saveSalary()">Save</button>
    </div>
    <div style="margin-top:10px"><button class="btn-primary" ${already?'disabled':''} onclick="logSalaryThisMonth()">${already?"Salary already logged this month":"Log this month's salary"}</button></div>
  </div>
  <div class="card">${sectionLabel("Got money another way?")}
    <p class="muted" style="margin:0">Gift from family, cash you found, a refund \u2014 pick the "Gift" category when adding income to keep it separate from your regular earnings.</p>
  </div>`;
  html += scopeChips();
  const incomeTxns = sortTxns(DB.txns.filter(t=>t.type==="income" && inScope(t)));
  html += `<div class="card">`;
  if (!incomeTxns.length) html += `<p class="muted">${UI.listScope==="all" ? "No income logged yet." : "No income logged this month yet."}</p>`;
  else incomeTxns.forEach(t => html += txnRow(t, true));
  html += `</div>`;
  return html;
}

function viewList(type, emptyText) {
  const base = type === "saving" ? DB.txns.filter(t=>t.type==="saving"||t.type==="withdrawal") : viewTxns().filter(t=>t.type===type);
  const list = sortTxns(base.filter(inScope));
  let html = addPageButton(type, type === "saving" ? "Add saving" : "Add expense");
  if (type === "saving") {
    html += savingsBreakdown();
    html += `<button class="btn-withdraw" style="margin-bottom:14px;display:flex;align-items:center;justify-content:center;gap:8px" onclick="openWithdraw()">${icon('download',15)} Withdraw from savings to cash</button>`;
  }
  html += scopeChips();
  html += `<div class="card">`;
  if (!list.length) html += `<p class="muted">${UI.listScope==="all" ? esc(emptyText) : "Nothing logged this month yet."}</p>`;
  else list.forEach(t => html += txnRow(t, true));
  html += `</div>`;
  return html;
}

// History: month-by-month log, each month ends with the balance brought forward
function viewHistory() {
  const ledger = buildLedger();
  const f = UI.histFilter;
  const chip = (k, label) => `<button class="chip ${f===k?'on':''}" onclick="setHistFilter('${k}')">${label}</button>`;
  let html = `<div class="chips">${chip('all','All')}${chip('income','Income')}${chip('expense','Spend')}${chip('saving','Savings')}</div>`;
  const match = (t) => f==="all" || (f==="saving" ? (t.type==="saving"||t.type==="withdrawal") : t.type===f);
  ledger.forEach(m => {
    const rows = m.txns.filter(match);
    html += `<div class="card">
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:4px">
        <p style="font-size:14px;font-weight:700;margin:0">${esc(monthLong(m.key))}</p>
        <p style="font-size:11px;color:var(--ink-soft);margin:0">Closing <span class="num" style="font-weight:700;color:${m.closing<0?'var(--danger)':'var(--ink)'}">${fmtINR(m.closing)}</span></p>
      </div>
      <p style="font-size:11px;color:var(--ink-faint);margin:0 0 8px">${m.carry>0?`Brought fwd ${fmtINR(m.carry)} \u00b7 `:""}In ${fmtINR(m.income + m.withdrawn)} \u00b7 Out ${fmtINR(m.spent + m.saved)}</p>`;
    if (!rows.length) html += `<p class="muted" style="margin:6px 0">Nothing logged.</p>`;
    rows.forEach(t => html += txnRow(t, true));
    if (f === "all" && m.carry > 0 && m.prevKey) {
      const neg = false;
      html += `<div class="row" style="cursor:default;background:var(--brass-tint);margin:6px -8px 0;padding:11px 8px;border-radius:10px;border-bottom:none;width:auto">
        <div style="display:flex;align-items:center;gap:11px;min-width:0;flex:1">
          <span class="icon-badge" style="background:var(--card);color:var(--brass)">${icon('repeat',15)}</span>
          <div style="min-width:0;text-align:left">
            <p style="font-size:13.5px;margin:0;color:var(--ink)">${neg ? "Previous balance cleared" : "Balance brought forward"}</p>
            <p style="font-size:11.5px;color:var(--ink-soft);margin:0">From ${esc(monthLabel(m.prevKey))}${neg ? " \u00b7 shortfall adjusted against this month" : ""}</p>
          </div>
        </div>
        <span class="num" style="font-size:13.5px;font-weight:700;color:${neg?'var(--danger)':'var(--saving)'};flex-shrink:0">${neg?"":"+"}${fmtINR(m.opening)}</span>
      </div>`;
    }
    html += `</div>`;
  });
  return html;
}

function savingsBreakdown() {
  const stats = computeStats();
  const totalRaw = stats.totalSavingFromCash + stats.totalSavingExternal;
  if (totalRaw === 0 && stats.totalWithdrawn === 0) return "";
  const pct = totalRaw > 0 ? (stats.totalSavingFromCash / totalRaw) * 100 : 0;
  return `<div class="card">${sectionLabel("Where your savings came from")}
    <div class="track" style="display:flex;margin-bottom:10px">
      <div style="width:${pct}%;background:var(--saving);height:6px"></div>
      <div style="width:${100-pct}%;background:var(--brass);height:6px"></div>
    </div>
    <div style="display:flex;justify-content:space-between;margin-bottom:12px">
      <div>
        <p style="font-size:11px;color:var(--ink-soft);margin:0 0 2px"><span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--saving);margin-right:5px"></span>From cash in hand</p>
        <p class="num" style="font-size:15px;font-weight:700;margin:0">${fmtINR(stats.totalSavingFromCash)}</p>
      </div>
      <div style="text-align:right">
        <p style="font-size:11px;color:var(--ink-soft);margin:0 0 2px">Outside income<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:var(--brass);margin-left:5px"></span></p>
        <p class="num" style="font-size:15px;font-weight:700;margin:0">${fmtINR(stats.totalSavingExternal)}</p>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;padding-top:10px;border-top:1px solid var(--line)">
      <p style="font-size:12px;color:var(--ink-soft);margin:0">Net saved right now</p>
      <p class="num" style="font-size:14px;font-weight:700;margin:0">${fmtINR(stats.totalSaving)}</p>
    </div>
    ${stats.totalWithdrawn > 0 ? `<div style="display:flex;justify-content:space-between;margin-top:4px">
      <p style="font-size:11.5px;color:var(--withdraw);margin:0">Withdrawn back to cash</p>
      <p class="num" style="font-size:12.5px;font-weight:700;margin:0;color:var(--withdraw)">${fmtINR(stats.totalWithdrawn)}</p>
    </div>` : ""}
  </div>`;
}

function viewGoals(stats) {
  let html = `<div class="card">${sectionLabel("Monthly budget by category")}<div style="display:flex;flex-direction:column;gap:12px">`;
  CATS_EXPENSE.forEach(cat => {
    const spent = stats.byCat[cat] || 0;
    const budget = (DB.goals.monthlyBudgets && DB.goals.monthlyBudgets[cat]) || 0;
    const pct = budget>0 ? Math.min(100,(spent/budget)*100) : 0;
    html += `<div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:5px">
        <span style="font-size:13px">${esc(cat)}</span>
        <input type="number" min="0" step="100" placeholder="0" value="${budget||''}" data-budget-cat="${esc(cat)}" style="width:92px;height:30px;font-size:12.5px;padding:0 8px" onchange="onBudgetChange('${esc(cat)}', this.value)"/>
      </div>
      ${budget>0 ? `<div class="track"><div class="fill" style="width:${pct}%;background:${pct>=100?'var(--danger)':'var(--saving)'}"></div></div>
      <p style="font-size:11px;color:var(--ink-faint);margin:4px 0 0">${fmtINR(spent)} of ${fmtINR(budget)} spent this month</p>` : ""}
    </div>`;
  });
  html += `</div></div>`;

  html += viewGoalList(stats);

  const pct80c = Math.min(100, (stats.tax80c/TAX_80C_LIMIT)*100);
  html += `<div class="card">${sectionLabel(`80C tax saving \u00b7 ${stats.fy.label}`, "shield")}
    <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px"><span style="color:var(--ink-soft)">${fmtINR(stats.tax80c)} of ${fmtINR(TAX_80C_LIMIT)} limit</span><span class="num" style="font-weight:700">${Math.round(pct80c)}%</span></div>
    <div class="track"><div class="fill" style="width:${pct80c}%;background:var(--brass)"></div></div>
    <p style="font-size:11px;color:var(--ink-faint);margin:6px 0 0">Counts PPF and ELSS entries logged as savings this financial year, minus any withdrawn back out. A rough guide, not tax advice.</p>
  </div>`;

  html += viewRecurring(stats.thisMonth);

  html += `<button class="btn-ghost" style="display:flex;align-items:center;justify-content:center;gap:8px;width:100%;margin-bottom:14px" onclick="exportCsv()">${icon('download',15)} Export all data (CSV)</button>`;

  html += viewAccountCard();
  return html;
}

function viewAccountCard() {
  if (!AUTH.user) return "";
  const syncLabel = AUTH.syncState === "synced" ? "Synced across your devices" : AUTH.syncState === "error" ? "Sync error — check connection" : "Connecting…";
  const dotColor = AUTH.syncState === "synced" ? "var(--saving)" : AUTH.syncState === "error" ? "var(--danger)" : "var(--brass)";
  return `<div class="card">${sectionLabel("Account","user")}
    <p style="font-size:13px;margin:0 0 4px">${esc(AUTH.user.email)}</p>
    <p style="font-size:11.5px;color:var(--ink-soft);margin:0 0 12px;display:flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:50%;background:${dotColor};display:inline-block"></span>${syncLabel}</p>
    <button class="btn-ghost" style="width:100%" onclick="doSignOut()">Sign out</button>
  </div>`;
}

function viewRecurring(thisMonth) {
  let html = `<div class="card">${sectionLabel("Recurring bills & SIPs","repeat")}`;
  if (!DB.recurring.length && !UI.recurringOpen) html += `<p class="muted" style="margin:0 0 12px">Add rent, subscriptions, or monthly SIPs so they show up as "due" automatically each month.</p>`;
  DB.recurring.forEach(r => {
    const logged = r.lastLoggedMonth === thisMonth;
    const meta = TYPE_META[r.type];
    html += `<div class="row" style="cursor:default">
      <div><p style="font-size:13px;margin:0">${esc(r.category)}</p><p style="font-size:11.5px;color:var(--ink-soft);margin:0">Day ${r.day} of every month \u00b7 <span class="num" style="font-weight:700;color:${meta.color}">${fmtINR(r.amount)}</span></p></div>
      <div style="display:flex;align-items:center;gap:10px">
        <span class="pill" style="background:${logged?'var(--saving-tint)':'var(--brass-tint)'};color:${logged?'var(--saving)':'var(--brass)'}">${logged?"Logged":"Pending"}</span>
        <button onclick="doDeleteRecurring('${r.id}')" aria-label="Delete" style="border:none;background:none;cursor:pointer;padding:3px;color:var(--ink-faint)">${icon('trash',14)}</button>
      </div>
    </div>`;
  });

  if (UI.recurringOpen) {
    html += `<div style="margin-top:${DB.recurring.length?'12px':'0'};padding-top:${DB.recurring.length?'12px':'0'};${DB.recurring.length?'border-top:1px solid var(--line)':''}">
      <div class="flex-gap" style="margin-bottom:10px">
        <button class="tabbtn ${UI.recFormType==='expense'?'on':''}" style="${UI.recFormType==='expense'?'background:var(--expense-tint);color:var(--expense)':''}" onclick="setRecFormType('expense')">Expense</button>
        <button class="tabbtn ${UI.recFormType==='saving'?'on':''}" style="${UI.recFormType==='saving'?'background:var(--saving-tint);color:var(--saving)':''}" onclick="setRecFormType('saving')">Saving</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">
        <div class="flex-gap">
          <div style="flex:1"><label class="fl">Amount (\u20B9)</label><input id="recAmount" type="number" min="0" step="100" placeholder="0"/></div>
          <div style="width:84px"><label class="fl">Day</label><input id="recDay" type="number" min="1" max="31" value="1"/></div>
        </div>
        <div><label class="fl">Category</label><select id="recCategory">${catsFor(UI.recFormType||'expense').map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join("")}</select></div>
        ${UI.recFormType === "saving" ? `<div><label class="fl">Where does this come from?</label>
          <div class="flex-gap">
            <button type="button" class="srcbtn ${UI.recSource!=='external'?'on-income':''}" onclick="setRecSource('income')">From cash in hand</button>
            <button type="button" class="srcbtn ${UI.recSource==='external'?'on-external':''}" onclick="setRecSource('external')">Outside income</button>
          </div></div>` : ""}
        <div><label class="fl">Note (optional)</label><input id="recNote" type="text" placeholder="e.g. house rent, Nifty 50 SIP"/></div>
        <p id="recError" style="font-size:12px;color:var(--danger);margin:0;display:none"></p>
      </div>
      <div class="flex-gap" style="margin-top:12px">
        <button class="btn-ghost" style="flex:1" onclick="closeRecurringForm()">Cancel</button>
        <button class="btn-primary" style="flex:1" onclick="submitRecurring()">Add recurring</button>
      </div>
    </div>`;
  } else {
    html += `<button class="btn-ghost" style="width:100%;margin-top:${DB.recurring.length?'12px':'0'};display:flex;align-items:center;justify-content:center;gap:6px" onclick="openRecurringForm()">${icon('plus',14)} Add recurring bill or SIP</button>`;
  }
  html += `</div>`;
  return html;
}

function viewAbout() {
  return `<div class="card" style="text-align:center;padding:28px 20px">
      <img src="icon-192.png" class="about-logo" style="margin:0 auto 14px" alt="PennyLog"/>
      <p style="font-family:Georgia,serif;font-size:19px;font-weight:700;margin:0 0 4px">PennyLog</p>
      <p class="muted" style="margin:0">Version 1.0 &middot; a personal expense &amp; savings tracker</p>
    </div>
    <div class="card">
      ${sectionLabel("Support")}
      <a class="about-link" href="${GITHUB_REPO}/issues/new" target="_blank" rel="noopener">
        <span style="display:flex;align-items:center;gap:10px">${icon('bug',16)} Report a bug</span>
        <span class="chev">${icon('chevron',14)}</span>
      </a>
      <a class="about-link" href="mailto:${CONTACT_EMAIL}">
        <span style="display:flex;align-items:center;gap:10px">${icon('mail',16)} Contact developer</span>
        <span class="chev">${icon('chevron',14)}</span>
      </a>
      <a class="about-link" href="${GITHUB_REPO}" target="_blank" rel="noopener">
        <span style="display:flex;align-items:center;gap:10px">${icon('repeat',16)} View source on GitHub</span>
        <span class="chev">${icon('chevron',14)}</span>
      </a>
    </div>
    <div class="card">
      ${sectionLabel("What each tab tracks")}
      <p style="font-size:12.5px;color:var(--ink-soft);line-height:1.7;margin:0">
        <strong style="color:var(--ink)">Income</strong> — salary, freelance, gifts, anything landing in your hand.<br/>
        <strong style="color:var(--ink)">Expenses</strong> — everyday spending by category.<br/>
        <strong style="color:var(--ink)">Savings</strong> — SIPs, PPF, ELSS, and other money set aside, with a withdraw-back option.<br/>
        <strong style="color:var(--ink)">Goals</strong> — budgets, your 80C tax-saving progress, recurring bills, and data export.
      </p>
    </div>`;
}

/* ==================== add/edit sheet ==================== */
function viewSheet() {
  const editingTxn = UI.editingId ? DB.txns.find(t=>t.id===UI.editingId) : null;
  const type = UI.formType;
  const meta = TYPE_META[type];
  const amt = editingTxn ? editingTxn.amount : "";
  const date = editingTxn ? editingTxn.date : todayIso();
  const note = editingTxn ? (editingTxn.note||"") : "";

  const typeButtons = ["income","expense","saving"].map(t => {
    const m = TYPE_META[t]; const on = type===t;
    return `<button class="tabbtn ${on?'on':''}" style="${on?`background:${m.tint};color:${m.color}`:''}" onclick="setSheetType('${t}')">${m.label}</button>`;
  }).join("");

  const sourceHtml = type === "saving" ? `<div>
    <label class="fl">Where did this money come from?</label>
    <div class="flex-gap" id="sourceButtons">
      <button type="button" class="srcbtn ${UI.formSource!=='external'?'on-income':''}" onclick="setSheetSource('income')">From cash in hand</button>
      <button type="button" class="srcbtn ${UI.formSource==='external'?'on-external':''}" onclick="setSheetSource('external')">Outside income</button>
    </div>
    <p id="sourceHint" style="font-size:11px;color:var(--ink-faint);margin:6px 0 0">${UI.formSource==='external'
      ? "Won't reduce your cash in hand — use this for side-hustle earnings or money invested directly, that never sat in your account as tracked income."
      : "Will reduce your cash in hand, since this money is coming out of income you've already logged."}</p>
  </div>` : "";

  return `<div class="sheet-backdrop" onclick="closeSheet()">
    <div class="sheet" onclick="event.stopPropagation()">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <p style="font-size:16px;font-weight:700;margin:0">${editingTxn?"Edit entry":"Add entry"}</p>
        <button onclick="closeSheet()" aria-label="Close" style="border:none;background:none;cursor:pointer;color:var(--ink-soft);padding:4px">${icon('close',18)}</button>
      </div>
      <div class="flex-gap" style="margin-bottom:14px" id="typeButtons">${typeButtons}</div>
      <div style="display:flex;flex-direction:column;gap:12px">
        <div><label class="fl">Amount (\u20B9)</label><input id="fAmount" type="number" min="0" step="1" placeholder="0" value="${amt}"/></div>
        <div><label class="fl">Category</label><select id="fCategory">${catsFor(type).map(c=>`<option value="${esc(c)}" ${editingTxn&&editingTxn.category===c?'selected':''}>${esc(c)}</option>`).join("")}</select></div>
        <div id="sourceWrap">${sourceHtml}</div>
        <div><label class="fl">Date</label><input id="fDate" type="date" value="${date}"/></div>
        <div><label class="fl">Note (optional)</label><input id="fNote" type="text" placeholder="e.g. groceries, monthly SIP" value="${esc(note)}"/></div>
        <p id="fError" style="font-size:12px;color:var(--danger);margin:0;display:none"></p>
      </div>
      <div class="flex-gap" style="margin-top:18px">
        ${editingTxn
          ? `<button onclick="doDeleteTxn()" aria-label="Delete" class="btn-ghost" style="width:46px;flex:0 0 auto;color:var(--danger);display:flex;align-items:center;justify-content:center">${icon('trash',16)}</button>`
          : `<button onclick="closeSheet()" class="btn-ghost" style="flex:1">Cancel</button>`}
        <button onclick="submitSheet()" class="btn-primary" style="flex:1;background:${meta.color}">${editingTxn?"Save changes":`Add ${meta.label.toLowerCase()}`}</button>
      </div>
    </div>
  </div>`;
}

function viewWithdrawSheet() {
  return `<div class="sheet-backdrop" onclick="closeWithdraw()">
    <div class="sheet" onclick="event.stopPropagation()">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <p style="font-size:16px;font-weight:700;margin:0">Withdraw from savings</p>
        <button onclick="closeWithdraw()" aria-label="Close" style="border:none;background:none;cursor:pointer;color:var(--ink-soft);padding:4px">${icon('close',18)}</button>
      </div>
      <p class="muted" style="margin:0 0 16px">Moves money back into your cash in hand — for whenever you need to dip into savings.</p>
      <div style="display:flex;flex-direction:column;gap:12px">
        <div><label class="fl">Amount (\u20B9)</label><input id="wAmount" type="number" min="0" step="1" placeholder="0"/></div>
        <div><label class="fl">Withdraw from which saving?</label><select id="wCategory">${savingCategories().map(c=>`<option value="${esc(c)}">${esc(c)} \u2014 net saved ${fmtINR(netSavedFor(c))}</option>`).join("")}</select></div>
        <div><label class="fl">Date</label><input id="wDate" type="date" value="${todayIso()}"/></div>
        <div><label class="fl">Note (optional)</label><input id="wNote" type="text" placeholder="e.g. medical expense, needed cash"/></div>
        <p id="wError" style="font-size:12px;color:var(--danger);margin:0;display:none"></p>
      </div>
      <div class="flex-gap" style="margin-top:18px">
        <button onclick="closeWithdraw()" class="btn-ghost" style="flex:1">Cancel</button>
        <button onclick="submitWithdraw()" class="btn-primary" style="flex:1;background:var(--withdraw)">Withdraw to cash</button>
      </div>
    </div>
  </div>`;
}
function netSavedFor(cat) {
  const inflow = DB.txns.filter(t=>t.type==="saving"&&t.category===cat).reduce((s,t)=>s+t.amount,0);
  const out = DB.txns.filter(t=>t.type==="withdrawal"&&t.category===cat).reduce((s,t)=>s+t.amount,0);
  return inflow - out;
}

/* ==================== auth screen ==================== */
function viewAuth() {
  const isLogin = AUTH.mode === "login";
  const pwType = UI.pwVisible ? "text" : "password";
  const pwIcon = UI.pwVisible ? "eyeOff" : "eye";
  return `<div class="auth-wrap"><div class="auth-shell">
    <div class="auth-brand-panel">
      <div class="rule"></div>
      <div>
        <img src="icon-192.png" class="auth-brand-logo" alt="PennyLog"/>
        <p class="auth-brand-title">PennyLog</p>
        <p class="auth-brand-sub">Track what you earn, spend, and save — with your SIPs, PPF, ELSS, and a sports fund all in one ledger.</p>
      </div>
      <div>
        <div class="auth-brand-feature">${icon('repeat',16)} Recurring bills logged automatically</div>
        <div class="auth-brand-feature">${icon('shield',16)} 80C tax-saving progress built in</div>
        <div class="auth-brand-feature">${icon('download',16)} Withdraw from savings anytime</div>
      </div>
    </div>
    <div class="auth-card">
      <div class="auth-mobile-logo"><img src="icon-192.png" alt="PennyLog"/><span>PennyLog</span></div>
      <p class="auth-eyebrow">${isLogin?"Welcome back":"Get started"}</p>
      <p class="auth-title">${isLogin?"Log in to your ledger":"Create your account"}</p>
      <div style="display:flex;flex-direction:column;gap:14px">
        <div><label class="fl">Email</label><input id="authEmail" type="email" placeholder="you@example.com" autocomplete="email"/></div>
        <div><label class="fl">Password</label>
          <div class="auth-field-wrap">
            <input id="authPassword" type="${pwType}" placeholder="At least 6 characters" autocomplete="${isLogin?'current-password':'new-password'}" style="padding-right:40px"/>
            <button type="button" class="auth-toggle-pw" onclick="togglePwVisible()" aria-label="Toggle password visibility">${icon(pwIcon,17)}</button>
          </div>
        </div>
        ${AUTH.error ? `<p style="font-size:12px;color:var(--danger);margin:0">${esc(AUTH.error)}</p>` : ""}
      </div>
      <button class="btn-primary" style="margin-top:18px" onclick="submitAuth()">${isLogin?"Log in":"Sign up"}</button>
      <div class="auth-divider"><div class="line"></div></div>
      <div style="display:flex;justify-content:space-between;margin-top:6px">
        <button onclick="toggleAuthMode()" style="background:none;border:none;color:var(--ink-soft);font-size:12.5px;cursor:pointer;padding:0;font-family:inherit">${isLogin?"Need an account? Sign up":"Have an account? Log in"}</button>
        ${isLogin ? `<button onclick="doForgotPassword()" style="background:none;border:none;color:var(--ink-soft);font-size:12.5px;cursor:pointer;padding:0;font-family:inherit">Forgot password?</button>` : ""}
      </div>
      <p style="font-size:11px;color:var(--ink-faint);margin:18px 0 0">Your data is stored under this account and synced automatically across any device where you log in.</p>
    </div>
  </div></div>`;
}
function togglePwVisible() {
  UI.pwVisible = !UI.pwVisible;
  const input = document.getElementById("authPassword");
  const btn = document.querySelector(".auth-toggle-pw");
  if (input) input.type = UI.pwVisible ? "text" : "password";
  if (btn) btn.innerHTML = icon(UI.pwVisible ? "eyeOff" : "eye", 17);
}

/* ==================== master render ==================== */
function render() {
  if (!AUTH.ready) {
    document.getElementById("root").innerHTML = `<div class="auth-wrap"><p class="muted">Loading…</p></div>`;
    return;
  }
  if (!AUTH.user) {
    document.getElementById("root").innerHTML = viewAuth();
    return;
  }

  const stats = computeStats();
  const tabs = [
    ["home","home","Home"],
    ["income","income","Income"],
    ["expenses","expense","Spend"],
    ["savings","savings","Savings"],
    ["history","history","History"],
    ["goals","goals","Goals"],
    ["about","about","About"],
  ];
  let body = "";
  if (UI.tab==="home") body = viewHome(stats);
  else if (UI.tab==="income") body = viewIncome(stats);
  else if (UI.tab==="expenses") body = viewList("expense","No expenses logged yet.");
  else if (UI.tab==="savings") body = viewList("saving","No savings or investments logged yet.");
  else if (UI.tab==="history") body = viewHistory();
  else if (UI.tab==="goals") body = viewGoals(stats);
  else if (UI.tab==="about") body = viewAbout();

  const navHtml = tabs.filter(t => t[0] !== "about").map(([k,ic,label]) => `<button class="navitem ${UI.tab===k?'active':''}" onclick="setTab('${k}')">${icon(ic,17)}<span>${label}</span><span class="dot"></span></button>`).join("");
  const sidebarHtml = tabs.map(([k,ic,label]) => `<button class="sidebar-item ${UI.tab===k?'active':''}" onclick="setTab('${k}')">${icon(ic,18)}<span>${label}</span></button>`).join("");
  const drawerNavHtml = tabs.map(([k,ic,label]) => `<button class="sidebar-item ${UI.tab===k?'active':''}" onclick="setTab('${k}'); closeMobileMenu();">${icon(ic,18)}<span>${label}</span></button>`).join("");

  const dotColor = AUTH.syncState === "synced" ? "#8FCBA6" : AUTH.syncState === "error" ? "#E08A73" : "var(--brass-solid)";
  const syncText = AUTH.syncState === "synced" ? "Synced" : AUTH.syncState === "error" ? "Sync error" : "Connecting";

  const appHtml = `
    <div class="app">
      <div class="cover">
        <button class="menu-btn" onclick="openMobileMenu()" aria-label="Open menu">${icon('menu',18)}</button>
        <div class="cover-top">
          <div>
            <p class="cover-label">Cash in hand</p>
            <p class="cover-amt">${fmtINR(stats.cashInHand)}</p>
            <div class="sync-chip"><span class="sync-dot" style="background:${dotColor}"></span>${syncText}</div>
          </div>
          ${sparkline(stats.days)}
        </div>
        <div class="cover-sub">
          <p><span class="l">Total income</span><span class="v">${fmtINR(stats.totalIncome)}</span></p>
          <p><span class="l">Saved / invested</span><span class="v" style="color:#8FCBA6">${fmtINR(stats.totalSaving)}</span></p>
        </div>
        <div class="cover-rule"></div>
      </div>
      <div class="content">${body}<div style="height:10px"></div></div>
      <div class="navbar">${navHtml}</div>
    </div>`;

  document.getElementById("root").innerHTML = `
    <div class="shell with-sidebar">
      <div class="sidebar desktop-sidebar">
        <div class="sidebar-brand"><img src="icon-192.png" alt="PennyLog"/><span class="name">PennyLog</span></div>
        <div class="sidebar-nav">${sidebarHtml}</div>
        <div class="sidebar-foot">
          <p style="margin:0 0 8px;word-break:break-all">${esc(AUTH.user.email)}</p>
          <button class="btn-ghost" style="width:100%;padding:8px;font-size:12.5px" onclick="doSignOut()">Sign out</button>
        </div>
      </div>
      <div class="app-col">${appHtml}</div>
    </div>
    <div class="drawer-backdrop ${UI.mobileMenuOpen?'open':''}" onclick="closeMobileMenu()"></div>
    <div class="drawer ${UI.mobileMenuOpen?'open':''}">
      <div class="sidebar-brand"><img src="icon-192.png" alt="PennyLog"/><span class="name">PennyLog</span></div>
      <div class="sidebar-nav">${drawerNavHtml}</div>
      <div class="sidebar-foot">
        <p style="margin:0 0 8px;word-break:break-all">${esc(AUTH.user.email)}</p>
        <button class="btn-ghost" style="width:100%;padding:8px;font-size:12.5px" onclick="doSignOut()">Sign out</button>
      </div>
    </div>
    ${UI.showForm ? viewSheet() : ""}
    ${UI.showWithdraw ? viewWithdrawSheet() : ""}
  `;
  setupSwipeGestures();
}

/* ==================== auth actions ==================== */
function toggleAuthMode() { AUTH.mode = AUTH.mode === "login" ? "signup" : "login"; AUTH.error = ""; render(); }
function submitAuth() {
  const email = document.getElementById("authEmail").value.trim();
  const password = document.getElementById("authPassword").value;
  if (!email || !password) { AUTH.error = "Enter both email and password."; render(); return; }
  const { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = window.__fb;
  const action = AUTH.mode === "login" ? signInWithEmailAndPassword : createUserWithEmailAndPassword;
  action(auth, email, password).catch((e) => {
    AUTH.error = friendlyAuthError(e.code);
    render();
  });
}
function friendlyAuthError(code) {
  const map = {
    "auth/invalid-email": "That email doesn't look right.",
    "auth/user-not-found": "No account with that email — try signing up.",
    "auth/wrong-password": "Wrong password.",
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/email-already-in-use": "An account already exists — try logging in.",
    "auth/weak-password": "Password should be at least 6 characters.",
  };
  return map[code] || "Something went wrong. Try again.";
}
function doForgotPassword() {
  const email = document.getElementById("authEmail").value.trim();
  if (!email) { AUTH.error = "Enter your email above first."; render(); return; }
  window.__fb.sendPasswordResetEmail(window.__fb.auth, email).then(() => {
    AUTH.error = "Password reset email sent — check your inbox.";
    render();
  }).catch((e) => { AUTH.error = friendlyAuthError(e.code); render(); });
}
function doSignOut() { window.__fb.signOut(window.__fb.auth); }

/* ==================== actions ==================== */
function openMobileMenu() { UI.mobileMenuOpen = true; renderDrawerOnly(); }
function closeMobileMenu() { UI.mobileMenuOpen = false; renderDrawerOnly(); }
function renderDrawerOnly() {
  const backdrop = document.querySelector(".drawer-backdrop");
  const drawer = document.querySelector(".drawer");
  if (backdrop) backdrop.classList.toggle("open", UI.mobileMenuOpen);
  if (drawer) drawer.classList.toggle("open", UI.mobileMenuOpen);
}
let swipeSetup = false;
function setupSwipeGestures() {
  if (swipeSetup) return;
  swipeSetup = true;
  let startX = null, startY = null;
  document.addEventListener("touchstart", (e) => {
    const t = e.touches[0];
    startX = t.clientX; startY = t.clientY;
  }, { passive: true });
  document.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - startX, dy = t.clientY - startY;
    if (Math.abs(dx) > 60 && Math.abs(dy) < 60) {
      if (dx > 0 && startX < 30 && !UI.mobileMenuOpen) openMobileMenu();
      else if (dx < 0 && UI.mobileMenuOpen) closeMobileMenu();
    }
    startX = null; startY = null;
  }, { passive: true });
}
function setTab(t) { UI.tab = t; render(); window.scrollTo(0, 0); }
function setListScope(k) { UI.listScope = k; render(); }
function setHistFilter(k) { UI.histFilter = k; render(); }
function openForm(type) { UI.formType = type; UI.editingId = null; UI.formSource = "income"; UI.showForm = true; render(); }
function openEdit(id) {
  const t = DB.txns.find(x=>x.id===id);
  if (!t) return;
  UI.formType = t.type; UI.editingId = id; UI.formSource = t.source === "external" ? "external" : "income"; UI.showForm = true; render();
}
function closeSheet() { UI.showForm = false; UI.editingId = null; render(); }
function setSheetType(t) {
  UI.formType = t;
  document.getElementById("fCategory").innerHTML = catsFor(t).map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join("");
  document.querySelectorAll("#typeButtons button").forEach((btn,i)=>{
    const types = ["income","expense","saving"];
    const m = TYPE_META[types[i]];
    if (types[i]===t) { btn.classList.add("on"); btn.style.background=m.tint; btn.style.color=m.color; }
    else { btn.classList.remove("on"); btn.style.background=""; btn.style.color=""; }
  });
  document.getElementById("sourceWrap").innerHTML = t === "saving" ? `<div>
    <label class="fl">Where did this money come from?</label>
    <div class="flex-gap" id="sourceButtons">
      <button type="button" class="srcbtn on-income" onclick="setSheetSource('income')">From cash in hand</button>
      <button type="button" class="srcbtn" onclick="setSheetSource('external')">Outside income</button>
    </div>
    <p id="sourceHint" style="font-size:11px;color:var(--ink-faint);margin:6px 0 0">Will reduce your cash in hand, since this money is coming out of income you've already logged.</p>
  </div>` : "";
  UI.formSource = "income";
}
function setSheetSource(s) {
  UI.formSource = s;
  document.querySelectorAll("#sourceButtons button").forEach((btn, i) => {
    btn.className = "srcbtn " + (i===0 ? (s==="income"?"on-income":"") : (s==="external"?"on-external":""));
  });
  document.getElementById("sourceHint").textContent = s === "external"
    ? "Won't reduce your cash in hand — use this for side-hustle earnings or money invested directly, that never sat in your account as tracked income."
    : "Will reduce your cash in hand, since this money is coming out of income you've already logged.";
}
function submitSheet() {
  const amount = Number(document.getElementById("fAmount").value);
  const category = document.getElementById("fCategory").value;
  const date = document.getElementById("fDate").value;
  const note = document.getElementById("fNote").value.trim();
  const err = document.getElementById("fError");
  if (!amount || amount<=0) { err.textContent = "Enter an amount greater than 0."; err.style.display="block"; return; }
  if (!date) { err.textContent = "Pick a date."; err.style.display="block"; return; }
  const entry = { type: UI.formType, amount, category, date, note };
  if (UI.formType === "saving") entry.source = UI.formSource;
  if (UI.editingId) updateTxn(UI.editingId, entry);
  else addTxn(entry);
  UI.showForm = false; UI.editingId = null;
  render();
}
function doDeleteTxn() { if (!confirm("Delete this entry? This can't be undone.")) return; if (UI.editingId) deleteTxn(UI.editingId); UI.showForm=false; UI.editingId=null; render(); }

function openWithdraw() { UI.showWithdraw = true; render(); }
function closeWithdraw() { UI.showWithdraw = false; render(); }
function submitWithdraw() {
  const amount = Number(document.getElementById("wAmount").value);
  const category = document.getElementById("wCategory").value;
  const date = document.getElementById("wDate").value;
  const note = document.getElementById("wNote").value.trim();
  const err = document.getElementById("wError");
  if (!amount || amount<=0) { err.textContent = "Enter an amount greater than 0."; err.style.display="block"; return; }
  const available = netSavedFor(category);
  if (amount > available) { err.textContent = `You've only got ${fmtINR(available)} net saved in this category.`; err.style.display="block"; return; }
  addTxn({ type: "withdrawal", amount, category, date, note });
  UI.showWithdraw = false;
  render();
}

function saveSalary() {
  const v = Number(document.getElementById("salaryInput").value) || 0;
  saveGoalsPatch({ monthlySalary: v });
  render();
}
function logSalaryThisMonth() {
  const amt = Number(document.getElementById("salaryInput").value) || DB.goals.monthlySalary || 0;
  if (amt<=0) return;
  addTxn({ type:"income", amount:amt, category:"Salary", date:todayIso(), note:"Monthly salary" });
  render();
}

function onBudgetChange(cat, val) {
  const budgets = { ...(DB.goals.monthlyBudgets||{}) };
  budgets[cat] = Number(val)||0;
  saveGoalsPatch({ monthlyBudgets: budgets });
  render();
}
function openGoalForm() { UI.goalFormOpen = true; render(); }
function closeGoalForm() { UI.goalFormOpen = false; render(); }
function goalNameTaken(name, exceptId) {
  const n = name.trim().toLowerCase();
  const taken = [...CATS_SAVING_BASE, "Other"].some(c => c.toLowerCase() === n)
    || (DB.goals.custom || []).some(g => g.id !== exceptId && g.name.toLowerCase() === n);
  return taken;
}
function submitGoal() {
  const name = document.getElementById("goalName").value.trim();
  const target = Number(document.getElementById("goalTarget").value) || 0;
  const date = document.getElementById("goalDate").value || "";
  const err = document.getElementById("goalError");
  if (!name) { err.textContent = "Give your goal a name."; err.style.display = "block"; return; }
  if (goalNameTaken(name)) { err.textContent = "You already have a goal or category with that name."; err.style.display = "block"; return; }
  DB.goals.custom.push({ id: uid(), name, target, date });
  UI.goalFormOpen = false;
  saveDB(); render();
}
function setGoalField(id, field, value) {
  const g = DB.goals.custom.find(x => x.id === id);
  if (!g) return;
  g[field] = field === "target" ? (Number(value) || 0) : value;
  saveDB(); render();
}
// Renaming also updates past entries so your history and progress stay attached to the goal
function renameGoal(id, value) {
  const g = DB.goals.custom.find(x => x.id === id);
  const name = value.trim();
  if (!g || name === g.name) { render(); return; }
  if (!name || goalNameTaken(name, id)) { alert(!name ? "A goal needs a name." : "You already have a goal or category with that name."); render(); return; }
  const old = g.name;
  DB.txns.forEach(t => { if ((t.type==="saving"||t.type==="withdrawal") && t.category === old) t.category = name; });
  DB.recurring.forEach(r => { if (r.type==="saving" && r.category === old) r.category = name; });
  g.name = name;
  saveDB(); render();
}
function deleteGoal(id) {
  if (!confirm("Remove this goal? Your past savings entries stay in your history.")) return;
  DB.goals.custom = DB.goals.custom.filter(x => x.id !== id);
  saveDB(); render();
}

function doLogRecurring(id) { const stats = computeStats(); logRecurring(id, stats.thisMonth); render(); }
function doDeleteRecurring(id) { if (!confirm("Remove this recurring item?")) return; deleteRecurring(id); render(); }
function openRecurringForm() { UI.recurringOpen = true; UI.recFormType = "expense"; UI.recSource = "income"; render(); }
function closeRecurringForm() { UI.recurringOpen = false; render(); }
function setRecFormType(t) { UI.recFormType = t; render(); }
function setRecSource(s) { UI.recSource = s; render(); }
function submitRecurring() {
  const amount = Number(document.getElementById("recAmount").value);
  const day = Number(document.getElementById("recDay").value);
  const category = document.getElementById("recCategory").value;
  const note = document.getElementById("recNote").value.trim();
  const err = document.getElementById("recError");
  if (!amount || amount<=0) { err.textContent="Enter an amount greater than 0."; err.style.display="block"; return; }
  if (!day || day<1 || day>31) { err.textContent="Day should be between 1 and 31."; err.style.display="block"; return; }
  const entry = { type: UI.recFormType||"expense", amount, category, day, note };
  if (entry.type === "saving") entry.source = UI.recSource || "income";
  addRecurring(entry);
  UI.recurringOpen = false;
  render();
}

function exportCsv() {
  const header = "date,type,category,amount,source,note";
  const rows = DB.txns.map(t => [t.date, t.type, `"${t.category}"`, t.amount, t.source||"", `"${(t.note||"").replace(/"/g,'""')}"`].join(","));
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `pennylog-${todayIso()}.csv`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ==================== init ==================== */
render();
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}
