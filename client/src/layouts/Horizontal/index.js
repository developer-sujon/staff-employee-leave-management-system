// @flow
import React, { Suspense, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

// constants
import * as layoutConstants from "../../redux/slices/SettingSlice";

// utils
import { ChangeBodyAttribute } from "../../helpers/ChangeBodyAttribute";

// code splitting and lazy loading
// https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const Topbar = React.lazy(() => import("../Topbar"));
const Navbar = React.lazy(() => import("./Navbar"));
const Footer = React.lazy(() => import("../Footer"));

const loading = () => <div className="text-center"></div>;

const HorizontalLayout = ({ children }): React$Element<any> => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  const { LayoutColor, LayoutWidth } = useSelector((state) => state.Setting);

  /**
   * Open the menu when having mobile screen
   */
  const openMenu = () => {
    setIsMenuOpened(!isMenuOpened);
    if (document.body) {
      if (isMenuOpened) {
        document.body.classList.remove("sidebar-enable");
      } else {
        document.body.classList.add("sidebar-enable");
      }
    }
  };

  /*
   * layout defaults
   */
  useEffect(() => {
    ChangeBodyAttribute("data-layout", layoutConstants.LAYOUT_HORIZONTAL);
    ChangeBodyAttribute(
      "data-leftbar-theme",
      layoutConstants.LEFT_SIDEBAR_THEME_DEFAULT,
    );
    ChangeBodyAttribute(
      "data-leftbar-compact-mode",
      layoutConstants.LEFT_SIDEBAR_TYPE_FIXED,
    );
  }, []);

  useEffect(() => {
    ChangeBodyAttribute("data-layout-color", LayoutColor);
  }, [LayoutColor]);

  useEffect(() => {
    ChangeBodyAttribute("data-layout-mode", LayoutWidth);
  }, [LayoutWidth]);

  return (
    <>
      <div className="wrapper">
        <div className="content-page">
          <div className="content">
            <Suspense fallback={loading()}>
              <Topbar
                isMenuOpened={isMenuOpened}
                openLeftMenuCallBack={openMenu}
                navCssClasses="topnav-navbar topnav-navbar-dark"
                topbarDark={true}
              />
            </Suspense>

            <Suspense fallback={loading()}>
              <Navbar isMenuOpened={isMenuOpened} />
            </Suspense>

            <Container fluid>
              <Outlet />
            </Container>
          </div>

          <Suspense fallback={loading()}>
            <Footer />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default HorizontalLayout;
