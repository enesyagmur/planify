import { auth, db } from "@/lib/firebase";
import { Task } from "@/lib/types";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IoAddCircle } from "react-icons/io5";

interface SaveButtonProps {
  oldTask: Task;
  resetFunc: () => void;
}

const SaveButton = ({ oldTask, resetFunc }: SaveButtonProps) => {
  const [taskState, setTaskState] = useState<boolean>(false);

  const taskSendToDb = async () => {
    if (oldTask) {
      const taskRef = collection(db, `users/${auth.currentUser?.uid}/tasks`);
      try {
        const docRef = await addDoc(taskRef, {
          id: uuidv4(),
          title: oldTask.title,
          category: oldTask.category,
          method: oldTask.method,
          often: oldTask.often,
          color: oldTask.color,
          startDate: oldTask.startDate,
          notification: oldTask.notification,
          completion: oldTask.completion,
        });

        console.log("Görev kayıt edildi");
        resetFunc();

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
      oldTask !== undefined &&
      oldTask.title !== "" &&
      oldTask.category !== "" &&
      oldTask.method.kind !== "" &&
      oldTask.method.quantity !== 0 &&
      oldTask.often.density !== "" &&
      oldTask.often.amount !== 0 &&
      oldTask.color !== "" &&
      oldTask.startDate.day !== 0 &&
      oldTask.startDate.year !== 0
    ) {
      setTaskState(true);
    } else {
      setTaskState(false);
    }
  }, [oldTask]);

  return (
    <div className="w-full h-20 flex items-end justify-center text-secondTextColor pb-2">
      <button
        type="submit"
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
