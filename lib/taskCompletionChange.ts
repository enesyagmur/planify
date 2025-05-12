import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { Task } from "./types";

const taskCompletionChange = async (taskid: string) => {
  if (!auth.currentUser)
    return console.error("Task Completion güncellenemedi, Aktif kullanıcı yok");
  const uid: string = auth.currentUser.uid;
  const time = new Date();
  const thisDay = time.getDate();
  const thisMonth = time.getMonth();
  const thisYear = time.getFullYear();
  const todayDate = { day: thisDay, month: thisMonth, year: thisYear };

  const taskRef = doc(db, "users", uid, "tasks", taskid);

  try {
    const result = await getDoc(taskRef);
    const newTask: Task = result.data();

    if (
      newTask.completion.filter(
        (completionTime) =>
          completionTime.day !== todayDate.day ||
          completionTime.month !== todayDate.month ||
          completionTime.year !== todayDate.year
      )
    ) {
      newTask.completion.push(todayDate);
    } else {
      const newArray: [{ day: number; month: number; year: number }] =
        newTask.completion.filter(
          (completionTime) =>
            completionTime.day !== todayDate.day &&
            completionTime.month !== todayDate.month &&
            completionTime.year !== todayDate.year
        );

      newTask.completion = newArray;
    }

    try {
      await updateDoc(taskRef, newTask);
      console.log("Task Durumu Güncellendi");
    } catch (err) {
      console.error("Task Durum Değişikliği Yapılamadı: ", err);
    }

    console.log("Task Bulundu");
  } catch (err) {
    console.error("Task Bulunamadı: ", err);
  }
};

export default taskCompletionChange;
