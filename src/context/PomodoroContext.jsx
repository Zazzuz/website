import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create the context
const PomodoroContext = createContext();

// Custom hook to use the Pomodoro context
export const usePomodoro = () => {
    return useContext(PomodoroContext);
};

// Pomodoro Provider component
export const PomodoroProvider = ({ children }) => {
    const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false);
    const [timerLabel, setTimerLabel] = useState('Focus');
    const [intervalId, setIntervalId] = useState(null);
    const [focusedTime, setFocusedTime] = useState(0); // Total focused time in seconds
    const [startTime, setStartTime] = useState(null);
    const [notification, setNotification] = useState(null);

    const navigate = useNavigate();


    const handlePomodoroComplete = () => {
        setNotification('Pomodoro complete! Click to view.');
    };

    const handleNotificationClick = () => {
        setNotification(null); // Clear notification
        navigate('/pomodoro');
    };

    // Start the timer
    const startTimer = () => {
        if (!isRunning) {
        setIsRunning(true);
        if (!startTime) setStartTime(Date.now()); // Record the start time only if not previously set

        const id = setInterval(() => {
            setTime((prevTime) => {
            if (prevTime > 0) {
                return prevTime - 1;
            } else {
                clearInterval(id);
                setIsRunning(false);
                setFocusedTime((prevFocusedTime) => prevFocusedTime + 25 * 60); // Increment focused time by the session duration
                handlePomodoroComplete();
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
        if (startTime) {
            const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
            setFocusedTime((prevFocusedTime) => prevFocusedTime + elapsedTime);
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

    // Reset to work session (25 minutes)
    const resetToWork = () => {
        pauseTimer();
        setTime(25 * 60);
        setTimerLabel('Focus');
        setIsRunning(false);
    };

    // Cleanup the interval on component unmount
    useEffect(() => {
        return () => clearInterval(intervalId);
    }, [intervalId]);

    return (
        <PomodoroContext.Provider
            value={{
                time,
                isRunning,
                timerLabel,
                focusedTime,
                startTimer,
                pauseTimer,
                switchToWork,
                startShortBreak,
                startLongBreak,
                resetToWork,
            }}
        >
            {notification && (
                <Notification
                    message={notification}
                    style={{position: 'fixed', top: '100px', right: '20px', padding: '20px 30px', backgroundColor: '#eab119', color: '#fff', borderRadius: '5px', zIndex: 1000, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)', fontSize: '18px'}}
                    onClick={handleNotificationClick}
                />
            )}    
            {children}
        </PomodoroContext.Provider>
    );
};