import React, { useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "./firebase";

import MapSection from "./components/MapSection.js";
import UploadSection from "./components/UploadSection.js";
import TrailsSection from "./components/TrailsSection.js";

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
      <UploadSection user={user} />
      <TrailsSection />
    </>
  );
}

export default App;
