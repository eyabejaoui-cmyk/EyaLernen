import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfList() {
  const navigate = useNavigate();
  const [showSara, setShowSara] = useState(false);
  const [typeCours, setTypeCours] = useState("groupe");
  const [showPayment, setShowPayment] = useState(false);
  const [modePaiement, setModePaiement] = useState("heure");

  return (

    <div className="relative h-full rounded-3xl bg-[#f7f7fc] border-x-2 border-gray-300 p-8 py-14 px-3">

      
      <button
        onClick={() => navigate("/ness")}
        className="absolute top-4 right-4 w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-200 transition"
      >
        ✕
      </button>

      <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* ✅ CARD SARA (CORRIGÉ) */}
        <div
          onClick={() => setShowSara(true)}
          className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-200 shadow-sm w-full max-w-md cursor-pointer hover:shadow-md transition"
        >
          <img src="/images/mariem.png" className="w-16 h-16 rounded-full object-cover" />

          <div>
            <h2 className="font-semibold text-lg">Sarah Bennani</h2>
            <p className="text-gray-500 text-sm">Conversations fluides et confiance à l'oral.</p>
            <div className="flex gap-2 text-sm">
              <span className="text-orange-500">⭐ 4.9</span>
              <span className="text-gray-400">(248 avis)</span>
            </div>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              1ère séance offerte
            </span>
          </div>
        </div>


        <div
          onClick={() => setShowSara(true)}
          className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-200 shadow-sm w-full max-w-md cursor-pointer hover:shadow-md transition"
        >
          <img src="/images/mariem.png" className="w-16 h-16 rounded-full object-cover" />

          <div>
            <h2 className="font-semibold text-lg">Sarah Bennani</h2>
            <p className="text-gray-500 text-sm">Conversations fluides et confiance à l'oral.</p>
            <div className="flex gap-2 text-sm">
              <span className="text-orange-500">⭐ 4.9</span>
              <span className="text-gray-400">(248 avis)</span>
            </div>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              1ère séance offerte
            </span>
          </div>
        </div>


        <div
          onClick={() => setShowSara(true)}
          className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-200 shadow-sm w-full max-w-md cursor-pointer hover:shadow-md transition"
        >
          <img src="/images/mariem.png" className="w-16 h-16 rounded-full object-cover" />

          <div>
            <h2 className="font-semibold text-lg">Sarah Bennani</h2>
            <p className="text-gray-500 text-sm">Conversations fluides et confiance à l'oral.</p>
            <div className="flex gap-2 text-sm">
              <span className="text-orange-500">⭐ 4.9</span>
              <span className="text-gray-400">(248 avis)</span>
            </div>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              1ère séance offerte
            </span>
          </div>
        </div>

        <div
          onClick={() => setShowSara(true)}
          className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-200 shadow-sm w-full max-w-md cursor-pointer hover:shadow-md transition"
        >
          <img src="/images/mariem.png" className="w-16 h-16 rounded-full object-cover" />

          <div>
            <h2 className="font-semibold text-lg">Sarah Bennani</h2>
            <p className="text-gray-500 text-sm">Conversations fluides et confiance à l'oral.</p>
            <div className="flex gap-2 text-sm">
              <span className="text-orange-500">⭐ 4.9</span>
              <span className="text-gray-400">(248 avis)</span>
            </div>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              1ère séance offerte
            </span>
          </div>
        </div>

        <div
          onClick={() => setShowSara(true)}
          className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-200 shadow-sm w-full max-w-md cursor-pointer hover:shadow-md transition"
        >
          <img src="/images/mariem.png" className="w-16 h-16 rounded-full object-cover" />

          <div>
            <h2 className="font-semibold text-lg">Sarah Bennani</h2>
            <p className="text-gray-500 text-sm">Conversations fluides et confiance à l'oral.</p>
            <div className="flex gap-2 text-sm">
              <span className="text-orange-500">⭐ 4.9</span>
              <span className="text-gray-400">(248 avis)</span>
            </div>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              1ère séance offerte
            </span>
          </div>
        </div>

        <div
          onClick={() => setShowSara(true)}
          className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-200 shadow-sm w-full max-w-md cursor-pointer hover:shadow-md transition"
        >
          <img src="/images/mariem.png" className="w-16 h-16 rounded-full object-cover" />

          <div>
            <h2 className="font-semibold text-lg">Sarah Bennani</h2>
            <p className="text-gray-500 text-sm">Conversations fluides et confiance à l'oral.</p>
            <div className="flex gap-2 text-sm">
              <span className="text-orange-500">⭐ 4.9</span>
              <span className="text-gray-400">(248 avis)</span>
            </div>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              1ère séance offerte
            </span>
          </div>
        </div>

        <div
          onClick={() => setShowSara(true)}
          className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-200 shadow-sm w-full max-w-md cursor-pointer hover:shadow-md transition"
        >
          <img src="/images/mariem.png" className="w-16 h-16 rounded-full object-cover" />

          <div>
            <h2 className="font-semibold text-lg">Sarah Bennani</h2>
            <p className="text-gray-500 text-sm">Conversations fluides et confiance à l'oral.</p>
            <div className="flex gap-2 text-sm">
              <span className="text-orange-500">⭐ 4.9</span>
              <span className="text-gray-400">(248 avis)</span>
            </div>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              1ère séance offerte
            </span>
          </div>
        </div>

        <div
          onClick={() => setShowSara(true)}
          className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-200 shadow-sm w-full max-w-md cursor-pointer hover:shadow-md transition"
        >
          <img src="/images/mariem.png" className="w-16 h-16 rounded-full object-cover" />

          <div>
            <h2 className="font-semibold text-lg">Sarah Bennani</h2>
            <p className="text-gray-500 text-sm">Conversations fluides et confiance à l'oral.</p>
            <div className="flex gap-2 text-sm">
              <span className="text-orange-500">⭐ 4.9</span>
              <span className="text-gray-400">(248 avis)</span>
            </div>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              1ère séance offerte
            </span>
          </div>
        </div>

        <div
          onClick={() => setShowSara(true)}
          className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-200 shadow-sm w-full max-w-md cursor-pointer hover:shadow-md transition"
        >
          <img src="/images/mariem.png" className="w-16 h-16 rounded-full object-cover" />

          <div>
            <h2 className="font-semibold text-lg">Sarah Bennani</h2>
            <p className="text-gray-500 text-sm">Conversations fluides et confiance à l'oral.</p>
            <div className="flex gap-2 text-sm">
              <span className="text-orange-500">⭐ 4.9</span>
              <span className="text-gray-400">(248 avis)</span>
            </div>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              1ère séance offerte
            </span>
          </div>
        </div>


        <div
          onClick={() => setShowSara(true)}
          className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-200 shadow-sm w-full max-w-md cursor-pointer hover:shadow-md transition"
        >
          <img src="/images/mariem.png" className="w-16 h-16 rounded-full object-cover" />

          <div>
            <h2 className="font-semibold text-lg">Sarah Bennani</h2>
            <p className="text-gray-500 text-sm">Conversations fluides et confiance à l'oral.</p>
            <div className="flex gap-2 text-sm">
              <span className="text-orange-500">⭐ 4.9</span>
              <span className="text-gray-400">(248 avis)</span>
            </div>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              1ère séance offerte
            </span>
          </div>
        </div>
        <div
          onClick={() => setShowSara(true)}
          className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-200 shadow-sm w-full max-w-md cursor-pointer hover:shadow-md transition"
        >
          <img src="/images/mariem.png" className="w-16 h-16 rounded-full object-cover" />

          <div>
            <h2 className="font-semibold text-lg">Sarah Bennani</h2>
            <p className="text-gray-500 text-sm">Conversations fluides et confiance à l'oral.</p>
            <div className="flex gap-2 text-sm">
              <span className="text-orange-500">⭐ 4.9</span>
              <span className="text-gray-400">(248 avis)</span>
            </div>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              1ère séance offerte
            </span>
          </div>
        </div>
        <div
          onClick={() => setShowSara(true)}
          className="bg-white rounded-2xl p-4 flex items-center gap-4 border border-gray-200 shadow-sm w-full max-w-md cursor-pointer hover:shadow-md transition"
        >
          <img src="/images/mariem.png" className="w-16 h-16 rounded-full object-cover" />

          <div>
            <h2 className="font-semibold text-lg">Sarah Bennani</h2>
            <p className="text-gray-500 text-sm">Conversations fluides et confiance à l'oral.</p>
            <div className="flex gap-2 text-sm">
              <span className="text-orange-500">⭐ 4.9</span>
              <span className="text-gray-400">(248 avis)</span>
            </div>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
              1ère séance offerte
            </span>
          </div>
        </div>


        

    

      </div>

      {/* ✅ POPUP */}
      {showSara && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[700px] rounded-3xl p-6 relative">

            <button
              onClick={() => setShowSara(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <div className="flex gap-4 items-center">
              <img src="/images/mariem.png" className="w-20 h-20 rounded-xl" />
              <div>
                <h2 className="text-xl font-bold">Sarah Bennani</h2>
                <p className="text-gray-500">Anglais conversationnel</p>
                <p className="text-sm text-gray-400">
                  ⭐ 4.9 • 248 avis • 540 élèves • 60 min
                </p>
              </div>
            </div>

            <p className="mt-4 text-gray-600">
              Professeure certifiée avec 8 ans d'expérience. Méthode simple et pratique.
            </p>
            
            <h3 className="mt-6 font-semibold">TYPE DE COURS</h3>

<div className="flex gap-4 mt-3">

  <div
    onClick={() => setTypeCours("groupe")}
    className={`px-4 py-2 rounded-xl cursor-pointer transition
      ${typeCours === "groupe"
        ? "bg-black text-white"
        : "bg-gray-100 hover:bg-gray-200"}
    `}
  >
    Groupe
  </div>

  <div
    onClick={() => setTypeCours("individuel")}
    className={`px-4 py-2 rounded-xl cursor-pointer transition
      ${typeCours === "individuel"
        ? "bg-black text-white"
        : "bg-gray-100 hover:bg-gray-200"}
    `}
  >
    Individuel
  </div>

</div>

            <h3 className="mt-6 font-semibold">NIVEAUX DISPONIBLES</h3>

            <div className="grid grid-cols-2 gap-4 mt-3">

            <div className="bg-gray-100 p-4 rounded-xl">
  A1 • {typeCours === "individuel" ? "700 DH" : "540 DH"}
</div>

<div className="bg-gray-100 p-4 rounded-xl">
  A2 • {typeCours === "individuel" ? "750 DH" : "580 DH"}
</div>

<div className="bg-gray-100 p-4 rounded-xl">
  B1 • {typeCours === "individuel" ? "800 DH" : "600 DH"}
</div>

<div className="bg-gray-100 p-4 rounded-xl">
  B2 • {typeCours === "individuel" ? "900 DH" : "680 DH"}
</div>

</div>

            <h3 className="mt-6 font-semibold">HORAIRES DISPONIBLES</h3>

            <div className="grid grid-cols-2 gap-4 mt-3">

  {typeCours === "groupe" ? (
    <>
      <div className="bg-gray-100 p-3 rounded-xl">Lun 17:00 - 19:00</div>
      <div className="bg-gray-100 p-3 rounded-xl">Mer 18:00 - 20:00</div>
      <div className="bg-gray-100 p-3 rounded-xl">Sam 10:00 - 12:00</div>
    </>
  ) : (
    <>
      <div className="bg-gray-100 p-3 rounded-xl">Lun 09:00 - 18:00</div>
      <div className="bg-gray-100 p-3 rounded-xl">Mar 09:00 - 18:00</div>
      <div className="bg-gray-100 p-3 rounded-xl">Jeu 09:00 - 18:00</div>
    </>
  )}

</div>
            
            
            <button
                onClick={() => setShowPayment(true)}
                className="mt-6 w-full bg-black text-white py-3 rounded-xl"
            >
                Réserver
            </button>

          </div>

        </div>
      )}

      {showPayment && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white w-[600px] rounded-3xl p-6 relative">

      
      <button
        onClick={() => setShowPayment(false)}
        className="absolute top-4 right-4 text-xl"
      >
        ✕
      </button>

      {/* TITLE */}
      <h2 className="text-2xl font-bold mb-2">Paiement</h2>
      <p className="text-gray-500 mb-6">
        Cours avec Sarah Bennani · Niveau A2
      </p>

      {/* CHOIX */}
      <div className="flex gap-4 mb-6">

        {/* HEURE */}
        <div
          onClick={() => setModePaiement("heure")}
          className={`flex-1 p-4 rounded-2xl border-2 cursor-pointer transition
            ${modePaiement === "heure"
              ? "bg-green-200 border-black"
              : "bg-white border-gray-200"}
          `}
        >
          <p className="text-sm text-gray-500">À L'HEURE</p>
          <p className="text-xl font-bold">75 DH</p>
        </div>

        {/* MENSUEL */}
        <div
          onClick={() => setModePaiement("mensuel")}
          className={`flex-1 p-4 rounded-2xl border-2 cursor-pointer transition
            ${modePaiement === "mensuel"
              ? "bg-green-200 border-black"
              : "bg-white border-gray-200"}
          `}
        >
          <p className="text-sm text-gray-500">MENSUEL</p>
          <p className="text-xl font-bold">580 DH</p>
        </div>

      </div>

      {/* INPUTS */}
      <input
        placeholder="Nom sur la carte"
        className="w-full border p-4 rounded-2xl mb-4"
      />

      <input
        placeholder="Numéro de carte"
        className="w-full border p-4 rounded-2xl mb-4"
      />

      <div className="flex gap-4 mb-4">
        <input placeholder="MM/AA" className="w-1/2 border p-4 rounded-2xl" />
        <input placeholder="CVC" className="w-1/2 border p-4 rounded-2xl" />
      </div>

      {/* BUTTON */}
      <button className="w-full bg-[#070b1f] text-white py-4 rounded-2xl font-semibold">
        Payer {modePaiement === "heure" ? "75 DH" : "580 DH"}
      </button>

      <p className="text-center text-gray-400 mt-3 text-sm">
        Paiement sécurisé 
      </p>

    </div>
  </div>
)}

    </div>

    
  );
}