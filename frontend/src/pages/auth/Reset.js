import React from "react";
import styles from "./auth.module.scss";
import { MdPassword } from "react-icons/md";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";

const Reset = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword size={35} color="#999" />
          </div>

          <h2>Reset Password</h2>
          <form>
            <input
              type="text"
              placeholder="New Password"
              required
              name="password"
            />
            <input
              type="text"
              placeholder="Confirm New Password"
              required
              name="password"
            />
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
