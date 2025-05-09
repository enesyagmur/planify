import { Task } from "./types";

export const isTodayTask = (task: Task, todayDate: number[]): boolean => {
  if (!task.often) {
    throw new Error("isTodayTask ts dosyasına eksik veri gönderiliyor");
  }

  if (task.often.density === "everyday") {
    return true;
  }

  if (
    task.often.density === "weekly" &&
    Array.isArray(task.often.amount) &&
    task.often.amount[todayDate[0]] === true
  ) {
    return true;
  }

  if (
    task.often.density === "everyxdays" &&
    typeof task.often.amount === "number"
  ) {
    const taskDate = new Date(
      task.startDate.year,
      task.startDate.month,
      task.startDate.day
    );
    const today = new Date();
    const start = Date.UTC(
      taskDate.getFullYear(),
      taskDate.getMonth(),
      taskDate.getDate()
    );
    const end = Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const diffDays = Math.floor((end - start) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return false;
    }

    return diffDays % task.often.amount === 0;
  }

  return false;
};
