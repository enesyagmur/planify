"use client";

import Calender from "@/components/homeComponents/calender";
import ChangeComponent from "@/components/homeComponents/changeComponent";
import CreateDailyPlan from "@/components/homeComponents/createDailyPlan";
import CurrentDailyPlan from "@/components/homeComponents/currentDailyPlan";
import Dashboard from "@/components/homeComponents/dashboard";
import Header from "@/components/homeComponents/header";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [count, setCount] = useState<number>(0);
  const componentArray: React.ComponentType[] = [
    CurrentDailyPlan,
    CreateDailyPlan,
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
      <div className="w-full flex flex-col border-[1px] rounded-md items-center justify-center p-4">
        <ChangeComponent count={count} setCount={setCount} />
        <>{componentArray[count]}</>
      </div>
    </div>
  );
}
