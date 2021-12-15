import React from 'react'
import { useDispatch } from 'react-redux';
import { useState, useMemo } from 'react';
import store from '../../../store';
import './style.css'

const TimerGenerationForm = () => {
    const dispatch = useDispatch();

    const [sessionInput, setSessionInput] = useState({
        numBreaks: 2,
        overallHours: 0,
        overallMinutes: 0,
        overallSeconds: 0,
        focusHours: 0,
        focusMinutes: 0,
        focusSeconds: 0
    })

    const overallTime = useMemo(
        () => {
            return calcSeconds(sessionInput.overallHours, sessionInput.overallMinutes, sessionInput.overallSeconds);
        }, [sessionInput]
    )

    const focusTime = useMemo(
        () => {
            return calcSeconds(sessionInput.focusHours, sessionInput.focusMinutes, sessionInput.focusSeconds);
        }, [sessionInput]
    )

    function onChangeHandler(event) {
        setSessionInput({
            ...sessionInput,
            [event.target.name]: event.target.value
        })
    }

    function onSubmitHandler(event) {
        console.log(overallTime);
        event.preventDefault();
        setUpSession();
    }

    function calcSeconds(hours, mins, secs) {
        var timeInSeconds = (hours * 3600) + (mins * 60) + parseInt(secs);
        return timeInSeconds;
    }

    function setUpSession() {
        dispatch({ type: 'genCurrSession', overallTime: overallTime, focusTime: focusTime, numBreaks: sessionInput.numBreaks });
        console.log("", store.getState().currSession);
        dispatch({ type: 'setTimeRemaining', payload: store.getState().currSession.segments[store.getState().currSession.sessionStage].segmentLength });
    }

    return (
        <div id="session-gen-form-container" className="container mt-5">
            <h2>Create a new Session</h2>
            <form>
            <div className="input-group">
                    <span className="input-group-text mb-3">Overall Session Length</span>
                    <input type="number" aria-label="Hours" className="form-control" name='overallHours' onChange={onChangeHandler} placeholder="Hours" />
                    <input type="number" aria-label="Minutes" className="form-control" name='overallMinutes' onChange={onChangeHandler} placeholder="Minutes" />
                    <input type="number" aria-label="Seconds" className="form-control" name='overallSeconds' onChange={onChangeHandler} placeholder="Seconds" />
                </div>
                <div className="input-group">
                    <span className="input-group-text mb-3">Length Spent Focusing</span>
                    <input type="number" aria-label="Hours" className="form-control" name='focusHours' onChange={onChangeHandler} placeholder="Hours" />
                    <input type="number" aria-label="Minutes" className="form-control" name='focusMinutes' onChange={onChangeHandler} placeholder="Minutes" />
                    <input type="number" aria-label="Seconds" className="form-control" name='focusSeconds' onChange={onChangeHandler} placeholder="Seconds" />
                </div>
                <div className="form-group mb-3">
                    <label className="form-label" htmlFor="">Number of breaks</label>
                    <input type="number" className="form-control" name="numBreaks" onChange={onChangeHandler} />
                </div>
                <input type="submit" className="btn btn-primary btn-lg mb-3" onClick={onSubmitHandler} value="Generate New Session"></input>
            </form>
        </div>
    )
}

export default TimerGenerationForm;