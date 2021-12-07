import React from 'react'
import { useSelector } from 'react-redux';
import './style.css'

const TimerDisplay = () => {
    const timeRemaining = useSelector(state => state.timeRemaining);
    const currSession = useSelector(state => state.currSession);
    const sessionOver = useSelector(state => state.sessionOver);

    //compute displayed values for timer
    var seconds = formatValue(timeRemaining % 60);
    var minutes = formatValue(Math.floor(timeRemaining / 60) % 60);
    var hours = formatValue(Math.floor(timeRemaining / 60 / 60));

    function formatValue(val) {
        return val.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
    }

    var displayText;
    if (!sessionOver) {
        displayText = <h1 className="timer-text mb-3">{hours}:{minutes}:{seconds}</h1>;
    } else {
        displayText = <h1 className="timer-text mb-3">Session Over!</h1>
    }

    return (
        <div className="container mt-5">
            <div className="timer-display-container">
                {displayText}
                <h3 className="mb-3">{currSession.goalNames[currSession.sessionStage]}</h3>
            </div>
        </div>
    )
};

export default TimerDisplay;