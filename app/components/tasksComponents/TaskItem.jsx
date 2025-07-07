import React from "react";

const TaskItem = ({ task }) => {
  // Öncelik rengine göre border ve rozet rengi
  const priorityColors = {
    high: "border-purple-600 bg-purple-600/10 text-purple-400",
    medium: "border-pink-500 bg-pink-500/10 text-pink-400",
    low: "border-green-500 bg-green-500/10 text-green-400",
  };
  const borderColor = priorityColors[task.priority] || "border-gray-700";

  return (
    <div
      className={`
          flex flex-col sm:flex-row items-start sm:items-center justify-between
          bg-gray-800  rounded-xl shadow-lg p-5 mb-4
          border-l-4 ${borderColor}
          transition hover:shadow-xl
        `}
      aria-label={`Görev: ${task.title}`}
    >
      <div className="flex-1">
        <h3
          className={`text-lg font-semibold mb-1 ${
            task.completed
              ? "line-through text-gray-500 dark:text-gray-600"
              : "text-white"
          }`}
        >
          {task.title}
        </h3>
        <p className="text-sm text-gray-400 mb-2">{task.description}</p>
      </div>
      <div className="flex items-center mt-3 sm:mt-0 gap-2">
        <span
          className={`
              px-3 py-1 rounded-full text-xs font-medium
              ${
                task.completed
                  ? "bg-purple-600/20 text-purple-400 border border-purple-600"
                  : "bg-gray-800 text-gray-300 border border-gray-700"
              }
              transition
            `}
        >
          {task.completed ? "Tamamlandı" : "Devam Ediyor"}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;
