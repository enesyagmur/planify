import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodayTasksThunk } from "../../features/task/taskThunk";
import TaskItem from "./TaskItem";
import { Timer } from "lucide-react";

const TodayTasks = ({ userId }) => {
  const dispatch = useDispatch();
  const { todayTasks, isLoading, error } = useSelector(
    (state) => state.taskState
  );

  useEffect(() => {
    const fetchTodayTasks = async () => {
      try {
        if (!userId) {
          throw new Error("TODAYTASK | Taskları çekerken sorun: user Id eksik");
        }
        await dispatch(getTodayTasksThunk(userId)).unwrap();
      } catch (err) {
        throw new Error(err);
      }
    };

    fetchTodayTasks();
  }, []);

  // Görevleri tamamlanma durumuna göre ayır
  const completedTasks =
    todayTasks?.filter((task) => task.completed || task.isCompleted) || [];
  //toplam süre hesaplama
  const totalDuration = completedTasks.reduce(
    (sum, task) => sum + Number(task.duration || 0),
    0
  );

  const hours = Math.floor(totalDuration / 60);
  const minutes = totalDuration % 60;

  let time = "";
  if (hours > 0 && minutes > 0) {
    time = `${hours} Saat ${minutes} Dakika`;
  } else if (hours > 0) {
    time = `${hours} Saat`;
  } else {
    time = `${minutes} Dakika`;
  }

  const incompleteTasks =
    todayTasks?.filter((task) => !task.completed && !task.isCompleted) || [];

  return (
    <div className="w-full  mx-auto mt-6 px-2">
      {isLoading ? (
        <div className="text-center text-gray-400 py-8">Yükleniyor...</div>
      ) : error ? (
        <div className="text-center text-red-400 py-8">{error}</div>
      ) : todayTasks?.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          Henüz bir görev yok.
        </div>
      ) : (
        <div className="w-full h-[500px] py-2 flex flex-col lg:flex-row items-center justify-between ">
          {/* Yapılmayan Görevler */}
          {incompleteTasks.length > 0 && (
            <div className="w-6/12 h-full overflow-y-auto bg-neutral-900 rounded-lg p-6 border border-neutral-700">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                <h2 className="text-xl font-semibold text-white">Devam Eden</h2>
                <span className="ml-2 bg-purple-600 text-white px-2 py-1 rounded-full text-sm">
                  {incompleteTasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {incompleteTasks.map((task) => (
                  <TaskItem key={task.id} task={task} userId={userId} />
                ))}
              </div>
            </div>
          )}

          {/* Yapılan Görevler */}
          {completedTasks.length > 0 && (
            <div className="w-6/12 h-full overflow-y-auto bg-neutral-900 rounded-lg p-6 border border-neutral-700">
              <div className="flex items-center mb-4">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <h2 className="text-xl font-semibold text-white">Tamamlanan</h2>
                <span className="ml-2 bg-green-600 text-white px-2 py-1 rounded-full text-sm">
                  {completedTasks.length}
                </span>
                <span
                  className="
    flex items-center gap-2
    px-4 py-2
    bg-white dark:bg-zinc-900
    rounded-lg shadow-md
    text-zinc-800 dark:text-zinc-100
    font-semibold text-lg
    transition
  "
                  aria-label="Tamamlanan görevlerin toplam süresi"
                >
                  <Timer className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span>{time}</span>
                </span>
              </div>
              <div className="space-y-3">
                {completedTasks.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TodayTasks;
