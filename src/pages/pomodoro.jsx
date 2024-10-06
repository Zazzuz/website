import React from 'react';
import '../styles/pomodoro.css'

function Pomodoro() {
  let startButton = document.getElementById("start");
  let pauseButton = document.getElementById("pause");
  let timerDisplay = document.getElementById("timer");

  let timerDuration = 25 * 60;
  let timeLeft = timerDuration;
  let timer;
  let isRunning = false;

  function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function updateDisplay(){
    timerDisplay.innerHTML = formatTime(timeLeft);
  }
  
  function startTimer() {
    if (!isRunning) {
      isRunning = true;
      timer = setInterval(function() {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
          clearInterval(timer);
          alert('Pomodoro Complete!');
          isRunning = false;
        }
      }, 1000);
    }
  }
  
  // Pause the timer
  function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
  }
  
 
  // Event listeners
  startButton.addEventListener('click', startTimer);
  pauseButton.addEventListener('click', pauseTimer);
  
  // Initialize display
  updateDisplay();

  return (
      <div className="pomodoro-container">
        <div id="timer">25:00</div>
        <div id="section-container">
          <button id="start">Start</button>
          <button id="short-break">Short break</button>
          <button id="long-break">Long Break</button>
          <button id="pause">Pause</button>
        </div>
      </div>
  );
}

export default Pomodoro;