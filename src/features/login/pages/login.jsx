import { useEffect } from "react";
import { FormLogin } from "../components/form-login";

export const Login = () => {
  useEffect(() => {
    localStorage.removeItem("isRegistered");
    localStorage.removeItem("user");
    localStorage.removeItem("diasRacha");
    localStorage.removeItem("lastNotificationDate");
    localStorage.removeItem("book");
  }, []);
  return <FormLogin />;
};
