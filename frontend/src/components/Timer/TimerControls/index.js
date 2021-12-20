import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './style.css'
import store from '../../../store';
import axios from 'axios';

const TimerControls = () => {
    const dispatch = useDispatch();
    const intervalId = useSelector(state => state.intervalId);
    const currSession = useSelector(state => state.currSession);
    const timeRemaining = useSelector(state => state.timeRemaining);
    const [show, setShow] = useState(false);
    const [currUser, setcurrUser] = useState({});

    useEffect(() => {
        //retrieve user data
        let url = "http://localhost:9001/users/" + localStorage.getItem('userId');
        axios.get(url)
            .then(response => {
                setcurrUser(response.data);
            })
            .catch(error => console.error(error));
    }, [])

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

    function segmentCompleteHandler() {
        //update user stats
        var url = "http://localhost:9001/users/" + currUser.userId + "/stats";
        axios.put(url, {
            "focusTime": currUser.focusTime,
            "breakTime": currUser.breakTime,
            "segmentsCompleted": currUser.segmentsCompleted + 1,
            "segmentsNotCompleted": currUser.segmentsNotCompleted,
            "sessionsCompleted": currUser.sessionsCompleted
        })
            .then(response => {
                setcurrUser(response.data);
            })
            .catch(error => { console.error(error) });
        setShow(false);
    }

    function segmentNotCompleteHandler() {
        //update user stats
        var url = "http://localhost:9001/users/" + currUser.userId + "/stats";
        axios.put(url, {
            "focusTime": currUser.focusTime,
            "breakTime": currUser.breakTime,
            "segmentsCompleted": currUser.segmentsCompleted,
            "segmentsNotCompleted": currUser.segmentsNotCompleted + 1,
            "sessionsCompleted": currUser.sessionsCompleted
        })
            .then(response => {
                setcurrUser(response.data);
            })
            .catch(error => { console.error(error) });
        setShow(false);
    }

    useEffect(() => {
        if (timeRemaining < 1) {
            clearInterval(intervalId);
            var length = store.getState().currSession.segments.length;
            if (store.getState().currSession.sessionStage + 1 < length) {
                //more stages to complete
                if (!currSession.segments[store.getState().currSession.sessionStage].break)
                    setShow(true);
                dispatch({ type: 'goToNextStage' });
                console.log("Store stage: ", store.getState().currSession.sessionStage);
                console.log("Now on stage: ", currSession.sessionStage);
                dispatch({ type: 'setTimeRemaining', payload: currSession.segments[store.getState().currSession.sessionStage].segmentLength });
            } else {
                //show modal if last segment was not break
                if(!currSession.segments[currSession.sessionStage].break)
                    setShow(true);

                //finished session
                var focusSum = 0;
                var breakSum = 0;
                for (var i = 0; i < length; i++) {
                    if (currSession.segments[i].break) {
                        breakSum += currSession.segments[i].segmentLength;
                    } else {
                        focusSum += currSession.segments[i].segmentLength;
                    }
                }
                //update user stats
                var url = "http://localhost:9001/users/" + currUser.userId + "/stats";
                axios.put(url, {
                    "focusTime": currUser.focusTime + focusSum,
                    "breakTime": currUser.breakTime + breakSum,
                    "segmentsCompleted": currUser.segmentsCompleted,
                    "segmentsNotCompleted": currUser.segmentsNotCompleted,
                    "sessionsCompleted": currUser.sessionsCompleted + 1
                })
                    .then(response => {
                        console.log("Response Update Stats: ", response.data);
                        setcurrUser(response.data);
                    })
                    .catch(error => { console.error(error) });

                dispatch({ type: 'setSessionOver', payload: true });
                console.log("Session Over!");
            }
        }
    }, [timeRemaining, intervalId, dispatch, currSession.sessionStage, currSession.segments])

    return (
        <div>
            <button onClick={startHandler} className="btn btn-primary btn-lg m-3">Start Session</button>
            <button onClick={pauseHandler} className="btn btn-warning btn-lg m-3">Pause Session</button>
            <button onClick={completeHandler} className="btn btn-success btn-lg m-3">Completed Task</button>

            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Finished Segment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Placeholder for info on segment that was just completed</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='btn btn-success' onClick={segmentCompleteHandler}>Completed goal</Button>
                    <Button variant="secondary" className='btn btn-danger' onClick={segmentNotCompleteHandler}>Did not complete goal</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default TimerControls;