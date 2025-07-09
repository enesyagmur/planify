"use client";

import React, { useState } from "react";
import { Bolt } from "lucide-react";
import {
  ListTodo,
  BarChart2,
  Calendar,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Görevler", icon: <ListTodo />, href: "/tasks" },
  { label: "Kategoriler", icon: <Bolt />, href: "/category" },
  { label: "Dashboard", icon: <BarChart2 />, href: "/dashboard" },
  { label: "Takvim", icon: <Calendar />, href: "/calendar" },
  { label: "Ayarlar", icon: <Settings />, href: "/settings" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCollapsed(true);
      else setCollapsed(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={`
        h-screen bg-neutral-900 shadow-md flex flex-col justify-between
        transition-all duration-300
        ${collapsed ? "w-16" : "w-64"}
        fixed md:static z-20
      `}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 h-16 px-4 border-b border-gray-800">
        <LayoutDashboard className="w-7 h-7 text-purple-500" />
        {!collapsed && (
          <span className="text-xl font-bold text-purple-500 transition-all">
            Planify
          </span>
        )}
      </div>

      {/* Navigation ve Çıkış */}
      <div className="flex-1 flex flex-col mt-4">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-2 mx-2 rounded-lg
                  transition font-medium
                  ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : "text-gray-200 hover:bg-purple-500/20 hover:text-white"
                  }
                `}
              >
                <span
                  className={`w-6 h-6 ${
                    isActive ? "text-white" : "text-purple-400"
                  }`}
                >
                  {item.icon}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Çıkış Butonu */}
        <Link
          href="/auth"
          className={`
            flex items-center gap-3 px-4 py-2 mx-2 mt-4 rounded-lg
            text-purple-400 hover:bg-purple-500/30 hover:text-purple-300
            transition font-medium
          `}
        >
          <span className="w-6 h-6">
            <LogOut />
          </span>
          {!collapsed && <span className="text-white">Çıkış</span>}
        </Link>
      </div>

      {/* Sidebar'ı Daraltma Butonu */}
      <button
        onClick={() => setCollapsed((prev) => !prev)}
        className="flex items-center justify-center w-full h-12 border-t border-gray-800 hover:bg-purple-500/10 transition"
        aria-label="Sidebar'ı daralt"
      >
        {collapsed ? (
          <ChevronRight className="w-6 h-6 text-purple-400" />
        ) : (
          <ChevronLeft className="w-6 h-6 text-purple-400" />
        )}
      </button>
    </aside>
  );
};

export default Sidebar;
