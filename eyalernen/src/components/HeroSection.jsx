import React from 'react'
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <div className='py-10  bg-[#171717]'>
    <section id='home' className='app-container mb-4 pt-32 pb-12 overflow-hidden sm:overflow-visible '>
      <div className="flex flex-col gap-6 mb-4"></div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center '>
        {/*gauche*/}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-black leading-tight mb-4">
            <span className="text-white">Apprends l’allemand</span>
            <br />
            <span className="text-[#FFC107]">sans </span>
            <span className="text-[#FFC107]">peur.</span>
          </h1>

          <p className="text-lg mb-4 max-w-md text-gray-300 leading-8">
           Pratique la communication avec un chatbot bienveillant.
           Des explications simples en français et en derja.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => {
              document.getElementById("abonnements").scrollIntoView({
              behavior: "smooth"
            });
            }}
           className="bg-[#FFC107] text-black font-extrabold px-7 py-3.5 rounded-2xl shadow-[0_4px_14px_rgba(255,193,7,0.35)] hover:bg-[#E0A800] transition"
          >
          Commencer gratuitement
            </button>
            
            <a href="#types" className="bg-transparent text-white border border-gray-600 font-bold px-7 py-3.5 rounded-2xl hover:border-[#FFC107] hover:text-[#FFC107] transition ">
              Voir les fonctionnalités
            </a>
          </div>
        </div>

           
          
        {/*droite*/}
        <div style={{ position: "relative", display: "flex", justifyContent: "center", width: 420, margin: "0 auto" }}>
          {/* badges */}
          {[
          
            { icon: "🇩🇪", title: "Niveau A1-A2", sub: "pour débutants", style: { top: "10%", left: -60, animation: `floatBadge 5s ease-in-out infinite` } },
            { icon: "💬", title: "Chatbot IA", sub: "pratique orale", style: { bottom: "20%", left: -60, animationDelay: ".7s" } },
            { icon: "🦉", title: "Explication", sub: "français & derja", style: { top: "5%", right: -60, animationDelay: ".3s" } },
            ].map((b, i) => (
            <div key={i} style={{ position: "absolute", background: "#fff", borderRadius: 14, padding: "10px 14px", boxShadow: "0 4px 24px rgba(108,99,255,.1)", border: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, animation: `floatBadge 5s ease-in-out infinite`, ...b.style }}>
              <span style={{ fontSize: 18 }}>{b.icon}</span>
              <div><div style={{ fontWeight: 700, color: "var(--dark)", fontSize: 13 }}>{b.title}</div><div style={{ fontSize: 11, color: "var(--muted)" }}>{b.sub}</div></div>
            </div>
          ))}
          
          <div style={{ width: 300, background: "#222222", position: "relative", zIndex: 10, borderRadius: 28, boxShadow: "0 12px 48px rgba(255,193,7,.18)", overflow: "hidden", border: "1px solid #333333", animation: "floatChatbot 4s ease-in-out infinite" }}>
              
              <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 10 }}>
              
              <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#FFC107", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🦉</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#ffffff" }}>EyaLernenBot</div>
                  <div style={{ fontSize: 11, color: "#FFC107" }}>● En ligne</div>
                </div>

              </div>

            <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { text: "Hallo ! Aujourd’hui, on pratique l’allemand ensemble.", bot: true },
                { text: "Je veux apprendre à parler.", bot: false },
                { text: "Super ! En allemand : Ich möchte sprechen lernen.", bot: true },
              ].map((m, i) => (
                <div key={i} style={{ padding: "10px 14px", borderRadius: 12, fontSize: 12, lineHeight: 1.5, maxWidth: "80%", alignSelf: m.bot ? "flex-start" : "flex-end", background: m.bot ? "#333333" : "#FFC107", color: m.bot ? "#ffffff" : "#000000", borderBottomLeftRadius: m.bot ? 4 : 12, borderBottomRightRadius: m.bot ? 12 : 4 }}>{m.text}</div>
              ))}
            </div>
            <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
              <div style={{ flex: 1, background: "#171717", border: "1px solid #333333", borderRadius: 50, padding: "8px 14px", fontSize: 12, color: "#9CA3AF" }}>Écris ta phrase...</div>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#FFC107", color: "#000000", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, cursor: "pointer" }}>➤</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
     

export default HeroSection
