import { db } from "../../lib/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export const createNewCategoryService = async (userId, category) => {
  try {
    if (
      !category.name ||
      category.color === "bg-purple-700" ||
      !category.color ||
      !userId
    ) {
      throw new Error("SERVICE | Kategori oluşturma hatası: bilgiler eksik");
    }
    const categoryColRef = collection(db, `users/${userId}/categories`);

    const docRef = doc(categoryColRef); // otomatik id oluşturur
    const newCol = {
      id: docRef.id,
      name: category.name,
      color: category.color,
      createdAt: new Date().toISOString(),
    };
    await setDoc(docRef, newCol);
    return newCol;
  } catch (err) {
    throw new Error(
      `SERVICE | Yeni kategori oluşturma işleminde sorun: ${err}`
    );
  }
};

export const getCategoriesService = async (userId) => {
  try {
    if (!userId) {
      throw new Error(
        "SERVICE | Kategoriler getirilirken sorun: Kullanıcı Id eksik"
      );
    }

    const categoriesDocRef = collection(db, `users/${userId}/categories`);
    const categoriesSnapShot = await getDocs(categoriesDocRef);
    if (categoriesSnapShot.empty) {
      return [];
    }
    const categories = categoriesSnapShot.docs.map((doc) => ({
      ...doc.data(),
    }));
    return categories;
  } catch (err) {
    throw new Error(err);
  }
};
