import React, { useEffect } from "react";
import TemplateItem from "./TemplateItem";
import { useDispatch, useSelector } from "react-redux";
import { getTaskTemplatesThunk } from "../../features/task/taskThunk";

const TaskTemplates = ({ userId }) => {
  const taskState = useSelector((state) => state.taskState);
  const { taskTemplates, loading, error } = taskState;
  const dispatch = useDispatch();

  useEffect(() => {
    const getTemplates = async () => {
      try {
        if (!userId) {
          throw new Error(
            "TASKTEMPLATES | Templates getirilirken sorun: User Id eksik"
          );
        }
        await dispatch(getTaskTemplatesThunk(userId)).unwrap();
      } catch (err) {
        throw new Error(err);
      }
    };
    getTemplates();
  }, []);

  return (
    <div className="w-11/12  mx-auto mt-6 px-2">
      {loading ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          Yükleniyor...
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-8">{error}</div>
      ) : Array.isArray(taskTemplates) && taskTemplates.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          Henüz bir görev şablonu yok.
        </div>
      ) : (
        Array.isArray(taskTemplates) &&
        taskTemplates.length > 0 && (
          <div className="w-full flex flex-wrap items-center justify-evenly">
            {taskTemplates.map((task) => (
              <TemplateItem key={task.id} task={task} userId={userId} />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default TaskTemplates;
