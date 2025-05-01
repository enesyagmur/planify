import React, { useEffect, useState } from "react";
import SelectCategory from "./SelectCategory";
import Title from "./Title";
import Type from "./Type";
import Color from "./Color";
import Repeat from "./Repeat";
import StartDate from "./StartDate";
import Notification from "./Notification";
import SendButton from "./SendButton";

interface Task {
  title: string;
  category: string;
  taskType: { type: string; amount: number };
  often: { oftenType: string; oftenAmount: boolean[] | number };
  color: string;
  startDate: string[];
  notification: string;
}

const New = () => {
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [taskType, setTaskType] = useState<{ type: string; amount: number }>({
    type: "",
    amount: 0,
  });
  const [often, setOften] = useState<{
    oftenType: string;
    oftenAmount: boolean[] | number;
  }>({
    oftenType: "",
    oftenAmount: 0,
  });
  const [color, setColor] = useState<string>("");
  const [startDate, setStartDate] = useState<string[]>([]);
  const [notification, setNotification] = useState<string>("");

  const [newTask, setNewTask] = useState<Task | undefined>({
    title,
    category,
    taskType,
    often,
    color,
    startDate,
    notification,
  });

  useEffect(() => {
    setNewTask({
      title,
      category,
      taskType,
      often,
      color,
      startDate,
      notification,
    });
  }, [title, category, taskType, often, color, startDate, notification]);

  console.log(newTask);

  return (
    <div className="w-11/12 min-h-[700px]  md:min-h-[600px] flex flex-col md:flex-row items-center justify-center text-mainBackground">
      <div className="w-11/12 md:w-6/12 h-full flex flex-col items-center justify-between relative">
        <Title setValue={setTitle} value={title} />
        <SelectCategory setValue={setCategory} value={category} />
        <Type setValue={setTaskType} />
        <Repeat setValue={setOften} />
      </div>
      <div className="w-11/12 md:w-6/12 h-full flex flex-col items-center justify-between">
        <Color setValue={setColor} value={color} />
        <StartDate setValue={setStartDate} value={startDate} />
        <Notification setValue={setNotification} value={notification} />
        <SendButton newTask={newTask} setNewTask={setNewTask} />
      </div>
    </div>
  );
};

export default New;
