// @flow
import React from "react";
import "jsvectormap";
import "jsvectormap/dist/maps/canada.js";

//components
import BaseVectorMap from "./BaseVectorMap";

const CanadaVectorMap = ({ width, height, options }) => {
  return (
    <>
      <BaseVectorMap
        width={width}
        height={height}
        options={options}
        type="canada"
      />
    </>
  );
};

export default CanadaVectorMap;
