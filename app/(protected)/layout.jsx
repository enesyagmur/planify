"use client";

import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";

export default function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className=" flex-1 flex flex-col items-center justify-start ml-16 md:ml-0 transition-all">
        <Header />
        <div className="w-full bg-black p-4">{children}</div>
      </main>
    </div>
  );
}
