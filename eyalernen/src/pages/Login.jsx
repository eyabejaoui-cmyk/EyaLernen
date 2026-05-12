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

            else if (data.role === "prof") {
                navigate("/ProfForm");
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

        <div className="min-h-screen flex items-center justify-center bg-[#F4F2EF] px-4">

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

            <form
                onSubmit={handleLogin}
                className="w-full max-w-md bg-white rounded-3xl shadow-lg border border-[#E7E2DC] p-5 sm:p-6 md:p-8"
            >

                <div className="flex flex-col items-center mb-8">

                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#F5A623] to-[#E09010]
                    rounded-2xl flex items-center justify-center text-3xl shadow-md mb-4">
                        🦉
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-[#1E293B]">
                        Connexion
                    </h1>

                    <p className="text-sm text-gray-500 mt-2 text-center">
                        Connectez-vous à votre plateforme EyaLernen
                    </p>

                </div>

                <div className="mb-5">

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                    </label>

                    <input
                        type="email"
                        required
                        placeholder="exemple@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#F5A623]"
                    />

                </div>

                <div className="mb-5 relative">

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mot de passe
                    </label>

                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 text-sm sm:text-base border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-[#F5A623]"
                    />

                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-[42px] sm:top-[45px] cursor-pointer text-gray-500"
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
                    className="w-full py-3 bg-[#F5A623] text-white rounded-xl font-semibold hover:bg-[#E09010] hover:scale-[1.01] transition"
                >
                    {loading ? "Connexion..." : "Se connecter"}
                </button>

                <div className="mt-6 text-center text-sm text-gray-500">

                    Vous n’avez pas de compte ?

                    <span
                        onClick={() => navigate("/inscription")}
                        className="text-[#F5A623] font-semibold cursor-pointer ml-1"
                    >
                        Créer un compte
                    </span>

                </div>

            </form>

        </div>
    );
}