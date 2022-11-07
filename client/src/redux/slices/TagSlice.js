//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const TagSlice = createSlice({
  name: "Tag",
  initialState: {
    TagLists: [],
    TagDropDown: [],
    TotalTag: 0,
    TagDetails: {
      TagName: "",
      TagSlug: "",
      TagDetails: "",
      TagStatus: true,
    },
  },
  reducers: {
    SetTagLists(state, action) {
      state.TagLists = action.payload;
    },
    SetTotalTag(state, action) {
      state.TotalTag = action.payload;
    },
    SetTagDropDown(state, action) {
      state.TagDropDown = action.payload;
    },
    SetTagDetails(state, action) {
      state.TagDetails = action.payload;
    },
    ResetTagDetails(state, action) {
      Object.keys(state.TagDetails).map((i) => {
        return i === "TagStatus"
          ? (state.TagDetails[i] = true)
          : (state.TagDetails[i] = "");
      });
    },
  },
});

export const {
  SetTagLists,
  SetTotalTag,
  SetTagDropDown,
  SetTagDetails,
  ResetTagDetails,
} = TagSlice.actions;
export default TagSlice.reducer;
