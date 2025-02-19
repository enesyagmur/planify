import React, { Dispatch, SetStateAction } from "react";

interface ChangeComponentProps {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

const ChangeComponent = ({ count, setCount }: ChangeComponentProps) => {
  return (
    <div className="w-full lg:h-10 flex items-start justify-start">
      <button
        className={`change-component-button ${
          count === 0 ? "bg-customPurple" : null
        }`}
        onClick={() => setCount(0)}
      >
        Günlük
      </button>
      <button
        className={`change-component-button ${
          count === 1 ? "bg-customPurple" : null
        }`}
        onClick={() => setCount(1)}
      >
        Plan
      </button>
      <button
        className={`change-component-button ${
          count === 2 ? "bg-customPurple" : null
        }`}
        onClick={() => setCount(2)}
      >
        Durum
      </button>
      <button
        className={`change-component-button ${
          count === 3 ? "bg-customPurple" : null
        }`}
        onClick={() => setCount(3)}
      >
        Geçmiş
      </button>
    </div>
  );
};

export default ChangeComponent;
