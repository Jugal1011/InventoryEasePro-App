import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { confirmEmail } from "../../services/authService";
import Loader from "../../components/loader/Loader";
import { useParams } from "react-router-dom";

const ConfirmEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { confirmEmailToken } = useParams();

  useEffect(() => {
    async function onConfirmEmail() {
      setIsLoading(true);
      try {
        const res = await confirmEmail(confirmEmailToken);
        setIsLoading(false);
        toast.success(res.data);
      } catch (error) {
        setIsLoading(false);
      }
    }

    onConfirmEmail();
  }, [confirmEmailToken]);

//   const onConfirmEmail = async () => {
//     setIsLoading(true);
//     try {
//       const data = await confirmEmail(confirmEmailToken);
//       setIsLoading(false);
//       toast.success(data.message);
//     } catch (error) {
//       setIsLoading(false);
//     }
//   };

  return <div>{isLoading && <Loader />}</div>;
};

export default ConfirmEmail;
