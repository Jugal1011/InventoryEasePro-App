import React, { useState } from "react";
import styles from "./auth.module.scss";
import { AiOutlineMail } from "react-icons/ai";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { forgetPassword, validateEmail } from "../../services/authService";
import { toast } from "react-toastify";

const Forget = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const forgot = async (e) => {
    e.preventDefault();

    if (!email) {
      return toast.error("All fields are required");
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    const userData={
      email
    }
    setIsLoading(true);
    try {
      const data = await forgetPassword(userData);
      setEmail("");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className={`container ${styles.auth}`}>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <AiOutlineMail size={35} color="#999" />
          </div>

          <h2>Forgot Password</h2>
          <form onSubmit={forgot}>
            <input type="text" placeholder="Email" required name="email" value={email} onChange={(e)=>{
              setEmail(e.target.value);
            }}/>
            <button type="submit" className="--btn --btn-primary --btn-block">
              Get Reset Link
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

export default Forget;
