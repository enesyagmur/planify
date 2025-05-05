import { auth, db } from "@/lib/firebase";
import { Task } from "@/lib/types";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface SendButtonProps {
  newTask: Task | undefined;
}

const SendButton = ({ newTask }: SendButtonProps) => {
  const [taskState, setTaskState] = useState<boolean>(false);

  const taskSendToDb = async () => {
    if (newTask) {
      const taskRef = collection(db, `users/${auth.currentUser?.uid}/tasks`);
      try {
        await addDoc(taskRef, {
          id: uuidv4(),
          title: newTask.title,
          category: newTask.category,
          method: newTask.method,
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
      newTask.method.kind !== "" &&
      newTask.method.quantity !== 0 &&
      newTask.often.density !== "" &&
      newTask.often.amount !== 0 &&
      newTask.color !== "" &&
      newTask.startDate !== ""
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
