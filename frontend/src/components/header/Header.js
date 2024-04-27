import React from "react";
import { SET_LOGIN, selectName } from "../../redux/features/authSlice";
import { logoutUser } from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useSelector(selectName);

  const logout = async (e) => {
    e.preventDefault();
    await logoutUser();
    await dispatch(SET_LOGIN(false));
    navigate("/app/login-user");
  };

  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome,</span>
          <span style={{ color: "#0a1930", paddingLeft: "10px" }}>{name}</span>
        </h3>
        <button
          onClick={logout}
          style={{ backgroundColor: "#0a1930", color: "#ffffff" }}
          className="--btn"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
