import React from "react";
import CurrentUserAllTasks from "./CurrentUserAllTasks";

const Tasks = () => {
  return (
    <div className="w-11/12 min-h-[700px]  md:min-h-[600px] flex flex-col items-center justify-center ">
      <CurrentUserAllTasks />
    </div>
  );
};

export default Tasks;
