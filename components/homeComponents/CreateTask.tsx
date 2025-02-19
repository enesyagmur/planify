import React, { useEffect, useState } from "react";
import NewTaskInput from "./NewTaskInput";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Task {
  id?: string;
  name?: string;
  creatorUserId?: string;
  type?: string;
  amount?: number;
  often?: number;
}

const CreateTask = () => {
  const [newTask, setNewTask] = useState<Task | undefined>(undefined);
  const [taskState, setTaskState] = useState<boolean>(false);

  const taskSendToDb = async () => {
    try {
      const docRef = await addDoc(collection(db, "tasks"), { ...newTask });
      if (docRef.id) {
        console.log("Task Kayıt Başarılı", docRef.id);
      }
    } catch (err) {
      console.log("Task Kayıt Edilemedi", err);
    }
  };

  useEffect(() => {
    if (
      newTask?.id !== undefined &&
      newTask?.name !== undefined &&
      newTask?.creatorUserId !== undefined &&
      newTask?.type !== undefined &&
      newTask?.amount !== undefined &&
      newTask?.often !== undefined
    ) {
      setTaskState(true);
    } else {
      setTaskState(false);
    }
  }, [newTask]);

  return (
    <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 border-[1px] border-neutral-800 rounded-md">
      <div className="w-full h-12 flex items-center justify-start pt-2">
        <h1 className="ml-5 text-xl">Yeni Görev Oluştur</h1>
      </div>

      <NewTaskInput newTask={newTask} setNewTask={setNewTask} />

      <div className="w-full h-20 flex items-center justify-center">
        <button
          disabled={!taskState}
          className={`w-4/12 p-1 rounded-md border-[1px] border-customPink opacity-50 cursor-none ${
            taskState ? "bg-customPink opacity-100 cursor-pointer" : ""
          }`}
          onClick={taskSendToDb}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default CreateTask;
