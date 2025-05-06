import React from "react";
import SingleTask from "../SingleTask";
import { useSelector } from "react-redux";
import { StoreRootState } from "@/redux/store";

const AllTasks = () => {
  const reduxTasks = useSelector(
    (state: StoreRootState) => state.reduxTasks.tasksArray
  );

  return (
    <div className="w-11/12 h-full flex flex-col items-center justify-center">
      {reduxTasks &&
        reduxTasks.map((item) => <SingleTask key={item.id} task={item} />)}
    </div>
  );
};

export default AllTasks;
