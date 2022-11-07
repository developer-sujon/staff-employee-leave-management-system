//External Lib Import
const { model, Schema } = require("mongoose");

const LeaveTypeSchema = new Schema(
  {
    LeaveTypeName: {
      type: String,
      required: true,
      unique: true,
    },
    LeaveTypeDetails: {
      type: String,
    },
    LeaveTypeStatus: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const LeaveTypeModel = new model("LeaveType", LeaveTypeSchema);
module.exports = LeaveTypeModel;
