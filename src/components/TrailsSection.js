import React, { useState } from "react";
import UploadDialog from "./UploadDialog.js";
import { dataTypes } from "../dataVis/constants.js";
import TrailsTable from "./TrailsTable.js";

export default function TrailsSection({ user }) {
  return (
    <>
      <section class="wrapper style1 align-center">
        <div class="inner">
          <UploadDialog uploadType={dataTypes.trail} user={user} />
          <TrailsTable />
        </div>
      </section>
    </>
  );
}
