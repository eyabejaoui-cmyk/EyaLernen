import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import AiTypes from '../components/AiTypes'
import AiBenefits from '../components/AiBenefits'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AiTypes />
        <AiBenefits />
        <Contact />
        <Link to="/ness">l Sandi</Link>
        <Link to="/chatbot">Ouvrir Chatbot</Link>
      </main>
      <Footer />
    </>
  )
}

export default Home
