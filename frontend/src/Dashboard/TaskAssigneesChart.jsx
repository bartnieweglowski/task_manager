import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card } from 'react-bootstrap';

const TaskAssigneesChart = () => {
    const [assigneeData, setAssigneeData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/task-assignee-counts/')
            .then(response => {
                const data = response.data.map(item => ({
                    name: item.assigned_to__username, // Zakładając, że pole nazywa się 'assigned_to__username'
                    value: item.total // 'total' dla liczby zadań, teraz jako 'value'
                }));
                setAssigneeData(data);
            })
            .catch(error => console.error("Error fetching task assignee counts:", error));
    }, []);

    // Kolory dla poszczególnych segmentów wykresu
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4042'];

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>Tasks Assigned to Users</Card.Title>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={assigneeData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={(entry) => entry.name}
                        >
                            {assigneeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Card.Body>
        </Card>
    );
};

export default TaskAssigneesChart;
