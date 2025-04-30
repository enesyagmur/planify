import React, { Dispatch, SetStateAction, useState } from "react";

interface NotificationProps {
  value: boolean | number[];
  setValue: Dispatch<SetStateAction<number[] | boolean>>;
}

const Notification = ({ value, setValue }: NotificationProps) => {
  const [selectCheck, setSelectCheck] = useState<boolean>(true);

  return (
    <div className="w-11/12 h-14 flex flex-col items-start justify-between mt-4">
      <label htmlFor="title" className="input-label">
        Bildirim
      </label>

      <div className="w-full h-7 flex items-center justify-between ">
        <input
          type="checkbox"
          name="notification"
          id=""
          className="w-5 h-7"
          onClick={() => {
            setSelectCheck(!selectCheck);
            if (selectCheck === false) {
              setValue(false);
            }
          }}
        />
        {selectCheck ? (
          <div className="w-6/12 h-7 flex items-center justify-end">
            <input
              type="text"
              name="hour"
              className="w-6/12 rounded-sm h-7 text-center"
              placeholder="Saat"
              onChange={(e) => {
                if (Array.isArray(value)) {
                  setValue([Number(e.target.value), 0]);
                }
              }}
            />
            <input
              type="text"
              name="minute"
              className="w-6/12  rounded-sm h-7 text-center ml-1"
              placeholder="Dakika"
              onChange={(e) => {
                if (Array.isArray(value)) {
                  setValue(() => [value[0], Number(e.target.value)]);
                }
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Notification;
