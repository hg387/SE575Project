import React, {useState, useContext} from 'react';
import Pool from './Pool';
import {userContext} from './Useraccount';
import {AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Signup from './Signup';
import UserStatus from './UserStatus';



const createDashboard = () =>{
    <></>
}

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mss, setMss] = useState('');
    const {isLoggedIn} = useContext(userContext);
    const onSubmit = (event) =>{
        event.preventDefault();
        
        isLoggedIn(email, password)
        .then((data) => {console.log(data);setMss("Logged in Successfully")})
        .catch((err) => console.error(err));
    };

    return (
        <div>
            <h1>ToDoList</h1>
            <UserStatus onSignOut={setMss}/>
            <form onSubmit={onSubmit}>
                <input 
                    value={email}
                    onChange={(event) => {setEmail(event.target.value)}}
                />
                <input 
                    value={password}
                    onChange={(event) => {setPassword(event.target.value)}}
                />
                <button disabled={!(email.length > 0 && password.length > 0)} type='submit'>Login</button>
            </form>
            <Link to={"/Signup"}>Not a user, Click here to Signup</Link>
            <p>{mss}</p>
        </div>    
    );
}