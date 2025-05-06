import isTodayTask from "./isTodayTask";
import { Tasks, Task } from "./types";

const dailyFilter = (data: Tasks) => {
  const time = new Date();
  const thisDay = time.getDay();
  const thisMonth = time.getMonth();
  const thisYear = time.getFullYear();

  const todayDate: number[] = [thisDay, thisMonth, thisYear];

  const dailyTask: Tasks = data
    .map((task) => (isTodayTask(task, todayDate) ? task : null))
    .filter((task): task is Task => task !== null);

  console.log(dailyTask);

  //ilk satırda task ı fonksiyona gönderip kontrol ettiriyoruz sonuç true dönünce
  //diziye gönderiyoruz değilse null, en son null dönenleri diziden filter ile siliyoruz

  return dailyTask;
};

export default dailyFilter;
