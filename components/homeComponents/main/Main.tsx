"use client";

import React from "react";
// import Calender from "@/components/homeComponents/main/calender/Calender";
// import Dashboard from "@/components/homeComponents/main/dashboard/Dashboard";
// import Edit from "@/components/homeComponents/main/edit/Edit";
import Tasks from "@/components/homeComponents/main/tasks/Tasks";
import Header from "./Header";
const Main = () => {
  // const componentArray: React.ComponentType[] = [
  //   Tasks,
  //   Edit,
  //   Dashboard,
  //   Calender,
  // ];
  return (
    <div className="w-10/12 h-full flex flex-col items-start justify-start">
      <Header />
      <Tasks />
    </div>
  );
};

export default Main;
