// CardsByStatus.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CardsByStatus = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/tasks-by-status')
            .then(response => setData(response.data))
            .catch(error => console.error("Error fetching tasks by status:", error));
    }, []);

    return (
        <ResponsiveContainer width="50%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CardsByStatus;