import CDTmap from "../dataVis/CDTmap";
import LoginForm from "./LoginForm";
import { auth, onAuthStateChanged } from "../firebase";
import { signOut } from "firebase/auth";

export default function MapSection({ user }) {
  const WelcomeMessage = ({ user }) => (
    <>
      <p>Welcome, {user.email}</p>
      <button onClick={() => signOut(auth)}>Sign Out</button>
    </>
  );
  return (
    <section class="wrapper style1 align-center">
      <div class="inner">
        <h2>The Map</h2>

        <div class="index align-left">
          <section>
            <header>
              <h3>Helpful Hints</h3>
            </header>
            <div class="content">
              <ul>
                <li>Click once to zoom in on a state</li>
                <li>Double click to increase zoom</li>
                <li>Click and drag to pan</li>
                <li>Click outside state lines to reset zoom</li>
                <li>Hover over the photo points to see the photo</li>
              </ul>
            </div>
          </section>
        </div>
        <CDTmap user={user} />
        <div class="index align-left">
          <section>
            <header>
              <h3>Sign In</h3>
            </header>
            <div class="content">
              {/* <h4>Given credentials to login?</h4>
              <p>Sign in below to see more</p> */}
              {user ? <WelcomeMessage user={user} /> : <LoginForm />}
            </div>
          </section>
        </div>
      </div>
      <div id="tooltip"></div>
    </section>
  );
}
