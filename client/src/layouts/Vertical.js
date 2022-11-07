// @flow
import React, { Suspense, useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

// actions
import { ChangeLeftSideBarType } from "../redux/slices/SettingSlice";

// constants
import * as layoutConstants from "../redux/slices/SettingSlice";

// utils
import { ChangeBodyAttribute } from "../helpers/ChangeBodyAttribute";
import LazyLoader from "../components/Common/LazyLoader";

//External Lib Import
const Topbar = React.lazy(() => import("./Topbar"));
const LeftSidebar = React.lazy(() => import("./LeftSidebar"));
const Footer = React.lazy(() => import("./Footer"));

const VerticalLayout = () => {
  const dispatch = useDispatch();

  const { LayoutColor, LeftSideBarTheme, LeftSideBarType, LayoutWidth } =
    useSelector((state) => state.Setting);

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  /*
   * layout defaults
   */
  useEffect(() => {
    ChangeBodyAttribute("data-layout", layoutConstants.LAYOUT_VERTICAL);
  }, []);

  useEffect(() => {
    ChangeBodyAttribute("data-layout-color", LayoutColor);
  }, [LayoutColor]);

  useEffect(() => {
    ChangeBodyAttribute("data-layout-mode", LayoutWidth);
  }, [LayoutWidth]);

  useEffect(() => {
    ChangeBodyAttribute("data-leftbar-theme", LeftSideBarTheme);
  }, [LeftSideBarTheme]);

  useEffect(() => {
    ChangeBodyAttribute("data-leftbar-compact-mode", LeftSideBarType);
  }, [LeftSideBarType]);

  /**
   * Open the menu when having mobile screen
   */
  const openMenu = () => {
    setIsMenuOpened((prevState) => {
      setIsMenuOpened(!prevState);
    });

    if (document.body) {
      if (isMenuOpened) {
        document.body.classList.remove("sidebar-enable");
      } else {
        document.body.classList.add("sidebar-enable");
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
      <div className="wrapper">
        <LeftSidebar
          isCondensed={isCondensed}
          isLight={isLight}
          hideUserProfile={true}
        />
        <div className="content-page">
          <div className="content">
            <Topbar openLeftMenuCallBack={openMenu} hideLogo={true} />
            <Container fluid>
              <Outlet />
            </Container>
          </div>
          <Footer />
        </div>
      </div>
    </Suspense>
  );
};
export default VerticalLayout;
