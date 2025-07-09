import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../lib/firebase";
import { addDoc, doc, setDoc } from "firebase/firestore";

// Kullanıcı kayıt işlemi
export const registerUser = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;
    await updateProfile(user, { displayName: name });

    const userDocRef = doc(db, "users", user.uid);
    const newUser = {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      createdAt: new Date().toISOString(),
      categories: [],
      tasks: [],
    };

    await setDoc(userDocRef, newUser);

    return user;
  } catch (error) {
    return error.message;
  }
};

// Kullanıcı giriş işlemi
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    return error.message;
  }
};

// Kullanıcı çıkış işlemi
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    return error.message;
  }
};

// Kullanıcı durumu dinleme
export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};
