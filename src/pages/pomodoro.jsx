import React, { useState, useEffect } from 'react';
import '../styles/pomodoro.css'
import startIcon from '../assets/play.svg';
import pauseIcon from '../assets/pause.svg';
import resetIcon from '../assets/circle-arrow.svg';

function Pomodoro() {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [timerLabel, setTimerLabel] = useState('Focus'); // "Work", "Short Break", or "Long Break"
  const [intervalId, setIntervalId] = useState(null);
  const [focusedTime, setFocusedTime] = useState(0); // Total focused time in seconds
  const [startTime, setStartTime] = useState(null); // Time when the timer was started

  // Format the countdown timer as mm:ss
  const formatCountdown = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Format the total focused time as Xh Ymins
  const formatFocusedTime = (time) => {
    const hours = Math.floor(time / 3600); // Calculate total hours
    const minutes = Math.floor((time % 3600) / 60); // Calculate remaining minutes

    return `${hours}h ${minutes}min`; // Always include hours
  };

  // Start the timer
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      if (!startTime) {
        setStartTime(Date.now()); // Record the start time only if not previously set
      }
      const id = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(id);
            setIsRunning(false);
            setFocusedTime((prevFocusedTime) => prevFocusedTime + 25 * 60); // Increment focused time by the session duration
            return 0; // Stop timer at 0
          }
        });
      }, 1000);
      setIntervalId(id);
    }
  };

  // Pause the timer
  const pauseTimer = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
      // Calculate the elapsed time during this session and update focused time
      if (startTime) {
        const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Elapsed time in seconds
        setFocusedTime((prevFocusedTime) => prevFocusedTime + elapsedTime); // Add elapsed time to focused time
        setStartTime(null);
      }
    }
  };

  // Switch to work state without resetting focused time
  const switchToWork = () => {
    pauseTimer();
    setTime(25 * 60);
    setTimerLabel('Focus');
    setIsRunning(false);
  };

  // Start short break (5 minutes)
  const startShortBreak = () => {
    pauseTimer();
    setTime(5 * 60);
    setTimerLabel('Short Break');
    setIsRunning(false);
  };

  // Start long break (15 minutes)
  const startLongBreak = () => {
    pauseTimer();
    setTime(15 * 60);
    setTimerLabel('Long Break');
    setIsRunning(false);
  };

  // Reset to work session (25 minutes) and reset focused time
  const resetToWork = () => {
    pauseTimer();
    setTime(25 * 60);
    setTimerLabel('Focus');
    setIsRunning(false);
  };

  // Cleanup the interval on component unmount to prevent memory leaks
  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  return (
    <div className="pomodoro-container">
      <div id="timer">
        <h2>{timerLabel}</h2>
        <h1>{formatCountdown(time)}</h1>
      </div>
      <div id="focused-time">
        <h3>Total Focused Time: {formatFocusedTime(focusedTime)}</h3>
      </div>
      <div id="section-container">
        <button onClick={startTimer} id="start">
          <img src={startIcon} alt="Start" />
        </button>
        <button onClick={pauseTimer} id="pause">
          <img src={pauseIcon} alt="Pause" />
        </button>
        <button onClick={resetToWork} id="reset">
          <img src={resetIcon} alt="Reset" />
        </button>
        <button onClick={switchToWork} id="work-button">Focus</button>
        <button onClick={startShortBreak} id="short-break">Short break</button>
        <button onClick={startLongBreak} id="long-break">Long Break</button>
      </div>
    </div>
  );
}

export default Pomodoro;