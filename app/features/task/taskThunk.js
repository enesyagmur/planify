import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addNewTaskTemplateService,
  getTaskTemplatesService,
} from "./taskService";

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
