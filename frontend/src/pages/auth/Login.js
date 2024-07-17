import React, { useState } from "react";
import styles from "./auth.module.scss";
import { BiLogIn } from "react-icons/bi";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser, validateEmail } from "../../services/authService";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { SET_LOGIN, SET_NAME } from "../../redux/features/authSlice";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const initialState = {
  email: "",
  password: ""
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const { email, password } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required");
    }
    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData = {
      email,
      password,
    };
    setIsLoading(true);
    try {
      const data = await loginUser(userData);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/app/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <BiLogIn size={35} color="#999" />
          </div>

          <h2>Login</h2>
          <form onSubmit={login}>
            <input
              type="text"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                name="password"
                value={password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  height: "100%",
                  cursor: "pointer",
                  background: "none",
                  border: "none",
                  marginRight: "10px"
                }}
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash /> }
              </button>
            </div>
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
          </form>

          <div className={styles.forget}>
            <Link to="/app/forget-password">Forget Password</Link>
          </div>

          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p>&nbsp; Don't have an account ? &nbsp;</p>
            <Link to="/app/register-user">Register</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
