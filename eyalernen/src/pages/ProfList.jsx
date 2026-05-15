import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  X,
  LayoutGrid,
  BookOpen,
  GraduationCap,
  TrendingUp,
  User,
} from "lucide-react";

export default function ProfList() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [professeurs, setProfesseurs] = useState([]);
  const [selectedProf, setSelectedProf] = useState(null);
  const [typeCours, setTypeCours] = useState("groupe");
  const [showPayment, setShowPayment] = useState(false);
  const [selectedCours, setSelectedCours] = useState(null);
  const [modePaiement, setModePaiement] = useState("heure");

  const confirmPayment = async () => {
    const savedEmail = localStorage.getItem("email");

    if (!savedEmail || savedEmail === "undefined") {
      alert("Vous devez être connecté pour réserver.");
      return;
    }

    if (!selectedProf || !selectedCours) {
      alert("Choisissez un cours d’abord.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/professeur/reserver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          user_email: savedEmail,
          professeur_id: selectedProf.id,
          cours_id: selectedCours.id,
          montant:
            modePaiement === "heure"
              ? selectedCours.prix
              : selectedCours.prix * 4,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Paiement confirmé et réservation enregistrée.");
        setShowPayment(false);
        setSelectedProf(null);
        setSelectedCours(null);
      } else {
        alert(data.detail || "Erreur lors de la réservation.");
      }
    } catch (error) {
      alert("Erreur serveur. Vérifiez que FastAPI est lancé.");
    }
  };

  const loadProfesseurs = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/professeurs");
      const data = await response.json();

      if (response.ok) {
        setProfesseurs(data);
      }
    } catch (error) {
      console.log("Erreur chargement professeurs :", error);
    }
  };

  useEffect(() => {
    loadProfesseurs();
  }, []);

  const coursFiltres = selectedProf
    ? selectedProf.cours.filter((cours) => cours.type_cours === typeCours)
    : [];

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex">
      {/* Sidebar gauche */}
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
          {/* Logo */}
          <div className="mb-12">
            <div className="flex items-center gap-3 ">
              <div
                className="
                w-11 h-11
                bg-gradient-to-br from-[#F5A623] to-[#E09010]
                rounded-2xl
                flex items-center justify-center
                text-2xl
                shadow-[0_4px_16px_rgba(255,193,7,0.35)]
                "
              >
                🦉
              </div>

              <span className="flex items-center">
                <span className="text-3xl font-black text-[#FFC107]">Eya</span>
                <span className="text-3xl font-black text-white">Lernen</span>
              </span>
            </div>
          </div>

          {/* Navigation */}
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
                  bg-[#FFC107]
                  text-black
                  font-bold
                  rounded-2xl
                  px-5 py-4
                  hover:bg-[#E0A800]
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

        {/* Compte */}
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

      {/* Contenu à droite */}
      <div className="relative flex-1 lg:ml-72 rounded-3xl bg-[#F8F6F0] border-x-2 border-[#EFE7D8] p-8 py-14 px-3">
        

        <h1 className="text-3xl font-bold text-center mb-8 text-[#111111]">
          Nos professeurs
        </h1>

        {/* Liste des professeurs */}
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {professeurs.length === 0 ? (
            <p className="text-gray-600">Aucun professeur disponible.</p>
          ) : (
            professeurs.map((prof) => (
              <div
                key={prof.id}
                onClick={() => {
                  setSelectedProf(prof);
                  setSelectedCours(null);
                  setTypeCours("groupe");
                }}
                className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-[#EFE7D8] shadow-sm w-full max-w-md cursor-pointer hover:shadow-[0_4px_14px_rgba(255,193,7,0.30)] hover:border-[#FFC107] transition"
              >
                <img
                  src={prof.photo ? `/images/${prof.photo}` : "/images/mariem.png"}
                  className="w-16 h-16 rounded-full object-cover border border-[#EFE7D8]"
                  alt="Professeur"
                />

                <div>
                  <h2 className="font-semibold text-lg text-[#111111]">
                    {prof.prenom} {prof.nom}
                  </h2>

                  <p className="text-gray-600 text-sm">
                    {prof.description || "Professeur d’allemand"}
                  </p>

                  <div className="flex gap-2 text-sm">
                    <span className="text-[#FFC107]">⭐ 4.9</span>
                    <span className="text-gray-500">Professeur vérifié</span>
                  </div>

                  <span className="bg-[#F1F1F1] text-[#1F1F1F] text-xs px-3 py-1 rounded-full">
                    Niveaux : {prof.niveaux || "A1, A2"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Popup professeur */}
        {selectedProf && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[700px] rounded-3xl p-6 relative">
              <button
                onClick={() => setSelectedProf(null)}
                className="absolute top-4 right-4 text-gray-500 hover:text-black"
              >
                ✕
              </button>

              <div className="flex gap-4 items-center">
                <img
                  src={
                    selectedProf.photo
                      ? `/images/${selectedProf.photo}`
                      : "/images/mariem.png"
                  }
                  className="w-20 h-20 rounded-xl object-cover"
                  alt="Professeur"
                />

                <div>
                  <h2 className="text-xl font-bold">
                    {selectedProf.prenom} {selectedProf.nom}
                  </h2>

                  <p className="text-gray-500">{selectedProf.email}</p>

                  <p className="text-sm text-gray-400">
                    ⭐ 4.9 • Niveaux : {selectedProf.niveaux}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-gray-600">
                {selectedProf.description ||
                  "Professeur disponible pour vous accompagner."}
              </p>

              <h3 className="mt-6 font-semibold">TYPE DE COURS</h3>

              <div className="flex gap-4 mt-3">
                <div
                  onClick={() => {
                    setTypeCours("groupe");
                    setSelectedCours(null);
                  }}
                  className={`px-4 py-2 rounded-xl cursor-pointer transition ${
                    typeCours === "groupe"
                      ? "bg-black text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Groupe
                </div>

                <div
                  onClick={() => {
                    setTypeCours("individuel");
                    setSelectedCours(null);
                  }}
                  className={`px-4 py-2 rounded-xl cursor-pointer transition ${
                    typeCours === "individuel"
                      ? "bg-black text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  Individuel
                </div>

                <div
                  onClick={() => {
                    setTypeCours("en_ligne");
                    setSelectedCours(null);
                  }}
                  className={`px-4 py-2 rounded-xl cursor-pointer transition ${
                    typeCours === "en_ligne"
                      ? "bg-black text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  En ligne
                </div>
              </div>

              <h3 className="mt-6 font-semibold">COURS DISPONIBLES</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                {coursFiltres.length === 0 ? (
                  <p className="text-gray-500">
                    Aucun cours disponible pour ce type.
                  </p>
                ) : (
                  coursFiltres.map((cours) => (
                    <div
                      key={cours.id}
                      onClick={() => setSelectedCours(cours)}
                      className={`bg-gray-100 p-4 rounded-xl cursor-pointer border-2 ${
                        selectedCours && selectedCours.id === cours.id
                          ? "border-black"
                          : "border-transparent"
                      }`}
                    >
                      <p className="font-bold">Niveau {cours.niveau}</p>
                      <p>{cours.prix} DT</p>
                      <p className="text-sm text-gray-600">{cours.horaire}</p>
                    </div>
                  ))
                )}
              </div>

              <button
                onClick={() => {
                  if (!selectedCours) {
                    alert("Choisissez un cours d’abord.");
                    return;
                  }

                  setShowPayment(true);
                }}
                className="mt-6 w-full bg-black text-white py-3 rounded-xl"
              >
                Réserver
              </button>
            </div>
          </div>
        )}

        {/* Popup paiement */}
        {showPayment && selectedCours && selectedProf && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-[600px] rounded-3xl p-6 relative">
              <button
                onClick={() => setShowPayment(false)}
                className="absolute top-4 right-4 text-xl"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold mb-2">Paiement</h2>

              <p className="text-gray-500 mb-6">
                Cours avec {selectedProf.prenom} {selectedProf.nom} · Niveau{" "}
                {selectedCours.niveau}
              </p>

              <div className="flex gap-4 mb-6">
                <div
                  onClick={() => setModePaiement("heure")}
                  className={`flex-1 p-4 rounded-2xl border-2 cursor-pointer transition ${
                    modePaiement === "heure"
                      ? "bg-green-200 border-black"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <p className="text-sm text-gray-500">À L'HEURE</p>
                  <p className="text-xl font-bold">{selectedCours.prix} DT</p>
                </div>

                <div
                  onClick={() => setModePaiement("mensuel")}
                  className={`flex-1 p-4 rounded-2xl border-2 cursor-pointer transition ${
                    modePaiement === "mensuel"
                      ? "bg-green-200 border-black"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <p className="text-sm text-gray-500">MENSUEL</p>
                  <p className="text-xl font-bold">
                    {selectedCours.prix * 4} DT
                  </p>
                </div>
              </div>

              <input
                placeholder="Nom sur la carte"
                className="w-full border p-4 rounded-2xl mb-4"
              />

              <input
                placeholder="Numéro de carte"
                className="w-full border p-4 rounded-2xl mb-4"
              />

              <div className="flex gap-4 mb-4">
                <input
                  placeholder="MM/AA"
                  className="w-1/2 border p-4 rounded-2xl"
                />
                <input
                  placeholder="CVC"
                  className="w-1/2 border p-4 rounded-2xl"
                />
              </div>

              <button
                onClick={confirmPayment}
                className="w-full bg-[#070b1f] text-white py-4 rounded-2xl font-semibold"
              >
                Payer{" "}
                {modePaiement === "heure"
                  ? selectedCours.prix
                  : selectedCours.prix * 4}{" "}
                DT
              </button>

              <p className="text-center text-gray-400 mt-3 text-sm">
                Paiement sécurisé
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}