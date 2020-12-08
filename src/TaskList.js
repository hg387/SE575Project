import React, {useEffect, useState} from 'react';

const TaskList = ({task_name,task_description, completed, task_id, loadTasks, user_id}) => {
    const[inUpdate, setInUpdate] = useState(false);
    const [task_name_chg, setTaskName] = useState('');
    const [task_description_chg, setTaskDesc] = useState('');
    const [completed_chg, setTaskCompleted] = useState('');

    const deleteTask = async () => {
        let data = { task_id: task_id };
    
        await fetch(
          "https://381w41yjli.execute-api.us-east-2.amazonaws.com/staging/todo-delete-task",
          {
            method: "DELETE",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
          }
        )
          .then((r) => r.json())
          .then((res) => {
              if (res){
                console.log(res);
                loadTasks();
              }
            });
    };

    const onClickUpdate = () => {
        setInUpdate(true)
    }

    const onClickSubmit = async() =>{
        
        let data = { task_name: task_name_chg,
            task_description: task_description_chg,
            created_by: user_id,
            weight_id: "null",
            completed: completed_chg,
            task_id:task_id
        };

        await fetch(
        "https://381w41yjli.execute-api.us-east-2.amazonaws.com/staging/todo-update-task",
        {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
        }
        )
        .then((r) => r.json())
        .then((res) => {
                    console.log(res);
                    setInUpdate(false);
                    loadTasks();
                }
        );
    };

    const onClick = () =>{
        if (inUpdate && task_name_chg.length > 0 && task_description_chg.length > 0 && completed_chg.length > 0){
            onClickSubmit();
        }
        else{
            onClickUpdate();
        }
    }

    return(
        <div>
            <ul style={{border: '2px solid black'}}>
                
                {inUpdate ? <li><input 
                    value={task_name_chg}
                    placeholder="Task Name"
                    onChange={(event) => {setTaskName(event.target.value)}}
                /></li> : <li>Task Name: {task_name}</li>}
                
                {inUpdate ? <li><input 
                    value={task_description_chg}
                    placeholder="Description"
                    onChange={(event) => {setTaskDesc(event.target.value)}}
                /></li> : <li>Task Description: {task_description}</li>}
                
                {inUpdate ? <li><input 
                    value={completed_chg}
                    placeholder="Completed Yes/No"
                    onChange={(event) => {setTaskCompleted(event.target.value)}}
                /></li>: <li>Completed: {completed}</li>}

                <button onClick={deleteTask}>-</button>
                <button onClick={onClick}>{inUpdate ? 'Submit' : 'Update'}</button>
            </ul>
        </div>
    )
}

export default TaskList;