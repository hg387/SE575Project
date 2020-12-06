import React, {useState, useContext} from 'react';
import Pool from './Pool';
import {userContext} from './Useraccount';
import {AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Signup from './Signup';

const {isLoggedin} = useContext(userContext);

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = (event) =>{
        event.preventDefault();
        
        const newUser = new CognitoUser({
            Username: email,
            Pool: Pool
        });

        const newAuthInfo = new AuthenticationDetails({
            Username: email,
            Password: password
        });

        newUser.authenticateUser(newAuthInfo, {
            onSuccess: (data) => {
                console.log('Entered onSuccess:',data); 
                setMessage(data);
            },
            newPasswordRequired: (data) => {
                console.log('Entered newPasswordRequired',data);
                setMessage(data);
            },
            onFailure: (data) => {
                console.error('Entered onFailure:',data); 
                setMessage(data);
            }   
        });
    };

    return (
        <div>
            <h1>ToDoList</h1>
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