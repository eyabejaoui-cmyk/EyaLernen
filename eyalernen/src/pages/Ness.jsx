import { Link } from "react-router-dom";

import {
  LayoutGrid,
  BookOpen,
  GraduationCap,
  Map,
  TrendingUp,
  User,
} from "lucide-react";

// hna n3arfo component esmou Ness
export default function Ness() {
  // hna nraj3ou structure mta3 la page
  return (
    // hetha parent principal
    <div className="flex min-h-screen bg-[#f5f5fb]">

      
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col justify-between px-6 py-8">
           {/* px = padding le ft + padding right*/}
        
        <div>

          {/*bloc l logo m margin b bottom font= police indigo = coleur */}
          <div className="mb-12">

            
            <h1 className="text-2xl font-bold text-indigo-600">EyaLernen</h1>
          </div>

           {/*le nav des liens */}
          <nav>

             {/*y = le sence */}
            <ul className="space-y-4">

              
              <li>

                
                <Link
                  to="/"
                  className="flex items-center gap-3 bg-[#f3f2fb] text-gray-900 font-medium rounded-2xl px-5 py-4"
                >

                  {/*rounded = coins arrondis py= padding top + padding bottom */}
                  {/*icon*/}
                  <LayoutGrid size={22} />

                  <span>Accueil</span>
                </Link>
              </li>

              <li>

                {/* Link يمشي لصفحة apprendre */}
                <Link
                  to="/apprendre"
                  className="flex items-center gap-3 text-gray-500 font-medium rounded-2xl px-5 py-4 hover:bg-gray-100"
                >

                  <BookOpen size={22} />
                 
                  <span>Apprendre</span>
                </Link>
              </li>
              
              <li>
                
                <Link
                  to="/cours"
                  className="flex items-center gap-3 text-gray-500 font-medium rounded-2xl px-5 py-4 hover:bg-gray-100"
                >
   
                  <GraduationCap size={22} />
                 
                  <span>Cours</span>
                </Link>
              </li>
             
              <li>               
                <Link
                  to="/explorer"
                  className="flex items-center gap-3 text-gray-500 font-medium rounded-2xl px-5 py-4 hover:bg-gray-100"
                >
                  <Map size={22} />

                  <span>Explorer</span>
                </Link>
              </li>

              <li>

                <Link
                  to="/progression"
                  className="flex items-center justify-between text-gray-500 font-medium rounded-2xl px-5 py-4 hover:bg-gray-100"
                >

                  {/*gap = l’idée mta3 espace bin éléments*/}
                  <div className="flex items-center gap-3">

                    <TrendingUp size={22} />

                    <span>Progression</span>
                  </div>

                  {/* hatha point rose kif elli fil image */}
                  <span className="w-3 h-3 rounded-full bg-pink-500"></span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div>

          <Link
            to="/compte"
            className="flex items-center gap-3 text-gray-500 font-medium rounded-2xl px-5 py-4 hover:bg-gray-100"
          >

            <User size={22} />

            <span>Compte</span>
          </Link>
        </div>
      </aside>

      <main className="flex-1 p-10">

        <div className="h-full rounded-3xl bg-[#f7f7fc] border border-gray-200 p-8">

          <h2 className="text-2xl font-semibold text-gray-800">Page Ness</h2>

          <p className="mt-3 text-gray-500">
            Hné t7ot contenu principal mta3 page.
          </p>
        </div>
      </main>
    </div>
  );
}