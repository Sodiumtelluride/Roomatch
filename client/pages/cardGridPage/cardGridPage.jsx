import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./cardGridPage.css"
import CardGrid from "../../src/components/cardGrid/CardGrid.jsx";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CardGrid />
  </StrictMode>,
)
