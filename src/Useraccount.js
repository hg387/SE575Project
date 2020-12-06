import React, {useState, createContext} from 'react';
import Pool from './Pool';

export const userContext = createContext();

export const User = (props) => {
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
            isLoggedIn
        }}>
            {props.children}
        </userContext.Provider>
    )
}

