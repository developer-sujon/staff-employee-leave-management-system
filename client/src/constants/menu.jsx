//External Lib Import
import { BsCircle } from "react-icons/bs";
import { RiDashboardLine } from "react-icons/ri";
import { HiOutlineDocumentDuplicate, HiOutlineNewspaper } from "react-icons/hi";

import { AiOutlineTag, AiOutlineUserAdd } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const MenuItems = () => {
  const { t } = useTranslation();
  const { UserDetails } = useSelector((state) => state.User);
  const { AccessToken } = useSelector((state) => state.Auth);

  if (AccessToken && UserDetails?.Roles === "STAFF") {
    return [
      { key: "navigation", label: t("Hod Routes"), isTitle: true },
      {
        key: "Dashboard",
        label: t("Dashboard"),
        url: "/dashboard",
        isTitle: false,
        icon: <RiDashboardLine className="side-bar-item-icon" />,
      },
      {
        key: "Leave",
        label: t("Leave"),
        isTitle: false,
        icon: <HiOutlineDocumentDuplicate className="side-bar-item-icon" />,
        children: [
          {
            key: "NewLeave",
            label: t("New Leave"),
            url: "/leave/leave-create-update",
            parentKey: "Leave",
            icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          },
          {
            key: "Leave List",
            label: t("Leave List"),
            url: "/leave/leave-list",
            parentKey: "Leave",
            icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          },
          {
            key: "Leave List Pending",
            label: t("Leave List Pending"),
            url: "/leave/leave-list-pending",
            parentKey: "Leave",
            icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          },
          {
            key: "Leave List Approved",
            label: t("Leave List Approved"),
            url: "/leave/leave-list-approved",
            parentKey: "Leave",
            icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          },
          {
            key: "Leave List Rejected",
            label: t("Leave List Rejected"),
            url: "/leave/leave-list-rejected",
            parentKey: "Leave",
            icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          },
        ],
      },
    ];
  } else if (AccessToken && UserDetails?.Roles === "HOD") {
    return [
      { key: "navigation", label: t("Hod Routes"), isTitle: true },
      {
        key: "Dashboard",
        label: t("Dashboard"),
        url: "/dashboard",
        isTitle: false,
        icon: <RiDashboardLine className="side-bar-item-icon" />,
      },
      {
        key: "Leave",
        label: t("Leave"),
        isTitle: false,
        icon: <HiOutlineDocumentDuplicate className="side-bar-item-icon" />,
        children: [
          {
            key: "Leave List",
            label: t("Leave List"),
            url: "/leave/leave-list",
            parentKey: "Leave",
            icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          },
          {
            key: "Leave List Pending",
            label: t("Leave List Pending"),
            url: "/leave/leave-list-pending",
            parentKey: "Leave",
            icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          },
          {
            key: "Leave List Approved",
            label: t("Leave List Approved"),
            url: "/leave/leave-list-approved",
            parentKey: "Leave",
            icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          },
          {
            key: "Leave List Rejected",
            label: t("Leave List Rejected"),
            url: "/leave/leave-list-rejected",
            parentKey: "Leave",
            icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          },
        ],
      },
    ];
  } else if (AccessToken && UserDetails?.Roles === "ADMIN") {
    return [
      { key: "navigation", label: t("Admin Routes"), isTitle: true },
      {
        key: "Dashboard",
        label: t("Dashboard"),
        url: "/dashboard",
        isTitle: false,
        icon: <RiDashboardLine className="side-bar-item-icon" />,
      },
      {
        key: "Department",
        label: t("Department"),
        isTitle: false,
        icon: <HiOutlineDocumentDuplicate className="side-bar-item-icon" />,
        children: [
          {
            key: "NewDepartment",
            label: t("New Department"),
            url: "/department/department-create-update",
            parentKey: "Department",
            icon: (
              <AiOutlineUserAdd size={16} className="side-bar-subitem-icon" />
            ),
          },
          {
            key: "DepartmentList",
            label: t("Department List"),
            url: "/department/department-list",
            parentKey: "Department",
            icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          },
        ],
      },
      {
        key: "LeaveType",
        label: t("Leave Type"),
        isTitle: false,
        icon: <HiOutlineDocumentDuplicate className="side-bar-item-icon" />,
        children: [
          {
            key: "Leave Type List",
            label: t("Leave Type List"),
            url: "/leave-type/leave-type-list",
            parentKey: "LeaveType",
            icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          },
        ],
      },
      {
        key: "Employee",
        label: t("Employee"),
        isTitle: false,
        icon: <HiOutlineDocumentDuplicate className="side-bar-item-icon" />,
        children: [
          {
            key: "NewEmployee",
            label: t("New Employee"),
            url: "/employee/employee-create-update",
            parentKey: "Employee",
            icon: (
              <AiOutlineUserAdd size={16} className="side-bar-subitem-icon" />
            ),
          },
          {
            key: "Employee List",
            label: t("Employee List"),
            url: "/employee/employee-list",
            parentKey: "Employee",
            icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          },
        ],
      },
      {
        key: "Leave",
        label: t("Leave"),
        isTitle: false,
        icon: <HiOutlineDocumentDuplicate className="side-bar-item-icon" />,
        children: [
          {
            key: "Leave List",
            label: t("Leave List"),
            url: "/leave/leave-list",
            parentKey: "Leave",
            icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          },
          {
            key: "Leave List Pending",
            label: t("Leave List Pending"),
            url: "/leave/leave-list-pending",
            parentKey: "Leave",
            icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          },
          {
            key: "Leave List Approved",
            label: t("Leave List Approved"),
            url: "/leave/leave-list-approved",
            parentKey: "Leave",
            icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          },
          {
            key: "Leave List Rejected",
            label: t("Leave List Rejected"),
            url: "/leave/leave-list-rejected",
            parentKey: "Leave",
            icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          },
        ],
      },
    ];
  }
};

export default MenuItems;
