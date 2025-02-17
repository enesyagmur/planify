import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { RiLogoutCircleRFill } from "react-icons/ri";

const Logout = () => {
  const router = useRouter();

  const userExit = () => {
    signOut(auth)
      .then(() => {
        router.push("/auth");
        console.log("Çıkış yapıldı.");
      })
      .catch((err) => {
        console.log("Çıkış işleminde hata: ", err);
      });
  };
  return (
    <button onClick={userExit}>
      <RiLogoutCircleRFill />
    </button>
  );
};

export default Logout;
