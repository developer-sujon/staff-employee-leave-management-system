class SessionHelper {
  static SetToken(token) {
    localStorage.setItem("AccessToken", token);
  }
  static GetToken() {
    return localStorage.getItem("AccessToken");
  }
  static RemoveToken() {
    return localStorage.removeItem("AccessToken");
  }
  static SetUserDetails(UserDetails) {
    localStorage.setItem("UserDetails", JSON.stringify(UserDetails));
  }
  static GetUserDetails() {
    return JSON.parse(localStorage.getItem("UserDetails"));
  }
  static RemoveUserDetails() {
    return localStorage.removeItem("UserDetails");
  }
  static SetRecoverVerifyEmail(Email) {
    return localStorage.setItem("RecoverVerifyEmail", Email);
  }
  static GetRecoverVerifyEmail() {
    return localStorage.getItem("RecoverVerifyEmail");
  }
  static SetRecoverVerifyOTP(OTP) {
    return localStorage.setItem("RecoverVerifyOTP", OTP);
  }
  static GetRecoverVerifyOTP() {
    return localStorage.getItem("RecoverVerifyOTP");
  }

  static SetLanguage(Language) {
    localStorage.setItem("i18nextLng", Language);
  }
  static GetLanguage() {
    return localStorage.getItem("i18nextLng");
  }

  static SetTheme(Theme) {
    localStorage.setItem("Theme", Theme);
  }
  static GetTheme() {
    return localStorage.getItem("Theme");
  }

  static ResetStorage() {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("UserDetails");
    localStorage.removeItem("RecoverVerifyEmail");
    localStorage.removeItem("RecoverVerifyOTP");
    return true;
  }
}

export default SessionHelper;
