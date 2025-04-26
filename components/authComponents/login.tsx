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
    <div className="w-[400px] md:w-[500px] bg-secondBackground h-[650px] rounded-lg shadow-sm shadow-borderLine">
      <button onClick={loginFunc}>Google</button>
    </div>
  );
};

export default Login;
