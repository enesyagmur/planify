import { createSlice } from "@reduxjs/toolkit";
import {
  addNewTaskTemplateThunk,
  getTaskTemplatesThunk,
  useTemplateThunk,
  getTodayTasksThunk,
  taskCompleteThunk,
} from "./taskThunk";

const initialState = {
  taskTemplates: [],
  taskHistory: {},
  todayTasks: [],
  isLoading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "taskState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // TEMPLATE---------------------------------------------------

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
      })

      // getTaskTemplatesThunk
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
      })

      // useTemplateThunk
      .addCase(useTemplateThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(useTemplateThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // taskHistory'yi güncelle
        const { todayKey, todaysTasks } = action.payload;
        state.taskHistory = {
          ...state.taskHistory,
          [todayKey]: todaysTasks,
        };
        state.error = null;
      })
      .addCase(useTemplateThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // TASK---------------------------------------------------

      // getTodayTasksThunk
      .addCase(getTodayTasksThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTodayTasksThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todayTasks = action.payload;
        state.error = null;
      })
      .addCase(getTodayTasksThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // GÖREV TAMAMLAMA (taskCompleteThunk)
      .addCase(taskCompleteThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(taskCompleteThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        // todayTasks'ı güncelle
        state.todayTasks = action.payload;
        state.error = null;
      })
      .addCase(taskCompleteThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default taskSlice.reducer;
