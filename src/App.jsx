// import './App.css'

import { Route, Routes } from "react-router-dom"
import Dashboard from "./dashboard/Playing"
import Playing from "./dashboard/Playing"
import SignInSide from "./sign-in-side/SignInSide"
import SignUp from "./sign-up/SignUp"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Playing/>}/>
        <Route path="/playing" element={<Playing/>}/>
        <Route path="/signinside" element={<SignInSide/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </>
  )
}

export default App
