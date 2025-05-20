import { logout, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import React from "react";

const LogoutButton = () => {
  const [user] = useAuthState(auth);
  return (
    user && (
      <button onClick={logout} className="button_logout">
        <span>Выйти</span> <img src="./img/logout.svg" alt="" />
      </button>
    )
  );
};

export default LogoutButton;
