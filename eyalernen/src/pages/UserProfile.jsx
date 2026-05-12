import { useState } from "react";

export default function UserProfile() {

  // données utilisateur exemple
  const [user] = useState({
    nom: "Bejaoui",
    prenom: "Eya",
    email: "eya@gmail.com",
    abonnement: "Actif",
    type: "Premium",
    debut: "01/05/2026",
    fin: "01/06/2026"
  });

  // states formulaire mot de passe
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");



  // fonction annuler abonnement
  const handleCancelSubscription = () => {

    const confirmCancel = window.confirm(
      "Voulez-vous vraiment annuler votre abonnement ?"
    );

    if (confirmCancel) {
      alert("Abonnement annulé");
    }
  };



  // fonction modifier mot de passe
  const handleChangePassword = (e) => {

    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    alert("Mot de passe modifié");
  };



  return (

    <div className="min-h-screen bg-[#F5F5FB] p-4 sm:p-6 lg:p-10">

      {/* titre */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-[#1E293B]">
          Mon Profil
        </h1>

        <p className="text-gray-500 mt-2">
          Gérez vos informations personnelles
        </p>

      </div>



      {/* grid principale */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">



        {/* ========================= */}
        {/* MES INFORMATIONS */}
        {/* ========================= */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">

          <h2 className="text-2xl font-bold text-[#1E293B] mb-6">
            Mes informations
          </h2>

          <div className="space-y-5">

            <div>
              <p className="text-sm text-gray-500">
                Nom
              </p>

              <h3 className="text-lg font-semibold text-gray-800">
                {user.nom}
              </h3>
            </div>



            <div>
              <p className="text-sm text-gray-500">
                Prénom
              </p>

              <h3 className="text-lg font-semibold text-gray-800">
                {user.prenom}
              </h3>
            </div>



            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <h3 className="text-lg font-semibold text-gray-800">
                {user.email}
              </h3>
            </div>



            <div>
              <p className="text-sm text-gray-500">
                Statut abonnement
              </p>

              <span className="inline-block mt-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
                {user.abonnement}
              </span>
            </div>

          </div>

        </div>



        {/* ========================= */}
        {/* MON ABONNEMENT */}
        {/* ========================= */}

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-200">

          <h2 className="text-2xl font-bold text-[#1E293B] mb-6">
            Mon abonnement
          </h2>

          <div className="space-y-5">

            <div>
              <p className="text-sm text-gray-500">
                État abonnement
              </p>

              <h3 className="text-lg font-semibold text-green-600">
                {user.abonnement}
              </h3>
            </div>



            <div>
              <p className="text-sm text-gray-500">
                Type abonnement
              </p>

              <h3 className="text-lg font-semibold text-gray-800">
                {user.type}
              </h3>
            </div>



            <div>
              <p className="text-sm text-gray-500">
                Date début
              </p>

              <h3 className="text-lg font-semibold text-gray-800">
                {user.debut}
              </h3>
            </div>



            <div>
              <p className="text-sm text-gray-500">
                Date fin
              </p>

              <h3 className="text-lg font-semibold text-gray-800">
                {user.fin}
              </h3>
            </div>



            <button
              onClick={handleCancelSubscription}
              className="
              mt-4
              bg-red-500
              hover:bg-red-600
              text-white
              px-5
              py-3
              rounded-2xl
              font-semibold
              transition
              "
            >
              Annuler mon abonnement
            </button>

          </div>

        </div>



        {/* ========================= */}
        {/* CHANGER MOT DE PASSE */}
        {/* ========================= */}

        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-200">

          <h2 className="text-2xl font-bold text-[#1E293B] mb-6">
            Changer le mot de passe
          </h2>

          <form
            onSubmit={handleChangePassword}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >

            {/* ancien mot de passe */}
            <div>

              <label className="block text-sm text-gray-600 mb-2">
                Ancien mot de passe
              </label>

              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="
                w-full
                border
                border-gray-300
                rounded-2xl
                p-3
                outline-none
                focus:ring-2
                focus:ring-[#F5A623]
                "
              />

            </div>



            {/* nouveau mot de passe */}
            <div>

              <label className="block text-sm text-gray-600 mb-2">
                Nouveau mot de passe
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="
                w-full
                border
                border-gray-300
                rounded-2xl
                p-3
                outline-none
                focus:ring-2
                focus:ring-[#F5A623]
                "
              />

            </div>



            {/* confirmer mot de passe */}
            <div>

              <label className="block text-sm text-gray-600 mb-2">
                Confirmer le mot de passe
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="
                w-full
                border
                border-gray-300
                rounded-2xl
                p-3
                outline-none
                focus:ring-2
                focus:ring-[#F5A623]
                "
              />

            </div>



            {/* bouton */}
            <div className="md:col-span-3">

              <button
                type="submit"
                className="
                bg-[#F5A623]
                hover:bg-[#E09010]
                text-white
                px-6
                py-3
                rounded-2xl
                font-semibold
                transition
                "
              >
                Modifier le mot de passe
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}