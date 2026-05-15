import React, { useState } from 'react'
//
function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen ]= useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#222222] shadow-sm">

        {/* les 3 bandes Allemagne */}
        <div className="w-full">
        <div className="h-[6px] bg-black"></div>
        <div className="h-[6px] bg-red-600"></div>
        <div className="h-[6px] bg-[#FFC107]"></div>
        </div>
      
      
      
      <div className="app-container flex justify-between items-center h-16">
        {/* logo */}
         <div className="flex items-center gap-3">
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

        <div className="hidden md:flex items-center space-x-6">
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
          className="text-sm font-extrabold 
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
       
        className='md:hidden p-2 rounded-md text-grey-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
</svg>
        </button>
      </div>


    {/*menu de telephone */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-2">
          <a href="#" className="block nav-btn text-center">Se connecter</a>
          <a href="#" className="block nav-btn text-center">Commencer</a>
        </div>
      )}
    </nav>
  )
}

export default Navbar 