import React, { useState } from "react";
import UploadDialog from "./UploadDialog.js";
import { dataTypes } from "../dataVis/constants.js";

export default function UploadSection() {
  return (
    <section class="wrapper style1 align-center">
      <div class="inner divided">
        <h2>Upload Section</h2>
        {/* <p>
          This is an <strong>Items</strong> element, and it's basically just a
          grid for organizing items of various types. You can customize its{" "}
          <span class="demo-controls">
            appearance with a number of modifiers
          </span>
          , as well as assign it an optional <code>onload</code> or{" "}
          <code>onscroll</code> transition modifier (
          <a href="#reference-items">details</a>).
        </p> */}
        <div class="items style1 medium onscroll-fade-in">
          <section>
            <span class="icon style2 major fa-gem"></span>
            <h3>Garmin data</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui
              turpis, cursus eget orci amet aliquam congue semper. Etiam eget
              ultrices risus nec tempor elit.
            </p>
          </section>
          <section>
            <span class="icon solid style2 major fa-save"></span>
            <h3>Trail Routes</h3>
            <p>
              Click below to upload json data from Caltopo or other sources.
            </p>
            <UploadDialog uploadType={dataTypes.trail} />
          </section>
          <section>
            <span class="icon solid style2 major fa-chart-bar"></span>
            <h3>Photos</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui
              turpis, cursus eget orci amet aliquam congue semper. Etiam eget
              ultrices risus nec tempor elit.
            </p>
          </section>
          <section>
            <span class="icon solid style2 major fa-wifi"></span>
            <h3>Journal Entries</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui
              turpis, cursus eget orci amet aliquam congue semper. Etiam eget
              ultrices risus nec tempor elit.
            </p>
          </section>
          <section>
            <span class="icon solid style2 major fa-cog"></span>
            <h3>Videos</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui
              turpis, cursus eget orci amet aliquam congue semper. Etiam eget
              ultrices risus nec tempor elit.
            </p>
          </section>
          <section>
            <span class="icon style2 major fa-paper-plane"></span>
            <h3>Six</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dui
              turpis, cursus eget orci amet aliquam congue semper. Etiam eget
              ultrices risus nec tempor elit.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
}
