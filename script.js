// DAY TODAY DISPLAY
const options = {
  weekday: "long", // Full name of the weekday (e.g., "Saturday")
  year: "numeric", // Numeric representation of the year (e.g., "2026")
  month: "long", // Full name of the month (e.g., "February")
  day: "numeric", // Numeric representation of the day (e.g., "14")
};

const today = new Date(); // Create a new Date object representing the current date and time

// Format the date according to the specified options and update the DOM
document.getElementById("date").innerText = today.toLocaleDateString(
  undefined, // Use the default locale of the user's browser
  options, // Apply the defined formatting options
);

// ANALOGUE DISPLAY
// 2⫪ radians = 360° degrees for full circle
// ⫪ radians = 180° degrees for half circle

// Set the dimensions for the clock
let width = 300; // Width of the canvas
let height = width; // Height is equal to width for a square canvas
let radius = width / 2; // Radius of the clock face

let canvas; // Variable to hold the canvas element
let ctx; // Variable to hold the drawing context

// Function to execute when the window loads
window.onload = function () {
  // Get the canvas element by its ID
  canvas = document.getElementById("clock");
  canvas.width = width; // Set the canvas width
  canvas.height = height; // Set the canvas height
  ctx = canvas.getContext("2d"); // Get the 2D drawing context
  ctx.translate(radius, radius); // Move the origin to the center of the canvas
  radius *= 0.9; // Adjust radius for drawing - same as radius = radius * 0.9
  drawClock(); // Start drawing the clock
};

// Function to draw the entire clock
function drawClock() {
  drawFace(); // Draw the clock face
  drawNumbers(); // Draw the hour numbers
  drawTime(); // Draw the current time
  setTimeout(drawClock, 1000); // Update the clock every second
}

// Function to draw the clock face
function drawFace() {
  ctx.beginPath(); // Begin a new path
  ctx.arc(0, 0, radius, 0, 2 * Math.PI); // Draw a circle
  ctx.lineWidth = radius * 0.3; // Set the line width
  ctx.stroke(); // Outline the clock face
  ctx.fillStyle = "#E0E0E0"; // Set the fill color
  ctx.fill(); // Fill the clock face
}

// Function to draw the hour numbers
function drawNumbers() {
  ctx.font = `300 ${radius * 0.2}px Roboto Serif`; // Set font-weight, font-size and font-family
  ctx.textBaseline = "middle"; // Align text vertically
  ctx.textAlign = "center"; // Align text horizontally
  ctx.fillStyle = "#101010"; // Set text color

  // Loop to draw numbers 1 to 12
  for (let num = 1; num <= 12; num++) {
    let angle = (num * Math.PI) / 6; // Calculate angle for each number
    ctx.rotate(angle); // Rotate context to position number
    ctx.translate(0, -radius * 0.85); // Move to the correct position
    ctx.rotate(-angle); // Rotate back

    ctx.fillText(num.toString(), 0, 0); // Draw the number
    ctx.rotate(angle); // Rotate again to restore context
    ctx.translate(0, radius * 0.85); // Move back to the center
    ctx.rotate(-angle); // Rotate back
  }
}

// Function to draw the current time
function drawTime() {
  let now = new Date(); // Get the current date and time
  let hour = now.getHours() % 12; // Get the current hour (12-hour format)
  let minute = now.getMinutes(); // Get the current minute
  let second = now.getSeconds(); // Get the current second

  // Calculate angles for the hands // drawHand(angle, length, width, color)
  drawHand((second * Math.PI) / 30, radius * 0.75, radius * 0.01, "red"); // Draw the second hand
  drawHand((minute * Math.PI) / 30, radius * 0.7, radius * 0.02, "black"); // Draw the minute hand
  let hourAngle = (hour * Math.PI) / 6 + (minute * Math.PI) / 360; // Adjust for minutes
  drawHand(hourAngle, radius * 0.5, radius * 0.03, "black"); // Draw the hour hand

  // Draw the center of the clock
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI); // Draw a small circle
  ctx.fillStyle = "black"; // Set fill color
  ctx.fill(); // Fill the center
}

// Function to draw a clock hand
function drawHand(angle, length, width, color) {
  ctx.beginPath(); // Begin a new path
  ctx.lineWidth = width; // Set the line width
  ctx.lineCap = "round"; // Set the line cap style
  ctx.strokeStyle = color; // Set the color
  ctx.moveTo(0, 0); // Move to the center of the clock
  ctx.rotate(angle); // Rotate to the correct angle
  ctx.lineTo(0, -length); // Draw the hand
  ctx.stroke(); // Outline the hand
  ctx.rotate(-angle); // Rotate back to the original position
}

// DIGITAL DISPLAY
let input = document.getElementById("toggleSwitch");
let statusText = document.getElementById("status");
let hourFormat = false; // Boolean to track the current time format
statusText.innerHTML = "12 HOUR CLOCK"; // Inital text displayed

// Function to display the current time
function displayTime() {
  let dateTime = new Date(); // Create a new Date object to get the current date and time
  let hrs = dateTime.getHours(); // Retrieve hours from the Date object -- 24 hours
  let min = dateTime.getMinutes(); // Retrieve  minutes from the Date object
  let sec = dateTime.getSeconds(); // Retrieve seconds from the Date object
  let dateToday = dateTime.toDateString(); // Get the current date in a readable format
  let am_pm = hrs >= 12 ? "PM" : "AM"; // Determine AM or PM

  // Convert hours from 24-hour format to 12-hour format
  let hrs12 = hrs > 12 ? hrs - 12 : hrs === 0 ? 12 : hrs;

  // Add leading zero to seconds, minutes, and hours if less than 10
  sec = sec < 10 ? "0" + sec : sec;
  min = min < 10 ? "0" + min : min;
  hrs = hrs < 10 ? "0" + hrs : hrs;
  hrs12 = hrs12 < 10 ? "0" + hrs12 : hrs12;

  // Event listener for the toggle switch to change time format
  input.addEventListener("change", function () {
    if (this.checked) {
      statusText.innerHTML = "24 HOUR CLOCK"; // Update status text for 24-hour format
      hourFormat = true; // Set format to 24-hour
    } else {
      statusText.innerHTML = "12 HOUR CLOCK"; // Update status text for 12-hour format
      hourFormat = false; // Set format to 12-hour
    }
  });

  // Update the HTML element with the formatted time based on the selected format
  if (hourFormat) {
    document.getElementById("time").innerHTML = `${hrs}:${min}:${sec}`; // 24-hour format
  } else {
    document.getElementById("time").innerHTML =
      `<span class="hour-spacer">${hrs12}:${min}:${sec} <span class="am-pm">${am_pm}</span></span>`; // 12-hour format
  }
}

// Call displayTime every second to update the time
setInterval(displayTime, 1000);

// COPYRIGHT NOTICE
// Dynamically generate copyright information
const copyright = document.getElementById("copy");
copyright.innerHTML =
  "Copyright &copy; " + // Start of the copyright string
  new Date().getFullYear() + // Get the current year
  ` <a href="https://www.gaz41.com">gaz41.com</a>. <span class="copy2">All Rights Reserved</span>`;
