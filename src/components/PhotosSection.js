import React, { useState } from "react";
import UploadDialog from "./UploadDialog.js";
import { dataTypes } from "../dataVis/constants.js";

import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// import optional lightbox plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const photos = [
  {
    src: "/CDTvisPhotos/014934BC-66C4-4CAD-B91C-6FF34AF38601.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "/CDTvisPhotos/01E85E57-A5E7-4F37-8A60-4F763585F30E.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "/CDTvisPhotos/05D95CF0-1A88-4D89-9A20-4ED37BB70421.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "/CDTvisPhotos/10C98EB4-9252-4C67-BE7B-735525D80F30.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "/CDTvisPhotos/014934BC-66C4-4CAD-B91C-6FF34AF38601.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "/CDTvisPhotos/01E85E57-A5E7-4F37-8A60-4F763585F30E.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "/CDTvisPhotos/05D95CF0-1A88-4D89-9A20-4ED37BB70421.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "/CDTvisPhotos/10C98EB4-9252-4C67-BE7B-735525D80F30.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "/CDTvisPhotos/014934BC-66C4-4CAD-B91C-6FF34AF38601.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "/CDTvisPhotos/01E85E57-A5E7-4F37-8A60-4F763585F30E.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "/CDTvisPhotos/05D95CF0-1A88-4D89-9A20-4ED37BB70421.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "/CDTvisPhotos/10C98EB4-9252-4C67-BE7B-735525D80F30.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "/CDTvisPhotos/014934BC-66C4-4CAD-B91C-6FF34AF38601.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "/CDTvisPhotos/01E85E57-A5E7-4F37-8A60-4F763585F30E.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "/CDTvisPhotos/05D95CF0-1A88-4D89-9A20-4ED37BB70421.jpg",
    width: 800,
    height: 600,
  },
  {
    src: "/CDTvisPhotos/10C98EB4-9252-4C67-BE7B-735525D80F30.jpg",
    width: 800,
    height: 600,
  },
];

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
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </>
  );
}

export default function PhotosSection({ user }) {
  return (
    <section className="wrapper style1 align-center addBoxShadow">
      <div className="inner divided">
        <h2>Photos</h2>
        <p>
          Below are some of the photos I took during my trip. You can follow the
          buttons to learn more.
        </p>
        {user && <UploadDialog uploadType={dataTypes.photo} user={user} />}
      </div>
      <Gallery />
    </section>
  );
}
