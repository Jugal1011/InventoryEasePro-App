import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forget from "./pages/auth/Forget";
import Reset from "./pages/auth/Reset";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/app/login-user" element={<Login/>}></Route>
        <Route path="/app/register-user" element={<Register/>}></Route>
        <Route path="/app/forget-password" element={<Forget/>}></Route>
        <Route path="/app/reset-password/:resetToken" element={<Reset/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
