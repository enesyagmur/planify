"use client";

import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";

const Login = () => {
  const router = useRouter();

  const loginFunc = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        if (result) {
          router.push("/");
          console.log("Google ile giriş yapıldı.");
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
