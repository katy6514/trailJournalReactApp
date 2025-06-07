import React, { useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "./firebase";

import LoginForm from "./components/LoginForm";
import LoginDialog from "./components/LoginDialog";
import CDTmap from "./dataVis/CDTmap.js";

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
      <p>It's still very much a work in progress! </p>

      <LoginForm user={user} />
      <LoginDialog />
      <CDTmap user={user} />
      <div id="tooltip"></div>
    </>
  );
}

export default App;
