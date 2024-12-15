import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/navbar.jsx'
import Card from './components/card/Card.jsx'
import PFP from './assets/UserPhoto.png'

function App() {
  return (
    <>
      <Navbar/>
      <Card
      img = {PFP}
      name = "Nate Gelfand"
      pronouns = "He/Him/His"
      description = "Hi im Nate! Im a freshman studying CS I love to play league for 10 hours a day. I enjoy Jorkin  it and eating watermelons"
      major = "Computer Science"
      class = "2025"
      />
    </>
  )
}

export default App
