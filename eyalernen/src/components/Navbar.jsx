import React, { useState } from 'react'
//
function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen ]= useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#222222] shadow-sm">

        {/*3 bandes */}
        <div className="w-full">
        <div className="h-[6px] bg-black"></div>
        <div className="h-[6px] bg-red-600"></div>
        <div className="h-[6px] bg-[#FFC107]"></div>
        </div>
      
      
      
      <div className="app-container flex justify-between items-center h-16">
        {/* logo */}
         <div className="flex items-center gap-3">
            {/* W centre verticale et horizontale */}
          {/*ombre orange autour du carré */}
          {/* le dégradé va vers le bas à droite */}
          <div
        
            className="
              w-11 h-11
              
              bg-gradient-to-br from-[#F5A623] to-[#E09010] 
              rounded-2xl
              flex items-center justify-center 
              text-2xl
              shadow-[0_4px_16px_rgba(245,166,35,0.35)] 
            "
          >
          🦉
          </div>

          <div className="flex items-center">
            <span className="text-3xl font-black text-[#FFC107]">Eya</span>
            <span className="text-3xl font-black text-white">Lernen</span>
          </div>
          </div>

        <div className="hidden md:flex items-center space-x-6"> {/* md : responsive quand le user ouvre avec télephone il utilise flex*/}
          {/*sm = écriture petite / font-extrabold = texte très gras */}
           <a
            href="/login"
            className="
            text-sm font-extrabold 
            px-6 py-3
            rounded-2xl
            border border-[#667085]
          text-white
            bg-transparent
          hover:border-[#FFC107]
          hover:text-[#FFC107]
            transition
           "
           >Se connecter</a>
          <a href="/inscription" 
          
          className="text-sm font-extrabold {/* texte très gras */}
          px-6 py-3 
          rounded-2xl
          bg-[#FFC107]
          text-black
          shadow-[0_4px_14px_rgba(245,166,35,0.35)]
        hover:bg-[#E09010]
          transition
         "
         >            
          Commencer</a>
        </div>

        {/*telephone*/}
        <button 
        onClick={() => setMobileMenuOpen ((saker) => !saker )}
       
        className="md:hidden p-2 rounded-xl text-white hover:text-[#FFC107] hover:bg-[#333333] focus:outline-none transition">
          <svg xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="size-6">
          <path strokeLinecap="round"
           strokeLinejoin="round" 
           d="M3.75 9h16.5m-16.5 6.75h16.5" />
        </svg>
        </button>
      </div>


    {/*menu de telephone */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#222222] border-t border-[#444444] px-4 py-4 space-y-3">
          <a href="/login" className="block text-center 
          text-sm font-extrabold 
          px-6 py-3 rounded-2xl border
           border-[#667085] text-white 
           hover:border-[#FFC107]
            hover:text-[#FFC107] 
            transition">Se connecter</a>

          <a href="/inscription" className="block 
          text-center text-sm 
          font-extrabold px-6 py-3 
          rounded-2xl
           bg-[#FFC107]
            text-black 
            hover:bg-[#E09010] transition">Commencer</a>
        </div>
      )}
    </nav>
  )
}

export default Navbar 