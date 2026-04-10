import React from 'react'
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className='py-10'>
    <section id='home' className='app-container mb-4 pt-32 pb-12 overflow-hidden sm:overflow-visible '>
      <div className="flex flex-col gap-6 mb-4"></div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center '>
        {/*gauche*/}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4">
            <span className="text-[#0F172A]">Apprends l’allemand</span>
            <br />
            <span className="text-[#667085]">sans </span>
            <span className="text-[#F5A623]">peur.</span>
          </h1>

          <p className="text-lg mb-4 max-w-md text-[#667085] leading-8">
           Pratique la communication avec un chatbot bienveillant.
           Des explications simples en français et en derja.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/commencer" className="bg-[#F5A623] text-[#3A2600] font-extrabold px-7 py-3.5 rounded-2xl shadow-[0_4px_14px_rgba(245,166,35,0.35)] hover:bg-[#E09010] transition" >
              Commencer gratuitement
            </Link>

            <a href="#" className="bg-white text-[#3A2600] border border-[#D9DEE8] font-bold px-7 py-3.5 rounded-2xl hover:bg-[#F5A623] transition ">
              Voir les fonctionnalités
            </a>
          </div>
        </div>

           
          
        {/*droite*/}
        <div style={{ position: "relative", display: "flex", justifyContent: "center", width: 420, margin: "0 auto" }}>
          {/* Floating badges */}
          {[
            { icon: "🔥", title: "+2 400 inscrits", sub: "cette semaine", style: { top: "10%", left: -40, animationDelay: "0s" } },
            { icon: "⭐", title: "Note 4.9/5", sub: "48K+ avis", style: { bottom: "20%", left: -20, animationDelay: ".7s" } },
            { icon: "🏆", title: "Certifié", sub: "Min. Éducation", style: { top: "5%", right: -20, animationDelay: ".3s" } },
          ].map((b, i) => (
            <div key={i} style={{ position: "absolute", background: "#fff", borderRadius: 14, padding: "10px 14px", boxShadow: "0 4px 24px rgba(108,99,255,.1)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, animation: `floatBadge 5s ease-in-out infinite`, ...b.style }}>
              <span style={{ fontSize: 18 }}>{b.icon}</span>
              <div><div style={{ fontWeight: 700, color: "var(--dark)", fontSize: 13 }}>{b.title}</div><div style={{ fontSize: 11, color: "var(--muted)" }}>{b.sub}</div></div>
            </div>
          ))}
          {/* Phone */}
          <div style={{ width: 300, background: "#fff",position: "relative", zIndex: 10, borderRadius: 28, boxShadow: "0 12px 48px rgba(108,99,255,.18)", overflow: "hidden", border: "1px solid var(--border)", animation: "float 4s ease-in-out infinite" }}>
            <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#6c63ff,#a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🧙</div>
              <div><div style={{ fontWeight: 600, fontSize: 14 }}>IA Tuteur</div><div style={{ fontSize: 11, color: "var(--accent)" }}>● En ligne</div></div>
            </div>
            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { text: "Bonjour ! 👋 Sur quoi travaillons-nous aujourd'hui ?", bot: true },
                { text: "La photosynthèse svp !", bot: false },
                { text: "Super ! 🌱 La photosynthèse = cuisine des plantes : lumière + eau + CO₂ = sucre + O₂ !", bot: true },
              ].map((m, i) => (
                <div key={i} style={{ padding: "10px 14px", borderRadius: 12, fontSize: 12, lineHeight: 1.5, maxWidth: "80%", alignSelf: m.bot ? "flex-start" : "flex-end", background: m.bot ? "var(--primary-light)" : "var(--primary)", color: m.bot ? "var(--primary-dark)" : "#fff", borderBottomLeftRadius: m.bot ? 4 : 12, borderBottomRightRadius: m.bot ? 12 : 4 }}>{m.text}</div>
              ))}
            </div>
            <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
              <div style={{ flex: 1, background: "var(--light)", border: "1px solid var(--border)", borderRadius: 50, padding: "8px 14px", fontSize: 12, color: "var(--muted)" }}>Posez une question...</div>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, cursor: "pointer" }}>➤</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
     

export default HeroSection
