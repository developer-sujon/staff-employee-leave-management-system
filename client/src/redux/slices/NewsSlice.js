//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const NewsSlice = createSlice({
  name: "News",
  initialState: {
    NewsLists: [],
    NewsDropDown: [],
    TotalNews: 0,
    NewsDetails: {
      Category: "",
      SubCategory: "",
      Tags: [],
      NewsTitle: "",
      NewsThumbnail: "",
      NewsDetails: "",
      NewsStatus: true,
    },
  },
  reducers: {
    SetNewsLists(state, action) {
      state.NewsLists = action.payload;
    },
    SetTotalNews(state, action) {
      state.TotalNews = action.payload;
    },
    SetNewsDropDown(state, action) {
      state.NewsDropDown = action.payload;
    },
    SetNewsDetails(state, action) {
      state.NewsDetails = action.payload;
    },
    ResetNewsDetails(state, action) {
      state.Category = "";
      state.SubCategory = "";
      state.Tags = [];
      state.NewsTitle = "";
      state.NewsThumbnail = "";
      state.NewsDetails = "";
      state.NewsStatus = true;
    },
  },
});

export const {
  SetNewsLists,
  SetTotalNews,
  SetNewsDropDown,
  SetNewsDetails,
  ResetNewsDetails,
} = NewsSlice.actions;
export default NewsSlice.reducer;
