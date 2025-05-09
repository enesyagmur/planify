import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { Task } from "./types";
import { AppDispatch } from "@/redux/store";
import { setReduxTasks } from "@/redux/tasksSlice";

const takeUserTasks = async (dispatch: AppDispatch) => {
  const userId = auth.currentUser?.uid;
  if (!userId) {
    throw new Error("Kullanıcı Oturumu Yok");
  }
  const tasksRef = collection(db, `users/${userId}/tasks`);

  try {
    const result = await getDocs(tasksRef);

    const tasks = result.docs.map((doc) => ({
      ...(doc.data() as Task),
    }));

    dispatch(setReduxTasks(tasks));
  } catch (err) {
    console.error("Görevler Çekilirken Hata: ", err);
    return [];
  }
};

export default takeUserTasks;
