import React from "react";

import CDTmap from "./dataVis/CDTmap.js";

import "./App.css";

function App() {
  return (
    <>
      <h1>My CDT Trail Journal</h1>
      <h2>About</h2>
      <p>
        In the summer of 2024, I started a ~3000 journey hiking down the
        continental divide trail. I started in Montana at the Canadian border
        and walked south for the next 5 months. Along the way I took pictures,
        wrote in my journal, sent messages to loved ones with the use of a
        satellite communicator and saved the locations of my campsites. This
        page is my process of combining all those parts of my trip into one data
        visualization.
      </p>
      <p>It's still very much a work in progress! </p>
      <section>
        <h3>Instructions</h3>
        <p>click once to zoom in on a state</p>
        <p>double click to increase zoom</p>
        <p>click and drag to pan</p>
        <p>click outside state lines to reset zoom</p>
        <p>hover over the photo points to see the photo</p>
        {/* <script src="dataCleaning.js"></script>
        <script src="code.js"></script> */}
      </section>
      <CDTmap />
      <div id="tooltip"></div>
    </>
  );
}

export default App;
