//External Lib Import
const LeaveTypeRoutes = require("express").Router();
const LeaveTypeControllers = require("../controller/LeaveType/LeaveTypeControllers");
const {
  CheckEmployeeAuth,
  CheckAdminAuth,
} = require("../middleware/CheckAuthLogin");

//LeaveType Create
LeaveTypeRoutes.post(
  "/LeaveTypeCreate",
  CheckEmployeeAuth,
  CheckAdminAuth,
  LeaveTypeControllers.LeaveTypeCreate,
);

//LeaveType List
LeaveTypeRoutes.get(
  "/LeaveTypeList/:pageNumber/:perPage/:searchKeyword",
  CheckEmployeeAuth,
  CheckAdminAuth,
  LeaveTypeControllers.LeaveTypeList,
);

//LeaveType Drop Down
LeaveTypeRoutes.get(
  "/LeaveTypeDropDown",
  CheckEmployeeAuth,
  LeaveTypeControllers.LeaveTypeDropDown,
);

//LeaveType Details
LeaveTypeRoutes.get(
  "/LeaveTypeDetails/:id",
  CheckEmployeeAuth,
  CheckAdminAuth,
  LeaveTypeControllers.LeaveTypeDetails,
);

//LeaveType Update
LeaveTypeRoutes.patch(
  "/LeaveTypeUpdate/:id",
  CheckEmployeeAuth,
  CheckAdminAuth,
  LeaveTypeControllers.LeaveTypeUpdate,
);

//LeaveType Delete
LeaveTypeRoutes.delete(
  "/LeaveTypeDelete/:id",
  CheckEmployeeAuth,
  CheckAdminAuth,
  LeaveTypeControllers.LeaveTypeDelete,
);

module.exports = LeaveTypeRoutes;
