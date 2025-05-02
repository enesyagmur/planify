import React, { Dispatch, SetStateAction } from "react";

interface ChangeComponentProps {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

const ChangeComponent = ({ count, setCount }: ChangeComponentProps) => {
  return (
    <div className="w-full h-12 flex items-start justify-start text-secondTextColor">
      <div
        className={`change-component-frame ${
          count === 0 ? "bg-secondBackground text-mainTextColor" : null
        }`}
        onClick={() => setCount(0)}
      >
        <button className={`change-component-button`}>✅</button>
        <p>Görevler</p>
      </div>
      <div
        className={`change-component-frame ${
          count === 1 ? "bg-secondBackground text-mainTextColor" : null
        }`}
        onClick={() => setCount(1)}
      >
        <button className={`change-component-button `}>✏️</button>
        <p>Düzenle</p>
      </div>

      <div
        className={`change-component-frame ${
          count == 2 ? "bg-secondBackground text-mainTextColor" : null
        }`}
        onClick={() => setCount(2)}
      >
        <button className={`change-component-button `}>📊</button>
        <p>Performans</p>
      </div>

      <div
        className={`change-component-frame ${
          count === 3 ? "bg-secondBackground text-mainTextColor" : null
        }`}
        onClick={() => setCount(3)}
      >
        <button className={`change-component-button `}>📆</button>
        <p>Takvim</p>
      </div>
    </div>
  );
};

export default ChangeComponent;
