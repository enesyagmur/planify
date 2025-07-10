import React from "react";
import { useDispatch } from "react-redux";
import { useTemplateThunk } from "../../features/task/taskThunk";
import { Clock, Flame, Trophy } from "lucide-react";

const TemplateItem = ({ task, userId }) => {
  const categoryBgColor = task.category?.color || "bg-purple-900/20";
  const dispatch = useDispatch();

  const handleSelect = async (task) => {
    try {
      if (!userId) {
        throw new Error(
          "TEMPLATEITEM | Template seçme işleminde sorun: user Id eksik"
        );
      }
      await dispatch(useTemplateThunk({ userId, template: task })).unwrap();
    } catch (err) {
      throw new Error(err);
    }
  };

  const handleUpdate = (task) => {
    console.log("Güncellenecek görev:", task);
  };

  const handleDelete = (task) => {
    console.log("Silinecek görev:", task);
  };

  return (
    <div
      className={`w-[345px] h-[200px] relative flex flex-col bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 mb-4 
        border border-gray-800 hover:border-purple-500/50 transition-all duration-300
        hover:shadow-purple-500/10 hover:scale-[1.02] group cursor-pointer
        before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br 
        before:from-purple-500/5 before:to-transparent before:opacity-0 
        hover:before:opacity-100 before:transition-opacity before:duration-300`}
      aria-label={`Görev: ${task.name}`}
    >
      <div
        className={`absolute left-0 top-4 bottom-4 w-1 ${categoryBgColor} rounded-full`}
      ></div>

      {/* Kategori + Duration satırı */}
      <div className="flex items-center justify-between mb-3">
        {task.category?.name && (
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border`}
          >
            <div className={`w-2 h-2 rounded-full mr-2 ${categoryBgColor}`} />
            <span className="text-purple-200 capitalize">
              {task.category.name}
            </span>
          </div>
        )}

        {task.duration !== 0 && (
          <div className="flex items-center text-xs text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            <span>{task.duration} dk</span>
          </div>
        )}
      </div>

      <div className="flex-1 ml-2">
        <h3
          className={`text-[14px] capitalize font-bold mb-2 transition-colors duration-200 ${
            task.completed
              ? "line-through text-gray-500"
              : "text-white group-hover:text-purple-100"
          }`}
        >
          {task.name}
        </h3>

        {/* Açıklama */}
        {task.description && (
          <p className="text-sm text-gray-400 mb-2">{task.description}</p>
        )}

        {/* Streak bilgileri */}
        {task.isRecurring && (
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center">
              <Flame className="w-4 h-4 mr-1 text-orange-500" />
              <span>{task.currentStreak} gün</span>
            </div>

            <div className="flex items-center">
              <Trophy className="w-4 h-4 mr-1 text-yellow-500" />
              <span>Rekor: {task.streakRecord}</span>
            </div>
          </div>
        )}
      </div>

      {/* Aksiyon butonları */}

      <div className="flex items-center justify-end gap-2 mt-4 ml-2">
        {!task.isRecurring && (
          <button
            onClick={() => handleSelect(task)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-purple-600 text-white 
                    hover:bg-purple-500 transition-all duration-200 shadow-lg hover:shadow-purple-500/25
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900
                    transform hover:scale-105 active:scale-95"
            aria-label="Şablonu kullan"
          >
            <svg
              className="w-4 h-4 mr-1 inline"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Kullan
          </button>
        )}
        <button
          onClick={() => handleUpdate(task)}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-700 text-gray-200 
                     hover:bg-gray-600 transition-all duration-200 shadow-lg hover:shadow-gray-500/25
                     focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900
                     transform hover:scale-105 active:scale-95"
          aria-label="Şablonu düzenle"
        >
          <svg
            className="w-4 h-4 mr-1 inline"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Düzenle
        </button>

        <button
          onClick={() => handleDelete(task)}
          className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600/80 text-red-100 
                     hover:bg-red-500 transition-all duration-200 shadow-lg hover:shadow-red-500/25
                     focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900
                     transform hover:scale-105 active:scale-95"
          aria-label="Şablonu sil"
        >
          <svg
            className="w-4 h-4 mr-1 inline"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Sil
        </button>
      </div>

      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/0 via-transparent to-purple-500/0 
                      group-hover:from-purple-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none"
      ></div>
    </div>
  );
};

export default TemplateItem;
