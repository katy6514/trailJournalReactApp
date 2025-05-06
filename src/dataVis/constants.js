export const width = 1000;
export const height = 700;

export const projection = d3
  .geoAlbersUsa()
  .scale(2000)
  .translate([width * 0.9, height * 0.625]);

export const path = d3.geoPath().projection(projection);
