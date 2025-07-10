import { db } from "../../lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

//TEMPLATE---------------------------------------------------
export const addNewTaskTemplateService = async (userId, newTask) => {
  try {
    if (!userId) {
      throw new Error(
        "SERVICE | Yeni görev oluştururken sorun: kullanıcı Id eksik"
      );
    }

    // Zorunlu alanları kontrol et

    if (!newTask.name || !newTask.completionType) {
      throw new Error(
        `SERVICE | Yeni görev oluştururken sorun: yazı alanları eksik`
      );
    }

    // completionType kontrolü
    if (!["expedition", "temporary"].includes(newTask.completionType)) {
      throw new Error(
        "SERVICE | completionType sadece 'expedition' veya 'temporary' olabilir"
      );
    }

    // duration kontrolü - completionType'a göre
    if (newTask.completionType === "temporary") {
      if (!newTask.duration || newTask.duration <= 0) {
        throw new Error(
          "SERVICE | temporary completionType için duration 0'dan büyük olmalıdır"
        );
      }
    }
    // expedition için duration 0 olabilir, kontrol etmeye gerek yok

    const templatesColRef = collection(db, `users/${userId}/taskTemplates`);
    const docRef = doc(templatesColRef);

    const task = {
      id: docRef.id,
      ...newTask,
      duration:
        newTask.completionType === "expedition"
          ? newTask.duration || 0
          : newTask.duration,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      currentStreak: 0,
      streakRecord: 0,
      wasStreakKept: false,
    };

    await setDoc(docRef, task);

    return task;
  } catch (err) {
    throw new Error(`SERVICE | Yeni görev oluştururken sorun: ${err.message}`);
  }
};

export const getTaskTemplatesService = async (userId) => {
  try {
    if (!userId) {
      throw new Error("SERVICE | Kullanıcı ID eksik");
    }

    const templatesColRef = collection(db, `users/${userId}/taskTemplates`);
    const templatesSnapShot = await getDocs(templatesColRef);

    const taskTemplates = templatesSnapShot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return taskTemplates;
  } catch (err) {
    throw new Error(
      `SERVICE |  Task template'leri getirirken sorun: ${err.message}`
    );
  }
};

export const useTemplateService = async (userId, template) => {
  try {
    if (!userId || !template) {
      throw new Error("SERVICE | Kullanıcı ID veya template eksik");
    }

    const today = new Date();
    const todayKey = today.toISOString().slice(0, 10);

    const userDocRef = doc(db, `users/${userId}`);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      throw new Error(
        `SERVICE | Template'i taskHistory'ye eklerken sorun: Kullanıcı Bulunamadı`
      );
    }

    const userData = userDocSnap.data();
    const taskHistory = userData.taskHistory || {};

    const todaysTasks = taskHistory[todayKey] || [];
    todaysTasks.push(template);

    taskHistory[todayKey] = todaysTasks;

    await updateDoc(userDocRef, { taskHistory });
    return { todayKey: todayKey, todaysTasks: todaysTasks };
  } catch (err) {
    throw new Error(
      `SERVICE | Template'i taskHistory'ye eklerken sorun: ${err.message}`
    );
  }
};

//TASK---------------------------------------------------
export const getTodayTasksService = async (userId) => {
  try {
    if (!userId) {
      throw new Error("SERVICE | Kullanıcı ID eksik");
    }

    const today = new Date();
    const todayKey = today.toISOString().slice(0, 10);

    const userDocRef = doc(db, `users/${userId}`);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      throw new Error("SERVICE | Kullanıcı bulunamadı");
    }

    const userData = userDocSnap.data();
    const taskHistory = userData.taskHistory || {};

    const todayTasks = taskHistory[todayKey] || [];
    return todayTasks;
  } catch (err) {
    throw new Error(
      `SERVICE | Bugünün görevlerini çekerken sorun: ${err.message}`
    );
  }
};

export const taskCompleteService = async (userId, taskId) => {
  try {
    if (!userId || !taskId) {
      throw new Error(`SERVICE | Görev tamamlanırken sorun: Bilgiler eksik`);
    }
    const userDocRef = doc(db, `users/${userId}`);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      throw new Error("SERVICE | Kullanıcı bulunamadı");
    }

    const today = new Date();
    const todayKey = today.toISOString().slice(0, 10);

    const userData = userDocSnap.data();
    const taskHistory = userData.taskHistory || {};
    const todayTasks = taskHistory[todayKey] || [];

    const updatedTasks = todayTasks.map((task) => {
      if (task.id !== taskId) return task;
      // Eğer görev zaten tamamlandıysa tekrar tamamlanamaz
      if (task.completed) {
        throw new Error("Bu görev zaten tamamlandı ve tekrar değiştirilemez.");
      }
      // Tamamlanmamışsa, tamamlandı olarak işaretle ve streak güncelle
      let currentStreak = task.currentStreak || 0;
      let streakRecord = task.streakRecord || 0;
      currentStreak += 1;
      streakRecord = Math.max(streakRecord, currentStreak);

      return {
        ...task,
        completed: true,
        currentStreak,
        streakRecord,
        wasStreakKept: true,
        updatedAt: new Date().toISOString(),
      };
    });

    taskHistory[todayKey] = updatedTasks;
    await updateDoc(userDocRef, { taskHistory });

    return updatedTasks;
  } catch (err) {
    throw new Error(`SERVICE | Görev tamamlanırken sorun: ${err.message}`);
  }
};
