"use client";

import React from "react";
import Logo from "./Logo";
import ChangeComponent from "./ComponentList";

const Panel = () => {
  return (
    <div className="w-2/12 h-full flex flex-col border-r-[1px] border-secondBackground">
      <Logo />
      <ChangeComponent />
    </div>
  );
};

export default Panel;
