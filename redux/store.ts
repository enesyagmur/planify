import { configureStore } from "@reduxjs/toolkit";
import panelSlice from "./panelSlice";
import tasksSlice from "./tasksSlice";

export const store = configureStore({
  reducer: {
    componentState: panelSlice,
    reduxTasks: tasksSlice,
  },
});

export type StoreRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
