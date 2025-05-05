"use client";

import Main from "@/components/homeComponents/main/Main";
import Panel from "@/components/homeComponents/panel/Panel";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/");
      }
    });

    return () => unSubscribe();
  }, [router]);

  return (
    <div className="w-full flex min-h-screen items-center justify-center p-8 ">
      <div className="w-full lg:h-[650px] flex items-start justify-start border-[1px] border-thirdBackground rounded-xl">
        <Panel />
        <Main />
      </div>
    </div>
  );
}
