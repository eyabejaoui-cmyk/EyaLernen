import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  X,
  LayoutGrid,
  BookOpen,
  GraduationCap,
  TrendingUp,
  User,
  Menu
} from "lucide-react";

export default function ChoixThemeMots() {

  const navigate = useNavigate();

  

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const themes = [
    {
      nom: "Maison",
      icon: "🏠",
      theme: "maison",
      description: "Apprendre les mots de la maison"
    },
    {
      nom: "Restaurant",
      icon: "🍽️",
      theme: "restaurant",
      description: "Apprendre les mots au restaurant"
    },
    {
      nom: "Café",
      icon: "☕",
      theme: "cafe",
      description: "Apprendre les mots au café"
    },
    {
      nom: "Supermarché",
      icon: "🛒",
      theme: "supermarche",
      description: "Apprendre les mots du supermarché"
    },
    {
      nom: "Voyage",
      icon: "✈️",
      theme: "voyage",
      description: "Apprendre les mots pour voyager"
    },
    {
      nom: "École",
      icon: "🎒",
      theme: "ecole",
      description: "Apprendre les mots de l’école"
    },
    {
      nom: "Santé",
      icon: "🩺",
      theme: "sante",
      description: "Apprendre les mots chez le médecin"
    },
    {
      nom: "Vêtements",
      icon: "👕",
      theme: "vetements",
      description: "Apprendre les mots des vêtements"
    }
  ];

  const choisirTheme = (theme) => {
    navigate("/Mots", { state: { theme: theme } });
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0]">

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

        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden self-end mb-4 text-gray-300 hover:text-[#FFC107]"
        >
          <X size={24} />
        </button>

        <div>

          <div className="mb-12">
            <div className="flex items-center gap-3">

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

      <main className="lg:ml-72 min-h-screen bg-[#F8F6F0] px-6 py-10 relative">

        <div className="absolute top-0 left-0 w-full">
          <div className="h-[5px] bg-black"></div>
          <div className="h-[5px] bg-red-600"></div>
          <div className="h-[5px] bg-[#FFC107]"></div>
        </div>


        <div className="max-w-6xl mx-auto pt-16">

          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-[#111111]">
              Choisis un <span className="text-[#FFC107]">thème</span>
            </h1>

            <p className="text-gray-600 mt-3">
              Sélectionne un thème pour commencer à apprendre le vocabulaire.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {themes.map((item) => (
              <div
                key={item.theme}
                onClick={() => choisirTheme(item.theme)}
                className="
                bg-white
                border border-[#EFE7D8]
                rounded-3xl
                p-6
                text-center
                cursor-pointer
                hover:border-[#FFC107]
                hover:-translate-y-2
                hover:shadow-[0_4px_14px_rgba(255,193,7,0.30)]
                transition
                min-h-[260px]
                flex flex-col
                "
              >
                <div className="text-5xl mb-4">
                  {item.icon}
                </div>

                <h2 className="text-xl font-bold text-[#111111] mb-2">
                  {item.nom}
                </h2>

                <p className="text-gray-600 text-sm mb-5 flex-1">
                  {item.description}
                </p>

                <button className="w-full py-3 bg-[#FFC107] text-black rounded-xl font-bold hover:bg-[#E0A800] transition">
                  Commencer
                </button>
              </div>
            ))}
          </div>

        </div>

      </main>

    </div>
  );
}