import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";

// ─── Mock Data ───────────────────────────────────────────────
const activityData = [
  { day: "Mon", users: 240, sessions: 180 },
  { day: "Tue", users: 300, sessions: 230 },
  { day: "Wed", users: 260, sessions: 200 },
  { day: "Thu", users: 380, sessions: 310 },
  { day: "Fri", users: 420, sessions: 350 },
  { day: "Sat", users: 350, sessions: 280 },
  { day: "Sun", users: 290, sessions: 220 },
];

const modeData = [
  { mode: "Chatbot", minutes: 1240 },
  { mode: "Jeux",    minutes: 860  },
  { mode: "Appel",   minutes: 620  },
];

const recentUsers = [
  { id: 1, name: "Amira B.",   avatar: "AB", color: "#2563eb", mode: "chatbot", action: "Practiced vocab",    time: "2m ago"  },
  { id: 2, name: "Youssef K.", avatar: "YK", color: "#10b981", mode: "jeux",    action: "Word match game",    time: "5m ago"  },
  { id: 3, name: "Leila M.",   avatar: "LM", color: "#7c3aed", mode: "appel",   action: "Speaking session",   time: "9m ago"  },
  { id: 4, name: "Omar T.",    avatar: "OT", color: "#f59e0b", mode: "chatbot", action: "Grammar chat",       time: "14m ago" },
  { id: 5, name: "Sara H.",    avatar: "SH", color: "#ec4899", mode: "jeux",    action: "Sentence builder",   time: "18m ago" },
];

const leaderboard = [
  { rank: 1, name: "Amira B.",   avatar: "AB", color: "#2563eb", xp: 3840, pct: 96 },
  { rank: 2, name: "Youssef K.", avatar: "YK", color: "#10b981", xp: 3210, pct: 80 },
  { rank: 3, name: "Leila M.",   avatar: "LM", color: "#7c3aed", xp: 2980, pct: 74 },
  { rank: 4, name: "Omar T.",    avatar: "OT", color: "#f59e0b", xp: 2650, pct: 66 },
  { rank: 5, name: "Sara H.",    avatar: "SH", color: "#ec4899", xp: 2340, pct: 58 },
];

const navItems = [
  { id: "dashboard", label: "Dashboard",  section: "main"    },
  { id: "chatbot",   label: "Chatbot",    section: "main"    },
  { id: "exercises", label: "Exercises",  section: "learning" },
  { id: "teachers",  label: "Teachers",   section: "learning" },
  { id: "users",     label: "Users",      section: "learning" },
  { id: "analytics", label: "Analytics",  section: "system"  },
  { id: "settings",  label: "Settings",   section: "system"  },
];

const statCards = [
  { label: "Total Users",       value: "4,821", change: "▲ 12% this month", up: true,  color: "blue",   icon: "👥" },
  { label: "Active Sessions",   value: "318",   change: "▲ 8% vs yesterday", up: true, color: "green",  icon: "⚡" },
  { label: "Time Spent (min)",  value: "26.4k", change: "▲ 5% this week",   up: true,  color: "amber",  icon: "🕐" },
  { label: "Progress Rate",     value: "73%",   change: "▼ 2% this week",   up: false, color: "purple", icon: "📈" },
];

const modeBadgeStyle = {
  chatbot: { background: "#eff6ff", color: "#2563eb" },
  jeux:    { background: "#ecfdf5", color: "#10b981" },
  appel:   { background: "#f5f3ff", color: "#7c3aed" },
};

const cardAccent = {
  blue:   "#2563eb",
  green:  "#10b981",
  amber:  "#f59e0b",
  purple: "#7c3aed",
};

const iconBg = {
  blue:   "#eff6ff",
  green:  "#ecfdf5",
  amber:  "#fffbeb",
  purple: "#f5f3ff",
};

const rankMedal = (r) => {
  if (r === 1) return { symbol: "🥇", color: "#f59e0b" };
  if (r === 2) return { symbol: "🥈", color: "#94a3b8" };
  if (r === 3) return { symbol: "🥉", color: "#b45309" };
  return { symbol: `#${r}`, color: "#94a3b8" };
};






// ─── Stat Card ───────────────────────────────────────────────
function StatCard({ label, value, change, up, color, icon }) {
  return (
    <div style={{
      background: "#fff", borderRadius: 12, padding: 16,
      border: "1px solid #e2e8f0", position: "relative", overflow: "hidden",
    }}>
      {/* left accent bar */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: 3, height: "100%", borderRadius: 2,
        background: cardAccent[color],
      }} />

      {/* icon */}
      <div style={{
        position: "absolute", top: 14, right: 14,
        width: 36, height: 36, borderRadius: 10,
        background: iconBg[color],
        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
      }}>{icon}</div>

      <div style={{ fontSize: 11, fontWeight: 500, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>
        {label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, marginTop: 6, color: up ? "#10b981" : "#ef4444" }}>{change}</div>
    </div>
  );
}


// ─── Recent Activity ─────────────────────────────────────────
function RecentActivity() {
  const [tab, setTab] = useState("all");
  const tabs = ["all", "chatbot", "jeux", "appel"];
  const filtered = tab === "all" ? recentUsers : recentUsers.filter((u) => u.mode === tab);

  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #e2e8f0" }}>
      <div style={{ fontWeight: 600, fontSize: 14, color: "#0f172a", marginBottom: 10 }}>Recent Activity</div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              fontSize: 12, padding: "4px 10px", borderRadius: 6, cursor: "pointer",
              fontWeight: 500, border: "1px solid transparent", transition: "all 0.15s",
              background: tab === t ? "#2563eb" : "transparent",
              color:      tab === t ? "#fff"    : "#64748b",
              borderColor: tab === t ? "#2563eb" : "#e2e8f0",
            }}
          >
            {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((u) => (
          <div key={u.id} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: 10, background: "#f8fafc", borderRadius: 8,
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8, background: u.color,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700, color: "#fff", flexShrink: 0,
            }}>{u.avatar}</div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#0f172a" }}>{u.name}</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 1 }}>{u.action}</div>
            </div>

            <span style={{
              fontSize: 10, padding: "2px 7px", borderRadius: 4, fontWeight: 500,
              ...modeBadgeStyle[u.mode],
            }}>{u.mode}</span>

            <span style={{ fontSize: 11, color: "#94a3b8", whiteSpace: "nowrap" }}>{u.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Leaderboard ─────────────────────────────────────────────
function Leaderboard() {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #e2e8f0" }}>
      <div style={{ fontWeight: 600, fontSize: 14, color: "#0f172a" }}>Leaderboard</div>
      <div style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>Top active learners this month</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {leaderboard.map((u) => {
          const medal = rankMedal(u.rank);
          return (
            <div key={u.rank} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "9px 12px", background: "#f8fafc", borderRadius: 8,
            }}>
              <span style={{ width: 20, fontSize: 14, textAlign: "center", color: medal.color, fontWeight: 700 }}>
                {medal.symbol}
              </span>
              <div style={{
                width: 26, height: 26, borderRadius: 7, background: u.color,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700, color: "#fff",
              }}>{u.avatar}</div>

              <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "#0f172a" }}>{u.name}</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>{u.xp} XP</div>

              {/* Progress bar */}
              <div style={{ width: 60, height: 5, background: "#e2e8f0", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${u.pct}%`, height: "100%", background: "#2563eb", borderRadius: 3 }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Dashboard Page ──────────────────────────────────────────
function Dashboard() {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
      <div style={{ fontWeight: 700, fontSize: 20, color: "#0f172a", marginBottom: 4 }}>Dashboard</div>
      <div style={{ fontSize: 13, color: "#64748b", marginBottom: 18 }}>Welcome back — here's what's happening today</div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 18 }}>
        {statCards.map((c) => <StatCard key={c.label} {...c} />)}
      </div>

      {/* Charts */}
      <Charts />

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <RecentActivity />
        <Leaderboard />
      </div>
    </div>
  );
}

// ─── App Root ────────────────────────────────────────────────
export default function App() {
  const [activeNav, setActiveNav] = useState("dashboard");

  return (
    <div style={{
      display: "flex", height: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif",
      fontSize: 14, background: "#f0f4f8", overflow: "hidden",
    }}>
      <Sidebar active={activeNav} onNav={setActiveNav} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Navbar />
        <Dashboard />
      </div>
    </div>
  );
}