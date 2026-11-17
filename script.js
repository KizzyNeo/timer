const counter = document.getElementById("counter");
const toggleButton = document.getElementById("toggleButton");
const tStatus = document.getElementById("status");

// Stopwatch variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;


function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return (
        String(hours).padStart(2, "0") + ":" + String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
    );
}

function updateCounter() {
    elapsedTime = Date.now() - startTime;
    counter.textContent = formatTime(elapsedTime);
}

function startCounter() {
    if (isRunning) return;

    startTime = Date.now() - elapsedTime;
    isRunning = true;
    updateCounter();
    timerInterval = setInterval(updateCounter, 1000);
    toggleButton.textContent = "Stop";
    toggleButton.classList.add("stop");
    tStatus.textContent = "Counter is running...";
}

function stopCounter() {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    elapsedTime = 0;
    startTime = 0;
    counter.textContent = "00:00:00";
    toggleButton.textContent = "Start";
    toggleButton.classList.remove("stop");
    tStatus.textContent = "Stopped and reset";
}

toggleButton.addEventListener("click", function() {
    if (isRunning) {
        stopCounter();
    } else {
        startCounter();
    }
});