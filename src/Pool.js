import React from 'react';
import {CognitoUserPool} from 'amazon-cognito-identity-js';


const pool = {
    UserPoolId: 'us-east-2_RoDKPVZ6H',
    ClientId: '6e1u05c25695dds5mo3qiri700'
};

export default new CognitoUserPool(pool); 