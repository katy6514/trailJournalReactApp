// import React, { useState } from "react";
import UploadDialog from "./UploadDialog.js";
import { dataTypes } from "../dataVis/constants.js";
import TrailsTable from "./TrailsTable.js";

export default function TrailsSection({ user }) {
  return (
    <>
      <section
        class="spotlight addBoxShadow style1 orient-right content-align-left image-position-center onscroll-image-fade-in"
        id="trailSection"
      >
        <div class="content">
          <h2>Trail Sections</h2>
          <p>
            I saved the location of my nightly campsites with my garmin. I did
            not record my walks each day with the garmin becuase I didn't want
            to drain the battery. Instead I used the saved locations of my
            campsites and recreated the route I took each day with Caltopo. I
            then exported those tracks as GeoJSON and uploaded them here.
          </p>
          {user && <UploadDialog uploadType={dataTypes.trail} user={user} />}
        </div>
        <div class="image">
          <img src="images/spotlight01.jpg" alt="" />
        </div>
      </section>
      <section class="wrapper style1 align-center">
        <div class="inner">
          <TrailsTable />
        </div>
      </section>
    </>
  );
}
