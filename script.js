// Digital Clock
function updateClock() {
    let now = new Date();
    document.getElementById('clock').textContent = now.toLocaleTimeString();
}
setInterval(updateClock, 1000);
updateClock();

// Countdown Timer
let countdown;
function startTimer() {
    let seconds = parseInt(document.getElementById('timer-input').value);
    if (isNaN(seconds) || seconds <= 0) {
        alert("Please enter a valid number of seconds.");
        return;
    }

    let display = document.getElementById('timer-display');
    clearInterval(countdown);

    countdown = setInterval(() => {
        if (seconds <= 0) {
            clearInterval(countdown);
            display.textContent = "Time's up!";
            playBeep();
        } else {
            display.textContent = seconds + " sec";
            seconds--;
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(countdown);
    document.getElementById('timer-display').textContent = "Stopped";
}

// Reliable beep sound using Web Audio API
function playBeep() {
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let oscillator = audioContext.createOscillator();
    let gainNode = audioContext.createGain();
    
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
    gainNode.gain.setValueAtTime(1, audioContext.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    setTimeout(() => {
        oscillator.stop();
    }, 500);
}
