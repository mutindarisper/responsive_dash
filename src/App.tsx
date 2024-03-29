

import { Routes, Route } from "react-router-dom"
import HomePage from "./components/HomePage"
import MapView from "./components/Map"
import SignUp from "./components/auth/SignUp"
import Mode from "./components/Mode"
import { Provider } from 'react-redux'
import store from './store/store.js'


function App() {
  

  return (
    <>
    <Provider store={store}>

   
   <Routes>

    <Route path="/" element={<HomePage />}> </Route>
    <Route path="/mapviewer" element={<MapView />}> </Route>
    <Route path="/signup" element={<SignUp />}> </Route>
    <Route path="/mode" element={<Mode />}> </Route>
   </Routes>
   </Provider>
    
    </>
  )
}

export default App
