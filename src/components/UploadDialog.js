import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; // your firebase.js setup
import { haversineDistance } from "../dataVis/utils.js"; // utility function to compute distance

export default function FormDialog({ uploadType, user }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const computeTrailLength = (trailGeometry) => {
    const coords = trailGeometry?.coordinates || [];
    let totalMiles = 0;
    for (let i = 0; i < coords.length - 1; i++) {
      totalMiles += haversineDistance(coords[i], coords[i + 1]);
    }
    return totalMiles;
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/json") return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const { features } = parsed;

        const updatedFeatures = features.map((feature) => {
          const lengthInMiles = computeTrailLength(feature.geometry);
          return {
            ...feature,
            properties: {
              ...feature.properties,
              length: lengthInMiles.toFixed(2),
            },
          };
        });

        // ✅ Save to Firestore if you're the allowed user
        if (user?.email === "katy@gmail.com") {
          await addDoc(collection(db, "trails"), {
            title: parsed.properties?.title || "Uploaded Trail Collection",
            uploadedBy: user.email,
            createdAt: serverTimestamp(),
            featuresJson: JSON.stringify(updatedFeatures),
          });
          alert("Trail uploaded!");
        } else {
          alert("You do not have permission to upload.");
        }
      } catch (err) {
        console.log("Error parsing JSON:", err);
        alert("Invalid JSON.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <React.Fragment>
      <button onClick={handleClickOpen}>Upload {uploadType}</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <h3>Upload {uploadType}</h3>
          <p>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </p>
          <input type="file" accept=".json" onChange={handleFileChange} />
          {/* <button>Upload</button> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
