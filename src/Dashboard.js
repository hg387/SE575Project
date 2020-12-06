import React, {useState} from 'react';
import axios from 'axios';


const Dashboard = () =>{

    const sendGetRequest = async() =>{
        const resp = await axios.get(`https://381w41yjli.execute-api.us-east-2.amazonaws.com/staging/todo-compute-leaderboard`);
        console.log("Request Sent");
        console.log(resp.data);
    }

    return(
        <>
            <div>Dashboard</div>
            <button onClick={()=>{sendGetRequest()}}>Click Me</button>
        </>
    );
}


export default Dashboard
