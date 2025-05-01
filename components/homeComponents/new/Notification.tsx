import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface NotificationProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Notification = ({ value, setValue }: NotificationProps) => {
  const [selectCheck, setSelectCheck] = useState<boolean>(true);
  const [hour, setHour] = useState<string>("");
  const [minute, setMinute] = useState<string>("");

  useEffect(() => {
    if (selectCheck) {
      if (hour !== "" && minute !== "") {
        setValue(`${hour}.${minute}`);
      }
    } else {
      setValue("");
    }
  }, [hour, minute, selectCheck]);

  return (
    <div className="w-11/12 h-20 flex flex-col items-start justify-evenly ">
      <label htmlFor="title" className="input-label">
        Bildirim
      </label>

      <div className="w-full h-7 flex items-center justify-between text-xl">
        <button
          name="notification"
          id=""
          className="w-5 h-7"
          onClick={() => setSelectCheck(!selectCheck)}
        >
          {selectCheck ? "🔊" : "🔈"}
        </button>

        {selectCheck ? (
          <div className="w-6/12 h-7 flex items-center justify-end">
            <input
              type="text"
              name="hour"
              className="w-6/12 rounded-sm h-7 text-center"
              placeholder="Saat"
              onChange={(e) => setHour(e.target.value)}
            />
            <input
              type="text"
              name="minute"
              className="w-6/12  rounded-sm h-7 text-center ml-1"
              placeholder="Dakika"
              onChange={(e) => setMinute(e.target.value)}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Notification;
