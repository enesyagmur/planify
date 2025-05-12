import { Task } from "@/lib/types";
import { taskCompletionUpdate } from "@/redux/tasksSlice";
import React from "react";
import { HiDotsVertical } from "react-icons/hi";
import { TiTick } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { FiDelete } from "react-icons/fi";
import taskCompletionChange from "@/lib/taskCompletionChange";
import { updateEditTask } from "@/redux/editSlice";
import { changeComponent } from "@/redux/panelSlice";

interface SingleTaskProps {
  task: Task;
}

const SingleTask = ({ task }: SingleTaskProps) => {
  const dispatch = useDispatch();

  const handleStateChangeClick = async () => {
    // dispatch(taskCompletionUpdate(task.id));
    await taskCompletionChange(task.id);
  };

  //görevi alıp düzenleme sayfasına gider
  const handleEditTaskSelect = () => {
    dispatch(updateEditTask(task));
    dispatch(changeComponent("edit"));
  };
  return (
    <div
      className={`w-full md:6/12 h-[54px] flex  items-center justify-evenly rounded-xl p-2 m-2  transition-all hover:opacity-90  bg-thirdBackground `}
    >
      <button title="Düzenle" onClick={handleEditTaskSelect}>
        <HiDotsVertical />
      </button>
      <p className={`w-4/12 text-md capitalize `}>{task.title}</p>

      <div className="w-3/12 flex items-center justify-center text-secondTextColor text-sm">
        <p>{task.method.quantity}</p>
        <p className="ml-1">{task.method.kind}</p>
      </div>

      <button
        className={`w-7 h-7 rounded-full border-[1px] border-secondBackground flex items-center justify-center text-secondTextColor ${
          task.completion
            ? "hover:text-dangerRed hover:border-dangerRed text-[12px]"
            : "hover:text-mainGreen hover:border-darkGreen"
        } `}
        title="Görev Durumu"
        onClick={handleStateChangeClick}
      >
        {/* {task.completion === false ? <TiTick /> : <FiDelete />} */} +
      </button>
    </div>
  );
};

export default SingleTask;
