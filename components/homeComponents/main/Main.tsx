"use client";

import React from "react";
import Calender from "@/components/homeComponents/main/calender/Calender";
import Dashboard from "@/components/homeComponents/main/dashboard/Dashboard";
import Edit from "@/components/homeComponents/main/edit/Edit";
import Tasks from "@/components/homeComponents/main/tasks/Tasks";
import Header from "./Header";
import { useSelector } from "react-redux";
import { StoreRootState } from "@/redux/store";
const Main = () => {
  const selectedComponent = useSelector(
    (state: StoreRootState) => state.componentState.current
  );

  return (
    <div className="w-11/12 md:w-10/12 h-full flex flex-col items-start justify-start">
      <Header />
      {selectedComponent === "tasks" ? <Tasks /> : null}
      {selectedComponent === "edit" ? <Edit /> : null}
      {selectedComponent === "dashboard" ? <Dashboard /> : null}
      {selectedComponent === "calender" ? <Calender /> : null}
    </div>
  );
};

export default Main;
