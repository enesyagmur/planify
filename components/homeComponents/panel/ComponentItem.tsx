"use client";

import React from "react";

interface ComponentItemProps {
  selectedComponent: string;
  name: string;
  title: string;
  icon: string;
}

const ComponentItem = ({
  selectedComponent,
  name,
  title,
  icon,
}: ComponentItemProps) => {
  return (
    <div
      className={`change-component-frame ${
        name === selectedComponent
          ? "bg-secondBackground text-mainTextColor"
          : null
      }`}
      //   onClick={() => setCount(3)}
    >
      <button className={`change-component-button `}>{icon}</button>
      <p>{title}</p>
    </div>
  );
};

export default ComponentItem;
