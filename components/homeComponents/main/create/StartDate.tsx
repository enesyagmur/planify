import { Task } from "@/lib/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface StartDateProps {
  oldTask: Task;
  setNewTask: Dispatch<SetStateAction<Task>>;
}

const StartDate = ({ oldTask, setNewTask }: StartDateProps) => {
  const [startArray, setstartArray] = useState<boolean[]>([true, false, false]);
  const [value, setValue] = useState<{
    day: number;
    month: number;
    year: number;
  }>(oldTask.startDate);

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const [customDate, setCustomDate] = useState<string[]>(["", "", ""]);

  const handleChange = (input: string) => {
    if (input === "today") {
      setstartArray([true, false, false]);
      setValue({ day: day, month: month, year: year });
    } else if (input === "tomorrow") {
      setstartArray([false, true, false]);
      setValue({ day: day + 1, month: month, year: year });
    } else {
      setstartArray([false, false, true]);
    }
  };

  useEffect(() => {
    if (!customDate.includes("")) {
      if (
        customDate[0].length === 2 &&
        customDate[1].length === 2 &&
        customDate[2].length === 4
      ) {
        setValue({
          day: Number(customDate[0]),
          month: Number(customDate[1]) - 1,
          year: Number(customDate[2]),
        });
      }
    }
  }, [customDate]);

  useEffect(() => {
    setNewTask((prewTask: Task) => ({
      ...prewTask,
      startDate: value,
    }));
  }, [value]);

  return (
    <div className="w-11/12 h-20 flex flex-col items-start justify-evenly ">
      <label
        htmlFor="title"
        className="input-label cursor-help"
        title="Görevinizin Hangi Tarihten İtibaren Aktif Olmasını İstiyorsunuz"
      >
        Görev Başlangıç Günü
      </label>
      <div className="w-full h-7 flex items-center justify-between ">
        <select
          name=""
          id=""
          className={`rounded-sm h-7 ${startArray[2] ? "w-5/12" : "w-full"}`}
          onChange={(e) => handleChange(e.target.value)}
        >
          <option value="" className="text-start">
            ----
          </option>
          <option value="today" className="text-start">
            🌄 Bugün
          </option>
          <option className="text-start" value="tomorrow">
            🌓 Yarın
          </option>
          <option className="text-start" value="date">
            📆 Tarih Girin
          </option>
        </select>

        {startArray[2] ? (
          <div className="w-7/12 h-7 flex items-center justify-end">
            <input
              type="text"
              name="title"
              className="w-3/12 rounded-sm h-7 text-center ml-1"
              placeholder="GG"
              onChange={(e) =>
                setCustomDate((prev) => [e.target.value, prev[1], prev[2]])
              }
            />
            <input
              type="text"
              name="title"
              className="w-3/12  rounded-sm h-7 text-center ml-1"
              placeholder="AA"
              onChange={(e) =>
                setCustomDate((prev) => [prev[0], e.target.value, prev[2]])
              }
            />
            <input
              type="text"
              name="title"
              className="w-4/12 rounded-sm h-7 text-center ml-1"
              placeholder="YYYY"
              onChange={(e) =>
                setCustomDate((prev) => [prev[0], prev[1], e.target.value])
              }
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StartDate;
