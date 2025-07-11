import { db } from "../../lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

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

    // Template'i task'a dönüştür (streak alanları hariç)
    const {
      category,
      completed,
      completionType,
      createdAt,
      description,
      duration,
      isRecurring,
      name,
      updatedAt,
    } = template;

    // Yeni task objesi (streak ile ilgili alanlar hariç)
    const newTask = {
      category,
      completed,
      completionType,
      createdAt,
      description,
      duration,
      id: uuidv4(), // yeni task id
      isRecurring,
      name,
      updatedAt,
      templateId: template.id, // template'in orijinal id'si
    };

    todaysTasks.push(newTask);

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

    const userDocRef = doc(db, `users/${userId}`);
    const userDocSnap = await getDoc(userDocRef);
    if (!userDocSnap.exists()) {
      throw new Error("SERVICE | Kullanıcı bulunamadı");
    }

    // Yerel saat dilimine göre todayKey oluştur
    const today = new Date();
    const todayKey =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");

    const userData = userDocSnap.data();
    const taskHistory = userData.taskHistory || {};
    const todayTasks = taskHistory[todayKey] || [];

    // todayTasks içindeki id'leri al
    const todayTaskIds = new Set(todayTasks.map((task) => task.id));
    // todayTasks içindeki templateId'leri al
    const todayTaskTemplateIds = new Set(
      todayTasks.map((task) => task.templateId)
    );

    // Tüm taskTemplate'leri çek
    const templatesColRef = collection(db, `users/${userId}/taskTemplates`);
    const templatesSnapShot = await getDocs(templatesColRef);
    const taskTemplates = templatesSnapShot.empty
      ? []
      : templatesSnapShot.docs.map((doc) => doc.data());

    // isRecurring olanları ve todayTasks'ta aynı templateId ile olmayanları filtrele
    const newRecurringTemplates = taskTemplates
      .filter(
        (template) =>
          template.isRecurring && !todayTaskTemplateIds.has(template.id)
      )
      .map((template) => {
        // Sadece gerekli alanları al, streak ile ilgili alanları hariç tut
        const {
          category,
          completed,
          completionType,
          createdAt,
          description,
          duration,
          isRecurring,
          name,
          updatedAt,
        } = template;
        return {
          category,
          completed,
          completionType,
          createdAt,
          description,
          duration,
          id: uuidv4(), // yeni unique id
          isRecurring,
          name,
          updatedAt,
          templateId: template.id, // orijinal template id
        };
      });

    // Sadece eksik olanları ekle
    const mergedTasks = [...todayTasks, ...newRecurringTemplates];

    // Firestore'u güncelle
    taskHistory[todayKey] = mergedTasks;
    await updateDoc(userDocRef, { taskHistory });

    return mergedTasks;
  } catch (err) {
    throw new Error(
      `SERVICE | Bugünün görevlerini çekerken sorun: ${err.message}`
    );
  }
};

export const taskCompleteService = async (userId, taskId, templateId) => {
  try {
    if (!userId || !taskId || !templateId) {
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

    // Sadece ilgili task'ın completed'ını güncelle
    const updatedTasks = todayTasks.map((task) => {
      if (task.id !== taskId) return task;
      if (task.completed) {
        throw new Error("Bu görev zaten tamamlandı ve tekrar değiştirilemez.");
      }
      return {
        ...task,
        completed: true,
        updatedAt: new Date().toISOString(),
      };
    });

    taskHistory[todayKey] = updatedTasks;
    await updateDoc(userDocRef, { taskHistory });

    // Template streak güncellemesi
    const templateDocRef = doc(
      db,
      `users/${userId}/taskTemplates/${templateId}`
    );
    const templateDocSnap = await getDoc(templateDocRef);

    if (!templateDocSnap.exists()) {
      throw new Error("SERVICE | İlgili template bulunamadı");
    }

    const templateData = templateDocSnap.data();
    let currentStreak = templateData.currentStreak || 0;
    let streakRecord = templateData.streakRecord || 0;
    currentStreak += 1;
    streakRecord = Math.max(streakRecord, currentStreak);

    await updateDoc(templateDocRef, {
      currentStreak,
      streakRecord,
      wasStreakKept: true,
      updatedAt: new Date().toISOString(),
    });

    return updatedTasks;
  } catch (err) {
    throw new Error(`SERVICE | Görev tamamlanırken sorun: ${err.message}`);
  }
};
