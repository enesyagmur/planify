import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { IoAddCircle } from "react-icons/io5";
import { auth } from "@/lib/firebase";
import { TiDeleteOutline } from "react-icons/ti";

interface Task {
  id: string;
  name: string;
  minute: number;
}

interface Plan {
  id: string;
  name: string;
  creatorUserId: string;
  tasks?: Task[];
}

const CreatePlan = () => {
  const [newPlan, setNewPlan] = useState<Plan | undefined>(undefined);
  const [newTaskName, setNewTaskName] = useState<string>("");
  const [newTaskMinute, setNewTaskMinute] = useState<number>(0);

  const taskAddToPlan = (name: string, minute: number) => {
    const newTask: Task = { id: uuidv4(), name: name, minute: minute };

    setNewPlan((prevPlan) => ({
      id: prevPlan?.id || uuidv4(),
      creatorUserId: prevPlan?.creatorUserId || auth.currentUser?.uid || "",
      name: prevPlan?.name || "",
      tasks: [...(prevPlan?.tasks || []), newTask],
    }));

    setNewTaskName("");
    setNewTaskMinute(0);
  };

  const taskDeleteInPlan = (id: string) => {
    setNewPlan((prevPlan) => {
      if (!prevPlan) return undefined;

      const updatedTasks =
        prevPlan.tasks?.filter((element) => element.id !== id) || [];

      return {
        ...prevPlan,
        tasks: updatedTasks,
      };
    });
  };

  console.log(newPlan);

  return (
    <div className="w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 border-[1px] border-neutral-800 rounded-md">
      <div className="w-full h-12 flex items-center justify-start pt-2">
        <h1 className="ml-5 text-xl">Plan Oluştur</h1>
      </div>

      <div className="w-full h-16 flex items-center justify-between  p-1">
        <input
          type="text"
          placeholder="Plan adı"
          className="w-11/12 h-[30px] bg-neutral-700 pl-2 ml-4 rounded-sm capitalize"
          onChange={(e) =>
            setNewPlan({
              ...newPlan,
              id: uuidv4(),
              creatorUserId: auth.currentUser?.uid || "",
              name: e.target.value,
            })
          }
        />
      </div>

      {newPlan?.tasks
        ? newPlan.tasks.map((item) => (
            <div
              className="w-11/12 h-12 flex items-center justify-evenly"
              key={item.id}
            >
              <input
                type="text"
                placeholder="Görev adı"
                className="w-9/12 h-[30px] bg-neutral-800 pl-2 ml-4 rounded-sm capitalize"
                value={item.name}
                onChange={(e) => {
                  const updatedTasks = newPlan.tasks?.map((element) =>
                    element.id === item.id
                      ? { ...element, name: e.target.value }
                      : element
                  );

                  setNewPlan({
                    ...newPlan,
                    tasks: updatedTasks || [],
                  });
                }}
              />
              <input
                type="text"
                placeholder="dk"
                className="w-1/12 h-[30px] bg-neutral-800 text-center rounded-sm"
                value={item.minute}
                onChange={(e) => setNewTaskMinute(Number(e.target.value))}
              />
              <button
                className="hover:text-customPink"
                onClick={() => taskDeleteInPlan(item.id)}
              >
                <TiDeleteOutline />
              </button>
            </div>
          ))
        : null}

      <div className="w-full h-16 flex items-center justify-between  p-1">
        <input
          type="text"
          placeholder="Görev adı"
          className="w-9/12 h-[30px] bg-neutral-700 pl-2 ml-4 rounded-sm capitalize"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <input
          type="text"
          placeholder="dk"
          className="w-1/12 h-[30px] bg-neutral-700 text-center rounded-sm"
          value={newTaskMinute}
          onChange={(e) => setNewTaskMinute(Number(e.target.value))}
        />

        <button
          className="text-customYellow w-1/12 text-2xl hover:opacity-50"
          onClick={() => taskAddToPlan(newTaskName, newTaskMinute)}
        >
          <IoAddCircle />
        </button>
      </div>
    </div>
  );
};

export default CreatePlan;
