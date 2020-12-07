import React, {useEffect, useState} from 'react';
import axios from 'axios';
import qs from 'qs';
import TaskList from './TaskList';
import AddTask from './AddTask';


const Dashboard = ({email}) =>{
    const [user_id, setUserId] = useState('');
    const [tasks, setT] = useState([]);
    const [vis, setvis] = useState(true);
    const [emptyTask, setEmptyTask] = useState(false);

    useEffect(()=>{
        setvis(false);
        console.log(tasks);
    },[tasks]);

    useEffect(()=>{
        if (!user_id) findUserID();
        
        if (user_id) {
            console.log("User_ID:"+user_id);
            (async () => {
                const fetchedPosts = await getTasks();
                
                setT([...fetchedPosts]);
               
              })();
            
            
        }
    }, [user_id]);

    const getTasks = async () => {
        let data = { user_id: user_id };
        let output = {};
        await fetch(
          "https://381w41yjli.execute-api.us-east-2.amazonaws.com/staging/todo-get-user-all-tasks",
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
          }
        )
          .then((r) => r.json())
          .then((res) => {
                    output=res.body;
                }
            );

        return output;
    };

    const findUserID = async () => {
        let data = { email: email };
    
        await fetch(
          "https://381w41yjli.execute-api.us-east-2.amazonaws.com/staging/todo-get-user",
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
          }
        )
          .then((r) => r.json())
          .then((res) => {
              if (res){
                console.log(res.body[0].user_id);
                setUserId(res.body[0].user_id);
              }
            });
    };
    if (vis) return(<div>Pending</div>)
    return(
        <>
            <div>Dashboard</div>
            <div>
            { emptyTask ? <AddTask userID={user_id} getTasks={getTasks} setT={setT} Task={setEmptyTask}/>: <div></div>}
            {   
                tasks.length > 0 ? tasks.map((t) => {
                     return(<TaskList 
                            key={t.task_id}
                            task_name={t.task_name} 
                            task_description={t.task_description} 
                            completed={t.completed}/>
                )}) : <div>No Tasks</div>
            }
            <button onClick={()=>{setEmptyTask(true);}}>Add Task</button>
            </div>
        </>
    );
}


export default Dashboard
