const { createSlice } = require("@reduxjs/toolkit");
const {
  addNewCategoryThunk,
  fetchCategoriesThunk,
} = require("./categoryThunk");

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "categoryState",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //yeni kategori ekleme
      .addCase(addNewCategoryThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addNewCategoryThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.push(action.payload);
      })
      .addCase(addNewCategoryThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //kategorileri getirme
      .addCase(fetchCategoriesThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
