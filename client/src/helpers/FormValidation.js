class FormValidation {
  static isEmpty(value) {
    return value.length <= 0; 
  }
  static isEmail(value) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regexEmail.test(value);
  }
  static isMobile(value) {
    let regexMobile = /(^(\+88|0088|88)?(01){1}[3456789]{1}(\d){8})$/;
    return regexMobile.test(value);
  }
}

export default FormValidation; 
