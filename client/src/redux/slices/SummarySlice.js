//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const SummarySlice = createSlice({
  name: "Summary",
  initialState: {
    SummaryLists: [],
    TotalSummary: 0,
  },
  reducers: {
    SetSummaryLists(state, action) {
      state.SummaryLists = action.payload;
    },
    SetTotalSummary(state, action) {
      state.TotalSummary = action.payload;
    },
  },
});

export const { SetSummaryLists, SetTotalSummary } = SummarySlice.actions;
export default SummarySlice.reducer;
