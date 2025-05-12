import dailyFilter from "@/lib/dailyFilter";
import { Tasks } from "@/lib/types";
import { StoreRootState } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import WaitingTasks from "./WaitingTasks";
import DoneTasks from "./DoneTasks";

const DailyTasks = () => {
  const [filteredTasks, setFilteredTasks] = useState<Tasks>([]);
  const [waitingTasks, setWaitingTasks] = useState<Tasks>([]);
  const [doneTasks, setDoneTasks] = useState<Tasks>([]);

  const time = new Date();
  const thisDay = time.getDay();
  const thisMonth = time.getMonth();
  const thisYear = time.getFullYear();

  const reduxTasks = useSelector(
    (state: StoreRootState) => state.reduxTasks.tasksArray
  );

  useEffect(() => {
    if (reduxTasks.length > 0) {
      setFilteredTasks(dailyFilter(reduxTasks));
    }
  }, [reduxTasks]);

  useEffect(() => {
    setWaitingTasks(() => {
      return filteredTasks.filter((item) =>
        item.completion.find(
          (value) =>
            value.day !== thisDay &&
            value.month !== thisMonth &&
            value.year !== thisYear
        )
      );
    });

    setDoneTasks(() => {
      return filteredTasks.filter((item) =>
        item.completion.find(
          (value) =>
            value.day === thisDay &&
            value.month === thisMonth &&
            value.year === thisYear
        )
      );
    });
  }, [filteredTasks]);

  console.log(filteredTasks);

  return (
    <div className="w-11/12 h-full flex flex-col md:flex-row items-center justify-evenly overflow-y-scroll md:overflow-hidden">
      <WaitingTasks value={waitingTasks} />
      <DoneTasks value={doneTasks} />
    </div>
  );
};

export default DailyTasks;
