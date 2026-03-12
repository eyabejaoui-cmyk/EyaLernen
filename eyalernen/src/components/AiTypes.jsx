
const items = [
    { icon: "🤖", bg: "#ede9ff", title: "IA Tuteur Personnel", desc: "Explications simples, réponses instantanées et accompagnement adapté au niveau." },
    { icon: "🎭", bg: "#ffe4ed", title: "Conversations & Jeux de rôle", desc: "Mise en pratique dans des situations réelles : voyage, études, travail, quotidien." },
    { icon: "🌟", bg: "#d1fae5", title: "Correction Grammaticale Instantanée", desc: "Correction des phrases avec explication des erreurs (articles, conjugaison, syntaxe)." },
    { icon: "👨‍🏫", bg: "#dbeafe", title: "Parcours d’Apprentissage par Niveau", desc: "Progression structurée de A1 à C2 avec objectifs clairs." },
    { icon: "📚", bg: "#ffedd5", title: "Vocabulaire Thématique", desc: "Lexique utile par contexte (vie quotidienne, professionnel, académique)." },
    { icon: "🏆", bg: "#fef9c3", title: "Suivi de Progression Personnalisé", desc: "Tableau de bord, performances et recommandations de révision." },
  ];
function AiTypes() {
  return (
    <section id='types' className='app-container py-16'>
      <div className="text-center mb-12">
        <span className="section-subheader">Fonctionnalités</span>
        <h2 className="section-header">
          <span className="gradient-text">Tout ce qu'il vous faut pour réussir</span>
        </h2>
        <p className="section-description">
          Une plateforme complète combinant intelligence artificielle, gamification et pédagogie moderne.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((type) => (
  <article key={type.title} className="ai-type-card">
    <div className="p-6">
      <div className="flex items-center mb-3">
        <div
          className="ai-type-card-icon"
          style={{ backgroundColor: type.bg }}
        >
          {type.icon}
        </div>
        <h3 className="text-xl font-bold">{type.title}</h3>
      </div>

      <p className="mt-2 text-gray-600">{type.desc}</p>
    </div>
  </article>
))}
      </div>
    </section>
  )
}

export default AiTypes