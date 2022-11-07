//Internal Import
import ToastMessage from "../helpers/ToastMessage";
import { SetLogin } from "../redux/slices/AuthSlice";
import { SetUserDetails } from "../redux/slices/UserSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class AuthRequest {
  static async RegisterUser(postBody) {
    const { data } = await RestClient.postRequest(
      "/Auth/RegisterUser",
      postBody,
    );
    if (data) {
      ToastMessage.successMessage(data?.message);
      return true;
    }
  }

  static async LoginUser(postBody) {
    const { data } = await RestClient.postRequest("/Auth/LoginUser", postBody);

    if (data) {
      store.dispatch(SetLogin(data?.AccessToken));
      store.dispatch(SetUserDetails(data?.UserDetails));
      ToastMessage.successMessage("User Login Successfull");
    }
  }
}

export default AuthRequest;
