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
    <div className="w-11/12 h-20 flex items-center justify-between">
      <div className="w-8/12 h-20 flex-col items-start justify-between  pt-2">
        <label
          htmlFor="title"
          className="input-label cursor-help"
          title="Göreviniz için Bir İsim Belirleyiniz"
        >
          Başlık
        </label>
        <input
          type="text"
          name="title"
          className="input mt-2"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          placeholder="Görev İsmi"
        />
      </div>
      <Icon setValue={setIcon} />
    </div>
  );
};

export default Title;
