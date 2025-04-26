import React, { useEffect, useState } from "react";
import NewTaskInput from "./NewTaskInput";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id?: string;
  name?: string;
  creatorUserId?: string;
  type?: string;
  amount?: number;
  often?: number;
}

const New = () => {
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

  useEffect(() => {
    setNewTask({
      ...newTask,
      id: uuidv4(),
      creatorUserId: auth.currentUser?.uid,
    });
  }, []);

  return (
    <div className="w-11/12 min-h-[600px] flex flex-col items-center justify-center ">
      <NewTaskInput newTask={newTask} setNewTask={setNewTask} />

      <div className="w-full h-20 flex items-center justify-center">
        <button
          disabled={!taskState}
          className={`w-4/12 p-1 rounded-md border-[1px] border-customYellow opacity-50 cursor-none ${
            taskState ? "bg-customYellow opacity-100 cursor-pointer" : ""
          }`}
          onClick={taskSendToDb}
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default New;
