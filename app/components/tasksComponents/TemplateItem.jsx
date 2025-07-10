import React from "react";

const TemplateItem = ({ task }) => {
  const borderColor = task.category?.color || "border-purple-700";
  const handleSelect = (task) => {
    // Seçme işlemi burada yapılacak
    console.log("Seçilen görev:", task);
  };

  const handleUpdate = (task) => {
    // Güncelleme modalı açılabilir veya form gösterilebilir
    console.log("Güncellenecek görev:", task);
  };

  const handleDelete = (task) => {
    // Silme işlemi burada yapılacak (ör. redux thunk, api çağrısı vs.)
    console.log("Silinecek görev:", task);
  };
  return (
    <div
      className={`
        relative flex flex-col ${task.category.color} rounded-xl shadow-md p-6 mb-6 border-l-4 ${borderColor}
        transition hover:shadow-xl group
      `}
      aria-label={`Görev: ${task.name}`}
    >
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
        <p className="text-sm text-gray-400 mb-2 capitalize">
          {task.category?.name && (
            <span className="mr-2 "> {task.category.name}</span>
          )}
          {task.duration && <span>{task.duration} dk</span>}
        </p>
      </div>
      <div className="flex items-center mt-3 gap-2 flex-wrap">
        {/* Aksiyon butonları */}
        <button
          onClick={() => handleSelect(task)}
          className="ml-2 px-3 py-1 rounded-lg text-xs font-medium bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 transition focus:outline-none focus:ring-2 focus:ring-purple-600"
          aria-label="Şablonu kullan"
        >
          Kullan
        </button>
        <button
          onClick={() => handleUpdate(task)}
          className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-700 text-gray-200 hover:bg-purple-700 hover:text-white dark:bg-gray-600 dark:hover:bg-purple-600 transition focus:outline-none focus:ring-2 focus:ring-purple-600"
          aria-label="Şablonu düzenle"
        >
          Düzenle
        </button>
        <button
          onClick={() => handleDelete(task)}
          className="px-3 py-1 rounded-lg text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-red-600"
          aria-label="Şablonu sil"
        >
          Sil
        </button>
      </div>
    </div>
  );
};

export default TemplateItem;
