import React, { useState, useEffect } from "react";
import { auth, onAuthStateChanged } from "./firebase";
import { signOut } from "firebase/auth";

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

  const WelcomeMessage = ({ user }) => (
    <>
      <p>Welcome, {user.email}</p>
      <button onClick={() => signOut(auth)}>Sign Out</button>
    </>
  );

  return (
    <>
      {user ? <WelcomeMessage user={user} /> : <LoginDialog />}

      <CDTmap user={user} />
      <div id="tooltip"></div>
    </>
  );
}

export default App;
