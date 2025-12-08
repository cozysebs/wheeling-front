// import './App.css'

import { Navigate, Route, Routes } from "react-router-dom"
import Playing from "./dashboard/Playing"
import SignInSide from "./sign-in-side/SignInSide"
import SignUp from "./sign-up/SignUp"
import NotFound from "./guard/errorpage/NotFound"
import UnAuthorized from "./guard/errorpage/UnAuthorized"
import Profile from "./profile/Profile"

function App() {

  return (
    <>
      <Routes>
        {/* 기본 진입은 첫 번째 게임으로 리다이렉트 */}
        <Route path="/" element={ <Navigate to="/playing/2048" replace/> }/>
        <Route path="/playing/:gameId" element={<Playing/>}/>
        <Route path="/signinside" element={<SignInSide/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/profile" element={<Profile/>}/>

        {/* 에러 페이지 */}
        <Route path='/404' element={<NotFound/>}></Route>
        <Route path='/401' element={<UnAuthorized/>}></Route>
        <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </>
  )
}

export default App
