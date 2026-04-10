
const items = [
    { icon: "🤖", bg: "", title: "Chatbot IA", desc: "Discutez en allemand avec un assistant bienveillant qui corrige et encourage." },
    { icon: "🎭", bg: "", title: "Jeux de rôle", desc: "Pratiquez dans des scénarios réels : café, restaurant, entretien..." },
    { icon: "🌟", bg: "", title: "Cours structurés", desc: "Apprenez par thème et par niveau avec des ressources variées." },
    { icon: "👨‍🏫", bg: "", title: "Professeurs réels", desc: "Séances en ligne, devoirs et feedback personnalisé." },
    { icon: "📚", bg: "", title: "Progression & Badges", desc: "Suivez vos progrès et débloquez des récompenses motivantes." },
    { icon: "🏆", bg: "", title: "Communauté", desc: "Apprenez sans jugement, avec des explications en français et derja." },
  ];
function AiTypes() {
  return (
    <div className="bg-[#F4F2EF] py-4">
    <section id='types' className='app-container py-16 bg-[#F4F2EF]'>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-black bg-gradient-to-r from-[#5B4B3A] to-[#F5A623] bg-clip-text text-transparent">Fonctionnalités</h2>
        <p className="section-description text-[#667085] py-2">
          Une plateforme complète combinant intelligence artificielle, gamification et pédagogie moderne.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {items.map((type) => (
  <article key={type.title} className="ai-type-card hover:shadow-[0_4px_14px_rgba(245,166,35,0.35)] transition">
    <div className="p-6">
      <div className="flex items-center mb-3">
        <div
          className="ai-type-card-icon"
          style={{ backgroundColor: type.bg }}
        >
          {type.icon}
        </div>
        <h3 className="text-xl font">{type.title}</h3>
      </div>

      <p className="mt-2 text-gray-600 ">{type.desc}</p>
    </div>
  </article>
))}
      </div>
    </section> 
    </div>
  )
}

export default AiTypes