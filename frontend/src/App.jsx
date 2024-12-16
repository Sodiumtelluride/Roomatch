import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar/navbar.jsx'
import Card from './components/card/Card.jsx'
import LowTaperFade from './components/LowTaperFade/LowTaperFade.jsx'
import CardGrid from './components/cardGrid/CardGrid.jsx'

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
