import { auth, db } from "@/lib/firebase";
import { addDoc, collection, getDoc } from "firebase/firestore";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Task {
  title: string;
  category: string;
  taskType: { type: string; amount: number };
  often: { oftenType: string; oftenAmount: boolean[] | number };
  color: string;
  startDate: string[];
  notification: string;
}

interface SendButtonProps {
  newTask: Task | undefined;
  setNewTask: Dispatch<SetStateAction<Task | undefined>>;
}

const SendButton = ({ newTask, setNewTask }: SendButtonProps) => {
  const [taskState, setTaskState] = useState<boolean>(false);

  const taskSendToDb = async () => {
    if (newTask) {
      const taskRef = collection(db, `users/${auth.currentUser?.uid}/tasks`);
      try {
        await addDoc(taskRef, {
          title: newTask.title,
          category: newTask.category,
          Type: newTask.taskType,
          often: newTask.often,
          color: newTask.color,
          startDate: newTask.startDate,
          notification: newTask.notification,
          completion: false,
        });

        console.log("Görev kayıt edildi");
      } catch (err) {
        console.error("Görev kayıt edilemed: ", err);
      }
    }
  };

  useEffect(() => {
    if (
      newTask !== undefined &&
      newTask.title !== "" &&
      newTask.category !== "" &&
      newTask.taskType.type !== "" &&
      newTask.taskType.amount !== 0 &&
      newTask.often.oftenType !== "" &&
      newTask.often.oftenAmount !== 0 &&
      newTask.color !== "" &&
      newTask.startDate.length !== 0
    ) {
      setTaskState(true);
    } else {
      setTaskState(false);
    }
  }, [newTask]);

  return (
    <div className="w-full h-20 flex items-end justify-center text-secondTextColor pb-2">
      <button
        disabled={!taskState}
        className={`w-11/12 p-1 rounded-md border-[1px] border-customYellow  cursor-not-allowed ${
          taskState ? "bg-darkBlue cursor-pointer text-mainTextColor" : ""
        }`}
        onClick={taskSendToDb}
      >
        Kaydet
      </button>
    </div>
  );
};

export default SendButton;
