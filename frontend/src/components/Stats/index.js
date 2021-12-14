import React from 'react'
import { useSelector } from 'react-redux';
import './style.css'

const Stats = () => {
    const currUser = useSelector(state => state.currUser);

    return(
        <div id="stats-container">
            <div>
                <h3>{currUser.firstName} {currUser.lastName}</h3>
                <p>Time spent focusing: {currUser.focusTime}</p>
                <p>Time spent on break: {currUser.breakTime}</p>
                <p>Total time spent: {currUser.focusTime + currUser.breakTime}</p>
                <p>Total number of segments completed: {currUser.segmentsCompleted}</p>
                <p>Total number of sessions completed: {currUser.sessionsCompleted}</p>
            </div>
            <div id="graph-container">Chart js graph placeholder</div>
        </div>
    );
}

export default Stats;