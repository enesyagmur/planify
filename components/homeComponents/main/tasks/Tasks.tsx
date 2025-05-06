import React from "react";
import AllTasks from "./allTasks/AllTasks";
import DailyTasks from "./dailyTasks/DailyTasks";

const Tasks = () => {
  return (
    <div className="w-full  h-full flex flex-col items-center justify-center ">
      <DailyTasks />
    </div>
  );
};

export default Tasks;
