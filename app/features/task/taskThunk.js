import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewTaskTemplateService,
  getTaskTemplatesService,
  getTodayTasksService,
  taskCompleteService,
  useTemplateService,
} from "./taskService";

//TEMPLATE--------------------------------------
export const addNewTaskTemplateThunk = createAsyncThunk(
  "task/addNewTaskTemplate",
  async ({ userId, newTask }, thunkAPI) => {
    try {
      const result = await addNewTaskTemplateService(userId, newTask);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getTaskTemplatesThunk = createAsyncThunk(
  "task/getTaskTemplates",
  async (userId, thunkAPI) => {
    try {
      const result = await getTaskTemplatesService(userId);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const useTemplateThunk = createAsyncThunk(
  "task/useTemplate",
  async ({ userId, template }, thunkAPI) => {
    try {
      const result = await useTemplateService(userId, template);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

//TASK---------------------------------------------------
export const getTodayTasksThunk = createAsyncThunk(
  "task/getTodayTasks",
  async (userId, thunkAPI) => {
    try {
      const result = await getTodayTasksService(userId);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const taskCompleteThunk = createAsyncThunk(
  "task/taskComplete",
  async ({ userId, taskId, templateId }, thunkAPI) => {
    try {
      const result = await taskCompleteService(userId, taskId, templateId);
      return result;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
