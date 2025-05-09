import { Tasks } from "@/lib/types";
import React from "react";
import SingleTask from "../SingleTask";

interface WaitingTasksProps {
  value: Tasks;
}

const WaitingTasks = ({ value }: WaitingTasksProps) => {
  return (
    <div className="daily-task-collum custom-scrollbar">
      <p className="collum-title">Bekleyen</p>
      <div className="task-list">
        {value &&
          value.map((item, index) => <SingleTask key={index} task={item} />)}
      </div>
    </div>
  );
};

export default WaitingTasks;
