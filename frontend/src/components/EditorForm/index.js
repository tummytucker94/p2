import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Modal, Button } from 'react-bootstrap';
import StatsPage from '../../pages/StatsPage';
import './style.css'

const EditorForm = () => {

  const navigate = useNavigate();
  const [sessionInput, setSessionInput] = useState({
    name: ''
  });
  const [show, setshow] = useState(false);

  const [inputList, setInputList] = useState([{ segmentName: "", segmentLengthHour: 0, segmentLengthMin: 0, segmentLengthSec: 0, break: false }]);

  const [currUser, setcurrUser] = useState({});

  useEffect(() => {
    //retrieve user data
    let url = "http://localhost:9001/users/" + localStorage.getItem('userId');
    axios.get(url)
      .then(response => {
        setcurrUser(response.data);
        console.log("User retrieved: " + currUser);
      })
      .catch(error => console.error(error));
  }, [])

  function handleSessionInputChange(e) {
    setSessionInput({
      name: e.target.value
    })
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  const handleCheckboxChange = (e, index) => {
    const { name, checked } = e.target;
    console.log(name + "," + checked);
    const list = [...inputList];
    list[index][name] = checked;
    setInputList(list);
  };

  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { segmentName: "", segmentLengthHour: 0, segmentLengthMin: 0, segmentLengthSec: 0, break: false }]);
  };

  function submitHandler(e) {
    //post to api
    let sessionTemplate = {
      sessionName: sessionInput.name,
      creator: {
        userId: currUser.userId
      },
      numTimesUsed: 0
    }
    console.log(sessionTemplate);
    axios.post("http://localhost:9001/session_templates", sessionTemplate)
      .then(response => {
        console.log("Session Created from Editor");
        console.log(response.data);
        let newSessionId = response.data.sessionId;
        for (var j = 0; j < inputList.length; j++) {
          let segmentLengthSum = (inputList[j].segmentLengthHour * 3600) + (inputList[j].segmentLengthMin * 60) + inputList[j].segmentLengthSec;
          let segmentTemplate = {
            segmentName: inputList[j].segmentName,
            sessionTemplate: { sessionId: newSessionId },
            segmentLength: segmentLengthSum,
            segmentPosition: j + 1,
            break: inputList[j].break
          }
          axios.post("http://localhost:9001/segment_templates", segmentTemplate)
            .then(response => {
              console.log("Segment Created from Editor");
              console.log(response.data);
            })
            .catch(error => { console.error(error) })
        }
        setshow(true);
      })
      .catch(error => { console.error(error) })
  }

  function onClickHandler(){
    setshow(false);
    navigate("/templates");
  }

  return (
    <div id="editor-form-container">
      <h1>Session Editor</h1>
      <h4>Session Name</h4>
      <input type="text" name="sessionName" className='mb-4' onChange={handleSessionInputChange} />
      <h4>Add Segments</h4>
      {inputList.map((x, i) => {
        return (
          <div className="container">
            <h6 className='mt-3'>Segment {i + 1}</h6>
            <div className='input-group'>
              <input
                name="segmentName"
                type="text"
                value={x.segmentName}
                placeholder='Enter Segment Name...'
                onChange={e => handleInputChange(e, i)}
              />
              <input
                name="segmentLengthHour"
                type="number"
                value={x.segmentLengthHour}
                placeholder='Hours...'
                onChange={e => handleInputChange(e, i)}
                className='ml-2'
              />
              <span class="input-group-text" id="basic-addon2">hrs</span>
              <input
                name="segmentLengthMin"
                type="number"
                value={x.segmentLengthMin}
                placeholder='Minutes...'
                onChange={e => handleInputChange(e, i)}
                className='ml-2'
              />
              <span class="input-group-text" id="basic-addon2">mins</span>
              <input
                name="segmentLengthSec"
                type="number"
                value={x.segmentLengthSec}
                placeholder='Seconds...'
                onChange={e => handleInputChange(e, i)}
                className='ml-2'
              />
              <span class="input-group-text" id="basic-addon2">secs</span>

              <span className='mx-2'>Is a Break</span>
              <input
                name="break"
                type="checkbox"
                value={x.break}
                onChange={e => handleCheckboxChange(e, i)}
              />
            </div>
            <div className="btn-box">
              {inputList.length !== 1 && <button className="btn btn-danger mb-2" onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button className="btn btn-success mb-2" onClick={handleAddClick}>Add</button>}
            </div>
          </div>
        );
      })}
      <button onClick={submitHandler} className="btn btn-primary btn-lg m-3">Save Session</button>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Template Saved</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>View and use your newly created session in the template list!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='btn btn-success' onClick={onClickHandler}>Go to your templates</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditorForm;