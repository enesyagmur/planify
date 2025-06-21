"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import Sidebar from "@/components/common/sidebar/Sidebar";
import Header from "@/components/common/header/Header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-mainBackground">
        <div className="text-mainTextColor text-lg p-6 bg-secondBackground rounded-xl shadow-lg">
          Yükleniyor...
        </div>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-mainBackground text-mainTextColor">
      {/* Sidebar alanı */}
      <div className="transition-all duration-300">
        <Sidebar />
      </div>

      {/* İçerik alanı */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto bg-thirdBackground">
          {children}
        </main>
      </div>
    </div>
  );
}
