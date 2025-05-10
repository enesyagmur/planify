"use client";

import { changeComponent } from "@/redux/panelSlice";

import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

  return (
    <div
      className={`change-component-frame ${
        name === selectedComponent
          ? "bg-secondBackground text-mainTextColor"
          : null
      }`}
      onClick={() => dispatch(changeComponent(`${name}`))}
    >
      <button className={`change-component-button`}>{icon}</button>

      <p className="hidden md:flex">{title}</p>
    </div>
  );
};

export default ComponentItem;
