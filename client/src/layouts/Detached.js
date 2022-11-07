// @flow
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

// actions
import { ChangeLeftSideBarType } from "../redux/slices/SettingSlice";

// constants
import * as layoutConstants from "../redux/slices/SettingSlice";

// utils
import { ChangeBodyAttribute } from "../helpers/ChangeBodyAttribute";
import LazyLoader from "../components/Common/LazyLoader";

const Topbar = React.lazy(() => import("./Topbar"));
const LeftSidebar = React.lazy(() => import("./LeftSidebar"));
const Footer = React.lazy(() => import("./Footer"));

const DetachedLayout = ({ children }, state) => {
  const dispatch = useDispatch();

  const { LayoutColor, LeftSideBarTheme, LeftSideBarType } = useSelector(
    (state) => state.Setting,
  );

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  /*
   * layout defaults
   */
  useEffect(() => {
    ChangeBodyAttribute("data-layout", layoutConstants.LAYOUT_DETACHED);
    ChangeBodyAttribute("data-layout-mode", layoutConstants.LAYOUT_WIDTH_FLUID);
    ChangeBodyAttribute(
      "data-leftbar-theme",
      layoutConstants.LEFT_SIDEBAR_THEME_DARK,
    );
  }, []);

  useEffect(() => {
    ChangeBodyAttribute("data-layout-color", LayoutColor);
  }, [LayoutColor]);

  useEffect(() => {
    ChangeBodyAttribute("data-leftbar-compact-mode", LeftSideBarType);
  }, [LeftSideBarType]);

  /**
   * Open the menu when having mobile screen
   */
  const openMenu = (e) => {
    setIsMenuOpened((prevState) => {
      setIsMenuOpened(!prevState);
    });
    if (document.body) {
      if (isMenuOpened) {
        document.body.classList.add("sidebar-enable");
      } else {
        document.body.classList.remove("sidebar-enable");
      }
    }
  };

  const updateDimensions = useCallback(() => {
    // activate the condensed sidebar if smaller devices like ipad or tablet
    if (window.innerWidth >= 768 && window.innerWidth <= 1028) {
      dispatch(
        ChangeLeftSideBarType(layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED),
      );
    } else if (window.innerWidth > 1028) {
      dispatch(ChangeLeftSideBarType(layoutConstants.LEFT_SIDEBAR_TYPE_FIXED));
    }
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [dispatch, updateDimensions]);

  const isCondensed =
    LeftSideBarType === layoutConstants.LEFT_SIDEBAR_TYPE_CONDENSED;
  const isLight = LeftSideBarTheme === layoutConstants.LEFT_SIDEBAR_THEME_LIGHT;

  return (
    <Suspense fallback={<LazyLoader />}>
      <Topbar
        isMenuOpened={isMenuOpened}
        openLeftMenuCallBack={openMenu}
        navCssClasses="topnav-navbar topnav-navbar-dark"
        topbarDark={true}
      />
      <Container fluid>
        <div className="wrapper">
          <LeftSidebar
            isMenuOpened={isMenuOpened}
            isCondensed={isCondensed}
            isLight={isLight}
            hideLogo={true}
            hideUserProfile={false}
          />

          <div className="content-page">
            <div className="content">
              <Outlet />
            </div>

            <Footer />
          </div>
        </div>
      </Container>
    </Suspense>
  );
};

export default DetachedLayout;
