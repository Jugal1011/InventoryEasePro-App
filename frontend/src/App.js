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
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoggedInStatus } from "./services/authService";
import { SET_LOGIN } from "./redux/features/authSlice";
import AddProduct from "./pages/addProduct/AddProduct";
import ProductDetail from "./components/product/productDetail/ProductDetail";
import EditProduct from "./pages/editProduct/EditProduct";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import Contact from "./pages/contact/Contact";

axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    async function loginStatus(){
      const status = await getLoggedInStatus();
      dispatch(SET_LOGIN(status));
    }
    loginStatus();
  },[dispatch]);

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
        <Route path="/app/add-product" element={
          <Sidebar>
            <Layout>
              <AddProduct/>
            </Layout>
          </Sidebar>
        }></Route>
        <Route path="/app/product-detail/:id" element={
          <Sidebar>
            <Layout>
              <ProductDetail/>
            </Layout>
          </Sidebar>
        }></Route>
        <Route path="/app/edit-product/:id" element={
          <Sidebar>
            <Layout>
              <EditProduct/>
            </Layout>
          </Sidebar>
        }></Route>
        <Route path="/app/account/profile" element={
          <Sidebar>
            <Layout>
              <Profile/>
            </Layout>
          </Sidebar>
        }></Route>
        <Route path="/app/account/edit-profile" element={
          <Sidebar>
            <Layout>
              <EditProfile/>
            </Layout>
          </Sidebar>
        }></Route>
        <Route path="/app/contact-us" element={
          <Sidebar>
            <Layout>
              <Contact/>
            </Layout>
          </Sidebar>
        }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
