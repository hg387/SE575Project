import React, {useEffect, useState} from 'react';

const TaskList = ({task_name,task_description, completed}) => {
    return(
        <div>
            <ul>
                <li>Task Name: {task_name}</li>
                <li>Task Description: {task_description}</li>
                <li>Completed: {completed}</li>
            </ul>
        </div>
    )
}

export default TaskList;