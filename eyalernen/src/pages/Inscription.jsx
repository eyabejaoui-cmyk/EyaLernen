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

        localStorage.setItem("email", email);

        if (role === "student") {
            navigate("/ness");
        }

        else if (role === "prof") {
            navigate("/ProfesseurSpace");
        }

        })

        .catch(err => {

            console.log(err);

            alert("Erreur inscription");

        });

    };

    return (

        <div className="min-h-dvh overflow-y-auto flex justify-center items-start bg-[#171717] px-4 py-8 relative">

            <div className="absolute top-0 left-0 w-full">
                <div className="h-[5px] bg-black"></div>
                <div className="h-[5px] bg-red-600"></div>
                <div className="h-[5px] bg-[#FFC107]"></div>
            </div>


            <div className="w-full max-w-md bg-[#0F0F0F] rounded-3xl shadow-lg border border-[#3A2600] p-5 sm:p-6 md:p-8 mt-10">

             

                <div className="text-center mb-8">

                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FFC107] to-[#E0A800]
                    rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-md">
                        🦉
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                        Créer un compte
                    </h1>

                    <p className="text-sm text-gray-400 mt-2">
                        Rejoignez la plateforme EyaLlernen
                    </p>

                </div>

                <form onSubmit={handleCreateAccount}>

                    {step === 1 && (

                    <>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>

                            <label className="block mb-2 text-sm font-medium text-gray-400">
                                Prénom
                            </label>

                            <input
                                type="text"
                                placeholder="Prénom"
                                value={prenom}
                                onChange={(e) => setPrenom(e.target.value)}
                                className="w-full bg-[#111111] text-white border border-[#3A2600] rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#FFC107] placeholder:text-gray-600"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 text-sm font-medium text-gray-400">
                                Nom
                            </label>

                            <input
                                type="text"
                                placeholder="Nom"
                                value={nom}
                                onChange={(e) => setNom(e.target.value)}
                                className="w-full text-sm sm:text-base bg-[#111111] text-white border border-[#3A2600] rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#FFC107] placeholder:text-gray-600"
                            />

                        </div>

                        <div className="sm:col-span-2">

                            <label className="block mb-2 text-sm font-medium text-gray-400">
                                Email
                            </label>

                            <input
                                type="email"
                                placeholder="votre@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-[#111111] text-white border border-[#3A2600] rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#FFC107] placeholder:text-gray-600"
                            />

                        </div>

                        <div>

                            <label className="block mb-2 text-sm font-medium text-gray-400">
                                Mot de passe
                            </label>

                            <div className="relative">

                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mot de passe"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#111111] text-white border border-[#3A2600] rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#FFC107] placeholder:text-gray-600"
                                />

                                <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-4 cursor-pointer text-gray-400"
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

                            <label className="block mb-2 text-sm font-medium text-gray-400">
                                Confirmation
                            </label>

                            <div className="relative">

                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirmer"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-[#111111] text-white border border-[#3A2600] rounded-xl px-3 py-3 outline-none focus:ring-2 focus:ring-[#FFC107] placeholder:text-gray-600"
                                />

                                <span
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-4 cursor-pointer text-gray-400"
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
                        className="w-full mt-6 py-3 bg-[#FFC107] text-black rounded-xl font-bold hover:bg-[#E0A800] transition-all duration-200"
                    >
                        Suivant
                    </button>

                    </>

                    )}

                    {step === 2 && (

                    <>

                    <div>

    <label className="block mb-2 text-sm font-medium text-gray-400">
        Rôle
    </label>

    <div className="space-y-3">

        <div
            onClick={() => setRole("student")}
            className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                role === "student"
                ? "border-[#FFC107] bg-[#1F1A0A] text-[#FFC107]"
                : "border-[#3A2600] text-gray-400"
            }`}
        >

            <input
                type="radio"
                checked={role === "student"}
                readOnly
                className="accent-[#FFC107]"
            />

            <span className="text-sm sm:text-base">
                Étudiant
            </span>

        </div>

        <div
            onClick={() => setRole("prof")}
            className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                role === "prof"
                ? "border-[#FFC107] bg-[#1F1A0A] text-[#FFC107]"
                : "border-[#3A2600] text-gray-400"
            }`}
        >

            <input
                type="radio"
                checked={role === "prof"}
                readOnly
                className="accent-[#FFC107]"
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
                            className="w-full py-3 border border-[#FFC107] text-[#FFC107] rounded-xl font-semibold hover:bg-[#1F1F1F] transition-all duration-200"
                        >
                            Retour
                        </button>

                        <button
                            type="submit"
                            className="w-full py-3 bg-[#FFC107] text-black rounded-xl font-bold hover:bg-[#E0A800] transition-all duration-200"
                        >
                            Créer un compte
                        </button>

                    </div>

                    </>

                    )}

                </form>
                       <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="block mx-auto mt-8 text-center text-sm text-gray-400 hover:text-[#FFC107] transition"
                        >
                            ← Retour à l'accueil
                        </button>
            </div>

        </div>
    );
}