import React, { useState } from "react";
import NewTaskInput from "./NewTaskInput";

interface Task {
  id: string;
  name: string;
  icon: string;
  creatorUserId: string;
  type: string;
  amount: number;
  often: number;
}

const CreateTask = () => {
  const [newTask, setNewTask] = useState<Task | undefined>(undefined);

  console.log(newTask);

  return (
    <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 border-[1px] border-neutral-800 rounded-md">
      <div className="w-full h-12 flex items-center justify-start pt-2">
        <h1 className="ml-5 text-xl">Yeni Görev Oluştur</h1>
      </div>

      <NewTaskInput newTask={newTask} setNewTask={setNewTask} />

      <div className="w-full h-20 flex items-center justify-center">
        <button
          className={`w-4/12 p-1 rounded-md border-[1px] border-customPink ${
            newTask ? "bg-customPink" : "bg-opacity-50"
          }`}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default CreateTask;
