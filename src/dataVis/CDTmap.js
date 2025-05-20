import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

import { width, height, path, projection, cities } from "./constants.js";

import {
  getAlternatingColor,
  checkForCampsite,
  handleMouseOver,
  handleMouseMove,
  handleMouseOut,
} from "./utils.js";

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

    /* -----------------------------------------------------
    *  Plotting route Data
    ----------------------------------------------------- */
    d3.json("/CDT_border_to_lincoln.json").then((data) => {
      // Plot the points
      svg
        .selectAll(".trail")
        .data(data.features)
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
    d3.json("cdtInreachData_withCoords.geojson").then((data) => {
      const points = data.features.filter(
        (d) =>
          d.geometry?.type === "Point" &&
          Array.isArray(d.geometry.coordinates) &&
          d.geometry.coordinates.length === 2
      );
      const validPoints = points.filter((d) => {
        const projected = projection(d.geometry.coordinates);
        return projected != null;
      });

      // Plot the points
      svg
        .selectAll(".points")
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
    *  State outline mapping functionality
    ----------------------------------------------------- */
    // geojson data from: https://github.com/johan/world.geo.json/tree/master
    d3.json("CDTstates.json").then((data) => {
      svg
        .selectAll(".state")
        .data(data.features)
        .enter()
        .append("path")
        .attr("class", "state")
        .attr("fill", "rgba(255, 255, 255, 0)")
        .attr("stroke", "rgb(127, 127, 127)")
        .attr("stroke-width", "1px")
        .attr("d", path)
        .lower()
        .on("click", clicked);
    });

    /* -----------------------------------------------------
    *  Take the cleaned photo geojson data and plot it
    ----------------------------------------------------- */
    d3.json("photoData.json").then((photoData) => {
      const validPoints = photoData.filter((d) => {
        const projected = projection([d.longitude, d.latitude]);
        return projected != null;
      });
      svg
        .selectAll(".photoPoints")
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

    const cityGroup = svg.append("g").attr("class", "cities");

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

    const labels = cityGroup
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

    function clicked(event, d) {
      console.log({ d });
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
    }

    // Set up the zoom behavior
    const zoom = d3
      .zoom()
      .scaleExtent([1, 500]) // Limits of the zoom scale
      // .on("zoom", handleZoom);
      .on("zoom", (event) => {
        const { transform } = event;
        const scale = transform.k;

        // d3.select("#CDTmap").attr("transform", transform);
        svg.selectAll("circle").attr("transform", transform); // Apply transform on zoom
        svg.selectAll("path").attr("transform", transform); // Apply transform on zoom
        svg.selectAll("text").attr("transform", transform); // Apply transform on zoom
        svg.selectAll("image").attr("transform", transform); // Apply transform on zoom
        svg.selectAll("line").attr("transform", transform); // Apply transform on zoom

        // Adjust point sizes inversely to zoom
        d3.selectAll("circle").attr("r", 4 / scale);
        labels.attr("font-size", 12 / scale);
        d3.selectAll("line").attr("stroke-width", 1 / scale);
        d3.selectAll(".trail").attr("stroke-width", 2 / scale);
      });

    svg.call(zoom);

    // Add background click to reset zoom
    svg.on("click", (event) => {
      if (event.target.tagName !== "path") {
        // Check if clicked outside a state
        svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity); // Reset zoom to initial state
      }
    });
  }, []); // run once on mount

  return <svg ref={ref}></svg>;
};

export default CDTmap;
