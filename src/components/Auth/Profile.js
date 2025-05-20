import React from "react";
import "./styles.scss";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
function Profile() {
  const [user] = useAuthState(auth);
  return (
    user && (
      <div className="profile">
        <img src={user.photoURL} alt="" />
        <span>{user.displayName}</span>
      </div>
    )
  );
}

export default Profile;
