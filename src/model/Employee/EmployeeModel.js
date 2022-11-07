//External Lib Import
const { model, Schema } = require("mongoose");

const EmployeesSchema = new Schema(
  {
    DepartmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    Gender: {
      type: String,
      required: true,
    },
    DateOfBirth: {
      type: String,
      required: true,
    },
    Address: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
      unique: true,
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
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Roles: {
      type: String,
      enum: ["STAFF", "HOD", "ADMIN"],
      default: "STAFF",
      required: true,
    },
    Image: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const EmployeesModel = model("Employee", EmployeesSchema);
module.exports = EmployeesModel;
