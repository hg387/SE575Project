import React, {useEffect, useState} from 'react';

const TaskList = ({task_name,task_description, completed, task_id, loadTasks}) => {

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

    return(
        <div>
            <ul style={{border: '2px solid black'}}>
                <li>Task Name: {task_name}</li>
                <li>Task Description: {task_description}</li>
                <li>Completed: {completed}</li>
                {/* <button onClick={deleteTask}>-</button> */}
            </ul>
        </div>
    )
}

export default TaskList;