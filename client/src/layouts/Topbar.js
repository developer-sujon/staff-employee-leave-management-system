// @flow
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

// actions
import { ChangeLeftSideBarType, SetTheme } from "../redux/slices/SettingSlice";

// components
import LanguageDropdown from "../components/LanguageDropdown";
import NotificationDropdown from "../components/Ui/NotificationDropdown";
import ProfileDropdown from "../components/Ui/ProfileDropdown";
import SearchDropdown from "../components/Ui/SearchDropdown";
import TopbarSearch from "../components/Ui/TopbarSearch";
import AppsDropdown from "../components/AppsDropdown/";

// images
import avatar1 from "../assets/images/users/avatar-2.jpg";
import avatar2 from "../assets/images/users/avatar-4.jpg";
import logoSmDark from "../assets/images/logo_sm_dark.png";
import logoSmLight from "../assets/images/logo_sm.png";
import logo from "../assets/images/logo.png";

//constants
import * as layoutConstants from "../redux/slices/SettingSlice";

// get the notifications
const Notifications = [
  {
    day: "Today",
    messages: [
      {
        id: 1,
        title: "Datacorp",
        subText: "Caleb Flakelar commented on Admin",
        time: "1 min ago",
        icon: "mdi mdi-comment-account-outline",
        variant: "primary",
        isRead: false,
      },
      {
        id: 2,
        title: "Admin",
        subText: "New user registered.",
        time: "1 hours ago",
        icon: "mdi mdi-account-plus",
        variant: "info",
        isRead: true,
      },
    ],
  },
  {
    day: "Yesterday",
    messages: [
      {
        id: 1,
        title: "Cristina Pride",
        subText: "Hi, How are you? What about our next meeting",
        time: "1 day ago",
        avatar: avatar1,
        isRead: true,
      },
    ],
  },
  {
    day: "30 Dec 2021",
    messages: [
      {
        id: 1,
        title: "Datacorp",
        subText: "Caleb Flakelar commented on Admin",
        icon: "mdi mdi-comment-account-outline",
        variant: "primary",
        isRead: true,
      },
      {
        id: 2,
        title: "Karen Robinson",
        subText: "Wow ! this admin looks good and awesome design",
        avatar: avatar2,
        isRead: true,
      },
    ],
  },
];

// get the profilemenu
const ProfileMenus = [
  {
    label: "My Account",
    icon: "mdi mdi-account-circle",
    redirectTo: "/account/profile",
  },
  {
    label: "Settings",
    icon: "mdi mdi-account-edit",
    redirectTo: "/account/setting",
  },
  {
    label: "Logout",
    icon: "mdi mdi-logout",
    redirectTo: "/account/logout",
  },
];

const Topbar = ({
  hideLogo,
  navCssClasses,
  openLeftMenuCallBack,
  topbarDark,
}) => {
  const dispatch = useDispatch();

  const [isopen, setIsopen] = useState(false);
  const { UserDetails } = useSelector((state) => state.User);

  const navbarCssClasses = navCssClasses || "";
  const containerCssClasses = !hideLogo ? "container-fluid" : "";

  const { LayoutType, LeftSideBarType, LayoutColor } = useSelector(
    (state) => state.Setting,
  );

  /**
   * Toggle the leftmenu when having mobile screen
   */
  const handleLeftMenuCallBack = () => {
    setIsopen((prevState) => !prevState);
    if (openLeftMenuCallBack) openLeftMenuCallBack();

    switch (LayoutType) {
      case layoutConstants.LAYOUT_VERTICAL:
        // condition added
        if (window.innerWidth >= 768) {
          if (LeftSideBarType === "fixed" || LeftSideBarType === "scrollable")
            dispatch(
              ChangeLeftSideBarType(
                layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED,
              ),
            );
          if (LeftSideBarType === "condensed")
            dispatch(
              ChangeLeftSideBarType(layoutConstants.LEFT_SIDEBAR_TYPE_FIXED),
            );
        }
        break;

      case layoutConstants.LAYOUT_FULL:
        if (document.body) {
          document.body.classList.toggle("hide-menu");
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className={classNames("navbar-custom", navbarCssClasses)}>
        <div className={containerCssClasses}>
          {!hideLogo && (
            <Link to="/" className="topnav-logo">
              <span className="topnav-logo-lg">
                <img src={logo} alt="logo" height="16" />
              </span>
              <span className="topnav-logo-sm">
                <img
                  src={topbarDark ? logoSmLight : logoSmDark}
                  alt="logo"
                  height="16"
                />
              </span>
            </Link>
          )}

          <ul className="list-unstyled topbar-menu float-end mb-0">
            <li className="notification-list topbar-dropdown d-xl-none">
              <SearchDropdown />
            </li>
            <li className="dropdown notification-list topbar-dropdown d-none d-lg-block">
              <LanguageDropdown />
            </li>
            <li className="dropdown notification-list">
              <NotificationDropdown notifications={Notifications} />
            </li>
            <li className="dropdown notification-list d-none d-sm-inline-block">
              <AppsDropdown />
            </li>
            <li className="notification-list">
              {LayoutColor === "light" ? (
                <button
                  className="nav-link dropdown-toggle end-bar-toggle arrow-none btn btn-link shadow-none"
                  onClick={() => dispatch(SetTheme("dark"))}
                >
                  <i className="uil-moon noti-icon"></i>
                </button>
              ) : (
                <button
                  className="nav-link dropdown-toggle end-bar-toggle arrow-none btn btn-link shadow-none"
                  onClick={() => dispatch(SetTheme("light"))}
                >
                  <i className="uil-sun noti-icon"></i>
                </button>
              )}
            </li>
            <li className="dropdown notification-list">
              <ProfileDropdown
                profilePic={UserDetails?.Image}
                menuItems={ProfileMenus}
                username={UserDetails?.FirstName + " " + UserDetails?.LastName}
                userTitle={UserDetails?.Roles}
              />
            </li>
          </ul>
          {/* toggle for vertical layout */}
          {(LayoutType === layoutConstants.LAYOUT_VERTICAL ||
            LayoutType === layoutConstants.LAYOUT_FULL) && (
            <button
              className="button-menu-mobile open-left"
              onClick={handleLeftMenuCallBack}
            >
              <i className="mdi mdi-menu" />
            </button>
          )}

          {/* toggle for horizontal layout */}
          {LayoutType === layoutConstants.LAYOUT_HORIZONTAL && (
            <Link
              to="#"
              className={classNames("navbar-toggle", { open: isopen })}
              onClick={handleLeftMenuCallBack}
            >
              <div className="lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </Link>
          )}

          {/* toggle for detached layout */}
          {LayoutType === layoutConstants.LAYOUT_DETACHED && (
            <Link
              to="#"
              className="button-menu-mobile disable-btn"
              onClick={handleLeftMenuCallBack}
            >
              <div className="lines">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </Link>
          )}
          <TopbarSearch />
        </div>
      </div>
    </>
  );
};

export default Topbar;
