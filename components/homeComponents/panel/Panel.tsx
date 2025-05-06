"use client";

import React from "react";
import Logo from "./Logo";
import ComponentList from "./ComponentList";

const Panel = () => {
  return (
    <div className="w-1/12 sm:w-2/12 h-full flex flex-col items-center border-r-[1px] border-secondBackground">
      <Logo />
      <ComponentList />
    </div>
  );
};

export default Panel;
