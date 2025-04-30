import { auth, db } from "@/lib/firebase";
import { addDoc, collection, getDoc } from "firebase/firestore";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Task {
  title: string;
  category: string;
  taskType: { type: string; amount: number };
  often: string | string[] | number;
  color: string;
  startDate: string[];
  notification: boolean | number[];
}

interface SendButtonProps {
  newTask: Task | undefined;
  setNewTask: Dispatch<SetStateAction<Task | undefined>>;
}

const SendButton = ({ newTask, setNewTask }: SendButtonProps) => {
  const [taskState, setTaskState] = useState<boolean>(false);

  const taskSendToDb = async () => {
    // const taskRef = collection(db, `users/${auth.currentUser?.uid}/tasks`);
    // try {
    //     await addDoc(taskRef, {
    //     })
    // } catch (error) {
    // }
  };

  useEffect(() => {
    if (
      newTask?.title !== undefined &&
      newTask?.taskType !== undefined &&
      newTask?.often !== undefined
    ) {
      setTaskState(true);
    } else {
      setTaskState(false);
    }
  }, [newTask]);

  return (
    <div className="w-full h-20 flex items-center justify-center text-secondTextColor">
      <button
        disabled={!taskState}
        className={`w-4/12 p-1 rounded-md border-[1px] border-customYellow opacity-50 cursor-not-allowed ${
          taskState ? "bg-customYellow opacity-100 cursor-pointer" : ""
        }`}
        onClick={taskSendToDb}
      >
        Kaydet
      </button>
    </div>
  );
};

export default SendButton;
