import {
  createNewCategoryService,
  getCategoriesService,
} from "./categoryService";

const { createAsyncThunk } = require("@reduxjs/toolkit");

//yeni kategori oluşturma
export const addNewCategoryThunk = createAsyncThunk(
  "category/addNewCategory",
  async ({ userId, category }, thunkAPI) => {
    try {
      const newCategory = await createNewCategoryService(userId, category);
      return newCategory;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

//kategorileri getirme
export const fetchCategoriesThunk = createAsyncThunk(
  "category/fetchCategories",
  async (userId, thunkAPI) => {
    try {
      const categories = await getCategoriesService(userId);
      return categories;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
