import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../lib/firebase";

// Kullanıcı kayıt işlemi
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
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
