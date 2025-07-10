import React from "react";

const TaskItem = ({ task, onSelect, onDelete, onUpdate }) => {
  // Kategori rengi veya varsayılan renk
  const borderColor = task.category?.color || "border-gray-700";

  return (
    <div
      className={`
        relative flex flex-col bg-gray-800 rounded-lg shadow-md p-6 mb-6 border-l-4 ${borderColor}
        transition hover:shadow-xl group
      `}
      aria-label={`Görev: ${task.name}`}
    >
      {/* Sağ üstte üç nokta menüsü */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          className="p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
          aria-label="Daha fazla seçenek"
          tabIndex={0}
        >
          <svg
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-gray-400 group-hover:text-purple-500 transition"
          >
            <circle cx="12" cy="5" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="12" cy="19" r="1.5" />
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <h3
          className={`text-lg font-semibold mb-1 ${
            task.completed
              ? "line-through capitalize text-gray-500 dark:text-gray-600"
              : "text-white"
          }`}
        >
          {task.name}
        </h3>
        <p className="text-sm text-gray-400 mb-2">
          {task.category?.name && (
            <span className="mr-2">Kategori: {task.category.name}</span>
          )}
          {task.duration && <span>Süre: {task.duration} dk</span>}
        </p>
      </div>
      <div className="flex items-center mt-3 gap-2 flex-wrap">
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
        {/* Butonlar */}
        <button
          onClick={() => onSelect && onSelect(task)}
          className="ml-2 px-3 py-1 rounded-lg text-xs font-medium bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition focus:outline-none focus:ring-2 focus:ring-purple-600"
          aria-label="Görevi seç"
        >
          Seç
        </button>
        <button
          onClick={() => onUpdate && onUpdate(task)}
          className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-700 text-gray-200 hover:bg-purple-700 hover:text-white dark:bg-gray-600 dark:hover:bg-purple-600 transition focus:outline-none focus:ring-2 focus:ring-purple-600"
          aria-label="Görevi güncelle"
        >
          Güncelle
        </button>
        <button
          onClick={() => onDelete && onDelete(task)}
          className="px-3 py-1 rounded-lg text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-600"
          aria-label="Görevi sil"
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
