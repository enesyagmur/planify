"use client";

import Main from "@/components/homeComponents/main/Main";
import Panel from "@/components/homeComponents/panel/Panel";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/");
      } else {
        setLoading(false);
      }
    });

    return () => unSubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="w-full flex min-h-screen items-center justify-center p-2 md:p-8 ">
        loading...
      </div>
    );
  }

  return (
    <div className="w-full flex min-h-screen items-center justify-center p-2 md:p-8 ">
      <div className="w-full h-[700px] sm:h-[670px] flex items-start justify-start border-[1px] border-thirdBackground rounded-xl">
        <Panel />
        <Main />
      </div>
    </div>
  );
}
