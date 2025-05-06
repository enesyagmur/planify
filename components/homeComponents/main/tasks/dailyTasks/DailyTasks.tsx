import dailyFilter from "@/lib/dailyFilter";
import takeUserTasks from "@/lib/takeUserTasks";
import { Tasks } from "@/lib/types";
import { StoreRootState } from "@/redux/store";
import { setReduxTasks } from "@/redux/tasksSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SingleTask from "../SingleTask";

const DailyTasks = () => {
  const [filteredTasks, setFilteredTasks] = useState<Tasks>([]);
  const reduxTasks = useSelector(
    (state: StoreRootState) => state.reduxTasks.tasksArray
  );
  const dispatch = useDispatch();

  const fetchData = async () => {
    const result: Tasks = await takeUserTasks();
    if (result) {
      dispatch(setReduxTasks(result));
      setFilteredTasks(dailyFilter(result));
    }
  };

  useEffect(() => {
    if (Array.isArray(reduxTasks) && reduxTasks.length === 0) {
      fetchData();
    }
    if (reduxTasks.length !== 0) {
      setFilteredTasks(dailyFilter(reduxTasks));
    }
  }, []);

  return (
    <div className="w-11/12 h-full flex flex-col items-center justify-center">
      {filteredTasks &&
        filteredTasks.map((item) => <SingleTask key={item.id} task={item} />)}
    </div>
  );
};

export default DailyTasks;
