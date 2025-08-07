/**
 *
 * Take an array of image paths and return an array of objects
 * with the path, latitude, and longitude using ExifReader.
 *
 * Then create an exportable object of the data and download it as a
 * GeoJSON file using a helper fundtion
 */

const fs = require("fs");
const path = require("path");
const ExifReader = require("exifreader");

async function loadPhotoMetadata(paths) {
  console.log("Loading photo metadata...");
  const features = [];
  const galleryPhotos = [];

  for (const photoPath of paths) {
    try {
      // read the photo into a buffer
      const buffer = fs.readFileSync(photoPath);
      const arrayBuffer = buffer.buffer.slice(
        buffer.byteOffset,
        buffer.byteOffset + buffer.byteLength
      );

      // parse EXIF tags
      const tags = ExifReader.load(arrayBuffer);
      const lat = tags.GPSLatitude?.description;
      const lon = -tags.GPSLongitude?.description;
      const dateTime = tags.DateTimeOriginal?.description;
      const offsetTime = tags.OffsetTimeOriginal?.description;
      const height = tags["Image Height"]?.description;
      const width = tags["Image Width"]?.description;

      const publicPath = photoPath.slice(7); // e.g., CDTvisPhotos/filename.jpg

      if (dateTime) {
        galleryPhotos.push({
          src: "/" + publicPath,
          width: parseInt(width, 10) || 800, // default to 800 if not available
          height: parseInt(height, 10) || 600, // default to 600 if not available
          dateTime,
        });
      }

      if (lat && lon) {
        features.push({
          type: "Feature",
          geometry: {
            type: "Photo",
            coordinates: [lon, lat], // GeoJSON expects [lon, lat]
          },
          properties: {
            path: publicPath,
            dateTime,
            offsetTime,
            height,
            width,
          },
        });
      } else {
        console.warn(`⚠️ No GPS data found in ${photoPath}`);
      }
    } catch (err) {
      console.error(`Error processing ${path}:`, err);
    }
  }

  // ✅ Write GeoJSON into public/
  const geoJsonOutputFile = path.join(__dirname, "../public/geoPhotos.geojson");

  fs.writeFileSync(
    geoJsonOutputFile,
    JSON.stringify(
      {
        type: "FeatureCollection",
        features,
      },
      null,
      2
    )
  );
  console.log(`✅ Wrote ${features.length} features to ${geoJsonOutputFile}`);

  // ✅ Write photos array to public/
  const photosOutputFile = path.join(__dirname, "../src/photosArray.js");
  const photosJs = `export const photos = ${JSON.stringify(
    galleryPhotos,
    null,
    2
  )};`;
  fs.writeFileSync(photosOutputFile, photosJs);
  console.log(`✅ Wrote ${galleryPhotos.length} photos to ${photosOutputFile}`);
}

// ---- MAIN ----

// First, read the directory and create photoList.json
const dirPath = path.join(__dirname, "../public/CDTvisPhotos"); // change to your directory
const outputFile = path.join(__dirname, "../public/photoList.json");

fs.readdir(dirPath, { withFileTypes: true }, (err, entries) => {
  if (err) throw err;

  const files = entries
    .filter(
      (entry) =>
        entry.isFile() &&
        (entry.name.toLowerCase().endsWith(".jpg") ||
          entry.name.toLowerCase().endsWith(".jpeg"))
    )
    .map((file) => `public/CDTvisPhotos/${file.name}`);

  fs.writeFileSync(outputFile, JSON.stringify(files, null, 2));
  console.log(`✅ Wrote ${files.length} files to ${outputFile}`);
});

// Then, read photoList.json and process each file for metadata
const inputFile = path.join(__dirname, "../public/photoList.json");
console.log("Looking for photo list at:", inputFile);

const photoList = JSON.parse(fs.readFileSync(inputFile, "utf-8"));

// Now load the metadata and create the GeoJSON
loadPhotoMetadata(photoList);
