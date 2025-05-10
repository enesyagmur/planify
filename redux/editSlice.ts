import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@/lib/types";

interface EditState {
  task: null | Task;
}

const initialState: EditState = {
  task: null,
};

export const editSlice = createSlice({
  name: "editTask",
  initialState,
  reducers: {
    updateEditTask: (state, action: PayloadAction<null | Task>) => {
      state.task = action.payload;
    },
  },
});

export const { updateEditTask } = editSlice.actions;
export default editSlice.reducer;
