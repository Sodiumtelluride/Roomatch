import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/navbar.jsx'
import Card from './components/card/Card.jsx'
import LowTaperFade from './components/LowTaperFade/LowTaperFade.jsx'
import CardGrid from './components/cardGrid/CardGrid.jsx'
import CardExpanded from './components/cardExpanded/cardExpanded.jsx'
import PFP from './assets/UserPhoto.png'



{/* <CardExpanded
      img = {PFP}
      name = "Nate Gelfand"
      pronouns = "He/Him/His"
      description = "Hi im Nate! Im a freshman studying CS I love to play league for 10 hours a day. I enjoy Jorkin  it and eating watermelons"
      major = "Computer Science"
      class = "2025"
      extraversionFill = "3"
      cleanlinessFill = "2"
      sleepSchedule = "9:00 PM - 1:00 AM"
      usingMyStuff = "Just Ask"
      /> */}
function App() {
  return (
    <>
      <Navbar/>
      <CardGrid/>
      <LowTaperFade/> 
      
    </>
  )
}

export default App
