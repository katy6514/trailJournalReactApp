import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; // your firebase.js setup

export default function FormDialog({ uploadType, user }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || file.type !== "application/json") return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target.result);

        // ✅ Save to Firestore if you're the allowed user
        if (user?.email === "katy@gmail.com") {
          await addDoc(collection(db, "trails"), {
            title: parsed.properties?.title || "Uploaded Trail",
            uploadedBy: user.email,
            createdAt: serverTimestamp(),
            featuresJson: JSON.stringify(parsed.features),
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
