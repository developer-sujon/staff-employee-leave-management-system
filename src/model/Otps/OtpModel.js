//External Lib Import
const { model, Schema } = require("mongoose");

const otpSchema = new Schema(
  {
    OtpCode: {
      type: String,
      required: true,
    },
    OtpStatus: {
      type: Number,
      default: 0,
      required: true,
    },
    OtpCodeExpire: {
      type: Number,
      default: Date.now() + 15 * 60 * 1000,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (prop) => `Invalid Email Address: ${prop.value}`,
      },
    },
  },
  { versionKey: false, timestamps: true },
);

const OtpModel = model("Otp", otpSchema);
module.exports = OtpModel;
