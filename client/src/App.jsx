import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/Navbar.jsx'
import Card from './components/card/Card.jsx'
import LowTaperFade from './components/LowTaperFade/LowTaperFade.jsx'
import CardGrid from './components/cardGrid/CardGrid.jsx'
import CardExpanded from './components/cardExpanded/cardExpanded.jsx'
import PFP from './assets/UserPhoto.png'
import UserProfile from './components/userProfile/UserProfile.jsx'
import LandingPage from './components/landingPage/landingPage.jsx'
import NavbarLandingPage from './components/navbarLandingPage/NavbarLandingPage.jsx'
function App() {
  return (
    <>
    <Navbar/>
    {/* <NavbarLandingPage/> */}
    {/* <LandingPage/> */}
    <CardGrid/>
    <LowTaperFade/> 
    </>
  )
}

export default App
