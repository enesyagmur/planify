import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface RepeatProps {
  value: string;
  setValue: Dispatch<SetStateAction<object>>;
}

const Repeat = ({ setValue }: RepeatProps) => {
  const [typeArray, setTypeArray] = useState<boolean[]>([true, false, false]);
  const [daysArray, setDaysArray] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    if (typeArray[1] === true) {
      setValue((prevValue) => ({
        ...prevValue,
        amount: daysArray,
      }));
    }
  }, [daysArray]);

  const handleChange = (input: string) => {
    if (input === "everyday") {
      setTypeArray([true, false, false]);
      setValue(() => ({
        oftenType: "everyday",
        oftenAmount: 1,
      }));
    } else if (input === "weekly") {
      setTypeArray([false, true, false]);
      setValue(() => ({
        oftenType: "weekly",
      }));
    } else {
      setTypeArray([false, false, true]);
      setValue(() => ({
        oftenType: "everyxdays",
      }));
    }
  };

  const selectedDay = (index: number) => {
    setDaysArray((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  return (
    <div className="w-11/12 h-14 flex flex-col items-start justify-between mt-4">
      <label htmlFor="title" className="input-label">
        Tekrar
      </label>
      <div className="w-full h-7 flex items-center justify-between ">
        <select
          name=""
          id=""
          className={`rounded-sm h-7 ${typeArray[0] ? "w-full" : "w-5/12 "}`}
          onChange={(e) => handleChange(e.target.value)}
        >
          <option className="text-start text-black">----</option>
          <option value="everyday" className="text-start text-black">
            ☀️ Her Gün
          </option>
          <option className="text-start" value="weekly">
            📆 Belirli Günler
          </option>
          <option className="text-start" value="loop">
            *️⃣ X Günde Bir Tekrar
          </option>
        </select>

        {typeArray[2] ? (
          <input
            type="text"
            name="title"
            className="w-6/12 pl-2 rounded-sm h-7"
            placeholder="Miktar"
            onChange={(e) =>
              setValue((prevValue) => ({
                ...prevValue,
                amount: e.target.value,
              }))
            }
          />
        ) : null}

        {typeArray[1] ? (
          <div className="w-6/12 h-7 flex items-center justify-between md:justify-evenly">
            <button
              className={`${
                daysArray[0] ? "weekly-button-active" : "weekly-button"
              }`}
              onClick={() => selectedDay(0)}
            >
              Pz
            </button>
            <button
              className={`${
                daysArray[1] ? "weekly-button-active" : "weekly-button"
              }`}
              onClick={() => selectedDay(1)}
            >
              Pts
            </button>
            <button
              className={`${
                daysArray[2] ? "weekly-button-active" : "weekly-button"
              }`}
              onClick={() => selectedDay(2)}
            >
              Sl
            </button>
            <button
              className={`${
                daysArray[3] ? "weekly-button-active" : "weekly-button"
              }`}
              onClick={() => selectedDay(3)}
            >
              Çrş
            </button>
            <button
              className={`${
                daysArray[4] ? "weekly-button-active" : "weekly-button"
              }`}
              onClick={() => selectedDay(4)}
            >
              Prş
            </button>
            <button
              className={`${
                daysArray[5] ? "weekly-button-active" : "weekly-button"
              }`}
              onClick={() => selectedDay(5)}
            >
              Cm
            </button>
            <button
              className={`${
                daysArray[6] ? "weekly-button-active" : "weekly-button"
              }`}
              onClick={() => selectedDay(6)}
            >
              Cts
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Repeat;
