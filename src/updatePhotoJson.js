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

      if (lat && lon) {
        features.push({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [lon, lat], // GeoJSON expects [lon, lat]
          },
          properties: {
            path: photoPath.slice(7), //trim off the public/ prefix
            dateTime,
            offsetTime,
          },
        });
      } else {
        console.warn(`⚠️ No GPS data found in ${photoPath}`);
      }
    } catch (err) {
      console.error(`Error processing ${path}:`, err);
    }
  }

  // Wrap in FeatureCollection
  const geojson = {
    type: "FeatureCollection",
    features,
  };

  // ✅ Write GeoJSON into public/
  const outputFile = path.join(__dirname, "../public/geoPhotos.geojson");
  fs.writeFileSync(outputFile, JSON.stringify(geojson, null, 2));
  console.log(`✅ Wrote ${features.length} features to ${outputFile}`);
}

// ---- MAIN ----

// First, read the directory and create photoList.json
const dirPath = path.join(__dirname, "../public/CDTvisPhotos"); // change to your directory
const outputFile = path.join(__dirname, "../public/photoList.json");

fs.readdir(dirPath, { withFileTypes: true }, (err, entries) => {
  if (err) throw err;

  const files = entries
    .filter((entry) => entry.isFile())
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
