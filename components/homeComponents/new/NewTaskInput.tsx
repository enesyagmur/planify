"use client";

import React, { Dispatch, SetStateAction } from "react";
import SelectCategory from "./SelectCategory";
import Title from "./Title";
import Type from "./Type";
import Color from "./Color";
import Repeat from "./Repeat";

interface Task {
  id?: string;
  name?: string;
  creatorUserId?: string;
  type?: string;
  amount?: number;
  often?: number;
  createdDay?: number;
}

interface NewTaskInputProps {
  newTask: Task | undefined;
  setNewTask: Dispatch<SetStateAction<Task | undefined>>;
}

const NewTaskInput = ({ newTask, setNewTask }: NewTaskInputProps) => {
  return (
    <div className="w-full md:w-11/12 lg:w-8/12 flex flex-col md:flex-row items-center md:items-center justify-between md:justify-start text-mainBackground relative">
      <Title />
      <Type />
      <Color />
      <Repeat />
    </div>
  );
};

export default NewTaskInput;
