import React from "react";
import { login, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
const LoginButton = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const handleLogin = async () => {
    await login();
    navigate("/");
  };
  return (
    !user && (
      <button onClick={handleLogin} className="button_login">
        <span>Войти</span> <img src="./img/login.svg" alt="" />
      </button>
    )
  );
};

export default LoginButton;
