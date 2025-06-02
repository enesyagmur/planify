import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Icon from "./Icon";
import { Task } from "@/lib/types";

interface TitleProps {
  oldTask: Task;
  setNewTask: Dispatch<SetStateAction<Task>>;
}

const Title = ({ oldTask, setNewTask }: TitleProps) => {
  const [icon, setIcon] = useState<string>("");
  const [inputTitle, setInputTitle] = useState<string>("");

  useEffect(() => {
    const newTitle = icon + inputTitle;
    setNewTask((prewTask: Task) => ({
      ...prewTask,
      title: newTitle,
    }));
  }, [icon, inputTitle]);

  return (
    <div className="w-11/12 h-20 flex items-center justify-between">
      <div className="w-8/12 h-20 flex-col items-start justify-between  pt-2">
        <label
          htmlFor="title"
          className="input-label cursor-help"
          title="Göreviniz için Bir İsim Belirleyiniz"
        >
          Başlık
        </label>
        <input
          type="text"
          name="title"
          className="input mt-2"
          onChange={(e) => setInputTitle(e.target.value)}
          value={oldTask?.title}
          placeholder="Görev İsmi"
        />
      </div>
      <Icon setValue={setIcon} />
    </div>
  );
};

export default Title;
