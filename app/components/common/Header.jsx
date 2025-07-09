import { User } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

const Header = () => {
  const { user, loading } = useSelector((state) => state.authState);
  return (
    <header
      className="
        w-full h-16 flex items-center justify-end
        px-4 sm:px-6 md:px-8
        bg-neutral-800
        border-b border-gray-800
        shadow-md
        transition-all
      "
    >
      <Link
        href="/settings"
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-purple-500/20 transition"
        aria-label="Profil"
      >
        <User className="w-6 h-6 text-purple-400" />
        <span className="text-gray-100 font-medium hidden sm:inline">
          {user?.displayName}
        </span>
      </Link>
    </header>
  );
};

export default Header;
