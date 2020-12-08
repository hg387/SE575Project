import React, {useState, createContext} from 'react';
import Pool from './Pool';
import {AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js';

export const userContext = createContext();

export const User = (props) => {
    const signout = (onSignOut, setLevel) =>{
        const currentUser = Pool.getCurrentUser();

        if (currentUser){
            currentUser.signOut();
            onSignOut("Signed Out Successfully");
            setLevel(false);
        }
    }
    const UserSession = async() =>{
        await new Promise((resolve, reject) => {
            const currentUser = Pool.getCurrentUser();
    
            if (currentUser){
                currentUser.getSession((err, session) => {
                    if (session){
                        resolve(session);
                    }
                    else{
                        reject();
                    }
                })
            }
            else{
                reject();
            }
        });
    }

    const isLoggedIn = async (Username, Password) =>{
        await new Promise((resolve, reject) => {
            const newUser = new CognitoUser({
                Username,
                Pool
            });
    
            const newAuthInfo = new AuthenticationDetails({
                Username,
                Password
            });
    
            newUser.authenticateUser(newAuthInfo, {
                onSuccess: (data) => {
                    console.log('Entered onSuccess:',data); 
                    resolve(data);
                },
                newPasswordRequired: (data) => {
                    console.log('Entered newPasswordRequired',data);
                    resolve(data);
                },
                onFailure: (data) => {
                    console.error('Entered onFailure:',data); 
                    reject(data);
                }   
            });
        
        })           
    }

    return(
        <userContext.Provider value={{
            isLoggedIn, UserSession, signout
        }}>
            {props.children}
        </userContext.Provider>
    )
}

