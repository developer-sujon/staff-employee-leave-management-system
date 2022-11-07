import React, { useEffect } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import * as layoutConstants from "../redux/slices/SettingSlice";

// All layouts/containers
import DefaultLayout from "../layouts/Default";
import VerticalLayout from "../layouts/Vertical";
import DetachedLayout from "../layouts/Detached";
import HorizontalLayout from "../layouts/Horizontal";
import FullLayout from "../layouts/Full";

//External Lib Import

// Auth
const Login = React.lazy(() => import("../pages/Account/Login"));

//Page
const AdminDashboard = React.lazy(() =>
  import("../pages/Dashboard/AdminDashboard"),
);
const HodDashboard = React.lazy(() =>
  import("../pages/Dashboard/HodDashboard"),
);

const Logout = React.lazy(() => import("../pages/Account/Logout"));

const DepartmentCreateUpdatePage = React.lazy(() =>
  import("../pages/Department/DepartmentCreateUpdatePage"),
);
const DepartmentListPage = React.lazy(() =>
  import("../pages/Department/DepartmentListPage"),
);

const LeaveTypeCreateUpdatePage = React.lazy(() =>
  import("../pages/LeaveType/LeaveTypeCreateUpdatePage"),
);
const LeaveTypeListPage = React.lazy(() =>
  import("../pages/LeaveType/LeaveTypeListPage"),
);

const EmployeeCreateUpdatePage = React.lazy(() =>
  import("../pages/Employee/EmployeeCreateUpdatePage"),
);
const EmployeeListPage = React.lazy(() =>
  import("../pages/Employee/EmployeeListPage"),
);

const LeaveAdminUpdatePage = React.lazy(() =>
  import("../pages/Leave/LeaveAdminUpdatePage"),
);
const LeaveAdminListPage = React.lazy(() =>
  import("../pages/Leave/LeaveAdminListPage"),
);
const LeaveListAdminPending = React.lazy(() =>
  import("../pages/Leave/LeaveListAdminPending"),
);

const LeaveListAdminApproved = React.lazy(() =>
  import("../pages/Leave/LeaveListAdminApproved"),
);

const LeaveListAdminRejected = React.lazy(() =>
  import("../pages/Leave/LeaveListAdminRejected"),
);

const LeaveListHodPending = React.lazy(() =>
  import("../pages/Leave/LeaveListHodPending"),
);

const LeaveListHodApproved = React.lazy(() =>
  import("../pages/Leave/LeaveListHodApproved"),
);

const LeaveListHodRejected = React.lazy(() =>
  import("../pages/Leave/LeaveListHodRejected"),
);

const LeaveListHodPage = React.lazy(() =>
  import("../pages/Leave/LeaveListHodPage"),
);
const LeaveHodCreateUpdatePage = React.lazy(() =>
  import("../pages/Leave/LeaveHodCreateUpdatePage"),
);

const LeaveCreateUpdatePage = React.lazy(() =>
  import("../pages/Leave/LeaveCreateUpdatePage"),
);

const LeaveListEmployeePage = React.lazy(() =>
  import("../pages/Leave/LeaveListEmployeePage"),
);

const EmployeeDashboard = React.lazy(() =>
  import("../pages/Dashboard/EmployeeDashboard"),
);

const ProfilePage = React.lazy(() => import("../pages/Profile/ProfilePage"));
const ChangePasswordPage = React.lazy(() =>
  import("../pages/Profile/ChangePasswordPage"),
);

const ForgetPassword = React.lazy(() =>
  import("../pages/Account/ForgetPassword"),
);

const VerifyOtpPage = React.lazy(() =>
  import("../pages/Account/VerifyOtpPage"),
);

const ResetPasswordPage = React.lazy(() =>
  import("../pages/Account/ResetPasswordPage"),
);

const LoadComponent = ({ component: Component }) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return <Component />;
};

const AllRoutes = () => {
  const { LayoutType } = useSelector((state) => state.Setting);
  const { UserDetails } = useSelector((state) => state.User);
  const { AccessToken } = useSelector((state) => state.Auth);

  const getLayout = () => {
    let layoutCls = VerticalLayout;

    switch (LayoutType) {
      case layoutConstants.LAYOUT_HORIZONTAL:
        layoutCls = HorizontalLayout;
        break;
      case layoutConstants.LAYOUT_DETACHED:
        layoutCls = DetachedLayout;
        break;
      case layoutConstants.LAYOUT_FULL:
        layoutCls = FullLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  };

  let Layout = getLayout();

  if (AccessToken && UserDetails?.Roles === "STAFF") {
    return (
      <Routes>
        <Route to="/" element={<Layout />}>
          <Route
            path="/dashboard"
            element={<LoadComponent component={EmployeeDashboard} />}
          />
          <Route
            path="/leave/leave-create-update"
            element={<LoadComponent component={LeaveCreateUpdatePage} />}
          />
          <Route
            path="/leave/leave-list"
            element={<LoadComponent component={LeaveListEmployeePage} />}
          />
          <Route
            path="/leave/leave-list-pending"
            element={<LoadComponent component={LeaveListHodPending} />}
          />
          <Route
            path="/leave/leave-list-approved"
            element={<LoadComponent component={LeaveListHodApproved} />}
          />
          <Route
            path="/leave/leave-list-rejected"
            element={<LoadComponent component={LeaveListHodRejected} />}
          />
          <Route
            path="/account/profile"
            element={<LoadComponent component={ProfilePage} />}
          />
          <Route
            path="/account/setting"
            element={<LoadComponent component={ChangePasswordPage} />}
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    );
  } else if (AccessToken && UserDetails?.Roles === "HOD") {
    return (
      <Routes>
        <Route to="/" element={<Layout />}>
          <Route
            path="/dashboard"
            element={<LoadComponent component={HodDashboard} />}
          />
          <Route
            path="/leave/leave-create-update"
            element={<LoadComponent component={LeaveHodCreateUpdatePage} />}
          />
          <Route
            path="/leave/leave-list"
            element={<LoadComponent component={LeaveListHodPage} />}
          />
          <Route
            path="/leave/leave-list-pending"
            element={<LoadComponent component={LeaveListHodPending} />}
          />
          <Route
            path="/leave/leave-list-approved"
            element={<LoadComponent component={LeaveListHodApproved} />}
          />
          <Route
            path="/leave/leave-list-rejected"
            element={<LoadComponent component={LeaveListHodRejected} />}
          />
          <Route
            path="/account/profile"
            element={<LoadComponent component={ProfilePage} />}
          />
          <Route
            path="/account/setting"
            element={<LoadComponent component={ChangePasswordPage} />}
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    );
  } else if (AccessToken && UserDetails?.Roles === "ADMIN") {
    return (
      <Routes>
        <Route to="/" element={<Layout />}>
          <Route
            path="/dashboard"
            element={<LoadComponent component={AdminDashboard} />}
          />
          <Route
            path="/department/department-create-update"
            element={<LoadComponent component={DepartmentCreateUpdatePage} />}
          />
          <Route
            path="/department/department-list"
            element={<LoadComponent component={DepartmentListPage} />}
          />
          <Route
            path="/leave-type/leave-type-create-update"
            element={<LoadComponent component={LeaveTypeCreateUpdatePage} />}
          />
          <Route
            path="/leave-type/leave-type-list"
            element={<LoadComponent component={LeaveTypeListPage} />}
          />
          <Route
            path="/employee/employee-create-update"
            element={<LoadComponent component={EmployeeCreateUpdatePage} />}
          />
          <Route
            path="/employee/employee-list"
            element={<LoadComponent component={EmployeeListPage} />}
          />
          <Route
            path="/leave/leave-create-update"
            element={<LoadComponent component={LeaveAdminUpdatePage} />}
          />
          <Route
            path="/leave/leave-list"
            element={<LoadComponent component={LeaveAdminListPage} />}
          />
          <Route
            path="/leave/leave-list-pending"
            element={<LoadComponent component={LeaveListAdminPending} />}
          />
          <Route
            path="/leave/leave-list-approved"
            element={<LoadComponent component={LeaveListAdminApproved} />}
          />
          <Route
            path="/leave/leave-list-rejected"
            element={<LoadComponent component={LeaveListAdminRejected} />}
          />
          <Route
            path="/account/profile"
            element={<LoadComponent component={ProfilePage} />}
          />
          <Route
            path="/account/setting"
            element={<LoadComponent component={ChangePasswordPage} />}
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="" element={<Navigate to="/account/login" />} />
          <Route path="*" element={<Navigate to="/account/login" />} />
          <Route
            path="/account/login"
            element={<LoadComponent component={Login} />}
          />
          <Route
            path="/account/logout"
            element={<LoadComponent component={Logout} />}
          />
          <Route
            path="/account/forget-password"
            element={<LoadComponent component={ForgetPassword} />}
          />
          <Route
            path="/account/verify-otp"
            element={<LoadComponent component={VerifyOtpPage} />}
          />
          <Route
            path="/account/reset-password"
            element={<LoadComponent component={ResetPasswordPage} />}
          />
        </Route>
      </Routes>
    );
  }
};

export default AllRoutes;
