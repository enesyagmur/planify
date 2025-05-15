import { useEffect, useState } from "react";
import SelectCategory from "./SelectCategory";
import Title from "./Title";
import Type from "./Type";
import Color from "./Color";
import StartDate from "./StartDate";
import Notification from "./Notification";
import { Task } from "@/lib/types";
import Often from "./Often";
import { useSelector } from "react-redux";
import { StoreRootState } from "@/redux/store";
import SaveButton from "./SaveButton";
import UpdateButton from "./UpdateButton";
import DeleteButton from "./DeleteButton";

const Edit = () => {
  const [showButtons, setShowButtons] = useState<boolean>(false);
  const editTaskRedux = useSelector(
    (state: StoreRootState) => state.taksEdit.task
  );
  const [renderKey, setRenderKey] = useState<number>(0);

  const handleRender = () => {
    setRenderKey((prev) => prev + 1);
  };

  const [newTask, setNewTask] = useState<Task>({
    id: "",
    title: "",
    category: "",
    method: { kind: "", quantity: 0 },
    often: { density: "", amount: 0 },
    color: "",
    startDate: { day: 0, month: 0, year: 0 },
    notification: { active: false, hour: 0, minute: 0 },
    completion: [{ day: 0, month: 0, year: 0 }],
  });

  useEffect(() => {
    if (editTaskRedux !== null) {
      setShowButtons(true);
    }
  }, [editTaskRedux]);

  useEffect(() => {
    if (editTaskRedux !== null) {
      setNewTask({
        id: editTaskRedux.id,
        title: editTaskRedux.title,
        category: editTaskRedux.category,
        method: editTaskRedux.method,
        often: editTaskRedux.often,
        color: editTaskRedux.color,
        startDate: editTaskRedux.startDate,
        notification: editTaskRedux.notification,
        completion: editTaskRedux.completion,
      });
    }
  }, [showButtons]);

  // useEffect(() => {
  //   return () => {
  //     dispatch(updateEditTask(null));
  //   };
  // }, []);

  return (
    <div
      key={renderKey}
      className="w-full h-full flex flex-col md:flex-row items-center justify-center text-mainBackground"
    >
      <div className="w-11/12 md:w-6/12 h-full md:h-4/6 lg:h-3/6 flex flex-col items-center justify-between relative">
        <Title setNewTask={setNewTask} oldTask={newTask} />
        <SelectCategory setNewTask={setNewTask} oldTask={newTask} />
        <Type setNewTask={setNewTask} oldTask={newTask} />
        <Often setNewTask={setNewTask} oldTask={newTask} />
      </div>
      <div className="w-11/12 md:w-6/12 h-full md:h-4/6 lg:h-3/6 flex flex-col items-center justify-between">
        <Color setNewTask={setNewTask} oldTask={newTask} />
        <StartDate setNewTask={setNewTask} oldTask={newTask} />
        <Notification setNewTask={setNewTask} oldTask={newTask} />
        {showButtons && editTaskRedux ? (
          <div className="w-11/12 h-20 flex items-center justify-between">
            <UpdateButton taskId={editTaskRedux?.id} resetFunc={handleRender} />
            <DeleteButton taskId={editTaskRedux?.id} resetFunc={handleRender} />
          </div>
        ) : (
          <SaveButton oldTask={newTask} resetFunc={handleRender} />
        )}
      </div>
    </div>
  );
};

export default Edit;
