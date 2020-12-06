import React, {useState} from 'react';
import Pool from './Pool';
import {BrowserRouter, Route, Link} from 'react-router-dom';

export default () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const onSubmit = (event) =>{
        event.preventDefault();
        Pool.signUp(email, password, [], null, (err, data)=>{
            if (err) {
                console.error(err);
                setMessage(err);
            }  
            else{
                console.log(data);
                setMessage(data);
            }
        });
    }

    return (
        <div>
            <h1>ToDoList</h1>
            <form onSubmit={onSubmit}>
                <input 
                    value={fullName}
                    onChange={(event) => {setEmail(event.target.value)}}
                />
                <input 
                    value={email}
                    onChange={(event) => {setEmail(event.target.value)}}
                />
                <input 
                    value={password}
                    onChange={(event) => {setPassword(event.target.value)}}
                />
                <button disabled={!(email.length > 0 && password.length > 0)} type='submit'>Submit</button>
            </form>
            <Link to={"/"}>Already a user, Click here to Login</Link>
            <p>{message}</p>
        </div>    
    )
}