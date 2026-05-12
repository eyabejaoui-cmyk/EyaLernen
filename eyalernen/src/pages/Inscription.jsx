import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";

export default function Inscription() {

    const [step, setStep] = useState(1);

    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("student");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleNext = () => {

        if (
            !prenom ||
            !nom ||
            !email ||
            !password ||
            !confirmPassword
        ) {
            alert("Merci de remplir tous les champs");
            return;
        }

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas");
            return;
        }

        setStep(2);
    };

    const handleCreateAccount = (e) => {

        e.preventDefault();

        fetch("http://127.0.0.1:8000/register", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                prenom: prenom,
                nom: nom,
                email: email,
                password: password,
                role: role

            })

        })

        .then(res => res.json())

        .then(data => {

            console.log(data);

            alert("Compte créé");

            navigate("/ness");

        })

        .catch(err => {

            console.log(err);

            alert("Erreur inscription");

        });

    };

    return (

        <div className="min-h-dvh overflow-y-auto flex justify-center items-start bg-[#F4F2EF] px-4 py-8">
<button
  onClick={() => navigate("/#")}
  className="
  fixed top-4 right-4 z-50

  w-12 h-12

  rounded-full
  border border-gray-300
  bg-white

  flex items-center justify-center

  text-gray-700

  shadow-sm
  hover:bg-gray-100

  transition
  "
>

  <X size={22} />

</button>
            <div className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-[#E7E2DC] p-5 sm:p-6 md:p-8">

                <div className="text-center mb-8">

                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#F5A623] to-[#E09010]
                    rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-md">
                        🦉
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">
                        Créer un compte
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        Rejoignez la plateforme EyaLlernen
                    </p>

                </div>

                <form onSubmit={handleCreateAccount}>

                    {step === 1 && (

                    <>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>

                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Prénom
                            </label>

                            <input
                                type="text"
                                placeholder="Prénom"
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#F5A623]"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Nom
                            </label>

                            <input
                                type="text"
                                placeholder="Nom"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                className="w-full text-sm sm:text-base border border-gray-300 rounded-xl px-3 py-3"
                            />

                        </div>

                        <div className="sm:col-span-2">

                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="votre@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#F5A623]"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Mot de passe
                            </label>

                            <div className="relative">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#F5A623]"
                                />

                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-4 cursor-pointer text-gray-500"
                                >
                                    {showPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </span>

                            </div>

                        </div>

                        <div>

                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Confirmation
                            </label>

                            <div className="relative">

                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirmer"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full border border-gray-300 rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#F5A623]"
                                />

                                <span
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-4 cursor-pointer text-gray-500"
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff size={20} />
                                    ) : (
                                        <Eye size={20} />
                                    )}
                                </span>

                            </div>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={handleNext}
                        className="w-full mt-6 py-3 bg-[#F5A623] text-white rounded-xl font-semibold hover:bg-[#E09010] transition-all duration-200"
                    >
                        Suivant
                    </button>

                    </>

                    )}

                    {step === 2 && (

                    <>

                    <div>

    <label className="block mb-2 text-sm font-medium text-gray-700">
        Rôle
    </label>

    <div className="space-y-3">

        <div
            onClick={() => setRole("student")}
            className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                role === "student"
                ? "border-[#F5A623] bg-[#FFF7E8]"
                : "border-gray-300"
            }`}
        >

            <input
                type="radio"
                checked={role === "student"}
                readOnly
                className="accent-[#F5A623]"
            />

            <span className="text-sm sm:text-base">
                Étudiant
            </span>

        </div>

        <div
            onClick={() => setRole("prof")}
            className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                role === "prof"
                ? "border-[#F5A623] bg-[#FFF7E8]"
                : "border-gray-300"
            }`}
        >

            <input
                type="radio"
                checked={role === "prof"}
                readOnly
                className="accent-[#F5A623]"
            />

            <span className="text-sm sm:text-base">
                Professeur
            </span>

        </div>

    </div>

</div>

                    <div className="flex gap-4 mt-6">

                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-full py-3 border border-[#F5A623] text-[#F5A623] rounded-xl font-semibold transition-all duration-200"
                        >
                            Retour
                        </button>

                        <button
                            type="submit"
                            className="w-full py-3 bg-[#F5A623] text-white rounded-xl font-semibold hover:bg-[#E09010] transition-all duration-200"
                        >
                            Créer un compte
                        </button>

                    </div>

                    </>

                    )}

                </form>

            </div>

        </div>
    );
}