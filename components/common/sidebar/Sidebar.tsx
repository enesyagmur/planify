"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    pathname === path
      ? "block px-4 py-2 bg-gray-700 text-white font-bold"
      : "block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <nav className="p-4 space-y-2">
      <Link href="/tasks" className={linkClass("/tasks")}>
        Görevler
      </Link>
      <Link href="/create" className={linkClass("/create")}>
        Oluştur
      </Link>
      <Link href="/dashboard" className={linkClass("/dashboard")}>
        Performans
      </Link>
      <Link href="/calender" className={linkClass("/calendar")}>
        Takvim
      </Link>
    </nav>
  );
}
