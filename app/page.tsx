"use client";

import Login from "@/components/authComponents/login";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Landing() {
  const router = useRouter();

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/home");
      }
    });

    return () => unSubscribe();
  }, [router]);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Login />
    </div>
  );
}
