import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Icon from "./Icon";

interface TitleProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const Title = ({ value, setValue }: TitleProps) => {
  const [icon, setIcon] = useState<string>("");

  useEffect(() => {
    setValue(icon + value);
  }, [icon]);

  return (
    <div className="w-11/12 h-14 flex items-center justify-between">
      <div className="w-8/12 h-full flex-col items-start justify-between">
        <label htmlFor="title" className="input-label">
          Başlık
        </label>
        <input
          type="text"
          name="title"
          className="input mt-1"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </div>
      <Icon setValue={setIcon} />
    </div>
  );
};

export default Title;
