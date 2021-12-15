import axios from 'axios';
import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import StatsPage from '../../pages/StatsPage';
import './style.css'

const EditorForm = () => {

    const navigate = useNavigate();
    const currUser = useSelector(state => state.currUser)
    const [sessionInput, setSessionInput] = useState({
        name: ''
    });

    const [inputList, setInputList] = useState([{ segmentName: "", segmentLength: "", break: false}]);

    function handleSessionInputChange(e){
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
      const {name, checked } = e.target;
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
      setInputList([...inputList, { segmentName: "", segmentLength: "", break: false}]);
    };

    function submitHandler(e){
      //post to api
      let sessionTemplate = {
        sessionName: sessionInput.name,
        creator: {
          userId: currUser.userId
        },
        numTimesUsed: 0 
      }
      console.log(sessionTemplate);
      axios.post("http://localhost:9001/session_templates" , sessionTemplate)
        .then(response => {
          console.log("Session Created from Editor");
          console.log(response.data);
          let newSessionId = response.data.sessionId;
          for(var j = 0; j < inputList.length; j++){
            let segmentTemplate = {
              segmentName: inputList[j].segmentName,
              sessionTemplate: {sessionId: newSessionId},
              segmentLength: inputList[j].segmentLength,
              segmentPosition: j + 1,
              break: inputList[j].break
            }
            axios.post("http://localhost:9001/segment_templates", segmentTemplate)
              .then(response => { 
                console.log("Segment Created from Editor");
                console.log(response.data);
              })
              .catch(error => {console.error(error)})
          }
          navigate("/landing");
        })
        .catch(error => {console.error(error)})
    }

    return (
      <div id="editor-form-container">
        <h1>Session Editor</h1>
        <h4>Session Name</h4>
        <input type="text" name="sessionName" className='mb-4' onChange={handleSessionInputChange}/>
        <h4>Add Segments</h4>
        {inputList.map((x, i) => {
          return (
            <div className="box">
              <h6 className='mt-3'>Segment {i + 1}</h6>
              <input
                name="segmentName"
                type="text"
                value={x.segmentName}
                placeholder='Enter Segment Name...'
                onChange={e => handleInputChange(e, i)}
              />
              <input
                name="segmentLength"
                type="number"
                value={x.segmentLength}
                placeholder='Enter Segment Length...'
                onChange={e => handleInputChange(e, i)}
              />
              <span className='mx-2'>Is a Break</span>
              <input
                name="break"
                type="checkbox"
                value={x.break}
                onChange={e => handleCheckboxChange(e, i)}
              />
              <div className="btn-box">
                {inputList.length !== 1 && <button className="btn btn-danger mb-2" onClick={() => handleRemoveClick(i)}>Remove</button>}
                {inputList.length - 1 === i && <button className="btn btn-success mb-2" onClick={handleAddClick}>Add</button>}
              </div>
            </div>
          );
        })}
        <div className='mt-3'>{JSON.stringify(inputList)}</div>
        <button onClick={submitHandler} className="btn btn-primary btn-lg m-3">Save Session</button>
      </div>
    );
}

export default EditorForm;