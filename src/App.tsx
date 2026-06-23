import { BrowserRouter, Route, Routes} from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { Landing } from "./pages/Landing"
import { SignUp } from "./pages/SignUp"
import { Login } from "./pages/Login"
import './App.css'
import { AppLayout } from "./components/AppLayout"
import { AuthProvider } from "./context/Authcontext"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { ForgotPassword } from "./pages/ForgotPassword"
import { ResetPassword } from "./pages/ResetPassword"

function App() {
  return (
    <>
    <BrowserRouter>
    <AuthProvider>
      <Toaster />
        <Routes>
          <Route path="/" element={<Landing/>}></Route>
          <Route path="/Signup" element={<SignUp/>}></Route>
          <Route path="/Login" element={<Login/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/*" element={
            <ProtectedRoute>
            <AppLayout/>
            </ProtectedRoute>
            }></Route>
        </Routes>
    </AuthProvider>
    </BrowserRouter>
    </>
  )
}

export default App