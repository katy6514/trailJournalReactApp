import React, { useState } from "react";
import UploadDialog from "./UploadDialog.js";
import { dataTypes } from "../dataVis/constants.js";

import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { photos } from "../photosArray"; // adjust path as needed

photos.sort((a, b) => {
  console.log("Comparing dates:", a.dateTime, b.dateTime);
  const dateA = new Date(a.dateTime.replace(/:/, "-").replace(/:/, "-"));
  const dateB = new Date(b.dateTime.replace(/:/, "-").replace(/:/, "-"));
  return dateA - dateB; // ascending (earliest first)
});

function Gallery() {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <RowsPhotoAlbum
        photos={photos}
        // targetRowHeight={150}
        onClick={({ index }) => setIndex(index)}
      />
      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        // enable optional lightbox plugins
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Captions]}
      />
    </>
  );
}

export default function PhotosSection({ user }) {
  return (
    <section
      className="wrapper style1 align-center addBoxShadow"
      id="photoSection"
    >
      <div className="inner">
        <h2>Photos</h2>
        <p>
          Below are some of the photos I took during my trip. Still working on
          this section! XD
        </p>
        {user && <UploadDialog uploadType={dataTypes.photo} user={user} />}
      </div>

      <div className="inner divided">
        <Gallery />
      </div>
    </section>
  );
}
