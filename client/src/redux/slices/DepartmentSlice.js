//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const DepartmentSlice = createSlice({
  name: "Department",
  initialState: {
    DepartmentLists: [],
    DepartmentDropDown: [],
    TotalDepartment: 0,
    DepartmentDetails: {
      DepartmentName: "",
      DepartmentShortName: "",
      DepartmentDetails: "",
      DepartmentStatus: true,
    },
  },
  reducers: {
    SetDepartmentLists(state, action) {
      state.DepartmentLists = action.payload;
    },
    SetTotalDepartment(state, action) {
      state.TotalDepartment = action.payload;
    },
    SetDepartmentDropDown(state, action) {
      state.DepartmentDropDown = action.payload;
    },
    SetDepartmentDetails(state, action) {
      state.DepartmentDetails = action.payload;
    },
    ResetDepartmentDetails(state, action) {
      Object.keys(state.DepartmentDetails).map((i) => {
        return i === "DepartmentStatus"
          ? (state.DepartmentDetails[i] = true)
          : (state.DepartmentDetails[i] = "");
      });
    },
  },
});

export const {
  SetDepartmentLists,
  SetTotalDepartment,
  SetDepartmentDropDown,
  SetDepartmentDetails,
  ResetDepartmentDetails,
} = DepartmentSlice.actions;
export default DepartmentSlice.reducer;
