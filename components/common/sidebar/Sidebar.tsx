"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  FiMenu,
  FiX,
  FiHome,
  FiCheckSquare,
  FiBarChart2,
  FiCalendar,
  FiUser,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { auth } from "@/lib/firebase";
import Logout from "@/components/authComponents/Logout";

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const user = auth.currentUser;

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  const linkClass = (path: string) =>
    pathname === path
      ? `flex items-center ${
          isCollapsed ? "justify-center" : ""
        } px-4 py-3 rounded-lg bg-themeColor/20 text-themeColor font-medium`
      : `flex items-center ${
          isCollapsed ? "justify-center" : ""
        } px-4 py-3 rounded-lg text-secondTextColor hover:bg-thirdBackground hover:text-mainTextColor transition-colors`;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed bottom-4 right-4 z-50 p-3 rounded-full bg-themeColor text-white shadow-lg"
      >
        {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative z-40 h-screen transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-20" : "w-64"}
          ${isMobileOpen ? "left-0" : "-left-full md:left-0"}
          bg-secondBackground border-r border-thirdBackground
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo & Collapse Button */}
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "justify-between"
            } p-4 border-b border-thirdBackground`}
          >
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-themeColor">Planify</h1>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-thirdBackground text-secondTextColor hover:text-mainTextColor"
            >
              {isCollapsed ? (
                <FiChevronRight size={20} />
              ) : (
                <FiChevronLeft size={20} />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            <Link href="/" className={linkClass("/")}>
              <FiHome size={20} />
              {!isCollapsed && <span className="ml-3">Anasayfa</span>}
            </Link>

            <Link href="/tasks" className={linkClass("/tasks")}>
              <FiCheckSquare size={20} />
              {!isCollapsed && <span className="ml-3">Görevler</span>}
            </Link>

            <Link href="/dashboard" className={linkClass("/dashboard")}>
              <FiBarChart2 size={20} />
              {!isCollapsed && <span className="ml-3">Performans</span>}
            </Link>

            <Link href="/calendar" className={linkClass("/calendar")}>
              <FiCalendar size={20} />
              {!isCollapsed && <span className="ml-3">Takvim</span>}
            </Link>

            <Link href="/profile" className={linkClass("/profile")}>
              <FiUser size={20} />
              {!isCollapsed && <span className="ml-3">Profil</span>}
            </Link>
            <div>
              <Logout />
              {!isCollapsed && <span className="ml-3">Çıkış</span>}
            </div>
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-thirdBackground">
            <div
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "justify-between"
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-themeColor/10 flex items-center justify-center overflow-hidden">
                <FiUser className="text-themeColor" size={18} />
              </div>
              {!isCollapsed && (
                <div className="ml-3 overflow-hidden">
                  <p className="text-sm font-medium text-mainTextColor truncate">
                    {user?.displayName || "Kullanıcı"}
                  </p>
                  <p className="text-xs text-secondTextColor truncate">
                    {user?.email || "email@example.com"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
