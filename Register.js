import React from 'react';

//create a simple ES6 function
function Register() {
    return (
        <div>
            <form action = 'Register' method = 'post'>
            First Name:<input type = "text" />
            Last Name:<input type = "text" />
            Email: <input type = "text"/>
            Password:<input type = "password" />
            <input type = "submit" value = "Submit" />
            </form>
        </div>
    );
}

export default Register;