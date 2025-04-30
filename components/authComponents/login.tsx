"use client";

import { auth, db } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React from "react";

const Login = () => {
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
          console.log("Yeni kullanıcı kaydedildi.");
        }
        router.push("/");
        console.log("Google ile giriş yapıldı.");
      }
    } catch (err) {
      console.log("Google ile girişte hata: ", err);
    }
  };

  return (
    <div className="w-[400px] md:w-[500px] bg-secondBackground h-[650px] rounded-lg shadow-sm shadow-borderLine">
      <button onClick={loginFunc}>Google</button>
    </div>
  );
};

export default Login;
