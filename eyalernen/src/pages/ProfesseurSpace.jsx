import React, { useState } from "react";

export default function ProfesseurSpace() {
  const [message, setMessage] = useState("");
  const [showCourseForm, setShowCourseForm] = useState(false);

  const [activePage, setActivePage] = useState("dashboard");

  const [professeurId, setProfesseurId] = useState(
    localStorage.getItem("professeur_id") || ""
  );

  const [profile, setProfile] = useState({
    photo: "",
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    description: "",
  });

  const [photoPreview, setPhotoPreview] = useState("");
  const [niveaux, setNiveaux] = useState([]);

  const [courseOffer, setCourseOffer] = useState({
    niveau: "A1",
    type_cours: "individuel",
    prix: "",
    horaire: "",
  });

  const [courseOffersList, setCourseOffersList] = useState([]);
  const [reservations, setReservations] = useState([]);

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfile({
        ...profile,
        photo: file.name,
      });

      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleNiveauChange = (niveau) => {
    if (niveaux.includes(niveau)) {
      setNiveaux(niveaux.filter((item) => item !== niveau));
    } else {
      setNiveaux([...niveaux, niveau]);
    }
  };

  const handleCourseOfferChange = (e) => {
    setCourseOffer({
      ...courseOffer,
      [e.target.name]: e.target.value,
    });
  };

  const loadCourses = async (id) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/professeur/cours/${id}`
      );

      const data = await response.json();

      if (response.ok) {
        setCourseOffersList(data);
      } else {
        setMessage("Erreur lors du chargement des cours.");
      }
    } catch (error) {
      setMessage("Erreur serveur. Vérifiez le backend.");
    }
  };

  const loadProfile = async () => {
    if (!profile.email) {
      setMessage("Écrivez l’email du professeur pour charger le profil.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/professeur/profile/${profile.email}`
      );

      const data = await response.json();

      if (response.ok) {
        setProfile({
          photo: data.photo || "",
          nom: data.nom || "",
          prenom: data.prenom || "",
          telephone: data.telephone || "",
          email: data.email || "",
          description: data.description || "",
        });

        if (data.photo) {
          setPhotoPreview("/images/" + data.photo);
        }

        setProfesseurId(data.id);
        localStorage.setItem("professeur_id", data.id);

        if (data.niveaux) {
          setNiveaux(data.niveaux.split(","));
        }

        setMessage("Profil chargé avec succès.");
        loadCourses(data.id);
      } else {
        setMessage(data.detail || "Professeur introuvable.");
      }
    } catch (error) {
      setMessage("Erreur serveur. Vérifiez le backend.");
    }
  };

  const loadReservations = async () => {
    const id = professeurId || localStorage.getItem("professeur_id") || 1;

    if (!id) {
      setMessage("Chargez d’abord le profil professeur.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/professeur/reservations/${id}`
      );

      const data = await response.json();

      if (response.ok) {
        setReservations(data);
        setMessage("");
      } else {
        setMessage("Erreur lors du chargement des réservations.");
      }
    } catch (error) {
      setMessage("Erreur serveur. Vérifiez le backend.");
    }
  };

  const addCourseOffer = async () => {
    if (!courseOffer.prix || !courseOffer.horaire) {
      setMessage("Veuillez remplir le prix et l’horaire.");
      return;
    }

    const id = professeurId || localStorage.getItem("professeur_id");

    if (!id) {
      setMessage("Enregistrez ou chargez d’abord le profil professeur.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/professeur/cours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          professeur_id: Number(id),
          niveau: courseOffer.niveau,
          type_cours: courseOffer.type_cours,
          prix: Number(courseOffer.prix),
          horaire: courseOffer.horaire,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setCourseOffersList([...courseOffersList, data]);

        setCourseOffer({
          niveau: "A1",
          type_cours: "individuel",
          prix: "",
          horaire: "",
        });

        setShowCourseForm(false);
        setMessage("Cours ajouté dans la base avec succès.");
      } else {
        setMessage(data.detail || "Erreur lors de l’ajout du cours.");
      }
    } catch (error) {
      setMessage("Erreur serveur. Vérifiez le backend.");
    }
  };

  const deleteCourseOffer = (index) => {
    const newList = courseOffersList.filter((item, i) => i !== index);
    setCourseOffersList(newList);
  };

  const saveProfile = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/professeur/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          nom: profile.nom,
          prenom: profile.prenom,
          telephone: profile.telephone,
          email: profile.email,
          photo: profile.photo,
          description: profile.description,
          niveaux: niveaux.join(","),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Profil professeur enregistré dans la base.");

        setProfesseurId(data.professeur_id);
        localStorage.setItem("professeur_id", data.professeur_id);

        loadCourses(data.professeur_id);
      } else {
        setMessage(data.detail || "Erreur lors de l’enregistrement.");
      }
    } catch (error) {
      setMessage("Erreur serveur. Vérifiez le backend.");
    }
  };

  const menuItems = [
    { key: "dashboard", label: "Tableau de bord", icon: "▦" },
    { key: "profil", label: "Profil professeur", icon: "👤" },
    { key: "cours", label: "Mes cours", icon: "📚" },
    { key: "etudiants", label: "Étudiants", icon: "👥" },
  ];

  return (
    <div className="min-h-screen bg-[#F6F4EF] flex">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 min-h-screen fixed left-0 top-0 hidden md:flex flex-col justify-between px-5 py-6">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 px-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#F5A623] to-[#E09010] flex items-center justify-center text-xl shadow-[0_4px_16px_rgba(245,166,35,0.35)]">
              🦉
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#1F2937]">
                EyaLernen
              </h1>
              <p className="text-xs text-gray-400 font-medium">
                Espace professeur
              </p>
            </div>
          </div>

          {/* Menu */}
          <nav className="space-y-3">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActivePage(item.key);

                  if (item.key === "etudiants") {
                    loadReservations();
                  }

                  if (item.key === "cours") {
                    const id =
                      professeurId || localStorage.getItem("professeur_id");

                    if (id) {
                      loadCourses(id);
                    }
                  }
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left font-medium transition ${
                  activePage === item.key
                    ? "bg-[#F5A623] text-[#3A2600] shadow-sm"
                    : "text-gray-600 hover:bg-[#F4F2EF]"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="bg-[#F4F2EF] rounded-3xl p-4">
          <p className="text-sm font-semibold text-[#3A2600]">
            Conseil
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Chargez votre profil avant d’ajouter des cours ou consulter les étudiants.
          </p>
        </div>
      </aside>

      {/* Contenu */}
      <main className="flex-1 md:ml-72 p-6">
        {/* Header */}
        <div className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#F5A623] uppercase">
                Tableau de gestion
              </p>

              <h1 className="text-2xl md:text-3xl font-bold text-[#1F2937] mt-1">
                Bonjour {profile.prenom ? profile.prenom : "Professeur"}
              </h1>

              <p className="text-sm text-gray-500 mt-2">
                Gérez votre profil, vos offres de cours et vos étudiants depuis un seul espace.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="font-semibold text-[#1F2937]">
                  {profile.prenom || "Prénom"} {profile.nom || "Nom"}
                </p>
                <p className="text-sm text-gray-500">
                  {profile.email || "email professeur"}
                </p>
              </div>

              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Professeur"
                  className="w-14 h-14 rounded-2xl object-cover border-4 border-[#F5A623]"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-[#F4F2EF] flex items-center justify-center text-xl">
                  👤
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Message supprimé pour ne pas afficher la grande carte blanche */}

        {/* Dashboard */}
        {activePage === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm font-medium">
                  Cours ajoutés
                </p>
                <h2 className="text-3xl font-bold text-[#1F2937] mt-2">
                  {courseOffersList.length}
                </h2>
                <p className="text-sm text-gray-400 mt-2">
                  Offres disponibles pour les apprenants
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm font-medium">
                  Étudiants inscrits
                </p>
                <h2 className="text-3xl font-bold text-[#1F2937] mt-2">
                  {reservations.length}
                </h2>
                <p className="text-sm text-gray-400 mt-2">
                  Réservations payées chargées
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <p className="text-gray-500 text-sm font-medium">
                  Niveaux enseignés
                </p>
                <h2 className="text-3xl font-bold text-[#1F2937] mt-2">
                  {niveaux.length}
                </h2>
                <p className="text-sm text-gray-400 mt-2">
                  A1, A2, B1 ou B2
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-[#1F2937] mb-3">
                  Démarrage rapide
                </h2>

                <p className="text-sm text-gray-500 mb-5">
                  Chargez votre profil puis ajoutez vos offres de cours.
                </p>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActivePage("profil")}
                    className="px-5 py-3 rounded-2xl bg-[#F5A623] text-white font-semibold hover:bg-[#E09010]"
                  >
                    Modifier mon profil
                  </button>

                  <button
                    onClick={() => setActivePage("cours")}
                    className="px-5 py-3 rounded-2xl bg-[#1F2937] text-white font-semibold hover:bg-black"
                  >
                    Ajouter un cours
                  </button>

                  <button
                    onClick={() => {
                      setActivePage("etudiants");
                      loadReservations();
                    }}
                    className="px-5 py-3 rounded-2xl bg-[#F4F2EF] text-[#3A2600] font-semibold"
                  >
                    Voir mes étudiants
                  </button>
                </div>
              </div>

              <div className="bg-[#1F2937] rounded-3xl p-6 shadow-sm text-white">
                <h2 className="text-xl font-bold mb-3">
                  Profil public
                </h2>

                <p className="text-sm text-gray-300 mb-5">
                  Ces informations seront utilisées dans la liste des professeurs visible par les apprenants.
                </p>

                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="font-semibold">
                    {profile.prenom || "Prénom"} {profile.nom || "Nom"}
                  </p>
                  <p className="text-sm text-gray-300 mt-1">
                    {profile.description || "Aucune description pour le moment."}
                  </p>
                  <p className="text-sm text-[#F5A623] mt-2">
                    Niveaux : {niveaux.length > 0 ? niveaux.join(", ") : "Non renseignés"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profil */}
        {activePage === "profil" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-fit">
              <h2 className="text-lg font-bold text-[#1F2937] mb-5">
                Aperçu du profil
              </h2>

              <div className="flex flex-col items-center text-center">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Photo professeur"
                    className="w-28 h-28 rounded-3xl object-cover border-4 border-[#F5A623] mb-4"
                  />
                ) : (
                  <div className="w-28 h-28 rounded-3xl bg-[#F4F2EF] flex items-center justify-center text-gray-400 mb-4">
                    Photo
                  </div>
                )}

                <h3 className="text-xl font-bold text-[#1F2937]">
                  {profile.prenom || "Prénom"} {profile.nom || "Nom"}
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  {profile.email || "email professeur"}
                </p>

                <p className="text-gray-600 mt-4 text-sm">
                  {profile.description || "Ajoutez une description pour présenter votre méthode."}
                </p>

                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  {niveaux.length === 0 ? (
                    <span className="px-3 py-1 bg-[#F4F2EF] rounded-full text-sm text-gray-500">
                      Aucun niveau
                    </span>
                  ) : (
                    niveaux.map((niveau) => (
                      <span
                        key={niveau}
                        className="px-3 py-1 bg-orange-100 text-[#E09010] rounded-full text-sm font-semibold"
                      >
                        {niveau}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-[#1F2937] mb-1">
                Informations du professeur
              </h2>

              <p className="text-sm text-gray-500 mb-6">
                Complétez vos informations pour apparaître correctement dans la liste des cours.
              </p>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  Photo de profil
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full p-3 border border-gray-200 rounded-2xl bg-[#F9FAFB]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="nom"
                  placeholder="Nom"
                  value={profile.nom}
                  onChange={handleProfileChange}
                  className="p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#F5A623] bg-[#F9FAFB]"
                />

                <input
                  name="prenom"
                  placeholder="Prénom"
                  value={profile.prenom}
                  onChange={handleProfileChange}
                  className="p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#F5A623] bg-[#F9FAFB]"
                />

                <input
                  name="telephone"
                  placeholder="Numéro de téléphone"
                  value={profile.telephone}
                  onChange={handleProfileChange}
                  className="p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#F5A623] bg-[#F9FAFB]"
                />

                <input
                  name="email"
                  placeholder="Email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#F5A623] bg-[#F9FAFB]"
                />

                <textarea
                  name="description"
                  placeholder="Description courte du professeur"
                  value={profile.description}
                  onChange={handleProfileChange}
                  className="p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#F5A623] bg-[#F9FAFB] md:col-span-2 min-h-[120px]"
                />
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-[#1F2937] mb-3">
                  Niveaux enseignés
                </h3>

                <div className="flex flex-wrap gap-3">
                  {["A1", "A2", "B1", "B2"].map((niveau) => (
                    <label
                      key={niveau}
                      className={`flex items-center gap-2 px-4 py-3 rounded-2xl cursor-pointer font-semibold ${
                        niveaux.includes(niveau)
                          ? "bg-[#F5A623] text-white"
                          : "bg-[#F4F2EF] text-gray-600"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={niveaux.includes(niveau)}
                        onChange={() => handleNiveauChange(niveau)}
                        className="hidden"
                      />
                      {niveau}
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                <button
                  onClick={saveProfile}
                  className="px-6 py-3 bg-[#F5A623] text-white rounded-2xl font-semibold hover:bg-[#E09010] transition"
                >
                  Enregistrer le profil
                </button>

                <button
                  onClick={loadProfile}
                  className="px-6 py-3 bg-[#1F2937] text-white rounded-2xl font-semibold hover:bg-black transition"
                >
                  Charger mon profil
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cours */}
        {activePage === "cours" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-[#1F2937]">
                    Mes cours
                  </h2>
                  <p className="text-sm text-gray-500">
                    Vos offres visibles par les apprenants.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const id =
                      professeurId || localStorage.getItem("professeur_id");
                    if (id) {
                      loadCourses(id);
                    }
                  }}
                  className="px-5 py-3 rounded-2xl bg-[#F4F2EF] text-[#3A2600] font-semibold"
                >
                  Actualiser
                </button>
              </div>

              {courseOffersList.length === 0 ? (
                <div className="bg-[#F9FAFB] rounded-3xl p-8 text-center">
                  <p className="text-gray-500">
                    Aucun cours ajouté pour le moment.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseOffersList.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#F9FAFB] rounded-3xl p-5 border border-gray-100"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="px-3 py-1 bg-orange-100 text-[#E09010] rounded-full text-sm font-semibold">
                            Niveau {item.niveau}
                          </span>

                          <h3 className="text-lg font-bold text-[#1F2937] mt-4">
                            {item.type_cours === "individuel"
                              ? "Cours individuel"
                              : item.type_cours === "groupe"
                              ? "Cours en groupe"
                              : "Cours en ligne"}
                          </h3>

                          <p className="text-sm text-gray-500 mt-2">
                            Horaire : {item.horaire}
                          </p>
                        </div>

                        <p className="text-xl font-bold text-[#1F2937]">
                          {item.prix} DT
                        </p>
                      </div>

                      <button
                        onClick={() => deleteCourseOffer(index)}
                        className="mt-5 w-full py-3 bg-red-50 text-red-600 rounded-2xl font-semibold hover:bg-red-100"
                      >
                        Supprimer
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 h-fit">
              <h2 className="text-xl font-bold text-[#1F2937] mb-2">
                Ajouter un cours
              </h2>

              <p className="text-sm text-gray-500 mb-5">
                Créez une offre avec son niveau, son type, son prix et son horaire.
              </p>

              <button
                onClick={() => setShowCourseForm(!showCourseForm)}
                className="w-full py-3 bg-[#F5A623] text-white rounded-2xl font-semibold hover:bg-[#E09010] transition"
              >
                {showCourseForm ? "Fermer le formulaire" : "Ajouter un cours"}
              </button>

              {showCourseForm && (
                <div className="mt-5 space-y-4">
                  <select
                    name="niveau"
                    value={courseOffer.niveau}
                    onChange={handleCourseOfferChange}
                    className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#F5A623] bg-[#F9FAFB]"
                  >
                    <option value="A1">A1</option>
                    <option value="A2">A2</option>
                    <option value="B1">B1</option>
                    <option value="B2">B2</option>
                  </select>

                  <select
                    name="type_cours"
                    value={courseOffer.type_cours}
                    onChange={handleCourseOfferChange}
                    className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#F5A623] bg-[#F9FAFB]"
                  >
                    <option value="individuel">Cours individuel</option>
                    <option value="groupe">Cours groupe</option>
                    <option value="en_ligne">Cours en ligne</option>
                  </select>

                  <input
                    name="prix"
                    type="number"
                    placeholder="Prix en DT"
                    value={courseOffer.prix}
                    onChange={handleCourseOfferChange}
                    className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#F5A623] bg-[#F9FAFB]"
                  />

                  <input
                    name="horaire"
                    placeholder="Ex : Lundi 18h - 20h"
                    value={courseOffer.horaire}
                    onChange={handleCourseOfferChange}
                    className="w-full p-4 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#F5A623] bg-[#F9FAFB]"
                  />

                  <button
                    onClick={addCourseOffer}
                    className="w-full py-3 bg-[#1F2937] text-white rounded-2xl font-semibold hover:bg-black transition"
                  >
                    Enregistrer le cours
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Étudiants */}
        {activePage === "etudiants" && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl font-bold text-[#1F2937]">
                  Mes étudiants
                </h2>
                <p className="text-sm text-gray-500">
                  Liste des apprenants qui ont payé une réservation.
                </p>
              </div>

              <button
                onClick={loadReservations}
                className="px-5 py-3 bg-[#F5A623] text-white rounded-2xl font-semibold hover:bg-[#E09010] transition"
              >
                Charger les réservations
              </button>
            </div>

            {reservations.length === 0 ? (
              <div className="bg-[#F9FAFB] rounded-3xl p-8 text-center">
                <p className="text-gray-500">
                  Aucun étudiant inscrit pour le moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {reservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="bg-[#F9FAFB] rounded-3xl p-5 border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-[#F5A623] text-white flex items-center justify-center font-bold">
                        {reservation.user_email
                          ? reservation.user_email[0].toUpperCase()
                          : "E"}
                      </div>

                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        {reservation.status}
                      </span>
                    </div>

                    <p className="font-bold text-[#1F2937]">
                      {reservation.user_email}
                    </p>

                    <div className="mt-4 space-y-2 text-sm text-gray-600">
                      <p>
                        <strong>Niveau :</strong> {reservation.niveau}
                      </p>

                      <p>
                        <strong>Type :</strong> {reservation.type_cours}
                      </p>

                      <p>
                        <strong>Horaire :</strong> {reservation.horaire}
                      </p>

                      <p>
                        <strong>Montant :</strong> {reservation.montant} DT
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}