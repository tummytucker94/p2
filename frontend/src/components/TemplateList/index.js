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
    const [filterInput, setfilterInput] = useState('');
    const [userFilter, setUserFilter] = useState(true);
    const [userFilterText, setUserFilterText] = useState('Show community templates');
    const [pageHeading, setPageHeading] = useState('Your Session Templates');

    useEffect(() => {
        //retrieve sessions
        axios
            .get("http://localhost:9001/session_templates")
            .then((response => {
                setSessions(response.data);
            }))
            .catch((error => {
                console.error(error);
            }));

        //retrieve segments
        axios
            .get("http://localhost:9001/segment_templates")
            .then((response => {
                setSegments(response.data);
                filterRows();
            }))
            .catch((error => {
                console.error(error);
            }))
    }, []);

    function onChangeHandler(e) {
        setfilterInput(e.target.value);
    }

    function sumSegmentsTime(sessionId) {
        let sum = 0;
        segments.forEach((segment) => {
            if (segment.sessionTemplate.sessionId === sessionId) {
                sum += segment.segmentLength;
            }
        })
        return sum;
    }

    function createSessionLayoutRow(sessionId) {
        let sessionSegments = [];
        segments.forEach((segment) => {
            if (segment.sessionTemplate.sessionId === sessionId) {
                sessionSegments.push(segment);
            }
        });

        //create spans
        let spans = [];
        sessionSegments.map((segment) => {
            if (!segment.break) {
                spans.push(<span className='not-break'> {convertTimeFormat(segment.segmentLength)} </span>);
            } else {
                spans.push(<span className='break'> {convertTimeFormat(segment.segmentLength)} </span>);
            }
        })

        return spans;
    }

    function useTemplateHandler(e) {
        //get sessionId of row
        let tbl_sessId = (e.target.parentNode.parentNode.cells[0].innerText);
        let template_segments = [];
        segments.forEach((segment) => {
            if (segment.sessionTemplate.sessionId == tbl_sessId) {
                template_segments.push(segment);
            }
        });
        dispatch({ type: 'useTemplate', payload: template_segments });
        navigate('/timer');
    }

    function convertTimeFormat(length) {
        let hours = Math.floor(length / 3600);
        let minutes = Math.floor((length % 3600) / 60);
        let seconds = (length % 60);
        let result = '';
        if (hours > 0)
            result += (hours + 'h');
        if (minutes > 0)
            result += (minutes + "m")
        if (seconds > 0)
            result += (seconds + "s")

        return result;
    }

    function toggleUserFilter(){
        if(userFilter){
            setUserFilter(false);
        } else {
            setUserFilter(true);
        }
    }

    useEffect(() => {
        if(userFilter){
            setUserFilterText('Show community templates');
            setPageHeading('Your Session Templates');
        } else {
            setUserFilterText('Show only your templates');
            setPageHeading('Community Session Templates');
        }

        filterRows();
    }, [filterInput, userFilter]);

    function filterRows(){
        var filter, table, tr, td, txtValue;
        filter = filterInput.toUpperCase();
        table = document.getElementById("template-table");
        tr = table.getElementsByTagName("tr");

        //filter rows
        for (var i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    if(userFilter){
                        var userIdtd = tr[i].getElementsByTagName('td')[3];
                        var idValue = userIdtd.textContent || userIdtd.innerText;
                        if(idValue == localStorage.getItem('userId')){
                            tr[i].style.display = "";
                        } else {
                            tr[i].style.display = "none";
                        }
                    } else {
                    tr[i].style.display = "";
                    }
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    return (
        <div id="template-list-container" className="container">
            <h2>{pageHeading}</h2>
            <p>View and choose templates from below!</p>
            <div>
                <button id="userFilterBtn" className='btn btn-primary' onClick={toggleUserFilter}>{userFilterText}</button>
                <input type="text" id="filterInput" onChange={onChangeHandler} placeholder="Search by name.."></input>
            </div>

            <table id="template-table" className="table table-light">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Session Name</th>
                        <th scope="col">Session Length</th>
                        <th scope="col">Session Layout</th>
                        <th scope="col">Creator ID</th>
                    </tr>
                </thead>
                <tbody>
                    {sessions.map((session) => (
                        <tr key={session.sessionId}>
                            <th scope="row">{session.sessionId}</th>
                            <td>{session.sessionName}</td>
                            <td>{convertTimeFormat(sumSegmentsTime(session.sessionId))}</td>
                            <td>{createSessionLayoutRow(session.sessionId)}</td>
                            <td>{session.creator.userId}</td>
                            <td><Button onClick={useTemplateHandler} className='btn btn-success'>Use</Button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TemplateList;