import { deleteTask } from "@/lib/deleteTask";

import { TiDelete } from "react-icons/ti";

interface DeleteButtonProps {
  taskId: string;
  resetFunc: () => void;
}

const DeleteButton = ({ taskId, resetFunc }: DeleteButtonProps) => {
  const handleClick = async () => {
    await deleteTask(taskId);
    resetFunc();
  };
  return (
    <div className="w-3/12 h-20 flex items-end justify-center text-mainTextColor pb-2">
      <button
        className="w-full flex items-center justify-center ml-1  p-1 rounded-md  bg-dangerRed  hover:bg-opacity-70"
        title="Görevi Kalıcı Olarak Sil"
        onClick={handleClick}
      >
        <TiDelete className="mr-1" />
        Sil
      </button>
    </div>
  );
};

export default DeleteButton;
