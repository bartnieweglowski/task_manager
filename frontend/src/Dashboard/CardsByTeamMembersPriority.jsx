// CardsByTeamMembersPriority.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const CardsByTeamMembersPriority = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('/api/tasks-by-assignee-and-priority/')
            .then(response => {
                const rawData = response.data;
                // Agregacja danych według priorytetu
                const aggregatedData = rawData.reduce((acc, item) => {
                    const { priority, total } = item;
                    if (!acc[priority]) {
                        acc[priority] = { name: priority, total: 0 };
                    }
                    acc[priority].total += total;
                    return acc;
                }, {});
    
                setData(Object.values(aggregatedData));
            })
            .catch(error => console.error("Cannot fetch tasks by assignee and priority", error));
    }, []);
    

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={data} dataKey="total" nameKey="assigned_to__username" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CardsByTeamMembersPriority;
