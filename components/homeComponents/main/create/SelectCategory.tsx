import { Task } from "@/lib/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface CategoryProps {
  oldTask: Task;
  setNewTask: Dispatch<SetStateAction<Task>>;
}

const SelectCategory = ({ oldTask, setNewTask }: CategoryProps) => {
  const [inputCategory, setInputCategory] = useState<string>("");

  useEffect(() => {
    if (inputCategory) {
      setNewTask((prewTask: Task) => ({
        ...prewTask,
        category: inputCategory,
      }));
    }
  }, [inputCategory]);

  return (
    <div className="w-11/12 h-20 flex flex-col items-start justify-evenly">
      <label
        htmlFor="category"
        className="input-label cursor-help"
        title="Kategori Giriniz"
      >
        Kategori
      </label>
      <div className="w-full h-7 flex items-center justify-between ">
        <input
          type="text"
          name="category"
          className="w-full pl-2 rounded-sm h-7 capitalize"
          placeholder="Spor, Sağlık, Bakım vb."
          onChange={(e) => setInputCategory(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SelectCategory;
