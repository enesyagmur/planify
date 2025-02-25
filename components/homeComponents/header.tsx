import { auth } from "@/lib/firebase";
import React from "react";
import { GrPlan } from "react-icons/gr";
import Logout from "../authComponents/logout";

const Header = () => {
  return (
    <div className="w-full h-14 flex items-center justify-between">
      <div className="flex items-center justify-start w-6/12">
        <GrPlan className="text-sm" />
        <h1 className="text-2xl font-bold ml-2">Planify</h1>
      </div>
      <div className="flex items-center justify-end w-6/12">
        <p className="text-sm capitalize mr-2">
          {auth.currentUser?.displayName}
        </p>
        <Logout />
      </div>
    </div>
  );
};

export default Header;
