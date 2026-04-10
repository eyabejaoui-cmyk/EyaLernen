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
  
  return (
    // hetha parent principal
    <div className="flex min-h-screen bg-[#f5f5fb]">

      {/* h-screen=9ad écran  */}
      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-72 bg-[#F4F2EF] border-r border-gray-200 flex flex-col justify-between px-6 py-8">
           {/* px = padding left + padding right*/}
        
          <div>
          {/*bloc l logo m margin b bottom font= police indigo = coleur */}
          <div className="mb-12">
           <div className="flex items-center gap-3  px-6 py-3 rounded-2xl">
            <div className="w-12 h-12 bg-gradient-to-br from-[#F5A623] to-[#E09010]
                 rounded-[14px] flex items-center justify-center text-2xl
                 shadow-[0_4px_16px_rgba(245,166,35,0.4)]" >
                  🦉
            </div>

            <span className="text-3xl font-black tracking-tight">
            <span className="text-gray-900">Eya</span>
            <span className="text-gray-900">Lernen</span>
             </span>
           </div>
          </div>
           {/*le nav des liens */}
          <nav>

             {/*y = le sence */}
            <ul className="space-y-4 mb-6 ">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-3 text-gray-600 font-medium rounded-2xl px-5 py-4 hover:bg-[#E09010]"
                >

                  {/*rounded = coins arrondis py= padding top + padding bottom */}
                  {/*icon*/}
                  <LayoutGrid size={22} />

                  <span>Accueil</span>
                </Link>
              </li>

              <li>

                <Link
                  to="/apprendre"
                  className="flex items-center gap-3 text-gray-600 font-medium rounded-2xl px-5 py-4 hover:bg-[#E09010]"
                >

                  <BookOpen size={22} />
                 
                  <span>Apprendre</span>
                </Link>
              </li>
              
              <li>
                
                <Link
                  to="/cours"
                  className="flex items-center gap-3 text-gray-600 font-medium rounded-2xl px-5 py-4 hover:bg-[#E09010]"
                >
   
                  <GraduationCap size={22} />
                 
                  <span>Cours</span>
                </Link>
              </li>

              <li>

                <Link
                  to="/progression"
                  className="flex items-center justify-between text-gray-600 font-medium rounded-2xl px-5 py-4 hover:bg-[#E09010]"
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
            className="flex items-center gap-3 text-gray-600 font-medium rounded-2xl px-5 py-4 hover:bg-[#E09010]"
          >

            <User size={22} />

            <span>Compte</span>
          </Link>
        </div>
      </aside>

      <main className="p-4 lg:p-10 lg:ml-72">

        <div className="h-full rounded-3xl bg-[#f7f7fc] border border-gray-200 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 h-full">
    
            <div className="lg:col-span-2"> {/*espace à gauche*/ }
              <div className="flex flex-col gap-6"> {/*système flexible  direction verticale*/ } {/*conteneur cartes*/}
                 
                <Link to="/chatbot" className="block">
                 <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_4px_14px_rgba(245,166,35,0.35)]  transition "> {/*carte */}

                    <div className="flex justify-between "> {/* structure interne*/}
                      <div className="p-8 flex flex-col">
                        <h2 className="mb-4 text-2xl font-bold">Discussion</h2>
                        <p className="text-gray-500 text-base leading-7">Améliore tes compétences linguistiques en discutant avec
                           notre professeur alimenté par IA.</p>
                        <div className="flex gap-4 mt-4">
                          <span className="text-[13px] px-4 py-1.5 rounded-full text-[#3B4EFF] bg-[#EEEEFF] ">#Écriture</span>
                          <span className="text-[13px] px-4 py-1.5 rounded-full text-[#F5A623] bg-[#FFF3DC]">#Lecture</span>
                        </div>
                      </div>
                      <div className="w-[280px] bg-[#f4cf4f] rounded-l-[80px] flex items-center justify-center">
                         <img
                          src="/images/discussion.png"
                          alt="discussion"
                          className="w-44 object-contain"
                          />
                      </div>
                    </div>
                  </div>
                </Link>

                  {/*2 carte */}
                  <div className="bg-white rounded-3xl overflow-hidden shadow-sm  hover:shadow-[0_4px_14px_rgba(245,166,35,0.35)]  transition "> {/* 1*/}
                    <div className="flex justify-between"> {/* 2*/}
                      <div className="p-8 flex flex-col">
                        <h2 className="mb-4 text-2xl font-bold">Mode appel</h2>
                        <p className="text-gray-500 text-base leading-7"> Développe ton aisance à l’oral grâce à des appels guidés avec notre professeur alimenté par IA.</p>
                        <div className="flex gap-4 mt-4">
                          <span className="text-[13px] px-4 py-1.5 rounded-full text-[#3B4EFF] bg-[#EEEEFF]">#Dialogue</span>
                          <span className="text-[13px] px-4 py-1.5 rounded-full text-[#3B4EFF] bg-[#EEEEFF]">#Écoute</span>
                        </div>
                      </div>
                      <div className="w-[280px] bg-[#DCD6FF] rounded-l-[80px] flex items-center justify-center">
                        <img src="/images/mode-appel.png"
                        alt="mode appel"
                        className="w-38 object-contain" />
                      </div>

                    </div>

                  </div>


                  {/* 3*/}
                  <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_4px_14px_rgba(245,166,35,0.35)]  transition "> {/*carte */}

                    <div className="flex justify-between "> {/* structure interne*/}
                      <div className="p-8 flex flex-col">
                        <h2 className="mb-4 text-2xl font-bold">Jeux de rôle</h2>
                        <p className="text-gray-500 text-base leading-7">Améliore tes compétences linguistiques grâce à des scénarios inspirés de situations réelles.</p>
                        <div className="flex gap-4 mt-4">
                          <span className="text-[13px] px-4 py-1.5 rounded-full text-[#3B4EFF] bg-[#EEEEFF] ">#Vocabulaire</span>
                          <span className="text-[13px] px-4 py-1.5 rounded-full text-[#F5A623] bg-[#FFF3DC]">#Écriture</span>
                        </div> 
                      </div>
                      <div className="w-[280px] bg-[#DDF4C8] rounded-l-[80px] flex items-center justify-center">
                         <img
                          src="/images/jeux.png"
                          alt="jeux de role "
                          className="w-44 object-contain"
                          />
                      </div>
                    </div>
                  </div>  

                  <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_4px_14px_rgba(245,166,35,0.35)]  transition "> {/*carte */}

                    <div className="flex justify-between "> {/* structure interne*/}
                      <div className="p-8 flex flex-col">
                        <h2 className="mb-4 text-2xl font-bold">Mode mot</h2>
                        <p className="text-gray-500 text-base leading-7">Enrichis ton vocabulaire en découvrant de nouveaux mots avec notre professeur alimenté par IA.</p>
                        <div className="flex gap-4 mt-4">
                          <span className="text-[13px] px-4 py-1.5 rounded-full text-[#3B4EFF] bg-[#EEEEFF] ">#Vocabulaire</span>
                          <span className="text-[13px] px-4 py-1.5 rounded-full text-[#F5A623] bg-[#FFF3DC]">#Dialogue</span>
                        </div> 
                      </div>
                      <div className="w-[280px] bg-[#F7C7C7] rounded-l-[80px] flex items-center justify-center">
                         <img
                          src="/images/jeux.png"
                          alt="jeux de role "
                          className="w-44 object-contain"
                          />
                      </div>
                    </div>
                  </div> 
                
                </div>
            </div>

            <div className="hidden lg:block lg:col-span-1"></div>
          </div>
        </div>
      </main>
    </div>
  );
}