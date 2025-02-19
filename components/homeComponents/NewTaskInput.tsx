"use client";

import { auth } from "@/lib/firebase";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id?: string;
  name?: string;
  creatorUserId?: string;
  type?: string;
  amount?: number;
  often?: number;
}

interface NewTaskInputProps {
  newTask: Task | undefined;
  setNewTask: Dispatch<SetStateAction<Task | undefined>>;
}

const NewTaskInput = ({ newTask, setNewTask }: NewTaskInputProps) => {
  useEffect(() => {
    setNewTask({
      ...newTask,
      id: uuidv4(),
      creatorUserId: auth.currentUser?.uid,
    });
  }, []);

  return (
    <div className="w-full h-40 flex flex-col items-start justify-evenly  p-4">
      <input
        type="text"
        placeholder="Görev adı"
        className="w-11/12 h-[30px] bg-neutral-700 rounded-sm capitalize pl-2"
        value={newTask?.name || ""}
        onChange={(e) =>
          setNewTask((prevTask) => ({
            ...prevTask,
            name: e.target.value,
          }))
        }
      />

      <div className="w-11/12 h-[30px] flex items-center justify-between">
        <div className="lg:w-6/12 h-full flex items-center justify-start">
          <input
            type="text"
            placeholder=""
            className="w-3/12 h-full bg-neutral-700 text-center rounded-sm"
            value={newTask?.amount || 0}
            onChange={(e) =>
              setNewTask((prevTask) => ({
                ...prevTask,
                amount: Number(e.target.value),
              }))
            }
          />
          <select
            name=""
            id=""
            className="w-7/12 h-full bg-neutral-700 ml-4"
            value={newTask?.type || ""}
            onChange={(e) =>
              setNewTask((prevTask) => ({
                ...prevTask,
                type: e.target.value,
              }))
            }
          >
            <option value="" className="text-center">
              Type Seçiniz
            </option>
            <option value="Minute" className="text-center">
              Dakika
            </option>
            <option className="text-center" value="Hour">
              Saat
            </option>
            <option className="text-center" value="Piece">
              Adet
            </option>
          </select>
        </div>

        <select
          name="often"
          id="often"
          className="w-6/12 h-full bg-neutral-700 overflow-auto"
          value={newTask?.often || 0}
          onChange={(e) =>
            setNewTask((prevTask) => ({
              ...prevTask,
              often: Number(e.target.value),
            }))
          }
        >
          <option className="text-center" value="0">
            Sıklık Seçiniz
          </option>
          <option className="text-center" value="1">
            Her Gün
          </option>
          <option className="text-center" value="2">
            İki Günde Bir
          </option>
          <option className="text-center" value="3">
            Üç Günde Bir
          </option>
          <option className="text-center" value="4">
            Dört Günde Bir
          </option>
          <option className="text-center" value="5">
            Beş Günde Bir
          </option>
          <option className="text-center" value="6">
            Altı Günde Bir
          </option>
          <option className="text-center" value="7">
            Yedi Günde Bir
          </option>
        </select>
      </div>
    </div>
  );
};

export default NewTaskInput;
