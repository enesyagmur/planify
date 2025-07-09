import { createSlice } from "@reduxjs/toolkit";
import { addNewTaskTemplateThunk, getTaskTemplatesThunk } from "./taskThunk";

const initialState = {
  taskTemplates: [],
  taskHistory: {},
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "taskState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // addNewTaskTemplateThunk
      .addCase(addNewTaskTemplateThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addNewTaskTemplateThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.taskTemplates.push(action.payload);
        state.error = null;
      })
      .addCase(addNewTaskTemplateThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // getTaskTemplatesThunk
    builder
      .addCase(getTaskTemplatesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTaskTemplatesThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.taskTemplates = action.payload;
        state.error = null;
      })
      .addCase(getTaskTemplatesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
