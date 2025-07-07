"use client";
import NewTaskModal from "../../components/tasksComponents/NewTaskModal";
import TaskList from "../../components/tasksComponents/TaskList";
import React, { useState } from "react";

const Tasks = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto px-2 py-8">
      {/* Başlık ve Yeni Görev Butonu */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Görevler
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700  text-white font-semibold shadow-md transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <span className="text-lg">＋</span>
          <span>Yeni Görev</span>
        </button>
      </div>

      {/* Task Listesi */}
      <TaskList />

      {/* Yeni Görev Modalı */}
      {showModal && <NewTaskModal onClose={() => setShowModal(false)} />}

      {/* Modal arka planına tıklayınca kapatma */}
      {showModal && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowModal(false)}
          aria-label="Modalı Kapat"
        />
      )}
    </div>
  );
};

export default Tasks;
