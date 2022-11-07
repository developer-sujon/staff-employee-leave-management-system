//External Lib Import
const routes = require("express").Router();

//Internal Lib Import
const AuthRoutes = require("./AuthRoutes");
const EmployeeRoutes = require("./EmployeeRoutes");
const DepartmentRoutes = require("./DepartmentRoutes");
const LeaveTypeRoutes = require("./LeaveTypeRoutes");
const LeaveRoutes = require("./LeaveRoutes");
const SummaryRoutes = require("./SummaryRoutes");

//Auth Routes
routes.use("/Auth", AuthRoutes);

//Employee Routes
routes.use("/Employee", EmployeeRoutes);

//Department Routes
routes.use("/Department", DepartmentRoutes);

//LeaveType Routes
routes.use("/LeaveType", LeaveTypeRoutes);

//Leave Routes
routes.use("/Leave", LeaveRoutes);

//Summary Routes
routes.use("/Summary", SummaryRoutes);

module.exports = routes;
