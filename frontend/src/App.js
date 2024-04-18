import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Forget from "./pages/auth/Forget";
import Reset from "./pages/auth/Reset";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import Layout from "./components/layout/Layout";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/app/login-user" element={<Login/>}></Route>
        <Route path="/app/register-user" element={<Register/>}></Route>
        <Route path="/app/forget-password" element={<Forget/>}></Route>
        <Route path="/app/reset-password/:resetToken" element={<Reset/>}></Route>
        <Route path="/app/dashboard" element={
          <Sidebar>
            <Layout>
              <Dashboard/>
            </Layout>
          </Sidebar>
        }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
