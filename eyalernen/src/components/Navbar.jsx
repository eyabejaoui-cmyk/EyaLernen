import React, { useState } from 'react'
//
function Navbar() {

  const [mobileMenuOpen, setMobileMenuOpen ]= useState(false);
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full z-50">
      <div className="app-container flex justify-between items-center h-16">
        {/* logo */}
        <span className="gradient-text text-2xl font-bold">EyaLernen</span>

        <div className="hidden md:flex items-center space-x-8">
          <a href='#' className='nav-btn'>Se connecter</a>
          <a href='#' className='nav-btn'>Commencer</a>
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