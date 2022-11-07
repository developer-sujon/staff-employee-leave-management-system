// @flow
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";

import { getMenuItems } from "../helpers/menu";

// components
import AppMenu from "./Menu";

// images
import logoSm from "../assets/images/logo_sm.png";
import logoDark from "../assets/images/logo-dark.png";
import logoDarkSm from "../assets/images/logo_sm_dark.png";
import logo from "../assets/images/logo.png";
import profileImg from "../assets/images/users/avatar-1.jpg";

/* sidebar content */
const SideBarContent = ({ hideUserProfile }) => {
  return (
    <>
      {!hideUserProfile && (
        <div className="leftbar-user">
          <Link to="/">
            <img
              src={profileImg}
              alt=""
              height="42"
              className="rounded-circle shadow-sm"
            />
            <span className="leftbar-user-name">Dominic Keller</span>
          </Link>
        </div>
      )}
      <AppMenu menuItems={getMenuItems()} />
      <div className="clearfix" />
    </>
  );
};

const LeftSidebar = ({ isCondensed, isLight, hideLogo, hideUserProfile }) => {
  const menuNodeRef = useRef(null);

  /**
   * Handle the click anywhere in doc
   */
  const handleOtherClick = (e: any) => {
    if (
      menuNodeRef &&
      menuNodeRef.current &&
      menuNodeRef.current.contains(e.target)
    )
      return;
    // else hide the menubar
    if (document.body) {
      document.body.classList.remove("sidebar-enable");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOtherClick, false);

    return () => {
      document.removeEventListener("mousedown", handleOtherClick, false);
    };
  }, []);

  return (
    <>
      <div className="leftside-menu" ref={menuNodeRef}>
        {!hideLogo && (
          <>
            <Link to="/" className="logo text-center logo-light">
              <span className="logo-lg">
                <img src={isLight ? logoDark : logo} alt="logo" height="15" />
              </span>
              <span className="logo-sm">
                <img
                  src={isLight ? logoSm : logoDarkSm}
                  alt="logo"
                  height="15"
                />
              </span>
            </Link>

            <Link to="/" className="logo text-center logo-dark">
              <span className="logo-lg">
                <img src={isLight ? logoDark : logo} alt="logo" height="15" />
              </span>
              <span className="logo-sm">
                <img
                  src={isLight ? logoSm : logoDarkSm}
                  alt="logo"
                  height="36"
                />
              </span>
            </Link>
          </>
        )}

        {!isCondensed && (
          <SimpleBar
            style={{ maxHeight: "100%" }}
            timeout={500}
            scrollbarMaxSize={320}
          >
            <SideBarContent
              menuClickHandler={() => {}}
              isLight={isLight}
              hideUserProfile={hideUserProfile}
            />
          </SimpleBar>
        )}
        {isCondensed && (
          <SideBarContent isLight={isLight} hideUserProfile={hideUserProfile} />
        )}
      </div>
    </>
  );
};

LeftSidebar.defaultProps = {
  hideLogo: false,
  hideUserProfile: false,
  isLight: false,
  isCondensed: false,
};

export default LeftSidebar;
