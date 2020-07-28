const slider = document.getElementById("slider");
const track = document.getElementById("track");
const button = document.getElementById("slider-button");
const trackRect = track.getBoundingClientRect();
const currentValue = document.getElementById("current-value");

const min = 0;
const max = 9;
const increment = 0.5;
const startValue = 5;

const diff = max - min;
const seperatorCount = diff / increment;
let leftPos = 0;
let isMouseDown = false;
let buttonPos;
let seperatorValues = [];
let sliderValue = 0;

// set start position
const startPos =
  (((100 / seperatorCount) * (startValue / increment)) / 100) *
  (trackRect.right - trackRect.left);
button.style.left = startPos + "px";

// set current value on frontend
if (currentValue) {
  currentValue.innerHTML = startValue;
}

// create dividers
for (i = 0; i <= seperatorCount; i++) {
  const seperator = document.createElement("span");
  seperator.style.left = `${(100 / seperatorCount) * i}%`;
  seperatorValues.push((100 / seperatorCount) * i);
  track.appendChild(seperator);
}

button.addEventListener("mousedown", (e) => {
  buttonPos = e.offsetX - button.offsetWidth / 2;
  isMouseDown = true;
});

document.addEventListener("mouseup", (e) => {
  if (isMouseDown) {
    const maxWidth = trackRect.right - trackRect.left;

    let pos;
    if (leftPos < 0) {
      pos = 0;
    } else if (leftPos > maxWidth) {
      pos = maxWidth;
    } else {
      pos = leftPos;
    }

    const posPercentage = (pos / maxWidth) * 100;
    const closestSeperator = seperatorValues.reduce((a, b) => {
      return Math.abs(b - posPercentage) < Math.abs(a - posPercentage) ? b : a;
    });

    const finalPos = maxWidth * (closestSeperator / 100);
    button.style.left = finalPos + "px";
    sliderValue = seperatorValues.indexOf(closestSeperator) * increment;
    if (currentValue) {
      currentValue.innerHTML = sliderValue;
    }

    isMouseDown = false;
  }
});

document.addEventListener("mousemove", (e) => {
  if (isMouseDown === true) {
    leftPos = e.clientX - trackRect.left - buttonPos;

    const maxWidth = trackRect.right - trackRect.left;
    if (leftPos > 0 && leftPos < maxWidth) {
      button.style.left = leftPos + "px";
    }
  }
});
