import React, { useState } from "react";
import styles from "./auth.module.scss";
import { MdPassword } from "react-icons/md";
import Card from "../../components/card/Card";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../../services/authService";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const initialState = {
  password: "",
  confirmPassword: ""
};

const Reset = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setformData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const { password, confirmPassword } = formData;
  const {resetToken} = useParams();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const reset = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      return toast.error("Passwords must be up to 6 characters");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      password,
      confirmPassword
    };
    setIsLoading(true);
    try {
      const data = await resetPassword(userData,resetToken);
      toast.success(data.message);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = (str) => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const toggleShowPasswordConfirm = (str) => {
    setShowPasswordConfirm((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>

          <h2>Reset Password</h2>
          <form onSubmit={reset}>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
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
                {showPassword ? <FaRegEye size={15}/> : <FaRegEyeSlash size={15}/>}
              </button>
            </div>
            <div style={{ position: "relative" }}>
              <input
                type={showPasswordConfirm ? "text" : "password"}
                placeholder="Confirm New Password"
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={toggleShowPasswordConfirm}
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
                {showPasswordConfirm ? <FaRegEye size={15}/> : <FaRegEyeSlash size={15}/>}
              </button>
            </div>
            <button type="submit" className="--btn --btn-primary --btn-block">
              Reset Password
            </button>
          </form>

          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p>&nbsp; Already have account ? &nbsp;</p>
            <Link to="/app/login-user">Login</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Reset;
