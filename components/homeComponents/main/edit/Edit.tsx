import React, { useEffect, useState } from "react";
import SelectCategory from "./SelectCategory";
import Title from "./Title";
import Type from "./Type";
import Color from "./Color";
import StartDate from "./StartDate";
import Notification from "./Notification";
import SendButton from "./SendButton";
import { Task } from "@/lib/types";
import Often from "./Often";

const Edit = () => {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [method, setMethod] = useState<{
    kind: string;
    quantity: number;
  }>({
    kind: "",
    quantity: 0,
  });
  const [often, setOften] = useState<{
    density: string;
    amount: boolean[] | number;
  }>({
    density: "",
    amount: 0,
  });
  const [color, setColor] = useState<string>("");
  const [startDate, setStartDate] = useState<{
    day: number;
    month: number;
    year: number;
  }>({ day: -1, month: -1, year: -1 });
  const [notification, setNotification] = useState<string>("");

  const [newTask, setNewTask] = useState<Task | undefined>({
    id: "",
    title,
    category,
    method,
    often,
    color,
    startDate,
    notification,
    completion: false,
  });

  useEffect(() => {
    setNewTask({
      id: "",
      title,
      category,
      method,
      often,
      color,
      startDate,
      notification,
      completion: false,
    });
  }, [title, category, method, often, color, startDate, notification]);

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center justify-center text-mainBackground">
      <div className="w-11/12 md:w-6/12 h-full md:h-4/6 lg:h-3/6 flex flex-col items-center justify-between relative">
        <Title setValue={setTitle} value={title} />
        <SelectCategory setValue={setCategory} value={category} />
        <Type setValue={setMethod} />
        <Often setValue={setOften} />
      </div>
      <div className="w-11/12 md:w-6/12 h-full md:h-4/6 lg:h-3/6 flex flex-col items-center justify-between">
        <Color setValue={setColor} value={color} />
        <StartDate setValue={setStartDate} />
        <Notification setValue={setNotification} />
        <SendButton newTask={newTask} />
      </div>
    </div>
  );
};

export default Edit;
