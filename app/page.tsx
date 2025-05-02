"use client";

import ChangeComponent from "@/components/homeComponents/ChangeComponent";
import Dashboard from "@/components/homeComponents/dashboard/Dashboard";
import Header from "@/components/homeComponents/Header";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Tasks from "@/components/homeComponents/tasks/Tasks";
import Edit from "@/components/homeComponents/edit/New";
import Calender from "@/components/homeComponents/calender/Calender";

export default function Home() {
  const router = useRouter();
  const [count, setCount] = useState<number>(0);
  const componentArray: React.ComponentType[] = [
    Tasks,
    Edit,
    Dashboard,
    Calender,
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
      <div className="w-full min-h-[670px] flex flex-col border-t-[1px] border-neutral-600 rounded-md items-center justify-between p-4 mr-1">
        <ChangeComponent count={count} setCount={setCount} />
        {React.createElement(componentArray[count])}
      </div>
    </div>
  );
}
