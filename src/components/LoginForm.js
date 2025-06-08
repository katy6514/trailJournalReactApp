import React, { useState } from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import FormLabel from "@mui/material/FormLabel";
// import FormControl from "@mui/material/FormControl";
// import Box from "@mui/material/Box";
import { auth } from "../firebase";

import { signInWithEmailAndPassword } from "firebase/auth";

export default function FormDialog() {
  //   const [emailError, setEmailError] = useState(false);
  //   const [emailErrorMessage, setEmailErrorMessage] = useState("");
  //   const [passwordError, setPasswordError] = useState(false);
  //   const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    // if (emailError || passwordError) {
    //   event.preventDefault();
    //   return;
    // }
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password).catch((err) =>
      alert(err.message)
    );
  };

  //   const validateInputs = () => {
  //     const email = document.getElementById("email");
  //     const password = document.getElementById("password");

  //     let isValid = true;

  //     if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
  //       setEmailError(true);
  //       setEmailErrorMessage("Please enter a valid email address.");
  //       isValid = false;
  //     } else {
  //       setEmailError(false);
  //       setEmailErrorMessage("");
  //     }

  //     if (!password.value || password.value.length < 6) {
  //       setPasswordError(true);
  //       setPasswordErrorMessage("Password must be at least 6 characters long.");
  //       isValid = false;
  //     } else {
  //       setPasswordError(false);
  //       setPasswordErrorMessage("");
  //     }

  //     return isValid;
  //   };

  return (
    <form onSubmit={handleSubmit} class="form">
      <div class="fields">
        <div class="field half">
          <label for="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="field half">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button
        type="submit"
        fullWidth
        variant="contained"
        //   onClick={validateInputs}
      >
        Sign in
      </button>
    </form>
  );
}
