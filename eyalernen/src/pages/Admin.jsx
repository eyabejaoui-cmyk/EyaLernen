import { useEffect, useState } from "react"; {/*gérer les données et le chargement*/}
import { useNavigate } from "react-router-dom";  {/*changer de page*/}
import { LogOut } from "lucide-react"; {/*icone*/}

{/*graphique avec ligne,
une ligne dans le graphique,graphique en barres,une barre dans le graphique
axe horizontal,axe vertical
grille derrière le graphique,
petite boîte d’information quand on passe la souris
rend le graphique responsive */}
import {
  LineChart, 
  Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from "recharts";


{/*badge
  ch=fond jaune clair / texte noir
  j= fond rouge clair / texte rouge*/}
const modeBadgeStyle = {
  
  chatbot: { background: "#FFF7E0", color: "#111111" }, 
  jeux: { background: "#FFE1E1", color: "#DC2626" },
  
};

{/*carte*/}
const cardAccent = {
  blue: "#FFC107",
  green: "#DC2626",
  amber: "#FFC107",
  purple: "#111111",
};

{/*fond des icônes dans les carte */}
const iconBg = {
  blue: "#FFF7E0",
  green: "#FFE1E1",
  amber: "#FFF7E0",
  purple: "#F1F1F1",
};

{/*Classement des apprenants */}
const rankMedal = (r) => {
  if (r === 1) return { symbol: "🥇", color: "#FFC107" };
  if (r === 2) return { symbol: "🥈", color: "#94a3b8" };
  if (r === 3) return { symbol: "🥉", color: "#b45309" };
  return { symbol: `#${r}`, color: "#94a3b8" }; {/*afficher le nombre gris*/}
};

// sidebar composant React
function Sidebar({ active, onNav }) { //active= le choix de bouton / onNav= show la page
  
  const navigate = useNavigate();//changer de page

  const handleClick = (page) => {
    onNav(page); //change le contenu affiché selon le bouton cliqué

    if (page === "dashboard") {
      navigate("/Admin");
    }
  };

  return (                                                            
                                                                   
    <aside className="w-[72px] md:w-[220px] bg-[#1F1F1F] flex flex-col shrink-0 overflow-y-auto transition-all duration-200">
                                                                       {/*scroll */}
      {/* Logo / titre */}

      {/*padding-top=space intérieur en haut, padding-bottom=espace intérieur en bas/ b=en bas*/}
      <div className="pt-[20px] px-4 pb-[14px] border-b border-[#333333]">

                                            {/*texte=en gras     / espace entre les lettres*/}
        <div className="hidden md:block font-sans text-[18px] font-bold text-[#FFC107] tracking-[-0.3px]">
          EyaLernen
        </div>

        {/* version courte pour mobile */}
        <div className="md:hidden font-sans text-[18px] font-bold text-[#FFC107] text-center">
          EL
        </div>
                                    {/* margin-top=espace                   majuscules*/}
        <div className="hidden md:block text-[10px] text-white/45 mt-[2px] tracking-[1px] uppercase">
          Admin Panel
        </div>
      </div>

      {/* Menu */}
      <nav className="py-3 px-2 flex-1">
                                    {/*blanc mais trasparent un peu gris clair/  */}
        <div className="hidden md:block text-[10px] text-white/40 tracking-[1px] uppercase pt-[10px] px-2 pb-2 mt-1">
          Menu
        </div>

        {/* Dashboard /transition-all duration-150=le changement de couleur plus doux*/}
        <div
          onClick={() => handleClick("dashboard")}

          
          className={`
            flex items-center 
            gap-[10px]
            p-[10px]
            rounded-lg
            cursor-pointer
            mb-[6px]
            text-[13px]
            font-medium
            transition-all duration-150
            ${active === "dashboard" ? "text-[#111111] bg-[#FFC107]" : "text-white/75 bg-transparent"}
          `} 
        >
          <span className="text-[14px]">▦</span>
          <span className="hidden md:inline">Dashboard</span>
        </div>

        {/* Étudiants */}
        <div
          onClick={() => handleClick("etudiants")}
          className={`
            flex items-center gap-[10px]
            p-[10px]
            rounded-lg
            cursor-pointer
            mb-[6px]
            text-[13px]
            font-medium
            transition-all duration-150
            ${active === "etudiants" ? "text-[#111111] bg-[#FFC107]" : "text-white/75 bg-transparent"}
          `}
        >
          <span className="text-[14px]">🎓</span>
          <span className="hidden md:inline">Étudiants</span>
        </div>

        {/* Professeurs */}
        <div
          onClick={() => handleClick("professeurs")}
          className={`
            flex items-center gap-[10px]
            p-[10px]
            rounded-lg
            cursor-pointer
            mb-[6px]
            text-[13px]
            font-medium
            transition-all duration-150
            ${active === "professeurs" ? "text-[#111111] bg-[#FFC107]" : "text-white/75 bg-transparent"}
          `}
        >
          <span className="text-[14px]">👨‍🏫</span>
          <span className="hidden md:inline">Professeurs</span>
        </div>
      </nav>

      {/* Déconnexion */}
      <div className="py-3 px-2 pb-[18px]">
        
        {/**/}
        <button
          onClick={() => {
            // on supprime les informations de connexion stockées dans le navigateur
            localStorage.removeItem("email");
            localStorage.removeItem("user");
            window.location.href = "/#";
          }}
          className="
            w-full
            flex items-center justify-center gap-[10px]
            text-[#DC2626]
            bg-transparent
            border-0
            py-2 px-[10px]
            rounded-[10px]
            text-[13px]
            font-medium
            cursor-pointer
            transition-all duration-150
            hover:bg-[#2A1010]
          "
        >
          {/*lucide-react        contrôle épaisseur*/}
          <LogOut size={17} strokeWidth={2.2} />

          {/*largeur*/}
          <span className="hidden md:inline-block w-[1px] h-[18px] bg-[#DC2626]"></span>

          <span className="hidden md:inline">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}

// navbar
function Navbar({ searchTerm, setSearchTerm, notificationCount }) {
    //écrit dans la recherche,modifier ce texte,nombre de notification,nom admin
  return (
    <header className="bg-white 
    border-b border-[#EFE7D8] 
    px-5 py-2 
    min-h-[56px] 
    flex items-center 
    gap-3 
    shrink-0 
    flex-wrap"> 

    

      {/* Zone de recherche */}
     <div className="relative flex-[1_1_180px] max-w-[320px] min-w-[150px]">
              {/*positon icone, adapté,   barre ne dépasse320*/}
        
        {/*icone est placée librement dans son parent
        /-translate-y-1/2 = le centrage vertical*/}
        <span className="absolute 
        left-[10px] top-1/2 
        -translate-y-1/2 
        text-[#94a3b8] 
        text-[13px]">
          🔍
        </span>

  <input
    placeholder="Rechercher..." 
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)} //e.target.value yaani texte eli admin ketbo
    className="
      w-full
      bg-[#F8F6F0]
      border border-[#EFE7D8]
      rounded-lg
      py-[7px] 
      pr-3  
      pl-[30px]
      text-[13px]
      text-[#111111]
      outline-none
      font-[inherit]
    "
  />
  {/*pr= espace à droite/ pl= à gauche/ outline= supprimer le mot rechercher */}
</div>

      <div className="flex-1" />

      {/* Notification */}
      <div
        className="w-9 h-9 
        rounded-lg 
        border border-[#EFE7D8]
         bg-white flex 
         items-center 
         justify-center 
         cursor-pointer 
         relative 
         text-[15px]"
      >
        🔔

        {notificationCount > 0 && (
          <div
            className="min-w-4 h-4
             bg-[#DC2626] 
             rounded-full 
             absolute 
             top-[-4px] 
             right-[-4px] 
             border-2 
             border-white
            text-white 
            text-[9px] 
            flex 
            items-center justify-center 
            font-bold"
          >
            {notificationCount}
          </div>
        )}
      </div>

      {/* Profil admin */}
      <div className="flex 
      items-center 
      gap-2 py-1 
      pr-[10px] pl-1 
      rounded-[10px] 
      border border-[#EFE7D8] 
      cursor-pointer">

        <div className="w-7 h-7 
        rounded-[7px] 
        bg-gradient-to-br 
        from-[#FFC107] to-[#E0A800] 
        flex items-center justify-center text-[11px] f
        ont-bold
      text-[#111111]">
        
        AD
  </div>

  <span className="text-[13px] font-medium text-[#111111]">
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
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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
            <Line
  type="monotone"
  dataKey="chatbot"
  stroke="#FFC107"
  strokeWidth={2}
  dot={false}
  name="Chatbot"
/>

<Line
  type="monotone"
  dataKey="platform"
  stroke="#DC2626"
  strokeWidth={2}
  dot={false}
  name="Utilisation plateforme"
  strokeDasharray="4 2"
/>
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
          Temps par mode
        </div>

        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>
          Minutes passées par mode d’apprentissage
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

function RecentActivity({ recentUsersData }) {

  const [tab, setTab] = useState("all");
  const tabs = ["all", "chatbot", "jeux"];

  const data = recentUsersData || [];

  const filtered = tab === "all" ? data : data.filter((u) => u.mode === tab);
  
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #EFE7D8" }}>
      <div style={{ fontWeight: 600, fontSize: 14, color: "#111111", marginBottom: 10 }}>
        Activité récente
      </div>

      <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
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
            {t === "all" ? "Tous" : t === "chatbot" ? "Chatbot" : "Jeux"}
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
              flexWrap: "wrap",
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
              {u.mode === "chatbot"
                ? "Chatbot"
                : u.mode === "jeux"
                ? "Jeux"
                : u.mode === "mots"
                ? "Mots"
                : u.mode === "discussion"
                ? "Discussion"
                : u.mode} 
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

function Leaderboard({ leaderboardData }) {
  const data = leaderboardData || [];
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 16, border: "1px solid #EFE7D8" }}>
      <div style={{ fontWeight: 600, fontSize: 14, color: "#111111" }}>
        Classement des apprenants
      </div>

      <div style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>
        Apprenants les plus actifs ce mois-ci
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {data.map((u) => {
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
                flexWrap: "wrap",
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

function Dashboard({ statCards, activityData, modeData, recentUsersData, leaderboardData }) {
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
          gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        <RecentActivity recentUsersData={recentUsersData} />
        <Leaderboard leaderboardData={leaderboardData} />
      </div>
    </div>
  );
}

// Page Étudiants avec données réelles
function EtudiantsPage({ etudiants, supprimerEtudiant }) {
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
          <table style={{ width: "100%", minWidth: 760, borderCollapse: "collapse", fontSize: 13 }}>
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

                      <button
                        style={btnSupprimer}
                        onClick={() => supprimerEtudiant(e.id)}
                      >
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
function ProfesseursPage({ professeurs, supprimerProfesseur  }) {
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
          <table style={{ width: "100%", minWidth: 760, borderCollapse: "collapse", fontSize: 13 }}>
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

                      <button
                        style={btnSupprimer}
                        onClick={() => supprimerProfesseur(p.id)}
                      >
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

  const [searchTerm, setSearchTerm] = useState("");


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

  const [recentUsersData, setRecentUsersData] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);

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
        console.log("ACTIVITY =", data);
        setActivityData(data);
      });

    fetch("http://127.0.0.1:8000/modes")
      .then((res) => res.json())
      .then((data) => {
        setModeData(data);
      });

    fetch("http://127.0.0.1:8000/admin/recent-activity")
      .then((res) => res.json())
      .then((data) => {
        console.log("RECENT ACTIVITY =", data);
        setRecentUsersData(data);
      })
      .catch((err) => {
        console.log("Erreur recent activity :", err);
      });

    fetch("http://127.0.0.1:8000/admin/leaderboard")
      .then((res) => res.json())
      .then((data) => {
        console.log("LEADERBOARD =", data);
        setLeaderboardData(data);
      })
      .catch((err) => {
        console.log("Erreur leaderboard :", err);
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
          minWidth: 0,
        }}
      >
        <Navbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          notificationCount={recentUsersData.length}
          
        />

        {activeNav === "dashboard" && searchTerm === "" && (
          <Dashboard
            statCards={statCards}
            activityData={activityData}
            modeData={modeData}
            recentUsersData={recentUsersData}
            leaderboardData={leaderboardData}
          />
        )}

        {activeNav === "etudiants" && (
          <EtudiantsPage
            etudiants={etudiants.filter((e) =>
            `${e.nom} ${e.prenom} ${e.email}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
          )}
          />
        )}

        {activeNav === "professeurs" && (
          <ProfesseursPage
            professeurs={professeurs.filter((p) =>
            `${p.nom} ${p.prenom} ${p.email}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
          )}
          />

        )}
      </div>
    </div>
  );
}