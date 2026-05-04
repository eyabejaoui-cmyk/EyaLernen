import { Link } from "react-router-dom";

export default function Jeux() {
  return (
    <div className="h-screen overflow-y-auto rounded-3xl bg-[#f7f7fc] border border-gray-200 p-4 sm:p-8">
      
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1 */}
       <Link to="/Cafe" className="block">
       <div className="group bg-white border border-gray-200 rounded-3xl shadow-sm p-4 sm:p-5 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
        <div className="bg-white rounded-2xl p-4 flex items-center justify-center mb-4">
      <img
        src="/images/café.png"
        alt="cafe"
        className="h-[130px] sm:h-[180px]object-contain transition-transform duration-300 group-hover:scale-105"
      />
      </div>

      <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2">
        <span ></span>
        ☕ Au café
      </h2>

      <p className="text-gray-600 text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
        Commande une boisson et une pâtisserie
        dans un café.
      </p>

  
      <div className="flex justify-between items-center">
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          Débutant
        </span>

       </div>

    </div>
    </Link>

        {/* 2 */}
        <Link to="/Restaurant" className="block">
        <div className="group bg-white border border-gray-200 rounded-3xl shadow-sm p-4 sm:p-5 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
        <div className="bg-white rounded-2xl p-4 flex items-center justify-center mb-4">
      <img
        src="/images/restaurant.png"
        alt="restaurant"
        className="h-[130px] sm:h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
      />
      </div>

      <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2">
        
        🍽️ Au restaurant
      </h2>

      <p className="text-gray-600 text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
        Réserve une table, choisis ton menu et demande l'addition au serveur.
      </p>

  
      <div className="flex justify-between items-center">
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          Débutant
        </span>

       </div>

    </div>
    </Link>

        {/* 3 */}
        <Link to="/Supermarche" className="block">
        <div className="group bg-white border border-gray-200 rounded-3xl shadow-sm p-4 sm:p-5 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
        <div className="bg-white rounded-2xl p-4 flex items-center justify-center mb-4">
      <img
        src="/images/supermarché.png"
        alt="supermarché"
        className="h-[130px] sm:h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
      />
      </div>

      <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2">
        🛒 Au supermarché
      </h2>

      <p className="text-gray-600 text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
        Cherche des produits, demande de l'aide et passe en caisse.
      </p>

  
      <div className="flex justify-between items-center">
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          Débutant
        </span>

       </div>

    </div>
    </Link>

        {/* 4 */}
        <div className="group bg-white border border-gray-200 rounded-3xl shadow-sm p-4 sm:p-5 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
        <div className="bg-white rounded-2xl p-4 flex items-center justify-center mb-4">
            <img
              src="/images/boulangerie.png"
              alt="boulangerie"
              className="h-[130px] sm:h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

  
          <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2">
              🥐 À la boulangerie
          </h2>

  
          <p className="text-gray-600 text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
            Commande du pain, des viennoiseries et engage une petite conversation.
          </p>

 
        <div className="flex justify-between items-center">
           <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
             Débutant
            </span>
    
          </div>

        </div>

         {/*5*/}
        <div className="group bg-white border border-gray-200 rounded-3xl shadow-sm p-4 sm:p-5 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
        <div className="bg-white rounded-2xl p-4 flex items-center justify-center mb-4">
            <img
              src="/images/hôtel.png"
              alt="hôtel"
              className="h-[130px] sm:h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

  
          <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2">
              🏨 À l'hôtel
          </h2>

  
          <p className="text-gray-600 text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
            Check-in et demande des informations
            sur la chambre et les services.
          </p>

 
        <div className="flex justify-between items-center">
           <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
             Débutant
            </span>
    
          </div>

        </div>

          {/*6 */}
         <div className="group bg-white border border-gray-200 rounded-3xl shadow-sm p-4 sm:p-5 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
        <div className="bg-white rounded-2xl p-4 flex items-center justify-center mb-4">
            <img
              src="/images/aéroport.png"
              alt="aéroport"
              className="h-[130px] sm:h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

  
          <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2">
              ✈️ À l'aéroport
          </h2>

  
          <p className="text-gray-600 text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
            Enregistre ton vol, gère un imprévu et trouve ta porte d'embarquement.
          </p>

 
        <div className="flex justify-between items-center">
           <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
             Débutant
            </span>
    
          </div>

        </div>

          {/*7*/}
         <div className="group bg-white border border-gray-200 rounded-3xl shadow-sm p-4 sm:p-5 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
        <div className="bg-white rounded-2xl p-4 flex items-center justify-center mb-4">
            <img
              src="/images/doctor.png"
              alt="médecin"
              className="h-[130px] sm:h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

  
          <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2">
              🩺 Chez le médecin
          </h2>

  
          <p className="text-gray-600 text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
            Explique tes symptômes et comprends l'ordonnance qu'on te donne.
          </p>

 
        <div className="flex justify-between items-center">
           <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
             Débutant
            </span>
    
          </div>

        </div>

        {/*8 */}
        <div className="group bg-white border border-gray-200 rounded-3xl shadow-sm p-4 sm:p-5 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
        <div className="bg-white rounded-2xl p-4 flex items-center justify-center mb-4">
            <img
              src="/images/pharmacie.png"
              alt="pharmacie"
              className="h-[130px] sm:h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

  
          <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2">
              💊 À la pharmacie
          </h2>

  
          <p className="text-gray-600 text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
            Décris tes symptômes et demande conseil au pharmacien.
          </p>

 
        <div className="flex justify-between items-center">
           <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
             Débutant
            </span>
    
          </div>

        </div>


        {/*9*/}
        <div className="group bg-white border border-gray-200 rounded-3xl shadow-sm p-4 sm:p-5 w-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer">
        <div className="bg-white rounded-2xl p-4 flex items-center justify-center mb-4">
      <img
        src="/images/marché.png"
        alt="marché"
        className="h-[130px] sm:h-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
      />
      </div>

      <h2 className="text-base sm:text-lg font-semibold mb-2 flex items-center gap-2">
        <span ></span>
        🥕 Au marché
      </h2>

      <p className="text-gray-600 text-xs sm:text-sm leading-5 sm:leading-6 mb-4">
        Négocie le prix des fruits et légumes avec un vendeur sympathique.
      </p>

  
      <div className="flex justify-between items-center">
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          Débutant
        </span>

       </div>

    </div>

      </div>


      
    </div>
  );
}