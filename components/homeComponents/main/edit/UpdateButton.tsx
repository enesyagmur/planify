import React from "react";
import { MdChangeCircle } from "react-icons/md";

const UpdateButton = () => {
  return (
    <div className="w-9/12 h-20 flex items-end justify-center text-mainTextColor pb-2">
      <button
        className="w-full flex items-center justify-center p-1 rounded-md  bg-darkGreen hover:bg-opacity-70"
        title="Görevi Güncelle"
      >
        <MdChangeCircle className="mr-1" />
        Güncelle
      </button>
    </div>
  );
};

export default UpdateButton;
