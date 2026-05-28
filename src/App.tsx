import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import { Landing } from "./pages/Landing"
import { SignUp } from "./pages/SignUp"
import { Login } from "./pages/Login"
import './App.css'
import { AppLayout } from "./components/AppLayout"

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}></Route>
        <Route path="/Signup" element={<SignUp/>}></Route>
        <Route path="/Login" element={<Login/>}></Route>
        <Route path="/*" element={<AppLayout/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App

