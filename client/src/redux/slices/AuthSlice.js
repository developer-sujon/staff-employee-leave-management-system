//External Lib Import
import { createSlice } from "@reduxjs/toolkit";
import SessionHelper from "../../helpers/SessionHelper";

const AuthSlice = createSlice({
  name: "Auth",
  initialState: {
    AccessToken: SessionHelper.GetToken() || undefined,
  },
  reducers: {
    SetLogin: (state, action) => {
      SessionHelper.SetToken(action.payload);
      state.AccessToken = SessionHelper.GetToken() || undefined;
    },
    SetLogout: (state, action) => {
      SessionHelper.RemoveToken();
      SessionHelper.RemoveUserDetails();
      state.AccessToken = SessionHelper.GetToken() || undefined;
    },
  },
});

export const { SetLogin, SetLogout } = AuthSlice.actions;
export default AuthSlice.reducer;
