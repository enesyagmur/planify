import { setReduxTasks } from "@/redux/tasksSlice";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { AppDispatch } from "@/redux/store";
import { Task } from "./types";

export const listenToUserTasks = (uid: string, dispatch: AppDispatch) => {
  const tasksRef = collection(db, `users/${uid}/tasks`);

  const unSubscribe = onSnapshot(tasksRef, (snapshot) => {
    const tasks = snapshot.docs.map((doc) => ({
      ...(doc.data() as Task),
    }));
    dispatch(setReduxTasks(tasks));
  });
  return unSubscribe;
};
