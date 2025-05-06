import { Task } from "@/lib/types";
import React from "react";

interface SingleTaskProps {
  task: Task;
}

const SingleTask = ({ task }: SingleTaskProps) => {
  return (
    <div
      className={`w-full md:6/12 h-12 flex items-center justify-between rounded-md p-2 m-2 cursor-pointer transition-all hover:opacity-90  ${task.color}`}
    >
      <p className="w-3/12 font-bold capitalize">{task.title}</p>
      <div className="w-3/12 flex items-center justify-center">
        <p>{task.method.quantity}</p>
        <p className="ml-1">{task.method.kind}</p>
      </div>
      {task.notification ? <p>{task.notification}</p> : null}
    </div>
  );
};

export default SingleTask;
