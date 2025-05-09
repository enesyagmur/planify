import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

const taskCompletionChange = async (taskid: string, newCompletion: boolean) => {
  if (!auth.currentUser)
    return console.error("Task Completion güncellenemedi, Aktif kullanıcı yok");

  const uid: string = auth.currentUser.uid;
  const taskRef = doc(db, "users", uid, "tasks", taskid);

  try {
    await updateDoc(taskRef, {
      completion: newCompletion,
    });

    console.log("Task Güncellendi");
  } catch (err) {
    console.error("Task Completion güncellenemedi: ", err);
  }
};

export default taskCompletionChange;
