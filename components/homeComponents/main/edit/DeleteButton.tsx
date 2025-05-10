import React from "react";
import { TiDelete } from "react-icons/ti";

const DeleteButton = () => {
  return (
    <div className="w-4/12 h-20 flex items-end justify-center text-secondTextColor pb-2">
      <button className="w-full flex items-center justify-center  p-1 rounded-md  bg-dangerRed text-secondTextColor">
        <TiDelete className="mr-1" />
        DeleteButton
      </button>
    </div>
  );
};

export default DeleteButton;
