import React from 'react';
import {CognitoUserPool} from 'amazon-cognito-identity-js';


const data = {
    UserPoolId: 'us-east-2_dMo8fzknL',
    ClientId: '1os21bhlegfsmsdasppivu8ika'
};

export default new CognitoUserPool(data); 