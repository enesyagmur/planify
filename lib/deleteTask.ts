import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "./firebase";

export const deleteTask = async (taskId: string) => {
  const userId = auth.currentUser?.uid;

  const taskRef = doc(db, `users/${userId}/tasks`, taskId);

  try {
    await deleteDoc(taskRef);
    console.log("Görev Silindi");
  } catch (err) {
    console.error("Görev Silme Başarısız: ", err);
  }
};
