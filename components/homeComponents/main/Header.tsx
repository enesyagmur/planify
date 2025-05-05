import { auth } from "@/lib/firebase";
import React from "react";
import Logout from "../../authComponents/logout";

const Header = () => {
  return (
    <div className="w-full h-[87px] flex items-center justify-between p-4 border-b-[1px] border-secondBackground">
      <p>3 Ocak</p>
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
