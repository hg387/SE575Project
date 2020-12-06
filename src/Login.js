import React, {useState, useContext} from 'react';
import Pool from './Pool';
import {userContext} from './Useraccount';
import {AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Signup from './Signup';
import UserStatus from './UserStatus';

const {isLoggedIn} = useContext(userContext);

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = (event) =>{
        event.preventDefault();
        
        isLoggedIn(email, password)
        .then((data) => setMessage(data))
        .catch((err) => setMessage(err));
    };

    return (
        <div>
            <h1>ToDoList</h1>
            <UserStatus/>
            <form onSubmit={onSubmit}>
                <input 
                    value={email}
                    onChange={(event) => {setEmail(event.target.value)}}
                />
                <input 
                    value={password}
                    onChange={(event) => {setPassword(event.target.value)}}
                />
                <button type='submit'>Login</button>
            </form>
            <Link to={"/Signup"}>Not a user, Click here to Signup</Link>
            <p>{message}</p>
        </div>    
    );
}