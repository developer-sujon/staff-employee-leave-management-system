//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const LeaveSlice = createSlice({
  name: "Leave",
  initialState: {
    LeaveLists: [],
    LeaveDropDown: [],
    TotalLeave: 0,
    LeaveDetails: {
      LeaveType: "",
      LeaveDetails: "",
      StartLeaveDate: "",
      EndLeaveDate: "",
      NumOfDay: "",
    },
  },
  reducers: {
    SetLeaveLists(state, action) {
      state.LeaveLists = action.payload;
    },
    SetTotalLeave(state, action) {
      state.TotalLeave = action.payload;
    },
    SetLeaveDropDown(state, action) {
      state.LeaveDropDown = action.payload;
    },
    SetLeaveDetails(state, action) {
      state.LeaveDetails = action.payload;
    },
    ResetLeaveDetails(state, action) {
      state.LeaveType = "";
      state.LeaveDetails = "";
      state.StartLeaveDate = "";
      state.EndLeaveDate = "";
      state.NumOfDay = "";
    },
  },
});

export const {
  SetLeaveLists,
  SetTotalLeave,
  SetLeaveDropDown,
  SetLeaveDetails,
  ResetLeaveDetails,
} = LeaveSlice.actions;
export default LeaveSlice.reducer;
