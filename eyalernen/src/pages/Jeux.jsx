import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  X,
  LayoutGrid,
  BookOpen,
  GraduationCap,
  TrendingUp,
  User,
  Menu
} from "lucide-react";

export default function Jeux() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-[#F8F6F0]">

      {/* bouton menu mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="
        fixed top-4 left-4 z-40
        lg:hidden
        w-12 h-12
        rounded-full
        border border-[#333333]
        bg-[#1F1F1F]
        flex items-center justify-center
        text-white
        shadow-sm
        hover:bg-[#FFC107]
        hover:text-black
        transition
        "
      >
        <Menu size={24} />
      </button>

      {/* bouton fermer page */}
     

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 z-50
        h-screen

        w-72

        bg-[#1F1F1F]
        border-r border-[#333333]

        flex flex-col justify-between

        px-6 py-8

        transition-transform duration-300

        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

        lg:translate-x-0
        `}
      >

        {/* fermer sidebar mobile */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden self-end mb-4 text-gray-300 hover:text-[#FFC107]"
        >
          <X size={24} />
        </button>

        <div>

          {/* logo */}
          <div className="mb-12">

            <div className="flex items-center gap-3 ">

              <div
                className="
                w-11 h-11
                bg-gradient-to-br from-[#FFC107] to-[#E0A800]
                rounded-2xl
                flex items-center justify-center
                text-2xl
                shadow-[0_4px_16px_rgba(255,193,7,0.35)]
                "
              >
                🦉
              </div>

              <div className="flex items-center">
                <span className="text-3xl font-black text-[#FFC107]">Eya</span>
                <span className="text-3xl font-black text-white">Lernen</span>
              </div>

            </div>

          </div>

          {/* navigation */}
          <nav>

            <ul className="space-y-4 mb-6">

              <li>
                <Link
                  to="/"
                  className="
                  flex items-center gap-3
                  text-gray-300
                  font-medium
                  rounded-2xl
                  px-5 py-4
                  hover:bg-[#FFC107]
                  hover:text-black
                  transition-all duration-200
                  "
                >
                  <LayoutGrid size={22} />
                  <span>Accueil</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/ness"
                  className="
                  flex items-center gap-3
                  text-gray-300
                  font-medium
                  rounded-2xl
                  px-5 py-4
                  hover:bg-[#FFC107]
                  hover:text-black
                  transition-all duration-200
                  "
                >
                  <BookOpen size={22} />
                  <span>Apprendre</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/ProfList"
                  className="
                  flex items-center gap-3
                  text-gray-300
                  font-medium
                  rounded-2xl
                  px-5 py-4
                  hover:bg-[#FFC107]
                  hover:text-black
                  transition-all duration-200
                  "
                >
                  <GraduationCap size={22} />
                  <span>Cours</span>
                </Link>
              </li>

              <li>
                <Link
                  to="/progression"
                  className="
                  flex items-center justify-between
                  text-gray-300
                  font-medium
                  rounded-2xl
                  px-5 py-4
                  hover:bg-[#FFC107]
                  hover:text-black
                  transition-all duration-200
                  "
                >
                  <div className="flex items-center gap-3">
                    <TrendingUp size={22} />
                    <span>Progression</span>
                  </div>

                  <span className="w-3 h-3 rounded-full bg-red-600"></span>
                </Link>
              </li>

            </ul>

          </nav>

        </div>

        {/* compte */}
        <div>

          <Link
            to="/compte"
            className="
            flex items-center gap-3
            text-gray-300
            font-medium
            rounded-2xl
            px-5 py-4
            hover:bg-[#FFC107]
            hover:text-black
            transition-all duration-200
            "
          >
            <User size={22} />
            <span>Compte</span>
          </Link>

        </div>

      </aside>

      {/* contenu principal */}
      <main className="lg:ml-72 min-h-screen">

        <div className="h-screen overflow-y-auto bg-[#F8F6F0] border border-[#EFE7D8] p-4 sm:p-8">

          <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {/* 1 */}
            <Link to="/Cafe" className="block">
              <div className="group bg-white border border-[#EFE7D8] rounded-3xl shadow-sm p-4 sm:p-5 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_4px_14px_rgba(255,193,7,0.30)] cursor-pointer">
                <div className="bg-[#FFF7E0] rounded-2xl p-4 flex items-center justify-center mb-4">
                  <img
                    src="/images/café.png"
                    alt="cafe"
                    className="h-[130px] sm:h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2 text-[#111111]">
                  ☕ Au café
                </h2>

                <p className="text-gray-600 text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
                  Commande une boisson et une pâtisserie
                  dans un café.
                </p>

                <div className="flex justify-between items-center">
                  <span className="bg-[#1F1F1F] text-white px-3 py-1 rounded-full text-sm">
                    Débutant
                  </span>
                </div>
              </div>
            </Link>

            {/* 2 */}
            <Link to="/Restaurant" className="block">
              <div className="group bg-white border border-[#EFE7D8] rounded-3xl shadow-sm p-4 sm:p-5 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_4px_14px_rgba(255,193,7,0.30)] cursor-pointer">
                <div className="bg-[#FFE1E1] rounded-2xl p-4 flex items-center justify-center mb-4">
                  <img
                    src="/images/restaurant.png"
                    alt="restaurant"
                    className="h-[130px] sm:h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2 text-[#111111]">
                  🍽️ Au restaurant
                </h2>

                <p className="text-gray-600 text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
                  Réserve une table, choisis ton menu et demande l'addition au serveur.
                </p>

                <div className="flex justify-between items-center">
                  <span className="bg-[#DC2626] text-white px-3 py-1 rounded-full text-sm">
                    Débutant
                  </span>
                </div>
              </div>
            </Link>

            {/* 3 */}
            <Link to="/Supermarche" className="block">
              <div className="group bg-white border border-[#EFE7D8] rounded-3xl shadow-sm p-4 sm:p-5 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_4px_14px_rgba(255,193,7,0.30)] cursor-pointer">
                <div className="bg-[#F1F1F1] rounded-2xl p-4 flex items-center justify-center mb-4">
                  <img
                    src="/images/supermarché.png"
                    alt="supermarché"
                    className="h-[130px] sm:h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2 text-[#111111]">
                  🛒 Au supermarché
                </h2>

                <p className="text-gray-600 text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
                  Cherche des produits, demande de l'aide et passe en caisse.
                </p>

                <div className="flex justify-between items-center">
                  <span className="bg-[#FFC107] text-black px-3 py-1 rounded-full text-sm">
                    Débutant
                  </span>
                </div>
              </div>
            </Link>

            {/* 4 */}
            <div className="group bg-white border border-[#EFE7D8] rounded-3xl shadow-sm p-4 sm:p-5 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_4px_14px_rgba(255,193,7,0.30)] cursor-pointer">
              <div className="bg-[#FFF7E0] rounded-2xl p-4 flex items-center justify-center mb-4">
                <img
                  src="/images/boulangerie.png"
                  alt="boulangerie"
                  className="h-[130px] sm:h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2 text-[#111111]">
                🥐 À la boulangerie
              </h2>

              <p className="text-gray-600 text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
                Commande du pain, des viennoiseries et engage une petite conversation.
              </p>

              <div className="flex justify-between items-center">
                <span className="bg-[#1F1F1F] text-white px-3 py-1 rounded-full text-sm">
                  Débutant
                </span>
              </div>
            </div>

            {/* 5 */}
            <div className="group bg-white border border-[#EFE7D8] rounded-3xl shadow-sm p-4 sm:p-5 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_4px_14px_rgba(255,193,7,0.30)] cursor-pointer">
              <div className="bg-[#FFE1E1] rounded-2xl p-4 flex items-center justify-center mb-4">
                <img
                  src="/images/hôtel.png"
                  alt="hôtel"
                  className="h-[130px] sm:h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2 text-[#111111]">
                🏨 À l'hôtel
              </h2>

              <p className="text-gray-600 text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
                Check-in et demande des informations
                sur la chambre et les services.
              </p>

              <div className="flex justify-between items-center">
                <span className="bg-[#DC2626] text-white px-3 py-1 rounded-full text-sm">
                  Débutant
                </span>
              </div>
            </div>

            {/* 6 */}
            <div className="group bg-white border border-[#EFE7D8] rounded-3xl shadow-sm p-4 sm:p-5 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_4px_14px_rgba(255,193,7,0.30)] cursor-pointer">
              <div className="bg-[#F1F1F1] rounded-2xl p-4 flex items-center justify-center mb-4">
                <img
                  src="/images/aéroport.png"
                  alt="aéroport"
                  className="h-[130px] sm:h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2 text-[#111111]">
                ✈️ À l'aéroport
              </h2>

              <p className="text-gray-600 text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
                Enregistre ton vol, gère un imprévu et trouve ta porte d'embarquement.
              </p>

              <div className="flex justify-between items-center">
                <span className="bg-[#FFC107] text-black px-3 py-1 rounded-full text-sm">
                  Débutant
                </span>
              </div>
            </div>

            {/* 7 */}
            <div className="group bg-white border border-[#EFE7D8] rounded-3xl shadow-sm p-4 sm:p-5 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_4px_14px_rgba(255,193,7,0.30)] cursor-pointer">
              <div className="bg-[#FFF7E0] rounded-2xl p-4 flex items-center justify-center mb-4">
                <img
                  src="/images/doctor.png"
                  alt="médecin"
                  className="h-[130px] sm:h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2 text-[#111111]">
                🩺 Chez le médecin
              </h2>

              <p className="text-gray-600 text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
                Explique tes symptômes et comprends l'ordonnance qu'on te donne.
              </p>

              <div className="flex justify-between items-center">
                <span className="bg-[#1F1F1F] text-white px-3 py-1 rounded-full text-sm">
                  Débutant
                </span>
              </div>
            </div>

            {/* 8 */}
            <div className="group bg-white border border-[#EFE7D8] rounded-3xl shadow-sm p-4 sm:p-5 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_4px_14px_rgba(255,193,7,0.30)] cursor-pointer">
              <div className="bg-[#FFE1E1] rounded-2xl p-4 flex items-center justify-center mb-4">
                <img
                  src="/images/pharmacie.png"
                  alt="pharmacie"
                  className="h-[130px] sm:h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2 text-[#111111]">
                💊 À la pharmacie
              </h2>

              <p className="text-gray-600 text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
                Décris tes symptômes et demande conseil au pharmacien.
              </p>

              <div className="flex justify-between items-center">
                <span className="bg-[#DC2626] text-white px-3 py-1 rounded-full text-sm">
                  Débutant
                </span>
              </div>
            </div>

            {/* 9 */}
            <div className="group bg-white border border-[#EFE7D8] rounded-3xl shadow-sm p-4 sm:p-5 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_4px_14px_rgba(255,193,7,0.30)] cursor-pointer">
              <div className="bg-[#F1F1F1] rounded-2xl p-4 flex items-center justify-center mb-4">
                <img
                  src="/images/marché.png"
                  alt="marché"
                  className="h-[130px] sm:h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2 text-[#111111]">
                🥕 Au marché
              </h2>

              <p className="text-gray-600 text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
                Négocie le prix des fruits et légumes avec un vendeur sympathique.
              </p>

              <div className="flex justify-between items-center">
                <span className="bg-[#FFC107] text-black px-3 py-1 rounded-full text-sm">
                  Débutant
                </span>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}