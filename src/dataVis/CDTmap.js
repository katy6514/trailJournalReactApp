import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

import { width, height } from "./constants.js";

const CDTmap = () => {
  const ref = useRef();

  useEffect(() => {
    // Clear previous chart if any
    d3.select(ref.current).selectAll("*").remove();

    const svg = d3
      .select(ref.current)
      .attr("id", "CDTmap")
      .attr("width", width)
      .attr("height", height)
      .attr("stroke", "rgb(127, 127, 127)")
      .attr("stroke-width", "1px");

    svg
      .append("circle")
      .attr("cx", 100)
      .attr("cy", 150)
      .attr("r", 40)
      .attr("fill", "steelblue");
  }, []); // run once on mount

  return <svg ref={ref}></svg>;
};

export default CDTmap;
