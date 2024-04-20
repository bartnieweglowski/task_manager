import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DoneCount = () => {
    const [doneCount, setDoneCount] = useState(0);

    useEffect(() => {
        axios.get('/api/done-count/')
            .then(response => {
                setDoneCount(response.data.done);
            })
            .catch(error => console.error("Error fetching Todo count:", error));
    }, []);

    return (
        <div className="done-widget">
            <h3>Done</h3>
            <p>{doneCount}</p>
        </div>
    );
};

export default DoneCount;
