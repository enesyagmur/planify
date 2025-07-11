import React from "react";
import { Check, Clock, Flame, Trophy } from "lucide-react";
import { useDispatch } from "react-redux";
import { taskCompleteThunk } from "../../features/task/taskThunk";

const TaskItem = ({ task, userId }) => {
  const dispatch = useDispatch();
  const handleComplete = async () => {
    try {
      if (task.completed) {
        return;
      }
      if (!task.id || !userId) {
        throw new Error("TASKITEM | Görev tamamlanırken sorun: Bilgiler eksik");
      }

      const data = { userId, taskId: task.id, templateId: task.templateId };
      await dispatch(taskCompleteThunk(data)).unwrap();
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <div
      className={`
      relative flex items-center gap-3 ${
        task.category.color
      } rounded-lg shadow-md bg-opacity-10 p-3 mb-3 border border-neutral-800
      transition-all duration-300 hover:shadow-xl hover:border-purple-600/60 group
      ${task.completed ? "opacity-60" : "hover:bg-opacity-30"}
    `}
      aria-label={`Görev: ${task.name}`}
    >
      {/* Checkbox */}
      <button
        className={`
        w-5 h-5 flex items-center hover:bg-green-500 justify-center rounded-full border-2 transition-all duration-200 flex-shrink-0
        ${
          task.completed
            ? "bg-green-500 border-green-500"
            : "border-purple-500 hover:border-purple-400 bg-gray-900"
        }
        focus:outline-none focus:ring-2 focus:ring-purple-500
      `}
        aria-label={task.completed ? "Tamamlandı" : "Devam Ediyor"}
        onClick={handleComplete}
      >
        {task.completed && (
          <Check size={14} className="text-white" strokeWidth={3} />
        )}
      </button>

      {/* Başlık */}
      <h3
        className={`
        text-base capitalize font-semibold truncate transition-all duration-200 flex-1
        ${
          task.completed
            ? "line-through text-gray-500"
            : "text-white group-hover:text-purple-100"
        }
      `}
      >
        {task.name}
      </h3>

      {/* Kategori */}
      {task.category?.name && (
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-400 dark:text-gray-300">
            {task.category.name}
          </span>
        </div>
      )}

      {/* Süre */}
      {task.duration > 0 && (
        <div className="flex items-center gap-1">
          <Clock size={14} className="text-gray-500" />
          <span className="text-sm text-gray-400 dark:text-gray-300">
            {task.duration} dk
          </span>
        </div>
      )}

      {/* Durum badge'i */}
      <span
        className={`
        px-2 py-1 rounded-full text-xs font-medium flex-shrink-0
        transition-all duration-200 shadow-sm
        ${
          task.completed
            ? "bg-green-500/20 text-green-400 border border-green-500/30"
            : "text-purple-400 border border-purple-500/30"
        }
      `}
      >
        {task.completed ? "Tamamlandı" : "Devam Ediyor"}
      </span>
    </div>
  );
};

export default TaskItem;
