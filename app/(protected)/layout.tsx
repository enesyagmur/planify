"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase"; // kendi firebase config dosyana göre
import Sidebar from "@/components/common/sidebar/Sidebar";
import Header from "@/components/common/header/Header";
// senin component yollarına göre güncelle

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
    return <div className="text-white text-lg p-6">Yükleniyor...</div>;

  return (
    <div className="w-11/12 mx-auto flex min-h-screen bg-mainBackground text-mainTextColor">
      {/* Sidebar */}
      <aside className="w-64 hidden md:block bg-gray-900 text-white">
        <Sidebar />
      </aside>

      {/* Ana içerik alanı */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-gray-800 text-white shadow">
          <Header />
        </header>

        {/* Sayfa içeriği */}
        <main className="flex-1 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
