import { onAuthStateChange } from "../../features/auth/authService";
import { clearUser, setLoading, setUser } from "../../features/auth/authSlice";

const { useEffect } = require("react");
const { useDispatch } = require("react-redux");

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = onAuthStateChange((user) => {
      if (user) {
        // Sadece serializable alanları al
        const plainUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        };
        dispatch(setUser(plainUser));
      } else {
        dispatch(clearUser());
      }
    });
    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthListener;
