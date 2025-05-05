import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface RepeatProps {
  setValue: Dispatch<
    SetStateAction<{
      density: string;
      amount: boolean[] | number;
    }>
  >;
}

const Often = ({ setValue }: RepeatProps) => {
  const [typeArray, setTypeArray] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);
  const [daysArray, setDaysArray] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  //hafta seçimini kayıt etme
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
      setTypeArray([true, false, false, false]);
      setValue(() => ({
        density: "everyday",
        amount: 1,
      }));
    } else if (input === "weekly") {
      setTypeArray([false, true, false, false]);
      setValue((prev) => ({
        ...prev,
        density: "weekly",
      }));
    } else if (input === "loop") {
      setTypeArray([false, false, true, false]);
      setValue((prev) => ({
        ...prev,
        density: "everyxdays",
      }));
    } else {
      setTypeArray([false, false, false, true]);
      setValue((prev) => ({
        ...prev,
        density: "once",
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
    <div className="w-11/12 h-20 flex flex-col items-start justify-evenly ">
      <label
        htmlFor="title"
        className="input-label cursor-help"
        title="Görevinizin Tekrar Sıklığını Seçiniz"
      >
        Tekrar Tercihi / Sıklığı
      </label>
      <div className="w-full h-7 flex items-center justify-between ">
        <select
          name=""
          id=""
          onChange={(e) => handleChange(e.target.value)}
          className={`rounded-sm h-7 cursor-pointer ${
            typeArray[1] || typeArray[2] ? "w-5/12" : "w-full"
          }`}
        >
          <option className="text-start ">----</option>
          <option className="text-start" value="everyday">
            ♾️ Her Gün
          </option>
          <option className="text-start" value="weekly">
            📆 Belirli Günler
          </option>
          <option className="text-start" value="loop">
            🛞 X Günde Bir Tekrar
          </option>
          <option className="text-start" value="once">
            📍 Tekrar Yok
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
                amount: Number(e.target.value),
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

export default Often;
