//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const LeaveTypeSlice = createSlice({
  name: "LeaveType",
  initialState: {
    LeaveTypeLists: [],
    LeaveTypeDropDown: [],
    TotalLeaveType: 0,
    LeaveTypeDetails: {
      LeaveTypeName: "",
      LeaveTypeShortName: "",
      LeaveTypeDetails: "",
      LeaveTypeStatus: true,
    },
  },
  reducers: {
    SetLeaveTypeLists(state, action) {
      state.LeaveTypeLists = action.payload;
    },
    SetTotalLeaveType(state, action) {
      state.TotalLeaveType = action.payload;
    },
    SetLeaveTypeDropDown(state, action) {
      state.LeaveTypeDropDown = action.payload;
    },
    SetLeaveTypeDetails(state, action) {
      state.LeaveTypeDetails = action.payload;
    },
    ResetLeaveTypeDetails(state, action) {
      Object.keys(state.LeaveTypeDetails).map((i) => {
        return i === "LeaveTypeStatus"
          ? (state.LeaveTypeDetails[i] = true)
          : (state.LeaveTypeDetails[i] = "");
      });
    },
  },
});

export const {
  SetLeaveTypeLists,
  SetTotalLeaveType,
  SetLeaveTypeDropDown,
  SetLeaveTypeDetails,
  ResetLeaveTypeDetails,
} = LeaveTypeSlice.actions;
export default LeaveTypeSlice.reducer;
