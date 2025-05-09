import { Tasks } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
      state.tasksArray = action.payload;
    },
    taskCompletionUpdate: (state, action: PayloadAction<string>) => {
      state.tasksArray.forEach((item) => {
        if (item.id === action.payload) {
          item.completion = !item.completion;
        }
      });
    },
  },
});

export const { setReduxTasks, taskCompletionUpdate } = tasksSlice.actions;

export default tasksSlice.reducer;
