import CDTmap from "../dataVis/CDTmap";

export default function MapSection({ user }) {
  return (
    <section class="wrapper style1 align-center">
      <div class="inner">
        <h2>The Map</h2>
        <CDTmap user={user} />
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
      </div>
      <div id="tooltip"></div>
    </section>
  );
}
