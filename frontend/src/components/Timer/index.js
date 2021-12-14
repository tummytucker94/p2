import React from 'react'
import TimerControls from './TimerControls';
import TimerDisplay from './TimerDisplay';
import TimerGenerationForm from './TimerGenerationForm';


const Timer = () => {
    ;
    return(
        <div>
            <TimerDisplay />
            <TimerControls />
            <TimerGenerationForm />
        </div>
    )
}

export default Timer;