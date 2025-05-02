import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface NotificationProps {
  setValue: Dispatch<SetStateAction<string>>;
}

const Notification = ({ setValue }: NotificationProps) => {
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
    <div className="w-11/12 h-20 flex  items-center justify-between">
      <div className="w-6/12 h-20 flex flex-col items-start justify-evenly">
        <label
          htmlFor="title"
          className="input-label cursor-help"
          title="Bildirim Tercihinizi Belirtiniz"
        >
          Bildirim Aç / Kapat
        </label>
        <button
          name="notification"
          id=""
          className="w-5 h-7 text-2xl"
          onClick={() => setSelectCheck(!selectCheck)}
          title="Bildirim Kapat / Aç"
        >
          {selectCheck ? "🔊" : "🔈"}
        </button>
      </div>
      {selectCheck ? (
        <div className="w-6/12 h-20 flex flex-col items-start justify-evenly">
          <label
            htmlFor="title"
            className="input-label cursor-help"
            title="Bildirim Almak istediğiniz Zamanı Giriniz"
          >
            Bildirim Zamanı
          </label>

          <div className="w-full h-7 flex items-center justify-end">
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
        </div>
      ) : null}
    </div>
  );
};

export default Notification;
