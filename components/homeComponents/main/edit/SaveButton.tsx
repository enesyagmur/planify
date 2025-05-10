import { auth, db } from "@/lib/firebase";
import { Task } from "@/lib/types";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IoAddCircle } from "react-icons/io5";

interface SaveButtonProps {
  newTask: Task | undefined;
}

const SaveButton = ({ newTask }: SaveButtonProps) => {
  const [taskState, setTaskState] = useState<boolean>(false);
  const time = new Date();
  const thisDay = time.getDay();
  const thisMonth = time.getMonth();
  const thisYear = time.getFullYear();

  const thisTime = { day: thisDay, month: thisMonth, year: thisYear };

  const taskSendToDb = async () => {
    if (newTask) {
      const taskRef = collection(db, `users/${auth.currentUser?.uid}/tasks`);
      try {
        const docRef = await addDoc(taskRef, {
          id: uuidv4(),
          title: newTask.title,
          category: newTask.category,
          method: newTask.method,
          often: newTask.often,
          color: newTask.color,
          startDate: newTask.startDate,
          notification: newTask.notification,
          completion: [thisTime],
        });

        console.log("Görev kayıt edildi");
        const firebaseId = docRef.id;

        const updateRef = doc(
          db,
          `users/${auth.currentUser?.uid}/tasks`,
          firebaseId
        );

        await updateDoc(updateRef, {
          id: firebaseId,
        });

        console.log("Id Güncellendi");
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
      newTask.startDate.day !== -1 &&
      newTask.startDate.month !== -1 &&
      newTask.startDate.year !== -1
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
        className={`w-11/12 p-1 flex items-center justify-center rounded-md border-[1px] border-customYellow  cursor-not-allowed ${
          taskState ? "bg-darkBlue cursor-pointer text-mainTextColor" : ""
        }`}
        onClick={taskSendToDb}
      >
        <IoAddCircle className="mr-1" />
        Kaydet
      </button>
    </div>
  );
};

export default SaveButton;
