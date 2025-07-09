const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  user: null,
  loading: true,
};

const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.loading = false;
      state.user = nul;
    },
    setLoading: (state) => {
      state.loading = true;
    },
  },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;
