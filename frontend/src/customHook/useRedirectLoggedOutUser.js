import React, { useEffect } from "react";
import { getLoggedInStatus } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SET_LOGIN } from "../redux/features/authSlice";
import { toast } from "react-toastify";

const useRedirectLoggedOutUser = (path) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const redirectLoggedOutUser = async () => {
      const status = await getLoggedInStatus();
      dispatch(SET_LOGIN(status));

      if(!status){
        toast.info("Session expired, please login to continue");
        navigate(path);
      }
    };

    redirectLoggedOutUser();
  }, []);
};

export default useRedirectLoggedOutUser;
