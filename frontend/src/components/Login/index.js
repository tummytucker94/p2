import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';
import { useNavigate } from 'react-router';
import './style.css'
import axios from 'axios';


const Login = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
    const [loginInfo, setloginInfo] = useState({
        email: '',
        password: '',
    })

    const [errorMessage, setErrorMessage] = useState({
        emailError: '',
        passwordError: '',
        loginError: ''
    })

    function onChangeHandler(event) {
        //console.log(event.target.name)
        setloginInfo({
            ...loginInfo,
            [event.target.name]: event.target.value
        })
    }

    function onSubmitHandler(e) {
        e.preventDefault();
        if (validate()) {
            axios.post("http://localhost:9001/users/login", loginInfo)
                .then(response => {
                    if(response.data == '' || response.data == undefined){
                        console.log("invalid credentials");
                        setErrorMessage({
                            ...errorMessage,
                            loginError: 'Invalid Login Credentials' 
                        })
                    } else {
                    var user = response.data;
                    console.log(response);
                    localStorage.setItem('userId', user.userId);
                    localStorage.setItem('firstName', user.firstName);
                    localStorage.setItem('lastName', user.lastName);
                    dispatch({ type: 'logIn', payload: user});
                    navigate('/landing');
                    }
                })
                .catch(error => {console.error(error)})
        } else {
            console.log("error");
        }
    }

    function validate() {
        var emailErrorMsg, passwordErrorMsg;
        var emailValid, passwordValid;

        if (loginInfo.email.length > 0) {
            emailErrorMsg = '';
            emailValid = true;
        } else {
            emailErrorMsg = 'Email is required'
            emailValid = false;
        }

        if (loginInfo.password.length > 0) {
            passwordErrorMsg = '';
            passwordValid = true;
        } else {
            passwordErrorMsg = 'Password is required'
            passwordValid = false;
        }

        setErrorMessage({
            ...errorMessage,
            emailError: emailErrorMsg,
            passwordError: passwordErrorMsg,
        })

        if (emailValid && passwordValid)
            return true;
        else
            return false;
    }

    return (
        <div id="login-container" className="container">
            <div className="row">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">

                    <div className="wrapper">
                        <div>
                            <h1 id="loginHeading">Project Productivity</h1>
                        </div>

                        <form id="loginForm" method="post" onSubmit={onSubmitHandler}>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="text" name="email" value={loginInfo.email} onChange={onChangeHandler} className="form-control" />
                                <span className="errorMsg">{errorMessage.emailError}</span>
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" name="password" id="passwordLoginInput" value={loginInfo.password} onChange={onChangeHandler} className="form-control" />
                                <span className="errorMsg">{errorMessage.passwordError}</span>
                            </div>

                            <input type="submit" value="Login" className="btn btn-primary btn-block" />
                        </form>
                        <div className="errorMsg">{errorMessage.loginError}</div>
                        <Link to="/register">Register Now!</Link>
                    </div>

                </div>
                <div className="col-lg-3"></div>
            </div>
        </div>
    )
}

export default Login;