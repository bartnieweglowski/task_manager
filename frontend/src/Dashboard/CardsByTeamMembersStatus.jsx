// CardsByTeamMembersStatus.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CardsByTeamMembersStatus = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/tasks-by-assignee-and-status/')
            .then(response => setData(response.data))
            .catch(error => console.error("Cannot fetch tasks by assignee and status", error));
    }, []);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="assigned_to__username" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="total" fill="#8884d8" name="Tasks by Status" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default CardsByTeamMembersStatus;
