import React from "react";
import Icon from "./Icon";

const Title = () => {
  return (
    <div className="w-11/12 h-14 flex items-center justify-between">
      <div className="w-8/12 h-full flex-col items-start justify-between">
        <label htmlFor="title" className="input-label">
          Başlık
        </label>
        <input type="text" name="title" className="input mt-1" />
      </div>
      <Icon />
    </div>
  );
};

export default Title;
