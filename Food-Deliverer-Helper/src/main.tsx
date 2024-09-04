import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

//Initialize localStorage
if(!localStorage.getItem("activeDays")){

  localStorage.setItem("activeDays",JSON.stringify([]))
  
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
