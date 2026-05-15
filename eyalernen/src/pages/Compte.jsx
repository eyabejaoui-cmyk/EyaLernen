import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut  } from "lucide-react";

export default function Compte() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (!email) {
      setMessage("Aucun utilisateur connecté");
      return;
    }

    fetch(`http://127.0.0.1:8000/user/profile/${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          setMessage("Utilisateur introuvable");
        } else {
          setUser(data);
        }
      })
      .catch(() => {
        setMessage("Erreur serveur");
      });
  }, []);

  const changerMotDePasse = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setMessage("Merci de remplir tous les champs");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }

    fetch("http://127.0.0.1:8000/user/change-password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        old_password: oldPassword,
        new_password: newPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          setMessage(data.detail);
        } else {
          setMessage("Mot de passe modifié avec succès");
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          setShowPasswordForm(false);
        }
      })
      .catch(() => {
        setMessage("Erreur serveur");
      });
  };

  const deconnexion = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("user");
    navigate("/#");
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] flex items-center justify-center px-4 py-8 relative">

      <div className="absolute top-0 left-0 w-full">
        <div className="h-[5px] bg-black"></div>
        <div className="h-[5px] bg-red-600"></div>
        <div className="h-[5px] bg-[#FFC107]"></div>
      </div>

      <div className="w-full max-w-md bg-white rounded-[28px] shadow-xl border border-[#EFE7D8] p-6">

        <button
          onClick={() => navigate("/ness")}
          className="
          inline-flex items-center gap-2
          text-gray-500
          hover:text-[#111111]
          mb-5
          transition
          "
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Retour</span>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-[#FFC107] to-[#E0A800] flex items-center justify-center text-3xl shadow-[0_4px_16px_rgba(255,193,7,0.35)] mb-4">
            👤
          </div>

          <h1 className="text-2xl font-bold text-[#111111]">
            Mon compte
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Informations personnelles et sécurité
          </p>
        </div>

        {message && (
          <p
            className={`text-sm text-center mb-4 font-medium ${
              message.includes("succès") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {user && (
          <>
            <div className="space-y-3 mb-6">
              <div className="bg-[#F8F6F0] border border-[#EFE7D8] rounded-2xl p-4">
                <p className="text-xs text-gray-500">Nom</p>
                <p className="font-semibold text-[#111111]">
                  {user.nom || "-"}
                </p>
              </div>

              <div className="bg-[#F8F6F0] border border-[#EFE7D8] rounded-2xl p-4">
                <p className="text-xs text-gray-500">Prénom</p>
                <p className="font-semibold text-[#111111]">
                  {user.prenom || "-"}
                </p>
              </div>

              <div className="bg-[#F8F6F0] border border-[#EFE7D8] rounded-2xl p-4">
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-semibold text-[#111111]">
                  {user.email || "-"}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="
              w-full
              bg-[#FFC107]
              text-black
              py-3
              rounded-2xl
              font-bold
              shadow-sm
              hover:bg-[#E0A800]
              hover:shadow-[0_4px_14px_rgba(255,193,7,0.30)]
              transition
              mb-3
              "
            >
              {showPasswordForm ? "Cacher" : "Modifier le mot de passe"}
            </button>

            {showPasswordForm && (
              <div className="space-y-3 mb-3">
                <input
                  type="password"
                  placeholder="Ancien mot de passe"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full border border-[#EFE7D8] bg-[#F8F6F0] rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFC107]"
                />

                <input
                  type="password"
                  placeholder="Nouveau mot de passe"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-[#EFE7D8] bg-[#F8F6F0] rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFC107]"
                />

                <input
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-[#EFE7D8] bg-[#F8F6F0] rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#FFC107]"
                />

                <button
                  onClick={changerMotDePasse}
                  className="
                  w-full
                  bg-[#1F1F1F]
                  text-white
                  py-3
                  rounded-2xl
                  font-bold
                  hover:bg-[#111111]
                  transition
                  "
                >
                  Enregistrer
                </button>
              </div>
            )}

            <button
              onClick={deconnexion}
              className="
              w-full
              mt-1
              flex
              justify-center
              gap-3
              text-[#DC2626]
              font-medium
              py-2
              rounded-xl
              font-bold
              hover:bg-[#FFE1E1]
              transition
              "
            >
              <LogOut size={18} strokeWidth={2.2} />

              <span className="w-[1px] h-5 bg-[#DC2626]"></span>

              <span>Déconnexion</span>
            </button>

          </>
        )}
      </div>
    </div>
  );
}