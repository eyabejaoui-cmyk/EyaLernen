
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
    <div className="bg-white py-4">
    <section id='types' className='app-container py-16 bg-white'>
      <div className="text-center mb-12">

        <div className="flex justify-center gap-2 mb-4">
        <div className="w-8 h-2 bg-black rounded-full"></div>
        <div className="w-8 h-2 bg-red-600 rounded-full"></div>
        <div className="w-8 h-2 bg-[#FFC107] rounded-full"></div>
      </div>

      <h2 className="text-2xl md:text-4xl font-black text-[#111111]">
          Tout pour apprendre <span className="text-[#FFC107]">l'allemand</span>
      </h2>
        <p className="section-description text-[#667085] py-2">
          Une plateforme complète combinant intelligence artificielle, gamification et pédagogie moderne.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
        {items.map((type) => (
  <article key={type.title} className="bg-[#FAFAFA] border
   border-[#F3F3F3]  rounded-3xl shadow-sm
   hover:shadow-[0_4px_14px_rgba(245,166,35,0.25)] transition">
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