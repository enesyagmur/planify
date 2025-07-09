import { db } from "../../lib/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

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
