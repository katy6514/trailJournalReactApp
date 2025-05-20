import { dateTimeFormatter } from "./constants.js";

/**
 * Taakes the properties object of a route and returns a color based on the leg number.
 * @param {*} properties
 * @returns blue or orange
 */
export function getAlternatingColor(properties) {
  const { title } = properties;
  if (typeof title === "string") {
    const legNum = Number(title.split(" ")[0]);
    if (legNum % 2 === 0) {
      return "blue";
    } else {
      return "orange";
    }
  }
}

export function checkForCampsite(data) {
  // Function to check if the data contains a campsite
  if (!data || !data.properties) {
    return false; // Invalid data
  }

  if (data.properties.MessageText.toLowerCase().includes("camped")) {
    return "blue";
  }
  return "red"; // No campsite found
}

/**
 *
 * @param {*} event
 * @param {*} d
 * @returns
 */

export function handleMouseOver(event, d) {
  //   console.log(this);
  if (!d) {
    return;
  }
  const tooltip = document.getElementById("tooltip");

  if (d.geometry && d.geometry.type) {
    const { type } = d.geometry;
    if (type === "Point") {
      // inreach data point, display its date
      const { MessageText } = d.properties;
      const messageDate = new Date(d.properties.GPSTime);
      const messageDateString = dateTimeFormatter.format(messageDate);
      tooltip.innerHTML = ` <p>Message Date: ${messageDateString}</p><br /><p>${MessageText}</p>`;
      tooltip.style.display = "block";
    } else if (type === "LineString") {
      // trail route, display it's leg name
      const legNum = d.properties.title;
      const legName = d.properties.description;
      tooltip.innerHTML = ` <p>Leg #${legNum}: ${legName}<p>`;
      tooltip.style.display = "block";
    }
  } else {
    tooltip.innerHTML = `<img src="${d.path}" width="550">`;
    tooltip.style.display = "block";
  }
}

export function handleMouseMove(event) {
  const tooltip = document.getElementById("tooltip");
  tooltip.style.left = event.pageX + 15 + "px";
  tooltip.style.top = event.pageY - 50 + "px";
}

export function handleMouseOut() {
  document.getElementById("tooltip").style.display = "none";
}
