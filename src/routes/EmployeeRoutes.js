//External Lib Import
const EmployeeRoutes = require("express").Router();

//Internal Lib Import
const {
  CheckEmployeeAuth,
  CheckAdminAuth,
} = require("../middleware/CheckAuthLogin");
const EmployeeControllers = require("../controller/Employee/EmployeeControllers");

//Employee Create
EmployeeRoutes.post(
  "/EmployeeCreate",
  CheckEmployeeAuth,
  CheckAdminAuth,
  EmployeeControllers.EmployeeCreate,
);

//Employee List
EmployeeRoutes.get(
  "/EmployeeList/:pageNumber/:perPage/:searchKeyword",
  CheckEmployeeAuth,
  CheckAdminAuth,
  EmployeeControllers.EmployeeList,
);

//Employee Profile
EmployeeRoutes.get(
  "/EmployeeDetails/:id",
  CheckEmployeeAuth,
  CheckAdminAuth,
  EmployeeControllers.EmployeeDetails,
);

//Update Employee
EmployeeRoutes.patch(
  "/EmployeeUpdate/:id",
  CheckEmployeeAuth,
  CheckAdminAuth,
  EmployeeControllers.EmployeeUpdate,
);

//Delete Employee
EmployeeRoutes.delete(
  "/EmployeeDelete/:id",
  CheckEmployeeAuth,
  CheckAdminAuth,
  EmployeeControllers.EmployeeDelete,
);

//Profile Details
EmployeeRoutes.get(
  "/ProfileDetails",
  CheckEmployeeAuth,
  EmployeeControllers.ProfileDetails,
);

//Profile Update
EmployeeRoutes.patch(
  "/ProfileUpdate",
  CheckEmployeeAuth,
  EmployeeControllers.ProfileUpdate,
);

//Employee Change Password
EmployeeRoutes.put(
  "/EmployeeChangePassword",
  CheckEmployeeAuth,
  EmployeeControllers.EmployeeChangePassword,
);

//Send Recovery Otp
EmployeeRoutes.get(
  "/SendRecoveryOtp/:Email",
  EmployeeControllers.SendRecoveryOtp,
);

//Verify Recovary Otp
EmployeeRoutes.get(
  "/VerifyRecoveryOtp/:Email/:OtpCode",
  EmployeeControllers.VerifyRecoveryOtp,
);

//Recovery Reset Pass
EmployeeRoutes.post(
  "/RecoveryResetPass/:Email/:OtpCode",
  EmployeeControllers.RecoveryResetPass,
);

//DepartmentHeads
EmployeeRoutes.get(
  "/DepartmentHeads",
  CheckEmployeeAuth,
  CheckAdminAuth,
  EmployeeControllers.DepartmentHeads,
);

//StaffList
EmployeeRoutes.get(
  "/StaffList",
  CheckEmployeeAuth,
  CheckAdminAuth,
  EmployeeControllers.StaffList,
);

module.exports = EmployeeRoutes;
