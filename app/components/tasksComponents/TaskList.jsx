import React from "react";
import TaskItem from "./TaskItem";

// Mock veri
const tasks = [
  {
    id: 1,
    title: "Sunum hazırlıklarını tamamla",
    description: "Yarınki toplantı için slaytları gözden geçir.",
    dueDate: "2024-06-10",
    completed: false,
    priority: "high",
  },
  {
    id: 2,
    title: "E-postaları kontrol et",
    description: "Önemli mailleri yanıtla.",
    dueDate: "2024-06-09",
    completed: true,
    priority: "medium",
  },
  {
    id: 3,
    title: "Yeni görev ekle",
    description: "Takım için yeni bir görev oluştur.",
    dueDate: "2024-06-12",
    completed: false,
    priority: "low",
  },
];

const TaskList = () => {
  return (
    <div className="w-full max-w-2xl mx-auto mt-6 px-2">
      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          Henüz bir görev yok.
        </div>
      ) : (
        <div>
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
