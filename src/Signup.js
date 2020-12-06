import React, {useState} from 'react';
import Pool from './Pool';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

export default () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mss, setMss] = useState('');

    const onSubmit = (event) =>{
        event.preventDefault();
        Pool.signUp(email, password, [], null, (err, data)=>{
            if (err) {
                console.error(err);
                setMss("Error!!!");
            }  
            else{
                console.log(data);
                setMss("Sign Up Successful");
            }
        });
    }

    const isEnabled = email.length > 0 && password.length > 0 && fullName.length > 0;
    return (
        <div>
            <h1>ToDoList</h1>
            <form onSubmit={onSubmit}>
                <input 
                    value={fullName}
                    onChange={(event) => {setFullName(event.target.value)}}
                />
                <input 
                    value={email}
                    onChange={(event) => {setEmail(event.target.value)}}
                />
                <input 
                    value={password}
                    onChange={(event) => {setPassword(event.target.value)}}
                />
                <button disabled={!isEnabled} 
                    type='submit'>Submit
                </button>
            </form>
            <Link to={"/"}>Already a user, Click here to Login</Link>
            <p>{mss}</p>
        </div>    
    )
}