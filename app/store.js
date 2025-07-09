import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./features/category/categorySlice";
import authSlice from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    authState: authSlice,
    categoryState: categorySlice,
  },
});
