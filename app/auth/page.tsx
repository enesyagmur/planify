"use client";

import Login from "@/components/authComponents/login";
import React from "react";

const Auth = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-darkBlue via-dangerRed to-darkGreen">
      <Login />
    </div>
  );
};

export default Auth;
