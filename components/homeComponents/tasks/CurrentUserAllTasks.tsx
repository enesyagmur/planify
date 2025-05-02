import takeUserTasks from "@/lib/takeUserTasks";
import { Tasks } from "@/lib/types";
import React, { useEffect, useState } from "react";
import SingleTask from "./SingleTask";

const CurrentUserAllTasks = () => {
  const [tasks, setTasks] = useState<Tasks>([]);

  const fetchData = async () => {
    const result: Tasks = await takeUserTasks();
    if (result) {
      setTasks(result);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(tasks);

  return (
    <div className="w-11/12 h-5/6 flex flex-col items-center justify-center">
      {tasks && tasks.map((item) => <SingleTask key={item.id} task={item} />)}
    </div>
  );
};

export default CurrentUserAllTasks;
