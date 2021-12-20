import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto'
import './style.css'

const Stats = () => {
    const [currUser, setcurrUser] = useState({});

    useEffect(() => {
        //retrieve user data
        let url = "http://localhost:9001/users/" + localStorage.getItem('userId');
        axios.get(url)
            .then(response => {
                setcurrUser(response.data);
                chartSetup(response.data.focusTime, response.data.breakTime, response.data.segmentsCompleted, response.data.segmentsNotCompleted);
            })
            .catch(error => console.error(error));
    }, [])

    function chartSetup(ft, bt, sc, snc){
        //time chart
        const canvas1 = document.getElementById('timeChart').getContext('2d');
        const timeChart = new Chart(canvas1, {
            type: 'doughnut',
            data: {
                labels: ['Focus', 'Break'],
                datasets: [{
                    label: 'Time',
                    data: [ft, bt],
                    backgroundColor: [
                        'green',
                        'firebrick',
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Focus vs Break Time'
                    }
                }
            }
        });

        //segments chart
        const canvas2 = document.getElementById('segmentChart').getContext('2d');
        const segmentChart = new Chart(canvas2, {
            type: 'doughnut',
            data: {
                labels: ['Completed', 'Not Completed'],
                datasets: [{
                    label: 'Segment Tasks',
                    data: [sc, snc],
                    backgroundColor: [
                        'green',
                        'firebrick',
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Segments Completed in Time'
                    }
                }
            }
        });
    }

    function convertTimeFormat(length){
        if(length === 0)
            return 0;
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
                <h4>View your stats below!</h4>
                <div className='row mb-5'>
                    <div className='col-1'></div>
                    <div className='sub-stats-container col-6'>
                        <h4 className='mt-3'>How do you spend your time?</h4>
                        <p>Time spent focusing: {convertTimeFormat(currUser.focusTime)}</p>
                        <p>Time spent on break: {convertTimeFormat(currUser.breakTime)}</p>
                        <p>Total time spent: {convertTimeFormat(currUser.focusTime + currUser.breakTime)}</p>
                    </div>
                    <div className='col-4 chart-container'>
                        <canvas id="timeChart" width="200" height="200"></canvas>
                    </div>
                    <div className='col-1'></div>
                </div>
                <div className='row mb-5'>
                    <div className='col-1'></div>
                    <div className='sub-stats-container col-6'>
                        <h4 className='mt-3'>Session Stats</h4>
                        <p>Total segments completed in time: {currUser.segmentsCompleted}</p>
                        <p>Total segments not completed in time: {currUser.segmentsNotCompleted}</p>
                        <p>Total number of sessions completed: {currUser.sessionsCompleted}</p>
                    </div>
                    <div className='col-4 chart-container'>
                        <canvas id="segmentChart" width="150" height="150"></canvas>
                    </div>
                    <div className='col-1'></div>
                </div>
            </div>
        </div>
    );
}

export default Stats;