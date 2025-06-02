import { Task } from "@/lib/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface TypeProps {
  oldTask: Task;
  setNewTask: Dispatch<SetStateAction<Task>>;
}

const Type = ({ oldTask, setNewTask }: TypeProps) => {
  const [value, setValue] = useState<{ kind: string; quantity: number }>(
    oldTask.method
  );

  useEffect(() => {
    setNewTask((prewTask: Task) => ({
      ...prewTask,
      method: value,
    }));
  }, [value]);
  return (
    <div className="w-11/12 h-20 flex flex-col items-start justify-evenly">
      <label
        htmlFor="type"
        className="input-label cursor-help"
        title="Görevin Süresini ya da Adetini Giriniz"
      >
        Görev Tamamlama Tipi
      </label>
      <div className="w-full h-7 flex items-center justify-between ">
        <select
          name="type"
          id=""
          className="w-5/12 rounded-sm h-7"
          onChange={(e) =>
            setValue((prevValue) => ({
              ...prevValue,
              kind: e.target.value,
            }))
          }
        >
          <option className="text-start text-black">----</option>

          <option value="minute" className="text-start text-black">
            ⏳Dakika
          </option>
          <option className="text-start" value="hour">
            🕰️ Saat
          </option>
          <option className="text-start" value="repetitive">
            *️⃣ Adet
          </option>
        </select>
        <input
          type="text"
          name="type"
          className="w-6/12 pl-2 rounded-sm h-7"
          placeholder="Miktar"
          onChange={(e) =>
            setValue((prevValue) => ({
              ...prevValue,
              quantity: Number(e.target.value),
            }))
          }
        />
      </div>
    </div>
  );
};

export default Type;
