import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from 'react-bootstrap';

const TaskPriorityChart = () => {
    const [priorityData, setPriorityData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/task-priority-counts/')
            .then(response => {
                const taskData = response.data;
                const orderedPriorities = ['LOW', 'MEDIUM', 'HIGH'];
                const colors = {
                    'LOW': '#4CAF50', // Stonowany zielony
                    'MEDIUM': '#FFC107', // Stonowany żółty
                    'HIGH': '#F44336', // Stonowany czerwony
                };

                // Transforming data for Recharts usage
                const formattedData = orderedPriorities.map(priority => ({
                    name: priority,
                    value: taskData[priority] || 0,
                    fill: colors[priority]
                }));

                setPriorityData(formattedData);
            })
            .catch(error => console.error("Error fetching task priority counts:", error));
    }, []);

    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>Task Priorities</Card.Title>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie dataKey="value" data={priorityData} nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                            {
                                priorityData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))
                            }
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Card.Body>
        </Card>
    );
};

export default TaskPriorityChart;
