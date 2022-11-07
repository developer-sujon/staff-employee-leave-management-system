//Internal Import
import SessionHelper from "../helpers/SessionHelper";
import ToastMessage from "../helpers/ToastMessage";
import { SetUserDetails } from "../redux/slices/UserSlice";
import store from "../redux/store/store";
import RestClient from "./RestClient";

class UserRequest {
  static async ProfileDetails() {
    const { data } = await RestClient.getRequest("/Employee/ProfileDetails");
    if (data) {
      store.dispatch(SetUserDetails(data?.[0]));
      return true;
    }
  }

  static async SendRecoveryOtp(Email) {
    const { data } = await RestClient.getRequest(
      `/Employee/SendRecoveryOtp/${Email}`,
    );
    if (data) {
      ToastMessage.successMessage(data?.message);
      SessionHelper.SetRecoverVerifyEmail(Email);
      return true;
    }
  }

  static async VerifyRecoveryOtp(Otp) {
    const Email = SessionHelper.GetRecoverVerifyEmail();
    console.log(Email);
    const { data } = await RestClient.getRequest(
      `/Employee/VerifyRecoveryOtp/${Email}/${Otp}`,
    );
    if (data) {
      SessionHelper.SetRecoverVerifyOTP(Otp);
      ToastMessage.successMessage(data?.message);
      return true;
    }
  }

  static async RecoveryResetPass(PostBody) {
    const Email = SessionHelper.GetRecoverVerifyEmail();
    const Otp = SessionHelper.GetRecoverVerifyOTP();
    const { data } = await RestClient.postRequest(
      `/Employee/RecoveryResetPass/${Email}/${Otp}`,
      PostBody,
    );
    if (data) {
      ToastMessage.successMessage(data?.message);
      return true;
    }
  }

  static async VerifyAccountSentOtp() {
    const Email = SessionHelper.GetRecoverVerifyEmail();
    console.log(Email);
    const { data } = await RestClient.getRequest(
      `/User/VerifyAccountSentOtp/${Email}`,
    );
    if (data) {
      ToastMessage.successMessage(data?.message);
      return true;
    }
  }

  static async VerifyAccountVerifyOtp(Email, Otp) {
    const { data } = await RestClient.getRequest(
      `/User/VerifyAccountVerifyOtp/${Email}/${Otp}`,
    );
    if (data) {
      ToastMessage.successMessage(data?.message);
      return true;
    }
  }

  static async ProfileUpdate(PostBody) {
    const { data } = await RestClient.updateRequest(
      `/Employee/ProfileUpdate`,
      PostBody,
    );
    if (data) {
      ToastMessage.successMessage(data?.message);
      return true;
    }
  }

  static async EmployeeChangePassword(PostBody) {
    const { data } = await RestClient.putRequest(
      `/Employee/EmployeeChangePassword`,
      PostBody,
    );
    if (data) {
      ToastMessage.successMessage(data?.message);
      return true;
    }
  }
}

export default UserRequest;
