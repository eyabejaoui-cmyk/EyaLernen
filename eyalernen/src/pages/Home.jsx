import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import AiTypes from '../components/AiTypes'
import AiBenefits from '../components/AiBenefits'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { Link } from "react-router-dom";
import Subscription from "../pages/Subscription"


function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AiTypes />
        <Subscription />
        <AiBenefits />
        <Contact />
        <Link to="/ness">l Sandi</Link>
        <Link to="/chatbot">Ouvrir Chatbot</Link>
        
        
        <Link to="/Admin">ya lahwi</Link>
        
        <Link to="/ProfesseurSpace">wohhh</Link>
      </main>
      <Footer />
    </>
  )
}

export default Home
