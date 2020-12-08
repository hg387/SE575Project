import { CognitoUserPool } from 'amazon-cognito-identity-js';
import React, {useState, useContext, useEffect} from 'react';
import {userContext} from './Useraccount';



const UserStatus = ({onClickDashBoard, onSignOut}) =>{
    const [level, setLevel] = useState(false);
    const {UserSession, signout} = useContext(userContext);
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
                <button onClick={()=>{signout(onSignOut, setLevel)}}>Sign Out</button>
                <button onClick={onClickDashBoard}>Dashboard</button>
                </div>) : "Please Login/Signup below"}
        </div>
    )
}

export default UserStatus;