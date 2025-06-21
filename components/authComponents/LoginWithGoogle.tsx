"use client";

import { auth, db } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";

const LoginWithGoogle = () => {
  const router = useRouter();

  const loginFunc = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        const userRef = doc(db, "users", user.uid); // kullanıcının adresi
        const userSnap = await getDoc(userRef); // kullanıcıyı db den çekme

        if (userSnap.exists() === false) {
          // kullanıcı varsa true yoksa false
          await setDoc(userRef, {
            uid: user.uid,
            name: user.displayName,
            email: user.email,
            tasks: {},
            createdAt: new Date(),
          });
        }
        router.push("/tasks");
      }
    } catch (err) {
      console.log("Google ile girişte hata: ", err);
    }
  };

  return (
    <button
      type="button"
      onClick={loginFunc}
      className="w-full py-3 px-6 rounded-xl font-medium flex items-center justify-center space-x-3 transition-all duration-300 hover:bg-thirdBackground border border-thirdBackground"
    >
      <FcGoogle className="w-6 h-6" />
      <span className="text-mainTextColor">Google ile giriş yap</span>
    </button>
  );
};

export default LoginWithGoogle;
