import { Tasks } from "@/lib/types";
import { createSlice } from "@reduxjs/toolkit";

interface TasksState {
  tasksArray: Tasks;
}

const initialState: TasksState = {
  tasksArray: [],
};

export const tasksSlice = createSlice({
  name: "reduxTasks",
  initialState,
  reducers: {
    setReduxTasks: (state, action) => {
      state.tasksArray = [...action.payload];
    },
  },
});

export const { setReduxTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
