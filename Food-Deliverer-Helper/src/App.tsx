import './App.css'
import NewEntry from './NewEntry.tsx'
import OrderHistory from './OrderHistory.tsx'
import ProfitCard from './ProfitCard.tsx'
import GasPrices from './GasPrices.tsx'
import OrderVolumeCard from './OrderVolumeCard.tsx'
import NavBar from './NavBar.tsx'

import { useState } from 'react'
function App() {
  const [page, setPage] = useState("newEntry");
  
  switch(page){
    case "newEntry":
      return(
        <>
          <NavBar pageSetter = {setPage}/>
          <NewEntry/>
        </>
      )

    case "orderHistory":
      return(
        <>
          <NavBar pageSetter = {setPage}/>
          <OrderHistory/>
        </>
      )
    
    case "profitCard":
      return(
        <>
          <NavBar pageSetter = {setPage}/>
          <ProfitCard/>
        </>
      )
    
    case "orderVolume":
      return(
        <>
          <NavBar pageSetter = {setPage}/>
          <OrderVolumeCard/>
        </>
      )

  }
}

export default App
