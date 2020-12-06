import { CognitoUserPool } from 'amazon-cognito-identity-js';
import React, {useState, useContext, useEffect} from 'react';
import {userContext} from './Useraccount';

const {UserSession, signout} = useContext(userContext);

const UserStatus = ({onClickDashBoard}) =>{
    const [level, setLevel] = useState(false);

    useEffect(()=>{
        UserSession()
        .then((session) => {
            console.log(session);
            setLevel(true);
        })
    });

    return(
        <div>
            {level ? (<div>
                Your are already logged in
                <button onClick={signout}>Sign Out</button>
                <button onClick={onClickDashBoard}>Dashboard</button>
                </div>) : "Please Login/Signup below"}
        </div>
    )
}

export default UserStatus;