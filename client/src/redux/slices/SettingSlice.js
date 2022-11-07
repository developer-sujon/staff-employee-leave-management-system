//External Lib Import
import { createSlice } from "@reduxjs/toolkit";
import SessionHelper from "../../helpers/SessionHelper";

const SettingSlice = createSlice({
  name: "Setting",
  initialState: {
    LayoutColor: SessionHelper.GetTheme() || "light",
    LayoutType: "vertical",
    LayoutWidth: "fluid",
    LeftSideBarTheme: SessionHelper.GetTheme() || "light",
    LeftSideBarType: "fixed",
    Language: SessionHelper.GetLanguage(),
  },

  reducers: {
    ChangeLayoutType(state, action) {
      state.LayoutType = action.payload;
    },
    ChangeLeftSideBarType(state, action) {
      state.LeftSideBarType = action.payload;
    },
    ShowLeftSidebar(state, action) {
      state.LeftSidebar = true;
    },
    SetTheme(state, action) {
      SessionHelper.SetTheme(action.payload);
      state.LayoutColor = SessionHelper.GetTheme();
      state.LeftSideBarTheme = SessionHelper.GetTheme();
    },
    SetLanguage(state, action) {
      SessionHelper.SetLanguage(action.payload);
      state.Language = SessionHelper.GetLanguage();
    },
  },
});

export const {
  ChangeLayoutType,
  ChangeLeftSideBarType,
  ShowLeftSidebar,
  SetTheme,
  SetLanguage,
} = SettingSlice.actions;

/* Layout types and other constants */
export const LAYOUT_VERTICAL = "vertical";
export const LAYOUT_HORIZONTAL = "topnav";
export const LAYOUT_DETACHED = "detached";
export const LAYOUT_FULL = "full";

export const LAYOUT_COLOR_LIGHT = "light";
export const LAYOUT_COLOR_DARK = "dark";

export const LAYOUT_WIDTH_FLUID = "fluid";
export const LAYOUT_WIDTH_BOXED = "boxed";

export const LEFT_SIDEBAR_THEME_DEFAULT = "default";
export const LEFT_SIDEBAR_THEME_LIGHT = "light";
export const LEFT_SIDEBAR_THEME_DARK = "dark";

export const LEFT_SIDEBAR_TYPE_FIXED = "fixed";
export const LEFT_SIDEBAR_TYPE_CONDENSED = "condensed";
export const LEFT_SIDEBAR_TYPE_SCROLLABLE = "scrollable";

export default SettingSlice.reducer;
