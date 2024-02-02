

import { Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage"
import MapView from "./components/Map"
import SignUp from "./components/auth/SignUp"


function App() {
  

  return (
    <>
   <Routes>

    <Route path="/" element={<HomePage />}> </Route>
    <Route path="/mapviewer" element={<MapView />}> </Route>
    <Route path="/signup" element={<SignUp />}> </Route>
   </Routes>
    
    </>
  )
}

export default App
