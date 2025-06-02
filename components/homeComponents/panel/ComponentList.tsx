"use client";
import { Components } from "@/lib/types";
import ComponentItem from "./ComponentItem";
import { useSelector } from "react-redux";
import { StoreRootState } from "@/redux/store";

const ComponentList = () => {
  const selectedComponent: string = useSelector(
    (state: StoreRootState) => state.componentState.current
  );

  const components: Components = [
    {
      name: "tasks",
      title: "Görevler",
      icon: "✅",
    },
    {
      name: "create",
      title: "Oluştur",
      icon: "✒️",
    },

    {
      name: "dashboard",
      title: "Performans",
      icon: "📊",
    },
    {
      name: "calender",
      title: "Takvim",
      icon: "📆",
    },
  ];

  return (
    <div className="w-full h-3/6 flex flex-col items-center text-secondTextColor ">
      {components.map((item, index) => (
        <ComponentItem
          selectedComponent={selectedComponent}
          {...item}
          key={index}
        />
      ))}
    </div>
  );
};

export default ComponentList;
