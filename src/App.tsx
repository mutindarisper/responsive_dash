

import { Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage"
import MapView from "./components/Map"


function App() {
  

  return (
    <>
   <Routes>

    <Route path="/" element={<HomePage />}> </Route>
    <Route path="/mapviewer" element={<MapView />}> </Route>
   </Routes>
    
    </>
  )
}

export default App
