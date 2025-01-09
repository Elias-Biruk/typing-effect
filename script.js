const toggleStartStopButton = document.getElementById("toggle-start-stop-button");
const textInput = document.getElementById("text-input");
const output = document.getElementById("output");
const togglePauseResumeButton = document.getElementById("toggle-pause-resume-button");
const speedSlider = document.getElementById("speed-slider");
const speedValue = document.getElementById("speed-value");
const clearButton = document.getElementById("clear-button");

// Use an online sound URL
const clickSound = new Audio('https://www.soundjay.com/button/beep-07.wav'); // Online sound URL

let index = 0;
let code = "";
let isTyping = false;
let typingSpeed = 50; // Default typing speed in milliseconds
let typingInterval = null; // Used to manage the interval for typing
let isPaused = false; // To check if typing is paused

// Function to toggle cursor visibility
function toggleCursorBlink(isActive) {
  const cursor = document.querySelector(".cursor");
  cursor.style.display = isActive ? "inline-block" : "none";
}

// Function to handle typing effect
function typeCode() {
  if (index < code.length && isTyping) {
    output.textContent += code[index];
    output.scrollTop = output.scrollHeight; // Auto-scroll to the bottom
    index++;
  } else {
    stopTyping(); // Stop typing once completed
  }
}

// Start typing
function startTyping() {
  code = textInput.value.trim();
  if (!code) {
    alert("Please enter some text or code.");
    return;
  }

  resetTypingState(); // Ensure clean start
  isTyping = true;
  toggleCursorBlink(true);
  typingInterval = setInterval(typeCode, typingSpeed);

  // Update button states
  toggleStartStopButton.textContent = "Reset Typing";
  togglePauseResumeButton.disabled = false;
  togglePauseResumeButton.textContent = "Pause Typing";
  textInput.disabled = true;

  // Play click sound
  clickSound.play();
}

// Stop typing (reset state)
function stopTyping() {
  clearInterval(typingInterval);
  isTyping = false;
  typingInterval = null;
  toggleCursorBlink(false);
}

// Pause typing
function pauseTyping() {
  stopTyping();
  isPaused = true;
  togglePauseResumeButton.textContent = "Resume Typing";

  // Play click sound
  clickSound.play();
}

// Resume typing
function resumeTyping() {
  isTyping = true;
  isPaused = false;
  togglePauseResumeButton.textContent = "Pause Typing";
  typingInterval = setInterval(typeCode, typingSpeed);

  // Play click sound
  clickSound.play();
}

// Reset typing state completely
function resetTypingState() {
  stopTyping();
  output.textContent = "";
  index = 0;
  isPaused = false;
  textInput.disabled = false;

  // Update button states
  toggleStartStopButton.textContent = "Start Typing Effect";
  togglePauseResumeButton.disabled = true;
  togglePauseResumeButton.textContent = "Pause Typing";
  toggleCursorBlink(false);

  // Play click sound
  clickSound.play();
}

// Event listeners
toggleStartStopButton.addEventListener("click", () => {
  if (isTyping || isPaused) {
    resetTypingState(); // Reset if typing or paused
  } else {
    startTyping(); // Start typing effect
  }
});

togglePauseResumeButton.addEventListener("click", () => {
  if (isPaused) {
    resumeTyping();
  } else {
    pauseTyping();
  }
});

speedSlider.addEventListener("input", () => {
  typingSpeed = parseInt(speedSlider.value, 10);
  speedValue.textContent = `${typingSpeed}ms`;

  if (isTyping) {
    clearInterval(typingInterval);
    typingInterval = setInterval(typeCode, typingSpeed); // Adjust typing speed
  }

  // Play click sound
  clickSound.play();
});

clearButton.addEventListener("click", resetTypingState);
