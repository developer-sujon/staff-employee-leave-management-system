//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const LoaderSlice = createSlice({
  name: "Loader",
  initialState: {
    IsLoading: false,
  },
  reducers: {
    SetLoading: (state) => {
      state.IsLoading = true;
    },
    RemoveLoading: (state) => {
      state.IsLoading = false;
    },
  },
});

export const { SetLoading, RemoveLoading } = LoaderSlice.actions;
export default LoaderSlice.reducer;
