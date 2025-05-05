import { createSlice } from "@reduxjs/toolkit";

export const panelSlice = createSlice({
  name: "componentState",
  initialState: {
    current: "tasks",
  },
  reducers: {
    changeComponent: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { changeComponent } = panelSlice.actions;

export default panelSlice.reducer;
