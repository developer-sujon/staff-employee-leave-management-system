//External Lib Import
import { createSlice } from "@reduxjs/toolkit";
import SessionHelper from "../../helpers/SessionHelper";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    UserDetails: SessionHelper.GetUserDetails() || undefined,
  },
  reducers: {
    SetUserDetails(state, action) {
      SessionHelper.SetUserDetails(action.payload);
      state.UserDetails = SessionHelper.GetUserDetails() || undefined;
    },
    RemoveUserDetails(state, action) {
      SessionHelper.RemoveUserDetails();
      state.UserDetails = SessionHelper.GetUserDetails() || undefined;
    },
  },
});

export const { SetUserDetails, RemoveUserDetails } = UserSlice.actions;
export default UserSlice.reducer;
