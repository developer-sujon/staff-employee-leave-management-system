//External Lib Import
const LeaveRoutes = require("express").Router();
const LeaveControllers = require("../controller/Leave/LeaveControllers");
const { CheckEmployeeAuth, CheckAdminAuth, CheckHodAuth } = require("../middleware/CheckAuthLogin");

//Leave Create
LeaveRoutes.post(
  "/LeaveCreate",
  CheckEmployeeAuth,
  LeaveControllers.LeaveCreate,
);

//LeaveList
LeaveRoutes.get(
  "/LeaveList/:pageNumber/:perPage/:searchKeyword",
  CheckEmployeeAuth,
  LeaveControllers.LeaveList,
);

//LeaveAdminList
LeaveRoutes.get(
  "/LeaveAdminList/:pageNumber/:perPage/:searchKeyword",
  CheckEmployeeAuth,
  CheckAdminAuth,
  LeaveControllers.LeaveAdminList,
);

//LeaveListAdminByStatus
LeaveRoutes.post(
  "/LeaveListAdminByStatus/:pageNumber/:perPage/:searchKeyword",
  CheckEmployeeAuth,
  CheckAdminAuth,
  LeaveControllers.LeaveListAdminByStatus,
);

//LeaveListHodByStatus
LeaveRoutes.post(
  "/LeaveListHodByStatus/:pageNumber/:perPage/:searchKeyword",
  CheckEmployeeAuth,
  LeaveControllers.LeaveListHodByStatus,
);

//Leave Drop Down
LeaveRoutes.get(
  "/LeaveDropDown",
  CheckEmployeeAuth,
  LeaveControllers.LeaveDropDown,
);

//Leave Details
LeaveRoutes.get(
  "/LeaveDetails/:id",
  CheckEmployeeAuth,
  LeaveControllers.LeaveDetails,
);

//Leave Update
LeaveRoutes.patch(
  "/LeaveUpdate/:id",
  CheckEmployeeAuth,
  LeaveControllers.LeaveUpdate,
);

//Leave Delete
LeaveRoutes.delete(
  "/LeaveDelete/:id",
  CheckEmployeeAuth,
  LeaveControllers.LeaveDelete,
);

module.exports = LeaveRoutes;
