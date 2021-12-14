import React , {useState} from 'react';
import axios from 'axios';
import './style.css'

const Register = () => {
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
    })

    function onChangeHandler(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    function onSubmitHandler(e){
        e.preventDefault();
        console.log(user);
        axios.post("http://localhost:9001/users", user)
             .then(response => {
                 console.log(response.data);
                 window.location = "/"
            })
              .catch(error => {console.error(error)})
    }

    return (
        <div id="register-container" className="container">
            <h1 className="my-5">Register for an account</h1>
            <form method="post" onSubmit={onSubmitHandler}>
                <div className="form-group mb-3">
                    <label class="form-label" htmlFor="">Email</label>
                    <input type="text" className="form-control" name="email" value={user.email} onChange={onChangeHandler} />
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
        </div>
    );
}

export default Register;