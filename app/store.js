import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./features/category/categorySlice";
import authSlice from "./features/auth/authSlice";
import taskSlice from "./features/task/taskSlice";

export const store = configureStore({
  reducer: {
    authState: authSlice,
    categoryState: categorySlice,
    taskState: taskSlice,
  },
});
