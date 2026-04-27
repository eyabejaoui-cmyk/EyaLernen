import React, { useState } from 'react'
//
function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen ]= useState(false);
  return (
    <nav className=" border-r border-gray-200 backdrop-blur-md shadow-sm fixed w-full z-50 py-2">
      <div className="app-container flex justify-between items-center h-16">
        {/* logo */}
         <div>
           <div className="flex items-center gap-3  px-6 py-3 rounded-2xl">
            <div className="w-12 h-12 bg-gradient-to-br from-[#F5A623] to-[#E09010]
                 rounded-[14px] flex items-center justify-center text-2xl
                 shadow-[0_4px_16px_rgba(245,166,35,0.4)]" >
                  🦉
            </div>
                   {/* */}
            <span className=" text-3xl font-black tracking-tight">
            <span className="text-gray-900">Eya</span>
            <span className="text-gray-900">Lernen</span>
             </span>
           </div>
          </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="/login" className="text-sm font-extrabold px-5 py-2.5 rounded-xl border
               border-[#667085] text-[#3A2600] bg-transparent
               hover:border-white/5 hover:bg-[#E09010] transition">Se connecter</a>
          <a href="/inscription" className="text-sm font-extrabold px-5 py-2.5 rounded-xl
               bg-[#F5A623] text-[#3A2600]
               shadow-[0_4px_14px_rgba(245,166,35,0.35)]
               hover:bg-[#E09010] transition">Commencer</a>
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