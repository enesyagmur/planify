import { useEffect, useState } from "react";
import SelectCategory from "./SelectCategory";
import Title from "./Title";
import Type from "./Type";
import Color from "./Color";
import StartDate from "./StartDate";
import Notification from "./Notification";
import { Task } from "@/lib/types";
import Often from "./Often";
import { useDispatch, useSelector } from "react-redux";
import { StoreRootState } from "@/redux/store";
import { updateEditTask } from "@/redux/editSlice";
import SaveButton from "./SaveButton";
import UpdateButton from "./UpdateButton";
import DeleteButton from "./DeleteButton";

const Edit = () => {
  const editTaskRedux = useSelector(
    (state: StoreRootState) => state.taksEdit.task
  );
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [method, setMethod] = useState<{
    kind: string;
    quantity: number;
  }>({
    kind: "",
    quantity: 0,
  });
  const [often, setOften] = useState<{
    density: string;
    amount: boolean[] | number;
  }>({
    density: "",
    amount: 0,
  });
  const [color, setColor] = useState<string>("");
  const [startDate, setStartDate] = useState<{
    day: number;
    month: number;
    year: number;
  }>({ day: -1, month: -1, year: -1 });
  const [notification, setNotification] = useState<string>("");

  const [newTask, setNewTask] = useState<Task | undefined>(undefined);

  useEffect(() => {
    setNewTask({
      id: "",
      title,
      category,
      method,
      often,
      color,
      startDate,
      notification,
      completion: [{ day: 0, month: 0, year: 0 }],
    });
  }, [title, category, method, often, color, startDate, notification]);

  useEffect(() => {
    if (editTaskRedux) {
      setNewTask(editTaskRedux);
    }
  }, [editTaskRedux]);

  useEffect(() => {
    return () => {
      dispatch(updateEditTask(null));
    };
  }, []);

  console.log(editTaskRedux);

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center justify-center text-mainBackground">
      <div className="w-11/12 md:w-6/12 h-full md:h-4/6 lg:h-3/6 flex flex-col items-center justify-between relative">
        <Title setValue={setTitle} value={title} />
        <SelectCategory setValue={setCategory} value={category} />
        <Type setValue={setMethod} />
        <Often setValue={setOften} />
      </div>
      <div className="w-11/12 md:w-6/12 h-full md:h-4/6 lg:h-3/6 flex flex-col items-center justify-between">
        <Color setValue={setColor} value={color} />
        <StartDate setValue={setStartDate} />
        <Notification setValue={setNotification} />
        {editTaskRedux ? (
          <div className="w-11/12 h-20 flex items-center justify-between">
            <UpdateButton /> <DeleteButton />
          </div>
        ) : (
          <SaveButton newTask={newTask} />
        )}
      </div>
    </div>
  );
};

export default Edit;
