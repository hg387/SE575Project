import React, {useState} from 'react';
import Pool from './Pool';
import {BrowserRouter, Route, Link, useHistory} from 'react-router-dom';
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
                storeUser();
                setMss("Sign Up Successful");
            }
        });
    }

    const storeUser = async () => {
        let data = { first_name: fullName, 
                    last_name: "null",
                    email: email,
                    bio:"null" 
                };
    
        await fetch(
          "https://381w41yjli.execute-api.us-east-2.amazonaws.com/staging/todo-insert-user",
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
          }
        )
          .then((r) => r.json())
          .then((res) => {
              if (res){
                console.log(res);
              }
            });
    };

    const isEnabled = email.length > 0 && password.length > 0 && fullName.length > 0;
    return (
        <div>
            <h1>ToDoList</h1>
            <form onSubmit={onSubmit}>
                <input 
                    value={fullName}
                    placeholder="Enter Name"
                    onChange={(event) => {setFullName(event.target.value)}}
                />
                <input 
                    value={email}
                    placeholder="Enter Email"
                    onChange={(event) => {setEmail(event.target.value)}}
                />
                <input 
                    type = "password"
                    placeholder="Enter Password"
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