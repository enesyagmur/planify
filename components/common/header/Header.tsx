import { auth } from "@/lib/firebase";
import React from "react";
import Logout from "../../authComponents/logout";

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
    <div className="w-full h-[87px] flex items-center justify-between  px-4 border-b-[1px] border-secondBackground">
      <p className="md:ml-12 text-lg">
        {thisDay} {thisMonth}
      </p>
      <div className="flex items-center justify-end w-6/12 ">
        <p className="text-sm capitalize mr-2">
          {auth.currentUser?.displayName}
        </p>
        <Logout />
      </div>
    </div>
  );
};

export default Header;
