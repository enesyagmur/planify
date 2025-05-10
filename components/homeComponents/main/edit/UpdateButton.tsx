import React from "react";
import { MdChangeCircle } from "react-icons/md";

const UpdateButton = () => {
  return (
    <div className="w-7/12 h-20 flex items-end justify-center text-secondTextColor pb-2">
      <button className="w-full flex items-center justify-center p-1 rounded-md  bg-darkGreen text-secondTextColor ">
        <MdChangeCircle className="mr-1" />
        UpdateButton
      </button>
    </div>
  );
};

export default UpdateButton;
