//External Lib Import
const DepartmentRoutes = require("express").Router();
const DepartmentControllers = require("../controller/Department/DepartmentControllers");
const {
  CheckEmployeeAuth,
  CheckAdminAuth,
} = require("../middleware/CheckAuthLogin");

//Department Create
DepartmentRoutes.post(
  "/DepartmentCreate",
  CheckEmployeeAuth,
  CheckAdminAuth,
  DepartmentControllers.DepartmentCreate,
);

//Department List
DepartmentRoutes.get(
  "/DepartmentList/:pageNumber/:perPage/:searchKeyword",
  CheckEmployeeAuth,
  CheckAdminAuth,
  DepartmentControllers.DepartmentList,
);

//Department Drop Down
DepartmentRoutes.get(
  "/DepartmentDropDown",
  CheckEmployeeAuth,
  CheckAdminAuth,
  DepartmentControllers.DepartmentDropDown,
);

//Department Details
DepartmentRoutes.get(
  "/DepartmentDetails/:id",
  CheckEmployeeAuth,
  CheckAdminAuth,
  DepartmentControllers.DepartmentDetails,
);

//Department Update
DepartmentRoutes.patch(
  "/DepartmentUpdate/:id",
  CheckEmployeeAuth,
  CheckAdminAuth,
  DepartmentControllers.DepartmentUpdate,
);

//Department Delete
DepartmentRoutes.delete(
  "/DepartmentDelete/:id",
  CheckEmployeeAuth,
  CheckAdminAuth,
  DepartmentControllers.DepartmentDelete,
);

module.exports = DepartmentRoutes;
