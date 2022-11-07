//External Lib Import
const { model, Schema } = require("mongoose");

const LeaveSchema = new Schema(
  {
    EmployeeId: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    LeaveType: {
      type: Schema.Types.ObjectId,
      ref: "LeaveType",
      required: true,
    },
    LeaveDetails: {
      type: String,
      required: true,
    },
    StartLeaveDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    EndLeaveDate: {
      type: Date,
      required: true,
    },
    NumOfDay: {
      type: Number,
      required: true,
    },
    AdminRemark: {
      type: String,
      default: "",
    },
    HodRemark: {
      type: String,
      default: "",
    },
    AdminStatus: {
      type: String,
      enum: ["Pending", "Rejected", "Approved"],
      default: "Pending",
    },
    HodStatus: {
      type: String,
      enum: ["Pending", "Rejected", "Approved"],
      default: "Pending",
    },
  },
  { timestamps: true, versionKey: false },
);

const LeaveModel = new model("Leave", LeaveSchema);
module.exports = LeaveModel;
