import React, { useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "./firebase";

import MapSection from "./components/MapSection.js";

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
      <div id="tooltip"></div>
    </>
  );
}

export default App;
