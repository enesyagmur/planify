import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebase";
import { Task } from "./types";

const takeUserTasks = async () => {
  const userId = auth.currentUser?.uid;
  // if (!userId) {
  //   throw new Error("Kullanıcı Oturumu Yok");
  // }
  const tasksRef = collection(db, `users/${userId}/tasks`);

  try {
    const result = await getDocs(tasksRef);

    const tasks = result.docs.map((doc) => ({
      ...(doc.data() as Task),
    }));

    return tasks;
  } catch (err) {
    console.error("Görevler Çekilirken Hata: ", err);
    return [];
  }
};

export default takeUserTasks;
