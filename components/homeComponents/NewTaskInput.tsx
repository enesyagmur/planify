"use client";

import React, { Dispatch, SetStateAction } from "react";

interface Task {
  id: string;
  name: string;
  icon: string;
  creatorUserId: string;
  type: string;
  amount: number;
  often: number;
}

interface NewTaskInputProps {
  newTask: Task | undefined;
  setNewTask: Dispatch<SetStateAction<Task | undefined>>;
}

const NewTaskInput = ({ newTask, setNewTask }: NewTaskInputProps) => {
  return (
    <div className="w-full h-40 flex flex-col items-start justify-evenly  p-4">
      <input
        type="text"
        placeholder="Görev adı"
        className="w-11/12 h-[30px] bg-neutral-700 rounded-sm capitalize pl-2"
        value={newTask?.name}
      />

      <div className="w-11/12 h-[30px] flex items-center justify-between">
        <div className="lg:w-6/12 h-full flex items-center justify-start">
          <input
            type="text"
            placeholder=""
            className="w-2/12 h-full bg-neutral-700 text-center rounded-sm"
            value={newTask?.amount}
            defaultValue={0}
          />
          <select
            name=""
            id=""
            className="w-4/12 h-full bg-neutral-700 ml-4"
            value={newTask?.type}
          >
            <option
              defaultValue={"Minute"}
              value="Minute"
              className="text-center"
            >
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

        <div className="w-6/12 h-full flex items-center justify-start">
          <select
            name="often"
            id="often"
            className="w-3/12 h-full bg-neutral-700 overflow-auto"
            value={newTask?.type}
            defaultValue={1}
          >
            <option className="text-center" value="1">
              Her
            </option>
            <option className="text-center" value="2">
              2
            </option>
            <option className="text-center" value="3">
              3
            </option>
            <option className="text-center" value="4">
              4
            </option>
            <option className="text-center" value="5">
              5
            </option>
            <option className="text-center" value="6">
              6
            </option>
            <option className="text-center" value="7">
              7
            </option>
          </select>

          <label htmlFor="often" className="ml-4">
            Günde Bir
          </label>
        </div>
      </div>
    </div>
  );
};

export default NewTaskInput;
