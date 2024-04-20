
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WIP = () => {
    const [wip, setWip] = useState(0);

    useEffect(() => {
        axios.get('/api/wip-count/')
            .then(response => {
                setWip(response.data.wip);
            })
            .catch(error => console.error("Error fetching WIP count:", error));
    }, []);

    return (
        <div className="wip-widget">
            <h3>In Progress</h3>
            <p>{wip}</p>
        </div>
    );
};

export default WIP;
