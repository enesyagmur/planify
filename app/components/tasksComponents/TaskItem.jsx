import React from "react";
import { Check, MoreVertical, Clock, Plus, Edit, Trash2 } from "lucide-react";

const TaskItem = ({ task, onUpdate, onDelete }) => {
  // Kategori rengi task.category.color = "bg-blue-500" şeklinde bir yapıda

  return (
    <div
      className={`
        relative flex flex-col gap-3 bg-gray-900 dark:bg-gray-800 rounded-lg shadow-md p-5 mb-4 border border-gray-800
        transition-all duration-300 hover:shadow-xl hover:border-purple-600/60 group
        ${task.completed ? "opacity-60" : "hover:bg-gray-800/80"}
      `}
      aria-label={`Görev: ${task.name}`}
    >
      {/* Üst kısım: Başlık ve Checkbox */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3 min-w-0">
          {/* Checkbox */}
          <button
            className={`
              w-6 h-6 flex items-center justify-center rounded-full border-2 transition-all duration-200
              ${
                task.completed
                  ? "bg-green-500 border-green-500"
                  : "border-purple-500 hover:border-purple-400 bg-gray-900"
              }
              focus:outline-none focus:ring-2 focus:ring-purple-500
            `}
            aria-label={task.completed ? "Tamamlandı" : "Devam Ediyor"}
            // onClick ile tamamlandı toggle işlemi eklenebilir
          >
            {task.completed && (
              <Check size={16} className="text-white" strokeWidth={3} />
            )}
          </button>
          {/* Başlık */}
          <h3
            className={`text-lg capitalize font-semibold truncate transition-all duration-200 ${
              task.completed
                ? "line-through text-gray-500"
                : "text-white group-hover:text-purple-100"
            }`}
          >
            {task.name}
          </h3>
        </div>
        {/* Hover'da görünen aksiyonlar */}
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={() => onUpdate && onUpdate(task)}
            className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-purple-600 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Görevi güncelle"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete && onDelete(task)}
            className="p-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Görevi sil"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Alt bilgiler ve badge */}
      <div className="flex flex-wrap items-center gap-4 mt-1 capitalize">
        {/* Kategori */}
        {task.category?.name && (
          <div className="flex items-center gap-1">
            <span
              className={`w-2 h-2 rounded-full ${
                task.category.color || "bg-purple-500"
              }`}
            ></span>
            <span className="text-sm text-gray-400 dark:text-gray-300">
              {task.category.name}
            </span>
          </div>
        )}
        {/* Süre */}
        {task.duration && (
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
            px-3 py-1 rounded-full text-xs font-medium ml-auto
            transition-all duration-200 shadow-sm
            ${
              task.completed
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-purple-600/20 text-purple-400 border border-purple-500/30 dark:bg-purple-500/20"
            }
          `}
        >
          {task.completed ? "Tamamlandı" : "Devam Ediyor"}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;
