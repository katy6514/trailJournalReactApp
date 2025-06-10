// import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Footer({ user }) {
  const WelcomeMessage = ({ user }) => (
    <>
      <p>Welcome, {user.email}</p>
      <button onClick={() => signOut(auth)}>Sign Out</button>
    </>
  );
  return (
    <section class="wrapper style1 align-center">
      <div class="inner">
        <div class="index align-left">
          <section>
            <header>
              <h3>Thanks For Visiting!</h3>
            </header>
            <div class="content">
              <p>
                <span class="image left">
                  <img src="images/smile.jpg" alt="" />
                </span>
                Wanna Get in Touch? Want to talk about the trail? Gear? Code? A
                job? :D Shoot me an email at katy6514 [at] gmail [dot] com. I'd
                love to hear from you!
              </p>
            </div>
          </section>
        </div>
        <div class="index align-left">
          <section>
            <header>
              <h4>Given credentials to login?</h4>
            </header>
            <div class="content">
              <p>Sign in below to see more</p>
              {user ? <WelcomeMessage user={user} /> : <LoginForm />}
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
