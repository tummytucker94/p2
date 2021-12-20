import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import './style.css'
import { useNavigate } from 'react-router';
import { error } from 'jquery';

const Register = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [errorMessage, setErrorMessage] = useState({
        emailError: '',
        passwordError: '',
        firstNameError: '',
        lastNameError: ''
    });

    function onChangeHandler(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    function onSubmitHandler(e) {
        e.preventDefault();
        if (validateInput()) {
            axios.post("http://localhost:9001/users", user)
                .then(response => {
                    console.log(response.data);
                    setShow(true);
                })
                .catch(error => {
                    console.error(error);

                })
        }
    }

    function validateInput() {
        let emailValid = false;
        let passwordValid = false;
        let firstNameValid = false;
        let lastNameValid = false;

        let emailErrorMsg = '';
        let passwordErrorMsg = '';
        let firstNameErrorMsg = '';
        let lastNameErrorMsg = '';
 

        if (user.email === '') {
            emailErrorMsg = 'Email required'
        } else {
            emailValid = true;
        }

        if(user.password === ''){
            passwordErrorMsg = 'Password required'
        } else {
            passwordValid = true;
        }

        if(user.firstName === ''){
            firstNameErrorMsg = 'First name required'
        } else {
            firstNameValid = true;
        }

        if(user.lastName === ''){
            lastNameErrorMsg = 'Last name required'
        } else {
            lastNameValid = true;
        }

        setErrorMessage({
            ...errorMessage,
            emailError: emailErrorMsg,
            passwordError: passwordErrorMsg,
            firstNameError: firstNameErrorMsg,
            lastNameError: lastNameErrorMsg
        });

        return (emailValid && passwordValid && firstNameValid && lastNameValid);
    }

    function onClickHandler(e) {
        setShow(false);
        navigate("/");
    }

    return (
        <div id="register-container" className="container">
            <h1 className="my-5">Register for an account</h1>
            <form method="post" onSubmit={onSubmitHandler}>
                <div className="form-group mb-3">
                    <label class="form-label" htmlFor="">Email</label>
                    <input type="email" className="form-control" name="email" value={user.email} onChange={onChangeHandler} />
                    <span className="text-danger">{errorMessage.emailError}</span>
                </div>
                <div className="form-group mb-3">
                    <label class="form-label" htmlFor="">Password</label>
                    <input type="password" className="form-control" name="password" value={user.password} onChange={onChangeHandler} />
                    <span className="text-danger">{errorMessage.passwordError}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="">First Name</label>
                    <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={onChangeHandler} />
                    <span className="text-danger">{errorMessage.firstNameError}</span>
                </div>
                <div className="form-group mb-3">
                    <label class="form-label" htmlFor="">Last Name</label>
                    <input type="tel" className="form-control" name="lastName" value={user.lastName} onChange={onChangeHandler} />
                    <span className="text-danger">{errorMessage.lastNameError}</span>
                </div>
                <div className="text-center">
                    <input type="submit" value="Register" className="btn btn-primary btn-lg" />
                </div>
            </form>
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Registered Successfully</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Your new account has been created!</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='btn btn-success' onClick={onClickHandler}>Back to Login</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Register;