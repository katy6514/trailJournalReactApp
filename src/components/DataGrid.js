import React, { useState } from "react";
import UploadDialog from "./UploadDialog.js";
import { dataTypes } from "../dataVis/constants.js";

export default function DataGrid({ user }) {
  return (
    <section class="wrapper style1 align-center">
      <div class="inner divided">
        <h2>The Data</h2>
        <p>
          Below are the ways I gathered data during my trip. You can follow the
          buttons to learn more
        </p>
        <div class="items style1 medium onscroll-fade-in">
          <section>
            <span class="icon style2 major fa-gem"></span>
            <h3>Garmin data</h3>
            <p>
              I carried a Garmin Inreach Mini 2 on my trip, and used it to save
              the location of my campsites send messages.
            </p>
          </section>
          <section>
            <span class="icon solid style2 major fa-save"></span>
            <h3>Trail Routes</h3>
            <p>
              Click below to upload json data from Caltopo or other sources.
            </p>
            <UploadDialog uploadType={dataTypes.trail} user={user} />
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
