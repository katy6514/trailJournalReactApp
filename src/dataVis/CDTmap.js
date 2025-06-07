import React, { useRef, useEffect, useMemo } from "react";
import * as d3 from "d3";

import { width, height, cities } from "./constants.js";

import {
  getAlternatingColor,
  checkForCampsite,
  handleMouseOver,
  handleMouseMove,
  handleMouseOut,
} from "./utils.js";

const CDTmap = ({ user }) => {
  const ref = useRef();

  console.log({ user });

  // ✅ Define projection + path WITHIN component and memoize
  const projection = useMemo(() => {
    return d3
      .geoAlbersUsa()
      .scale(2000)
      .translate([width * 0.9, height * 0.625]);
  }, []);

  const path = useMemo(() => d3.geoPath().projection(projection), [projection]);

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("id", "CDTmap")
      .attr("width", width)
      .attr("height", height)
      .attr("stroke", "rgb(127, 127, 127)")
      .attr("stroke-width", "1px");

    svg.selectAll("*").remove();

    const g = svg.append("g").attr("class", "mapLayer");

    // Add zoom behavior
    const zoom = d3
      .zoom()
      .scaleExtent([1, 500])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
        g.selectAll("circle").attr("r", 4 / event.transform.k);
        g.selectAll("text").attr("font-size", 12 / event.transform.k);
        g.selectAll("line").attr("stroke-width", 1 / event.transform.k);
        g.selectAll(".trail").attr("stroke-width", 2 / event.transform.k);
      });

    svg.call(zoom);

    svg.on("click", (event) => {
      if (!event.target.classList.contains("state-clickable")) {
        svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity);
      }
    });

    /* -----------------------------------------------------
    *  State outline mapping functionality
    ----------------------------------------------------- */
    // geojson data from: https://github.com/johan/world.geo.json/tree/master
    d3.json("CDTstates.json").then((stateData) => {
      g.selectAll(".state")
        .data(stateData.features)
        .enter()
        .append("path")
        .attr("class", "state state-clickable")
        .attr("fill", "transparent")
        .attr("stroke", "gray")
        .attr("stroke-width", "1px")
        .attr("d", path)
        // .lower()
        .on("click", function (event, d) {
          event.stopPropagation();

          // Check if we’re already zoomed in on this state
          const [[x0, y0], [x1, y1]] = path.bounds(d); // Get bounding box of the selected state
          const dx = x1 - x0;
          const dy = y1 - y0;
          const x = (x0 + x1) / 2;
          const y = (y0 + y1) / 2;
          const scale = Math.max(
            1,
            Math.min(8, 0.9 / Math.max(dx / width, dy / height))
          );
          const translate = [width / 2 - scale * x, height / 2 - scale * y];

          svg
            .transition()
            .duration(750)
            .call(
              zoom.transform,
              d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale)
            );
        });
    });

    /* -----------------------------------------------------
    *  Plotting route Data
    ----------------------------------------------------- */
    d3.json("/CDT_border_to_lincoln.json").then((trailData) => {
      // Plot the points
      g.selectAll(".trail")
        .data(trailData.features)
        .enter()
        .append("path")
        .attr("class", "trail")
        .attr("d", path)
        .attr("stroke", (d) => getAlternatingColor(d.properties))
        .attr("stroke-width", 1)
        .attr("fill", "none")
        .on("mouseover", handleMouseOver)
        .on("mousemove", handleMouseMove)
        .on("mouseout", handleMouseOut);
    });

    /* -----------------------------------------------------
    *  Plotting Garmin Data
    ----------------------------------------------------- */
    d3.json("cdtInreachData_withCoords.geojson").then((inReachdata) => {
      const points = inReachdata.features.filter(
        (d) =>
          d.geometry?.type === "Point" &&
          Array.isArray(d.geometry.coordinates) &&
          d.geometry.coordinates.length === 2
      );
      const validPoints = points.filter((d) =>
        projection(d.geometry.coordinates)
      );

      // Plot the points
      g.selectAll(".points")
        .data(validPoints)
        .enter()
        .append("circle")
        .attr("class", "points")
        .attr("cx", (d) => projection(d.geometry.coordinates)[0])
        .attr("cy", (d) => projection(d.geometry.coordinates)[1])
        .attr("r", 4)
        .attr("fill", (d) => checkForCampsite(d))
        .attr("stroke", "none")
        .on("mouseover", handleMouseOver)
        .on("mousemove", handleMouseMove)
        .on("mouseout", handleMouseOut);
    });

    /* -----------------------------------------------------
    *  Take the cleaned photo geojson data and plot it
    ----------------------------------------------------- */
    if (user) {
      d3.json("photoData.json").then((photoData) => {
        const validPoints = photoData.filter((d) =>
          projection([d.longitude, d.latitude])
        );
        g.selectAll(".photoPoints")
          .data(validPoints)
          .enter()
          .append("circle")
          .attr("class", "photoPoints")
          .attr("cx", (d) => projection([d.longitude, d.latitude])[0])
          .attr("cy", (d) => projection([d.longitude, d.latitude])[1])
          .attr("r", 4)
          .attr("fill", "green")
          .attr("stroke", "none")
          .on("mouseover", handleMouseOver)
          .on("mousemove", handleMouseMove)
          .on("mouseout", handleMouseOut);
      });
    }

    /* -----------------------------------------------------
    *  City data
    ----------------------------------------------------- */

    const cityGroup = g.append("g").attr("class", "cities");

    cityGroup
      .selectAll("circle")
      .data(cities)
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("fill", "black")
      .attr("stroke", "none")
      .attr("cx", (d) => projection([d.lon, d.lat])[0])
      .attr("cy", (d) => projection([d.lon, d.lat])[1]);

    cityGroup
      .selectAll("line")
      .data(cities)
      .enter()
      .append("line")
      .attr("x1", (d) => projection([d.lon, d.lat])[0])
      .attr("y1", (d) => projection([d.lon, d.lat])[1])
      .attr("x2", (d) => projection([d.lon, d.lat])[0] + d.dx)
      .attr("y2", (d) => projection([d.lon, d.lat])[1] + d.dy)
      .attr("stroke", "black")
      .attr("stroke-width", 1);

    cityGroup
      .selectAll("text")
      .data(cities)
      .enter()
      .append("text")
      .attr("class", "city_labels")
      .attr("x", (d) => projection([d.lon, d.lat])[0] + d.dx)
      .attr("y", (d) => projection([d.lon, d.lat])[1] + d.dy)
      .text((d) => d.name)
      .attr("font-size", 12)
      .attr("text-anchor", (d) => (d.dx <= 0 ? "end" : "start"))
      .attr("fill", "black")
      .attr("stroke", "none");
  }, [path, projection, user]);

  return <svg ref={ref}></svg>;
};

export default CDTmap;
