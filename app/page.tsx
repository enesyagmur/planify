"use client";

import ChangeComponent from "@/components/homeComponents/ChangeComponent";
import Dashboard from "@/components/homeComponents/dashboard/Dashboard";
import Header from "@/components/homeComponents/Header";
import History from "@/components/homeComponents/history/History";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Daily from "@/components/homeComponents/daily/Daily";
import New from "@/components/homeComponents/new/New";

export default function Home() {
  const router = useRouter();
  const [count, setCount] = useState<number>(0);
  const componentArray: React.ComponentType[] = [
    Daily,
    New,
    Dashboard,
    History,
  ];

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/auth");
      }
    });

    return () => unSubscribe();
  }, [router]);

  return (
    <div className="w-full flex flex-col">
      <Header />
      <div className="w-full min-h-[670px] flex flex-col border-[1px] border-neutral-600 rounded-md items-center justify-between p-4">
        <ChangeComponent count={count} setCount={setCount} />
        {React.createElement(componentArray[count])}
      </div>
    </div>
  );
}
