// External Lib Import
import React, { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

// Internal Lib Import
import { ChangeBodyAttribute } from "../helpers/ChangeBodyAttribute";
import LazyLoader from "../components/Common/LazyLoader";

const DefaultLayout = (props) => {
  const { LayoutColor } = useSelector((state) => state.Setting);

  useEffect(() => {
    ChangeBodyAttribute("data-layout-color", LayoutColor);
  }, [LayoutColor]);

  useEffect(() => {
    if (document.body) document.body.classList.add("authentication-bg");

    return () => {
      if (document.body) document.body.classList.remove("authentication-bg");
    };
  }, []);

  return (
    <Suspense fallback={<LazyLoader />}>
      <Outlet />
    </Suspense>
  );
};
export default DefaultLayout;
