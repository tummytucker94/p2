import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import './style.css'
import { useNavigate } from 'react-router';

const TemplateList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);
    const [segments, setSegments] = useState([]);

    useEffect(() => {
        //retrieve sessions
        axios
            .get("http://localhost:9001/session_templates")
            .then((response => {
                setSessions(response.data);
                console.log(response.data);
            }))
            .catch((error => {
                console.error(error);
            }));

        //retrieve segments
        axios
            .get("http://localhost:9001/segment_templates")
            .then((response => {
                setSegments(response.data);
                console.log(response.data);
            }))
            .catch((error => {
                console.error(error);
            }))
    }, []);

    function sumSegmentsTime(sessionId){
        let sum = 0;
        segments.forEach((segment) => {
            if(segment.sessionTemplate.sessionId === sessionId){
                sum += segment.segmentLength;
            }
        })
        return sum;
    }

    function createSessionLayoutRow(sessionId){
        let sessionSegments = [];
        segments.forEach((segment) => {
            if(segment.sessionTemplate.sessionId === sessionId){
                sessionSegments.push(segment);
            }
        });

        //create spans
        let spans = [];
        sessionSegments.map((segment) => {
            if(!segment.break){
                spans.push(<span className='not-break'> {convertTimeFormat(segment.segmentLength)} </span>);
            } else {
                spans.push(<span className='break'> {convertTimeFormat(segment.segmentLength)} </span>);
            }
        })
        
        return spans;
    }

    function useTemplateHandler(e){
        //get sessionId of row
        let tbl_sessId = (e.target.parentNode.parentNode.cells[0].innerText);
        let template_segments = []; 
        segments.forEach((segment) => {
            if(segment.sessionTemplate.sessionId == tbl_sessId){
                template_segments.push(segment);
            }
        });
        dispatch({ type: 'useTemplate', payload: template_segments});
        navigate('/timer');
    }

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
        <div id="template-list-container" className="container">
            <h2>Templates</h2>
            <p>View and choose templates from below!</p>

            <table id="template-table" className="table table-light">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Session Name</th>
                        <th scope = "col">Session Length</th>
                        <th scope="col">Session Layout</th>
                        <th scope="col">Times Used</th>
                    </tr>
                </thead>
                <tbody>
                   {sessions.map((session) => (
                        <tr key={session.sessionId}>
                            <th scope="row">{session.sessionId}</th>
                            <td>{session.sessionName}</td>
                            <td>{convertTimeFormat(sumSegmentsTime(session.sessionId))}</td>
                            <td>{createSessionLayoutRow(session.sessionId)}</td>
                            <td>{session.numTimesUsed}</td>
                            <td><Button onClick={useTemplateHandler} className='btn btn-success'>Use</Button></td>
                        </tr>
                   ))}
                </tbody>
            </table>
        </div>
    );
}

export default TemplateList;