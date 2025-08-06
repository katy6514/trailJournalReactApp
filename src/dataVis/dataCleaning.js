// import ExifReader from "exifreader";
import * as d3 from "d3";

// const csvFilePath = ;

function csvToGeoJSON(data) {
  return {
    type: "FeatureCollection",
    features: data.map((d) => ({
      type: "Feature",
      properties: { ...d },
      geometry: {
        type: "Point",
        coordinates: [parseFloat(d.Lon), parseFloat(d.Lat)],
      },
    })),
  };
}

function cleanGeoJson(csvFilePath) {
  d3.csv(csvFilePath).then((data) => {
    const geojson = csvToGeoJSON(data);

    const cleanedGeojson = {
      ...geojson,
      features: geojson.features.filter((f) => {
        const coords = f.geometry?.coordinates;
        return (
          Array.isArray(coords) &&
          coords.length >= 2 &&
          !isNaN(coords[1]) &&
          !isNaN(coords[0]) &&
          typeof coords[1] === "number" && // lat
          typeof coords[0] === "number" // lon
        );
      }),
    };

    const timeThreshold = new Date("2024-06-16T00:00:00Z");

    const timeFilteredGeojson = {
      ...cleanedGeojson,
      features: cleanedGeojson.features.filter((f) => {
        const gpsTime = f.properties?.GPSTime;

        const timestamp = new Date(gpsTime);

        // console.log({gpsTime})
        if (timestamp >= timeThreshold) {
          return true; // Keep this feature if it meets the time threshold
        }
      }),
    };

    // console.log(cleanedGeojson);
    // console.log(timeFilteredGeojson);
    // console.log(JSON.stringify(timeFilteredGeojson, null, 2));
    // saveToFile(timeFilteredGeojson, 'cdtInreachData.geojson'); // Save the filtered GeoJSON to a file
  });
}
// uncomment to run the function
// cleanGeoJson("message-history.csv");
/**
 * Save to file
 * @param {*} data
 * @param {*} filename
 */

function saveToFile(data, filename) {
  // Convert the cleaned data to JSON
  const jsonString = JSON.stringify(data, null, 2);

  // Create a Blob with the JSON data
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  // Create a download link and click it to save the file
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();

  // Clean up by revoking the URL and removing the link
  URL.revokeObjectURL(url);
  document.body.removeChild(link);
}

/**
 *
 * Take an array of image paths and return an array of objects
 * with the path, latitude, and longitude using ExifReader.
 *
 * Then create an exportable object of the data and download it as a
 * GeoJSON file using a helper fundtion
 */
// async function loadPhotoMetadata(paths) {
//   console.log("Loading photo metadata...");
//   const geoPhotos = [];

//   for (const path of paths) {
//     try {
//       const response = await fetch(path);
//       const arrayBuffer = await response.arrayBuffer();
//       const tags = ExifReader.load(arrayBuffer);
//       const lat = tags.GPSLatitude?.description;
//       const lon = -tags.GPSLongitude?.description;
//       const dateTime = tags.DateTimeOriginal?.description;
//       const offsetTime = tags.OffsetTimeOriginal?.description;

//       if (lat && lon) {
//         geoPhotos.push({
//           path,
//           latitude: lat,
//           longitude: lon,
//           dateTime,
//           offsetTime,
//         });
//       } else {
//         console.warn(`No GPS data found in ${path}`);
//       }
//     } catch (err) {
//       console.error(`Error processing ${path}:`, err);
//     }
//   }

// const exportableGeoPhotos = geoPhotos.map((photo) => ({
//   path: photo.path, // e.g. "CDTvisPhotos/IMG_1234.jpg"
//   // type: "Photo",
//   latitude: photo.latitude,
//   longitude: photo.longitude,
//   dateTime: photo.dateTime,
//   offsetTime: photo.offsetTime,
// }));

// downloadGeoJSON(exportableGeoPhotos);
// }

/**
 *
 * Helper function to download GeoJSON file
 *
 */
// function downloadGeoJSON(data, filename = "photoData.json") {
//   const blob = new Blob([JSON.stringify(data, null, 2)], {
//     type: "application/json",
//   });
//   const url = URL.createObjectURL(blob);
//   const link = document.createElement("a");

//   link.href = url;
//   link.download = filename;
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);
//   URL.revokeObjectURL(url);
// }

// Call the function to start the photo analysis process
// loadPhotoMetadata("../public/photoList.json");
