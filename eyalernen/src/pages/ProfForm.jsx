import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LayoutGrid, BookOpen, GraduationCap, TrendingUp, User } from "lucide-react";

export default function ProfForm() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    description: "",
    horaires: "",
    niveau: "",
    groupe: "",
    prixGroupe: "",
    prixIndividuel: "",
    image: ""
  });

  // changer les inputs
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  // gérer image (simple base64)
  function handleImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setForm({
        ...form,
        image: reader.result
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  // submit
  function handleSubmit(e) {
  e.preventDefault();

  const old = JSON.parse(localStorage.getItem("profs")) || [];

  const newProfs = [...old, form];

  localStorage.setItem("profs", JSON.stringify(newProfs));

  navigate("/ProfDashboard");
}

  return (
    <>
      {/* SIDEBAR */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-72 bg-[#F4F2EF] border-r border-gray-200 flex flex-col justify-between px-6 py-8">

        <div>

          <div className="mb-12">
            <div className="flex items-center gap-3 px-6 py-3 rounded-2xl">

              <div className="w-12 h-12 bg-gradient-to-br from-[#F5A623] to-[#E09010]
              rounded-[14px] flex items-center justify-center text-2xl shadow">
                🦉
              </div>

              <span className="text-3xl font-black">
                EyaLernen
              </span>
            </div>
          </div>

          <nav>
            <ul className="space-y-4">

              <li>
                <Link to="/" className="flex gap-3 px-5 py-4 hover:bg-[#E09010] rounded-2xl">
                  <LayoutGrid size={22} />
                  Accueil
                </Link>
              </li>

              <li>
                <Link to="/apprendre" className="flex gap-3 px-5 py-4 hover:bg-[#E09010] rounded-2xl">
                  <BookOpen size={22} />
                  Apprendre
                </Link>
              </li>

              <li>
                <Link to="/ProfDashboard" className="flex gap-3 px-5 py-4 hover:bg-[#E09010] rounded-2xl">
                  <GraduationCap size={22} />
                  Cours
                </Link>
              </li>

              <li>
                <Link to="/progression" className="flex gap-3 px-5 py-4 hover:bg-[#E09010] rounded-2xl">
                  <TrendingUp size={22} />
                  Progression
                </Link>
              </li>

            </ul>
          </nav>
        </div>

        <Link to="/compte" className="flex gap-3 px-5 py-4 hover:bg-[#E09010] rounded-2xl">
          <User size={22} />
          Compte
        </Link>

      </aside>

      {/* MAIN */}
      <main className="p-4 lg:p-10 lg:ml-72">

        <div className="p-6 max-w-xl mx-auto">

          <form onSubmit={handleSubmit} className="space-y-4">

            <input name="nom" placeholder="Nom" onChange={handleChange} className="w-full border p-2" />
            <input name="prenom" placeholder="Prénom" onChange={handleChange} className="w-full border p-2" />

            {/* IMAGE */}
            <input type="file" accept="image/*" onChange={handleImage} className="w-full border p-2 bg-white" />

            {/* PREVIEW */}
            {form.image && (
              <img 
                src={form.image} 
                alt="preview" 
                className="w-32 h-32 object-cover rounded-lg"
              />
            )}

            <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full border p-2" />

            <input name="horaires" placeholder="Horaires" onChange={handleChange} className="w-full border p-2" />
            <input name="niveau" placeholder="Niveau" onChange={handleChange} className="w-full border p-2" />
            <input name="groupe" placeholder="Nombre groupe" onChange={handleChange} className="w-full border p-2" />
            <input name="prixGroupe" placeholder="Prix groupe" onChange={handleChange} className="w-full border p-2" />
            <input name="prixIndividuel" placeholder="Prix individuel" onChange={handleChange} className="w-full border p-2" />

            <button className="bg-orange-500 text-white p-2 w-full">
              Enregistrer
            </button>

          </form>

        </div>

      </main>
    </>
  );
}