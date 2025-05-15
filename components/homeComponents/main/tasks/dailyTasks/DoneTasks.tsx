import { Tasks } from "@/lib/types";
import React from "react";
import SingleTask from "../SingleTask";

interface DoneTasksProps {
  value: Tasks;
}

const DoneTasks = ({ value }: DoneTasksProps) => {
  return (
    <div className="daily-task-collum custom-scrollbar ">
      <p className="collum-title">Tamamlanan</p>
      <div className="task-list">
        {value &&
          value.map((item, index) => (
            <SingleTask key={index} task={item} completion={true} />
          ))}
      </div>
    </div>
  );
};

export default DoneTasks;
