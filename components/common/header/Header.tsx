import React from "react";
import { FiBell } from "react-icons/fi";

const Header = () => {
  const months: string[] = [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ];

  const time = new Date();
  const thisDay = time.getDate();
  const thisMonth = months[time.getMonth()];

  return (
    <header className="sticky top-0 z-10 w-full h-16 md:h-20 flex items-center justify-between px-4 md:px-6 bg-secondBackground border-b border-thirdBackground">
      {/* Sol Taraf - Mobil Menü Butonu ve Tarih */}
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-themeColor/10 flex items-center justify-center">
            <span className="text-themeColor font-medium">{thisDay}</span>
          </div>
          <p className="text-lg font-medium text-mainTextColor">{thisMonth}</p>
        </div>
      </div>

      {/* Sağ Taraf - Kullanıcı Bilgileri ve Bildirimler */}
      <div className="flex items-center space-x-3 md:space-x-4">
        <button className="p-2 rounded-full text-secondTextColor hover:bg-thirdBackground hover:text-mainTextColor relative">
          <FiBell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-themeColor"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
