import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodayTasksThunk } from "../../features/task/taskThunk";
import TaskItem from "./TaskItem";

const TodayTasks = ({ userId }) => {
  const dispatch = useDispatch();
  const { todayTasks, isLoading, error } = useSelector(
    (state) => state.taskState
  );

  useEffect(() => {
    const fetchTodayTasks = async () => {
      try {
        if (!userId) {
          throw new Error(
            "TODAYTASKS | Taskları çekerken sorun: user Id eksik"
          );
        }
        await dispatch(getTodayTasksThunk(userId)).unwrap();
      } catch (err) {
        throw new Error(err);
      }
    };

    fetchTodayTasks();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 px-2">
      {isLoading ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          Yükleniyor...
        </div>
      ) : error ? (
        <div className="text-center text-red-500 dark:text-red-400 py-8">
          {error}
        </div>
      ) : todayTasks?.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          Henüz bir görev yok.
        </div>
      ) : (
        <div>
          {todayTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodayTasks;
