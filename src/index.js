import React from 'react';
import ReactDOM from 'react-dom';
import {User} from './Useraccount';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

// To be implemented the actual app
// making the route available for the app
// Forgot Password has to be implemented

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <User>
        <Route exact path='/' component={Login}/>
        <Route exact path='/Signup' component={Signup}/>
      </User>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
