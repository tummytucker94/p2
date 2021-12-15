import React from 'react'
import { useSelector } from 'react-redux';
import './style.css'

const Stats = () => {
    const currUser = useSelector(state => state.currUser);

    function convertTimeFormat(length){
        let hours = Math.floor(length / 3600);
        let minutes = Math.floor((length % 3600) / 60);
        let seconds = (length % 60);
        let result = '';
        if(hours > 0)
            result += (hours + 'h');
        if(minutes > 0)
            result += (minutes + "m")
        if(seconds > 0)
            result+= (seconds + "s")

        return result;
    }

    return(
        <div id="stats-container">
            <div>
                <h3 className='my-5'>Welcome {currUser.firstName} {currUser.lastName}!</h3>
                <h5>View your stats below!</h5>
                <div className='row mb-5'>
                    <div className='col-1'></div>
                    <div className='sub-stats-container col-10'>
                        <h4 className='mt-3'>How do you spend your time?</h4>
                        <p>Time spent focusing: {convertTimeFormat(currUser.focusTime)}</p>
                        <p>Time spent on break: {convertTimeFormat(currUser.breakTime)}</p>
                        <p>Total time spent: {convertTimeFormat(currUser.focusTime + currUser.breakTime)}</p>
                    </div>
                    <div className='col-1'></div>
                </div>
                <div className='row mb-5'>
                    <div className='col-1'></div>
                    <div className='sub-stats-container col-10'>
                        <h4 className='mt-3'>Session Stats</h4>
                        <p>Total number of segments completed: {currUser.segmentsCompleted}</p>
                        <p>Total number of sessions completed: {currUser.sessionsCompleted}</p>
                    </div>
                    <div className='col-1'></div>
                </div>
            </div>
            <div id="graph-container">Chart js graph placeholder</div>
        </div>
    );
}

export default Stats;