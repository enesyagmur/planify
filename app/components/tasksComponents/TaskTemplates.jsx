import React from "react";
import TaskItem from "./TaskItem";
import { useSelector } from "react-redux";

const TaskTemplates = ({ userId }) => {
  const taskState = useSelector((state) => state.taskState);
  const { taskTemplates, loading, error } = taskState;
  return (
    <div className="w-full max-w-2xl mx-auto mt-6 px-2">
      {taskTemplates?.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          Henüz bir görev şablonu yok.
        </div>
      ) : (
        <div>
          {taskTemplates.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskTemplates;
