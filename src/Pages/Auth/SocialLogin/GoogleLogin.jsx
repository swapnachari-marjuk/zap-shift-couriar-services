import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";

const GoogleLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };

        axios.post("http://localhost:3000/users", userInfo).then((res) => {
          navigate(location?.state || "/");
          if (res.data.insertedId) {
            console.log("User info saved in DB successfully.");
          }
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="text-center">
      <button className="btn btn-ghost" onClick={handleGoogleSignIn}>
        <img
          width="18"
          height="18"
          src="https://img.icons8.com/fluency/48/google-logo.png"
          alt="google-logo"
        />{" "}
        Continue With Google
      </button>
    </div>
  );
};

export default GoogleLogin;
