import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";


import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";

const recentUsers = [
  { id: 1, name: "Amira B.", avatar: "AB", color: "#FFC107", mode: "chatbot", action: "Practiced vocab", time: "2m ago" },
  { id: 2, name: "Youssef K.", avatar: "YK", color: "#DC2626", mode: "jeux", action: "Word match game", time: "5m ago" },
  { id: 3, name: "Leila M.", avatar: "LM", color: "#111111", mode: "appel", action: "Speaking session", time: "9m ago" },
  { id: 4, name: "Omar T.", avatar: "OT", color: "#FFC107", mode: "chatbot", action: "Grammar chat", time: "14m ago" },
  { id: 5, name: "Sara H.", avatar: "SH", color: "#DC2626", mode: "jeux", action: "Sentence builder", time: "18m ago" },
];

const leaderboard = [
  { rank: 1, name: "Amira B.", avatar: "AB", color: "#FFC107", xp: 3840, pct: 96 },
  { rank: 2, name: "Youssef K.", avatar: "YK", color: "#DC2626", xp: 3210, pct: 80 },
  { rank: 3, name: "Leila M.", avatar: "LM", color: "#111111", xp: 2980, pct: 74 },
  { rank: 4, name: "Omar T.", avatar: "OT", color: "#FFC107", xp: 2650, pct: 66 },
  { rank: 5, name: "Sara H.", avatar: "SH", color: "#DC2626", xp: 2340, pct: 58 },
];

const modeBadgeStyle = {
  chatbot: { background: "#FFF7E0", color: "#111111" },
  jeux: { background: "#FFE1E1", color: "#DC2626" },
  appel: { background: "#F1F1F1", color: "#111111" },
};

const cardAccent = {
  blue: "#FFC107",
  green: "#DC2626",
  amber: "#FFC107",
  purple: "#111111",
};

const iconBg = {
  blue: "#FFF7E0",
  green: "#FFE1E1",
  amber: "#FFF7E0",
  purple: "#F1F1F1",
};

const rankMedal = (r) => {
  if (r === 1) return { symbol: "🥇", color: "#FFC107" };
  if (r === 2) return { symbol: "🥈", color: "#94a3b8" };
  if (r === 3) return { symbol: "🥉", color: "#b45309" };
  return { symbol: `#${r}`, color: "#94a3b8" };
};

// sidebar modifiée
function Sidebar({ active, onNav }) {
  const navigate = useNavigate();

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "▦",
      path: "/Admin",
    },
    {
      id: "etudiants",
      label: "Étudiants",
      icon: "🎓",
    },
    {
      id: "professeurs",
      label: "Professeurs",
      icon: "👨‍🏫",
    },
  ];

  const handleClick = (item) => {
    onNav(item.id);

    if (item.id === "dashboard") {
      navigate(item.path);
    }
  };

  return (
    <aside
      style={{
        width: 220,
        background: "#1F1F1F",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        overflowY: "auto",
      }}
    >
      <div
        style={{
          padding: "20px 16px 14px",
          borderBottom: "1px solid #333333",
        }}
      >
        <div
          style={{
            fontFamily: "system-ui",
            fontSize: 18,
            fontWeight: 700,
            color: "#FFC107",
            letterSpacing: -0.3,
          }}
        >
          EyaLernen
        </div>

        <div
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.45)",
            marginTop: 2,
            letterSpacing: 1,
            textTransform: "uppercase",
          }}
        >
          Admin Panel
        </div>
      </div>

      <nav style={{ padding: "12px 8px", flex: 1 }}>
        <div
          style={{
            fontSize: 10,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: 1,
            textTransform: "uppercase",
            padding: "10px 8px 8px",
            marginTop: 4,
          }}
        >
          Menu
        </div>

        {navItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 10px",
              borderRadius: 8,
              cursor: "pointer",
              marginBottom: 6,
              fontSize: 13,
              fontWeight: 500,
              color: active === item.id ? "#111111" : "rgba(255,255,255,0.75)",
              background: active === item.id ? "#FFC107" : "transparent",
              transition: "all 0.15s",
            }}
          >
            <span style={{ fontSize: 14 }}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
            </nav>

      <div
        style={{
          padding: "12px 8px 18px",
        }}
      >
        <button
          onClick={() => {
            localStorage.removeItem("email");
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            color: "#DC2626",
            background: "transparent",
            border: "none",
            padding: "8px 10px",
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#2A1010";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <LogOut size={17} strokeWidth={2.2} />

          <span
            style={{
              width: 1,
              height: 18,
              background: "#DC2626",
              display: "inline-block",
            }}
          ></span>

          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}

// navbar
function Navbar() {
  return (
    <header
      style={{
        background: "#FFFFFF",
        borderBottom: "1px solid #EFE7D8",
        padding: "0 20px",
        height: 56,
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexShrink: 0,
      }}
    >
      <div style={{ position: "relative", flex: 1, maxWidth: 280 }}>
        <span
          style={{
            position: "absolute",
            left: 10,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#94a3b8",
            fontSize: 13,
          }}
        >
          🔍
        </span>

        <input
          placeholder="Search users, sessions..."
          style={{
            width: "100%",
            background: "#F8F6F0",
            border: "1px solid #EFE7D8",
            borderRadius: 8,
            padding: "7px 12px 7px 30px",
            fontSize: 13,
            color: "#111111",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
      </div>

      <div style={{ flex: 1 }} />

      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          border: "1px solid #EFE7D8",
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
          fontSize: 15,
        }}
      >
        🔔
        <div
          style={{
            width: 8,
            height: 8,
            background: "#DC2626",
            borderRadius: "50%",
            position: "absolute",
            top: 6,
            right: 6,
            border: "2px solid #fff",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "4px 10px 4px 4px",
          borderRadius: 10,
          border: "1px solid #EFE7D8",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: "linear-gradient(135deg,#FFC107,#E0A800)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 11,
            fontWeight: 700,
            color: "#111111",
          }}
        >
          EA
        </div>

        <span style={{ fontSize: 13, fontWeight: 500, color: "#111111" }}>
          Admin
        </span>
      </div>
    </header>
  );
}

function StatCard({ label, value, change, up, color, icon }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 16,
        border: "1px solid #EFE7D8",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 3,
          height: "100%",
          borderRadius: 2,
          background: cardAccent[color],
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 14,
          right: 14,
          width: 36,
          height: 36,
          borderRadius: 10,
          background: iconBg[color],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
        }}
      >
        {icon}
      </div>

      <div
        style={{
          fontSize: 11,
          fontWeight: 500,
          color: "#64748b",
          textTransform: "uppercase",
          letterSpacing: 0.5,
          marginBottom: 6,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: "#111111",
          lineHeight: 1,
        }}
      >
        {value}
      </div>

      <div style={{ fontSize: 11, marginTop: 6, color: up ? "#DC2626" : "#ef4444" }}>
        {change}
      </div>
    </div>
  );
}

function Charts({ activityData, modeData }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1.6fr 1fr",
        gap: 12,
        marginBottom: 18,
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 16,
          border: "1px solid #EFE7D8",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 14, color: "#111111" }}>
          Activité des utilisateurs
        </div>

        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>
          Activité des apprenants cette semaine
        </div>

        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={activityData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F1F1" vertical={false} />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #EFE7D8", borderRadius: 8, boxShadow: "none" }} />
            <Line type="monotone" dataKey="users" stroke="#FFC107" strokeWidth={2} dot={false} name="Chatbot" />
            <Line type="monotone" dataKey="sessions" stroke="#DC2626" strokeWidth={2} dot={false} name="Utilisation plateforme" strokeDasharray="4 2" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 16,
          border: "1px solid #EFE7D8",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: 14, color: "#111111" }}>
          Time per Mode
        </div>

        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>
          Minutes spent per learning mode
        </div>

        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={modeData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F1F1" vertical={false} />
            <XAxis dataKey="mode" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, border: "1px solid #EFE7D8", borderRadius: 8, boxShadow: "none" }} />
            <Bar dataKey="minutes" name="Minutes" radius={[6, 6, 0, 0]} fill="#FFC107" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function RecentActivity() {
  const [tab, setTab] = useState("all");
  const tabs = ["all", "chatbot", "jeux", "appel"];
  const filtered = tab === "all" ? recentUsers : recentUsers.filter((u) => u.mode === tab);

  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #EFE7D8" }}>
      <div style={{ fontWeight: 600, fontSize: 14, color: "#111111", marginBottom: 10 }}>
        Recent Activity
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              fontSize: 12,
              padding: "4px 10px",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 500,
              border: "1px solid transparent",
              transition: "all 0.15s",
              background: tab === t ? "#FFC107" : "transparent",
              color: tab === t ? "#111111" : "#64748b",
              borderColor: tab === t ? "#FFC107" : "#EFE7D8",
            }}
          >
            {t === "all" ? "All" : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {filtered.map((u) => (
          <div
            key={u.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: 10,
              background: "#F8F6F0",
              borderRadius: 8,
            }}
          >
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                background: u.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700,
                color: u.color === "#FFC107" ? "#111111" : "#fff",
                flexShrink: 0,
              }}
            >
              {u.avatar}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#111111" }}>
                {u.name}
              </div>

              <div style={{ fontSize: 11, color: "#64748b", marginTop: 1 }}>
                {u.action}
              </div>
            </div>

            <span
              style={{
                fontSize: 10,
                padding: "2px 7px",
                borderRadius: 4,
                fontWeight: 500,
                ...modeBadgeStyle[u.mode],
              }}
            >
              {u.mode}
            </span>

            <span style={{ fontSize: 11, color: "#94a3b8", whiteSpace: "nowrap" }}>
              {u.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Leaderboard() {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #EFE7D8" }}>
      <div style={{ fontWeight: 600, fontSize: 14, color: "#111111" }}>
        Leaderboard
      </div>

      <div style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>
        Top active learners this month
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {leaderboard.map((u) => {
          const medal = rankMedal(u.rank);

          return (
            <div
              key={u.rank}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                background: "#F8F6F0",
                borderRadius: 8,
              }}
            >
              <span
                style={{
                  width: 20,
                  fontSize: 14,
                  textAlign: "center",
                  color: medal.color,
                  fontWeight: 700,
                }}
              >
                {medal.symbol}
              </span>

              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 7,
                  background: u.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontWeight: 700,
                  color: u.color === "#FFC107" ? "#111111" : "#fff",
                }}
              >
                {u.avatar}
              </div>

              <div style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "#111111" }}>
                {u.name}
              </div>

              <div style={{ fontSize: 12, color: "#64748b" }}>
                {u.xp} XP
              </div>

              <div
                style={{
                  width: 60,
                  height: 5,
                  background: "#EFE7D8",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${u.pct}%`,
                    height: "100%",
                    background: "#FFC107",
                    borderRadius: 3,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Dashboard({ statCards, activityData, modeData }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
      <div style={{ fontWeight: 700, fontSize: 20, color: "#111111", marginBottom: 4 }}>
        Dashboard
      </div>

      <div style={{ fontSize: 13, color: "#64748b", marginBottom: 18 }}>
        Welcome back — here's what's happening today
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 12,
          marginBottom: 18,
        }}
      >
        {statCards.map((c) => (
          <StatCard
            key={c.label}
            label={c.label}
            value={c.value}
            change={c.change}
            up={c.up}
            color={c.color}
            icon={c.icon}
          />
        ))}
      </div>

      <Charts activityData={activityData} modeData={modeData} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <RecentActivity />
        <Leaderboard />
      </div>
    </div>
  );
}

// Page Étudiants avec données réelles
function EtudiantsPage({ etudiants }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
      <div style={{ fontWeight: 700, fontSize: 20, color: "#111111", marginBottom: 4 }}>
        Gestion des étudiants
      </div>

      <div style={{ fontSize: 13, color: "#64748b", marginBottom: 18 }}>
        Liste des étudiants inscrits sur la plateforme
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 16,
          border: "1px solid #EFE7D8",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#F8F6F0", color: "#64748b" }}>
                <th style={thStyle}>Nom</th>
                <th style={thStyle}>Prénom</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Niveau</th>
                <th style={thStyle}>Statut abonnement</th>
                <th style={thStyle}>Temps passé</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {etudiants.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: 20, textAlign: "center", color: "#64748b" }}>
                    Aucune donnée trouvée
                  </td>
                </tr>
              ) : (
                etudiants.map((e) => (
                  <tr key={e.id} style={{ borderTop: "1px solid #EFE7D8" }}>
                    <td style={tdStyle}>{e.nom || "-"}</td>
                    <td style={tdStyle}>{e.prenom || "-"}</td>
                    <td style={tdStyle}>{e.email || "-"}</td>
                    <td style={tdStyle}>{e.niveau || "-"}</td>
                    <td style={tdStyle}>{e.abonnement || e.statut || "-"}</td>
                    <td style={tdStyle}>{e.temps || e.temps_passe || "0 min"}</td>
                    <td style={tdStyle}>
                      <button
                        style={btnVoir}
                        onClick={() =>
                          alert(`Étudiant : ${e.prenom || ""} ${e.nom || ""}\nEmail : ${e.email || ""}`)
                        }
                      >
                        Voir
                      </button>

                      <button style={btnSupprimer}>
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Page Professeurs avec données réelles
function ProfesseursPage({ professeurs }) {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>
      <div style={{ fontWeight: 700, fontSize: 20, color: "#111111", marginBottom: 4 }}>
        Gestion des professeurs
      </div>

      <div style={{ fontSize: 13, color: "#64748b", marginBottom: 18 }}>
        Liste des professeurs disponibles sur la plateforme
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 16,
          border: "1px solid #EFE7D8",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#F8F6F0", color: "#64748b" }}>
                <th style={thStyle}>Nom</th>
                <th style={thStyle}>Prénom</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Téléphone</th>
                <th style={thStyle}>Niveau enseigné</th>
                <th style={thStyle}>Type de cours</th>
                <th style={thStyle}>Prix</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {professeurs.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{ padding: 20, textAlign: "center", color: "#64748b" }}>
                    Aucune donnée trouvée
                  </td>
                </tr>
              ) : (
                professeurs.map((p) => (
                  <tr key={p.id} style={{ borderTop: "1px solid #EFE7D8" }}>
                    <td style={tdStyle}>{p.nom || "-"}</td>
                    <td style={tdStyle}>{p.prenom || "-"}</td>
                    <td style={tdStyle}>{p.email || "-"}</td>
                    <td style={tdStyle}>{p.telephone || "-"}</td>
                    <td style={tdStyle}>{p.niveau || p.niveau_langue || "-"}</td>
                    <td style={tdStyle}>{p.typeCours || p.type_cours || "-"}</td>
                    <td style={tdStyle}>{p.prix || p.prix_individuel || "-"}</td>
                    <td style={tdStyle}>
                      <button
                        style={btnVoir}
                        onClick={() =>
                          alert(`Professeur : ${p.prenom || ""} ${p.nom || ""}\nEmail : ${p.email || ""}`)
                        }
                      >
                        Voir
                      </button>

                      <button style={btnSupprimer}>
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: "left",
  padding: "12px 10px",
  fontWeight: 600,
  whiteSpace: "nowrap",
};

const tdStyle = {
  padding: "12px 10px",
  color: "#111111",
  whiteSpace: "nowrap",
};

const btnVoir = {
  background: "#FFC107",
  color: "#111111",
  border: "none",
  padding: "6px 10px",
  borderRadius: 6,
  fontSize: 12,
  cursor: "pointer",
  marginRight: 6,
};

const btnSupprimer = {
  background: "#DC2626",
  color: "#fff",
  border: "none",
  padding: "6px 10px",
  borderRadius: 6,
  fontSize: 12,
  cursor: "pointer",
};

// Admin
export default function Admin() {
  const [activeNav, setActiveNav] = useState("dashboard");

  const [stats, setStats] = useState({
    apprenants: 0,
    conversations: 0,
    temps: 0,
    phrases: 0,
  });

  const [activityData, setActivityData] = useState([]);
  const [modeData, setModeData] = useState([]);

  const [etudiants, setEtudiants] = useState([]);
  const [professeurs, setProfesseurs] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/admin/stats")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStats(data);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("http://127.0.0.1:8000/activity")
      .then((res) => res.json())
      .then((data) => {
        setActivityData(data);
      });

    fetch("http://127.0.0.1:8000/modes")
      .then((res) => res.json())
      .then((data) => {
        setModeData(data);
      });

    // Petite modification : vérifier que le backend renvoie bien un tableau
    fetch("http://127.0.0.1:8000/admin/etudiants")
      .then((res) => res.json())
      .then((data) => {
        console.log("Étudiants reçus :", data);

        if (Array.isArray(data)) {
          setEtudiants(data);
        } else {
          setEtudiants([]);
        }
      })
      .catch((err) => {
        console.log("Erreur étudiants :", err);
        setEtudiants([]);
      });

    // Petite modification : vérifier que le backend renvoie bien un tableau
    fetch("http://127.0.0.1:8000/admin/professeurs")
      .then((res) => res.json())
      .then((data) => {
        console.log("Professeurs reçus :", data);

        if (Array.isArray(data)) {
          setProfesseurs(data);
        } else {
          setProfesseurs([]);
        }
      })
      .catch((err) => {
        console.log("Erreur professeurs :", err);
        setProfesseurs([]);
      });
  }, []);

  const statCards = [
    {
      label: "Apprenants",
      value: stats.apprenants,
      change: "Utilisateurs inscrits",
      up: true,
      color: "blue",
      icon: "👨‍🎓",
    },
    {
      label: "Conversations IA",
      value: stats.conversations,
      change: "Messages chatbot",
      up: true,
      color: "green",
      icon: "🤖",
    },
    {
      label: "Temps d'apprentissage",
      value: `${stats.temps} min`,
      change: "Temps total passé",
      up: true,
      color: "amber",
      icon: "⏱️",
    },
    {
      label: "Phrases terminées",
      value: stats.phrases,
      change: "Exercices complétés",
      up: true,
      color: "purple",
      icon: "📚",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "'DM Sans', system-ui, sans-serif",
        fontSize: 14,
        background: "#F8F6F0",
        overflow: "hidden",
      }}
    >
      <Sidebar active={activeNav} onNav={setActiveNav} />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Navbar />

        {activeNav === "dashboard" && (
          <Dashboard
            statCards={statCards}
            activityData={activityData}
            modeData={modeData}
          />
        )}

        {activeNav === "etudiants" && (
          <EtudiantsPage etudiants={etudiants} />
        )}

        {activeNav === "professeurs" && (
          <ProfesseursPage professeurs={professeurs} />
        )}
      </div>
    </div>
  );
}