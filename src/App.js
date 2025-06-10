import React, { useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "./firebase";

import MapSection from "./components/MapSection.js";
import DataGrid from "./components/DataGrid.js";
import TrailsSection from "./components/TrailsSection.js";
import PhotosSection from "./components/PhotosSection.js";
import Footer from "./components/Footer.js";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <MapSection user={user} />
      <DataGrid user={user} />
      <TrailsSection user={user} />
      <PhotosSection user={user} />
      <Footer user={user} />
    </>
  );
}

export default App;
