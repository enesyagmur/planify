import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { FaDoorClosed } from "react-icons/fa";

const Logout = () => {
  const router = useRouter();

  const userExit = () => {
    signOut(auth)
      .then(() => {
        router.push("/");
        console.log("Çıkış yapıldı.");
      })
      .catch((err) => {
        console.log("Çıkış işleminde hata: ", err);
      });
  };
  return (
    <button onClick={userExit} className="text-dangerRed" title="Çıkış">
      <FaDoorClosed />
    </button>
  );
};

export default Logout;
