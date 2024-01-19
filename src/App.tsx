

import { Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage"
import MapViewer from "./components/MapViewer"


function App() {
  

  return (
    <>
   <Routes>

    <Route path="/" element={<HomePage />}> </Route>
    <Route path="/mapviewer" element={<MapViewer />}> </Route>
   </Routes>
    
    </>
  )
}

export default App
