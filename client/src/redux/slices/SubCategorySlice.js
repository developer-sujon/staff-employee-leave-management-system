//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const SubCategorySlice = createSlice({
  name: "SubCategory",
  initialState: {
    SubCategoryLists: [],
    SubCategoryDropDown: [],
    TotalSubCategory: 0,
    SubCategoryDetails: {
      CategoryId: "",
      SubCategoryName: "",
      SubCategorySlug: "",
      SubCategoryDetails: "",
      SubCategoryStatus: true,
    },
  },
  reducers: {
    SetSubCategoryLists(state, action) {
      state.SubCategoryLists = action.payload;
    },
    SetTotalSubCategory(state, action) {
      state.TotalSubCategory = action.payload;
    },
    SetSubCategoryDropDown(state, action) {
      state.SubCategoryDropDown = action.payload;
    },
    SetSubCategoryDetails(state, action) {
      state.SubCategoryDetails = action.payload;
    },
    ResetSubCategoryDetails(state, action) {
      Object.keys(state.SubCategoryDetails).map((i) => {
        return i === "SubCategoryStatus"
          ? (state.SubCategoryDetails[i] = true)
          : (state.SubCategoryDetails[i] = "");
      });
    },
  },
});

export const {
  SetSubCategoryLists,
  SetTotalSubCategory,
  SetSubCategoryDropDown,
  SetSubCategoryDetails,
  ResetSubCategoryDetails,
} = SubCategorySlice.actions;
export default SubCategorySlice.reducer;
