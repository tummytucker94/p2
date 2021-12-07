import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './style.css'
import store from '../../../store';

const TimerControls = () => {
    const dispatch = useDispatch();
    const intervalId = useSelector(state => state.intervalId);
    const currSession = useSelector(state => state.currSession);
    const timeRemaining = useSelector(state => state.timeRemaining);
    const [show, setShow] = useState(false);

    function startHandler(event) {
        if (intervalId == null) {
            let interval = setInterval(decrementTimer, 1000);
            dispatch({ type: 'setIntervalId', payload: interval });
        } else {
            console.log("clear and set new interval");
            clearInterval(intervalId);
            let interval = setInterval(decrementTimer, 1000);
            dispatch({ type: 'setIntervalId', payload: interval });
        }
    }

    function decrementTimer() {
        dispatch({ type: 'decrementTimer' })
    }

    function pauseHandler() {
        clearInterval(intervalId);
        dispatch({ type: 'pauseTimer' });
    }

    function completeHandler() {
        clearInterval(intervalId);
        dispatch({ type: 'completeTimer' });
    }

    function modalCloseHandler() {
        setShow(false);
    }

    useEffect(() => {
        if (timeRemaining < 1) {
            clearInterval(intervalId);
            if (store.getState().currSession.sessionStage + 1 < store.getState().currSession.goalTimes.length) {
                //more stages to complete
                setShow(true);
                dispatch({ type: 'goToNextStage' });
                console.log("Store stage: ", store.getState().currSession.sessionStage);
                console.log("Now on stage: ", currSession.sessionStage);
                dispatch({ type: 'setTimeRemaining', payload: currSession.goalTimes[store.getState().currSession.sessionStage] });
            } else {
                //finished session
                dispatch({ type: 'setSessionOver', payload: true })
                console.log("Session Over!");
            }
        }
    }, [timeRemaining, intervalId, dispatch, currSession.sessionStage, currSession.goalTimes])

    return (
        <div>
            <button onClick={startHandler} className="btn btn-primary btn-lg">Start Session</button>
            <button onClick={pauseHandler} className="btn btn-warning btn-lg">Pause Session</button>
            <button onClick={completeHandler} className="btn btn-success btn-lg">Completed Task</button>

            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Finished Segment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Placeholder for info on segment that was just completed</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={modalCloseHandler}>Completed goal</Button>
                    <Button variant="secondary" onClick={modalCloseHandler}>Did not complete goal</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TimerControls;