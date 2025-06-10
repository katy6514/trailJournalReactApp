// import React, { useState } from "react";
// import UploadDialog from "./UploadDialog.js";
// import { dataTypes } from "../dataVis/constants.js";

export default function DataGrid({ user }) {
  return (
    <section class="wrapper style1 align-center addBoxShadow">
      <div class="inner divided">
        <h2>The Data</h2>
        {/* <p>
          Below are the ways I gathered data during my trip. You can follow the
          buttons to learn more
        </p> */}
        <div class="items style1 medium onscroll-fade-in">
          <section>
            {/* <span class="icon style2 major fa-gem"></span> */}
            <h3>Garmin Messages</h3>
            <p>
              I carried a Garmin Inreach Mini 2 on my trip. Most messages I sent
              also contained location. These are mapped above in the data vis as
              red dots. you can hover to see the date the message was sent{" "}
            </p>
          </section>
          <section>
            {/* <span class="icon style2 major fa-paper-plane"></span> */}
            <h3>Campsites</h3>
            <p>
              Every night once I found my campsite, I sent a preset message to
              family. When analyzing my garmin data I flagged these preset
              messages and color coded them blue in the datavis.
            </p>
          </section>
          <section>
            {/* <span class="icon solid style2 major fa-cog"></span> */}
            <h3>Videos</h3>
            <p>Coming soon!</p>
          </section>
          <section>
            {/* <span class="icon solid style2 major fa-save"></span> */}
            <h3>The Route</h3>
            <p>
              My daily miles hiked, routes generated after the hike with
              CalTopo. These are mapped in the datavis in alternating blue and
              orange lines. Hover over the leg in the datavis to see the name
              (or at least what I'm calling it).
            </p>
            <ul class="actions stacked">
              <li>
                <a
                  href="#trailSection"
                  class="button big wide smooth-scroll-middle"
                >
                  Go to Daily Progress
                </a>
              </li>
            </ul>
          </section>
          <section>
            {/* <span class="icon solid style2 major fa-chart-bar"></span> */}
            <h3>Photos</h3>
            <p>
              If you've been given login access, you can get a preview of the
              photos above in the map by hovering over the green dots. There is
              also a gallery of select photos below in the photo section.
            </p>
            <ul class="actions stacked">
              <li>
                <a
                  href="#photoSection"
                  class="button big wide smooth-scroll-middle"
                >
                  Go to Photos
                </a>
              </li>
            </ul>
          </section>
          <section>
            {/* <span class="icon solid style2 major fa-wifi"></span> */}
            <h3>Journal Entries</h3>
            <p>Coming soon!</p>
          </section>
        </div>
      </div>
    </section>
  );
}
