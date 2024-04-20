import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TodoCount = () => {
    const [todoCount, setTodoCount] = useState(0);

    useEffect(() => {
        axios.get('/api/todo-count/')
            .then(response => {
                setTodoCount(response.data.todo);
            })
            .catch(error => console.error("Error fetching Todo count:", error));
    }, []);

    return (
        <div className="todo-widget">
            <h3>To Do</h3>
            <p>{todoCount}</p>
        </div>
    );
};

export default TodoCount;
