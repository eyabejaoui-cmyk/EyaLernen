import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = (e) => {

        e.preventDefault();

        if (!email || !password) {
            setError("Remplir tous les champs");
            return;
        }

        setError("");
        setLoading(true);

        fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        .then(res => res.json())

        .then(data => {

            console.log(data);

            setLoading(false);
            
            
            if (data.role === "student") {
                
                localStorage.setItem("email", email);
                
                navigate("/ness");
            }

            else if (data.role === "prof" || data.role === "Professeur") {
                
                localStorage.setItem("email", email);
                
                navigate("/ProfesseurSpace");
            }

            else {
                setError("Compte non trouvé");
            }

        })

        .catch(err => {

            console.log("ERROR =", err);

            setLoading(false);

            setError("Erreur serveur");
        });

    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-[#171717] px-4 relative">

            <div className="absolute top-0 left-0 w-full">
                <div className="h-[5px] bg-black"></div>
                <div className="h-[5px] bg-red-600"></div>
                <div className="h-[5px] bg-[#FFC107]"></div>
            </div>

            

            <form
                onSubmit={handleLogin}
                className="w-full max-w-md bg-[#0F0F0F] rounded-3xl shadow-lg border border-[#3A2600] p-5 sm:p-6 md:p-8"
            >

                <div className="flex flex-col items-center mb-8">

                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#FFC107] to-[#E0A800]
                    rounded-2xl flex items-center justify-center text-3xl shadow-md mb-4">
                        🦉
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold">
                        <span className="text-[#FFC107]">Eya</span>
                        <span className="text-white">Lernen</span>
                    </h1>

                    <p className="text-sm text-gray-400 mt-2 text-center">
                        Connecte-toi à ton compte
                    </p>

                </div>

                <div className="mb-5">

                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        Email
                    </label>

                    <input
                        type="email"
                        required
                        placeholder="exemple@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 text-sm sm:text-base bg-[#111111] text-white border border-[#3A2600] rounded-xl outline-none focus:ring-2 focus:ring-[#FFC107] placeholder:text-gray-600"
                    />

                </div>

                <div className="mb-5 relative">

                    <label className="block text-sm font-medium text-gray-400 mb-2">
                        Mot de passe
                    </label>

                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 text-sm sm:text-base bg-[#111111] text-white border border-[#3A2600] rounded-xl outline-none focus:ring-2 focus:ring-[#FFC107] placeholder:text-gray-600"
                    />

                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-[42px] sm:top-[45px] cursor-pointer text-gray-400"
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </span>

                </div>

                {error && (
                    <p className="text-red-500 text-sm mb-4">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#FFC107] text-black rounded-xl font-bold hover:bg-[#E0A800] hover:scale-[1.01] transition"
                >
                    {loading ? "Connexion..." : "Se connecter"}
                </button>

                <div className="mt-6 text-center text-sm text-gray-400">

                    Vous n’avez pas de compte ?

                    <span
                        onClick={() => navigate("/inscription")}
                        className="text-[#FFC107] font-semibold cursor-pointer ml-1"
                    >
                        Créer un compte
                    </span>

                </div>


                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="w-full mt-4 text-center text-sm text-gray-400 hover:text-[#FFC107] transition"
                >
                    ← Retour à l'accueil
                </button>

            </form>

        </div>
    );
}