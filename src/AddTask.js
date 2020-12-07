import React, {useEffect, useState} from 'react';

const AddTask = ({getTasks, setT, Task, userID}) => {
    const [task_name, setTaskName] = useState('');
    const [task_description, setTaskDesc] = useState('');
    const [completed, setTaskCompleted] = useState('');

    const onAdd = async(event) =>{
        event.preventDefault();
        let data = { task_name: task_name,
            task_description: task_description,
            created_by: userID,
            weight_id: "null",
            completed: completed,
            
        };

        await fetch(
        "https://381w41yjli.execute-api.us-east-2.amazonaws.com/staging/todo-insert-task",
        {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
        }
        )
        .then((r) => r.json())
        .then((res) => {
                    console.log(res);
                    (async () => {
                        const fetchedPosts = await getTasks();
                        
                        setT([...fetchedPosts]);
                        Task(false);
                      })();
                }
        );
    };

    return(
            <form style={{border: '2px solid black'}} onSubmit={onAdd}>
                <p>Enter Task</p>
                <input 
                    value={task_name}
                    placeholder="Task Name"
                    onChange={(event) => {setTaskName(event.target.value)}}
                />
                <input 
                    value={task_description}
                    placeholder="Description"
                    onChange={(event) => {setTaskDesc(event.target.value)}}
                />
                <input 
                    value={completed}
                    placeholder="Completed Yes/No"
                    onChange={(event) => {setTaskCompleted(event.target.value)}}
                />
                <button disabled={!(task_name.length > 0 && task_description.length > 0 && completed.length > 0)} type='submit'>+</button>
            </form>
    )
}

export default AddTask
