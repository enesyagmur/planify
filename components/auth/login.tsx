"use client";

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";

const Login = () => {
  const loginFunc = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        if (result) {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.log("Google ile girişte hata: ", err);
      });
  };

  return (
    <div className="">
      <button onClick={loginFunc}>Google</button>
    </div>
  );
};

export default Login;
