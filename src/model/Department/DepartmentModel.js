//External Lib Import
const { model, Schema } = require("mongoose");

const DepartmentSchema = new Schema(
  {
    DepartmentName: {
      type: String,
      required: true,
      unique: true,
    },
    DepartmentShortName: {
      type: String,
      required: true,
      unique: true,
    },
    DepartmentDetails: {
      type: String,
    },
    DepartmentStatus: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const DepartmentModel = new model("Department", DepartmentSchema);
module.exports = DepartmentModel;
