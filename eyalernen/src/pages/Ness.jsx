import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  LayoutGrid,
  BookOpen,
  GraduationCap,
  Map,
  TrendingUp,
  User,
  Menu,
  X,
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

import { useNavigate } from "react-router-dom";


// hna n3arfo component esmou Ness
export default function Ness() {
  
  const [chartData, setChartData] = useState([]);
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState(null);

  useEffect(() => {

//const email = localStorage.getItem("email");
const email = localStorage.getItem("email");
console.log("EMAIL =", email);

fetch(`http://127.0.0.1:8000/stats/${email}`)

.then((res) => res.json())

.then((data) => {

    console.log("DATA =", data);

    setStats(data);
})

.catch((err) => {
    console.log(err);
});

fetch(`http://127.0.0.1:8000/stats-days/${email}`)

.then((res) => res.json())

.then((data) => {
    console.log(data);
    setChartData(data);
});

}, []);
  
  
  return (
  <div className="flex min-h-screen bg-[#F8F6F0]">

    {/* bouton menu mobile */}
    <button
      onClick={() => setSidebarOpen(true)}
      className="
      fixed
      top-4
      left-4
      z-[9999]

      lg:hidden

      bg-[#1F1F1F]
        border border-[#333333]
      text-white

      p-3
      rounded-xl

      shadow-lg
      "
    >
      <Menu size={24} />
    </button>

    {/* sidebar */}
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
        className="lg:hidden self-end mb-4"
      >
        <X size={24} />
      </button>

      <div>

        {/* logo */}
        <div className="mb-12">

          <div className="flex items-center gap-3">
          <div
            className="
              w-11 h-11
              bg-gradient-to-br from-[#F5A623] to-[#E09010]
              rounded-2xl
              flex items-center justify-center
              text-2xl
              shadow-[0_4px_16px_rgba(245,166,35,0.35)]
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

                <span>
                  Accueil
                </span>

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

                <span>
                  Apprendre
                </span>

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

                <span>
                  Cours
                </span>

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

                  <span>
                    Progression
                  </span>

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

          <span>
            Compte
          </span>

        </Link>

      </div>

    </aside>

      <main className="w-full p-3 sm:p-4 lg:p-10 lg:ml-72">

  <div className="h-full rounded-3xl bg-white border border-[#EFE7D8] p-4 sm:p-6 lg:p-8">

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 h-full">

      <div className="lg:col-span-2">

        <div className="flex flex-col gap-6">

          {/* Discussion */}
          <Link to="/chatbot" className="block">

            <div className="bg-white border border-[#EFE7D8] rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_4px_14px_rgba(255,193,7,0.30)] transition">

              <div className="flex flex-col lg:flex-row justify-between">

                <div className="p-5 sm:p-8 flex flex-col">

                  <h2 className="mb-4 text-2xl font-bold">
                    Discussion
                  </h2>

                  <p className="text-gray-500 text-base leading-7">
                    Améliore tes compétences linguistiques en discutant avec
                    notre professeur alimenté par IA.
                  </p>

                  <div className="flex flex-wrap gap-4 mt-4">

                    <span className="text-[13px] px-4 py-1.5 rounded-full text-white bg-[#1F1F1F]">
                      #Écriture
                    </span>

                    <span className="text-[13px] px-4 py-1.5 rounded-full text-black bg-[#FFC107]">
                      #Lecture
                    </span>

                  </div>

                </div>

                <div className="w-full lg:w-[280px] bg-[#FFC107] rounded-l-[80px] flex items-center justify-center">

                  <img
                    src="/images/discussion.png"
                    alt="discussion"
                    className="w-32 sm:w-40 lg:w-44 object-contain"
                  />

                </div>

              </div>

            </div>

          </Link>

          {/* Mode appel */}
          {/*<Link to="/ModeAppel">

            <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_4px_14px_rgba(245,166,35,0.35)] transition">

              <div className="flex flex-col lg:flex-row justify-between">

                <div className="p-5 sm:p-8 flex flex-col">

                  <h2 className="mb-4 text-2xl font-bold">
                    Mode appel
                  </h2>

                  <p className="text-gray-500 text-base leading-7">
                    Développe ton aisance à l’oral grâce à des appels guidés avec notre professeur alimenté par IA.
                  </p>

                  <div className="flex flex-wrap gap-4 mt-4">

                    <span className="text-[13px] px-4 py-1.5 rounded-full text-[#3B4EFF] bg-[#EEEEFF]">
                      #Dialogue
                    </span>

                    <span className="text-[13px] px-4 py-1.5 rounded-full text-[#3B4EFF] bg-[#EEEEFF]">
                      #Écoute
                    </span>

                  </div>

                </div>

                <div className="w-full lg:w-[280px] bg-[#DCD6FF] rounded-l-[80px] flex items-center justify-center">

                  <img
                    src="/images/mode-appel.png"
                    alt="mode appel"
                    className="w-32 sm:w-40 lg:w-44 object-contain"
                  />

                </div>

              </div>

            </div>

          </Link> */}

          {/* Jeux */}
          <Link to="/Jeux">

            <div className="bg-white border border-[#EFE7D8] rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_4px_14px_rgba(255,193,7,0.30)] transition">

              <div className="flex flex-col lg:flex-row justify-between">

                <div className="p-5 sm:p-8 flex flex-col">

                  <h2 className="mb-4 text-2xl font-bold">
                    Jeux de rôle
                  </h2>

                  <p className="text-gray-500 text-base leading-7">
                    Améliore tes compétences linguistiques grâce à des scénarios inspirés de situations réelles.
                  </p>

                  <div className="flex flex-wrap gap-4 mt-4">

                    <span className="text-[13px] px-4 py-1.5 rounded-full text-white bg-[#DC2626]">
                      #Vocabulaire
                    </span>

                    <span className="text-[13px] px-4 py-1.5 rounded-full text-black bg-[#FFC107]">
                      #Écriture
                    </span>

                  </div>

                </div>

                <div className="w-full lg:w-[280px] bg-[#DC2626] rounded-l-[80px] flex items-center justify-center">

                  <img
                    src="/images/mode-appel.png"
                    alt="jeux de role"
                    className="w-32 sm:w-40 lg:w-44 object-contain"
                  />

                </div>

              </div>

            </div>

          </Link>

          {/* Mode mot */}
          <Link to="/ChoixThemeMots">

            <div className="bg-white border border-[#EFE7D8] rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_4px_14px_rgba(255,193,7,0.30)] transition">

              <div className="flex flex-col lg:flex-row justify-between">

                <div className="p-5 sm:p-8 flex flex-col">

                  <h2 className="mb-4 text-2xl font-bold">
                    Mode mot
                  </h2>

                  <p className="text-gray-500 text-base leading-7">
                    Enrichis ton vocabulaire en découvrant de nouveaux mots avec notre professeur alimenté par IA.
                  </p>

                  <div className="flex flex-wrap gap-4 mt-4">

                    <span className="text-[13px] px-4 py-1.5 rounded-full text-white bg-[#1F1F1F]">
                      #Vocabulaire
                    </span>

                    <span className="text-[13px] px-4 py-1.5 rounded-full text-white bg-[#DC2626]">
                      #Dialogue
                    </span>

                  </div>

                </div>

                <div className="w-full lg:w-[280px] bg-[#1F1F1F] rounded-l-[80px] flex items-center justify-center">

                  <img
                    src="/images/jeux.png"
                    alt="jeux de role"
                    className="w-32 sm:w-40 lg:w-44 object-contain"
                  />

                </div>

              </div>

            </div>

          </Link>

        </div>

      </div>

      {/*<div className="hidden lg:block lg:col-span-1"></div>*/}

      <div className="hidden lg:block lg:col-span-1">

  <div className="sticky top-8 flex flex-col gap-6">

    {/* dashboard progression */}
    <div className="bg-white rounded-3xl border border-[#EFE7D8] p-6 shadow-sm hover:shadow-[0_4px_14px_rgba(255,193,7,0.25)] transitio">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-xl font-bold text-[#0f172a]">
            Progression
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Votre évolution cette semaine
          </p>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-[#FFC107] flex items-center justify-center text-xl">
          📈
        </div>

      </div>

      {/* discussion */}
      <div className="mb-6">

        <div className="flex justify-between items-center mb-2">

          <span className="text-sm font-medium text-gray-700">
            Discussion
          </span>

          <span className="text-sm font-semibold text-[#FFC107]">
            {stats?.discussion}%
          </span>

        </div>

        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">

          <div
            className="h-full bg-[#F5A623] rounded-full"
            style={{
              width: `${stats?.discussion || 0}%`
            }}
          ></div>

        </div>

      </div>

      {/* jeux */}
      <div className="mb-6">

        <div className="flex justify-between items-center mb-2">

          <span className="text-sm font-medium text-gray-700">
            Jeux de rôle
          </span>

          <span className="text-sm font-semibold text-[#DC2626]">
            {stats?.jeux}%
          </span>

        </div>

        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">

          <div
            className="h-full bg-[#DC2626] rounded-full"
            style={{
              width: `${stats?.jeux || 0}%`
            }}
          ></div>

        </div>

      </div>

      {/* vocabulaire */}
      <div>

        <div className="flex justify-between items-center mb-2">

          <span className="text-sm font-medium text-gray-700">
            Vocabulaire
          </span>

          <span className="text-sm font-semibold text-[#1F1F1F]">
            {stats?.vocabulaire}%
          </span>

        </div>

        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">

          <div
            className="h-full bg-[#1F1F1F] rounded-full"
            style={{
              width: `${stats?.vocabulaire || 0}%`
            }}
          ></div>

        </div>

      </div>

    </div>

    {/* dashboard statistiques */}
    
<div className="bg-white rounded-3xl border border-[#EFE7D8] p-6 shadow-sm hover:shadow-[0_4px_14px_rgba(220,38,38,0.20)] transition">


  <div className="flex items-center justify-between mb-6">

    <div>

      <h2 className="text-xl font-bold text-[#0f172a]">
        Progression d’apprentissage
      </h2>


    </div>

    <div
      className="
      w-12 h-12 rounded-2xl
      bg-[#FFE1E1]
      flex items-center justify-center
      text-xl
      "
    >
      📈
    </div>

  </div>

  <div className="h-64">

    <ResponsiveContainer width="100%" height="100%">

      <LineChart
        margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
        data={chartData}

      >

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="day" />
        <YAxis domain={[0, 'auto']} />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="temps"
          stroke="#DC2626"
          strokeWidth={4}
        />

        <Line
  type="monotone"
  dataKey="messages"
  stroke="#FFC107"
  strokeWidth={4}
/>

      </LineChart>

    </ResponsiveContainer>

  </div>



</div>

  </div>

</div>

    </div>

  </div>

</main> 

    </div>
  );
}