import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import { auth } from "../firebase";

import { signInWithEmailAndPassword } from "firebase/auth";

export default function FormDialog() {
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

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
    <>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        noValidate
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "50%",
          gap: 2,
        }}
      >
        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <TextField
            error={emailError}
            helperText={emailErrorMessage}
            id="email"
            type="email"
            name="email"
            placeholder="your@email.com"
            autoComplete="email"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={emailError ? "error" : "primary"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="password">Password</FormLabel>
          <TextField
            error={passwordError}
            helperText={passwordErrorMessage}
            name="password"
            placeholder="••••••"
            type="password"
            id="password"
            autoComplete="current-password"
            autoFocus
            required
            fullWidth
            variant="outlined"
            color={passwordError ? "error" : "primary"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          //   onClick={validateInputs}
        >
          Sign in
        </Button>
      </Box>
    </>
  );
}
