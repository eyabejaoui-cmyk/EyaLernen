import { useState } from "react";
import { useNavigate } from "react-router-dom";



export default function Login(){

    const [email, setEmail] = useState("");  //array destructuring : [le verre , verser dedans]
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate(); //?

    const handleLogin = (e) =>{
        console.log("clicked");
        e.preventDefault(); //éviter refresh l page

    if (!email || !password){
        setError("Remplir tous les champs");
        return;
    }
    setError("");

    fetch("http://127.0.0.1:8000/login", { //appel serveur 
        method: "POST",
        headers: {
            "Content-Type": "application/json" // js-> { email: "eya@gmail.com", password: "1234" }
        },
        body: JSON.stringify({ //'{"email":"eya@gmail.com","password":"1234"}'
            email: email,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
    if (data.role === "student") {
        navigate("/ness");
    } 
    else if (data.role === "prof") {
        navigate("/ProfForm");
    } 
    else {
        alert("Crée un compte");
    }

    })
    .catch(err => {
    console.log("ERROR =", err);
    });

    };  

    return(
    <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div>
            <label>Email</label>
            <input type="email" 
            required
            placeholder="Email"
            value={email} //montre ce qu’il y a dans le verre
            onChange={(e) => setEmail(e.target.value)} //chaque fois que utilisateur ajoute quelque chose, on le met dans le verre
            /> 
        </div>
        
        <div className="relative">
            <label>Mot de passe</label>
            <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" p-2 border rounded "
            />
            <span
            onClick={() => setShowPassword(!showPassword)}
            className=""
            >
            👁️
            </span>
        </div>
        <button type="submit"
        className="mt-4 px-2 py-2 bg-[#F5A623] text-white rounded-xl hover:bg-[#e08e15] transition"
        >Login</button>
    </form>
    )
}