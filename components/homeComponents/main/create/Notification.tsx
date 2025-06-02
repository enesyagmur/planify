import { Task } from "@/lib/types";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface NotificationProps {
  oldTask: Task | undefined;
  setNewTask: Dispatch<SetStateAction<Task>>;
}

const Notification = ({ oldTask, setNewTask }: NotificationProps) => {
  const [selectCheck, setSelectCheck] = useState<boolean>(false);
  const [hour, setHour] = useState<number>(-1);
  const [minute, setMinute] = useState<number>(-1);

  useEffect(() => {
    const newNotification = { active: selectCheck, hour: hour, minute: minute };

    setNewTask((prewTask: Task) => ({
      ...prewTask,
      notification: newNotification,
    }));
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
          {oldTask?.notification.active ? "🔊" : "🔈"}
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
              type="number"
              name="hour"
              className="w-6/12 rounded-sm h-7 text-center"
              placeholder="Saat"
              onChange={(e) => setHour(Number(e.target.value))}
              value={oldTask?.notification.hour}
            />
            <input
              type="number"
              name="minute"
              className="w-6/12  rounded-sm h-7 text-center ml-1"
              placeholder="Dakika"
              onChange={(e) => setMinute(Number(e.target.value))}
              value={oldTask?.notification.minute}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Notification;
