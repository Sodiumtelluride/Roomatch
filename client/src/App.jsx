import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/navbar.jsx'
import Card from './components/card/Card.jsx'
import LowTaperFade from './components/LowTaperFade/LowTaperFade.jsx'
import CardGrid from './components/cardGrid/CardGrid.jsx'
import CardExpanded from './components/cardExpanded/cardExpanded.jsx'
import PFP from './assets/UserPhoto.png'
import UserProfile from './components/userProfile/userProfile.jsx'
function App() {
  return (
    <>
      
    <Navbar/>
    {/* <UserProfile
      email="gelfandnat@gmail.com"
      password="*******"
      displayName="Nate Gelfand"
      pronouns="He/Him/His"
      origin="In-State"
      description="Hi im Nate! Im a freshman studying CS I love to play league for 10 hours a day."
      major="Computer Science"
      class="2025"
      extraversionValue="none"
      cleanlinessValue="average"
      usingMyStuffValue="not-allowed"
      startTimeValue="nine-PM"
      endTimeValue="one-AM"
    /> */}
    <CardGrid/>
    <LowTaperFade/> 
    </>
  )
}

export default App
