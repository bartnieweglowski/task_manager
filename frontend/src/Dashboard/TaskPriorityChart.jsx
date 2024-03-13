import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TaskPriorityChart = () => {
    const [chartData, setChartData] = useState({
        datasets: [],
    });

    useEffect(() => {
        axios.get('http://localhost:8000/api/task-priority-counts/')
            .then(response => {
                const taskData = response.data;
                const orderedPriorities = ['LOW', 'MEDIUM', 'HIGH'];
                const backgroundColors = {
                    'LOW': 'rgba(0, 255, 0, 0.2)', 
                    'MEDIUM': 'rgba(255, 255, 0, 0.2)', 
                    'HIGH': 'rgba(255, 0, 0, 0.2)' 
                };
                const borderColors = {
                    'LOW': 'rgba(0, 255, 0, 1)',
                    'MEDIUM': 'rgba(255, 255, 0, 1)',
                    'HIGH': 'rgba(255, 0, 0, 1)'
                };

                const labels = orderedPriorities;
                const data = orderedPriorities.map(priority => taskData[priority] || 0);
                const backgroundColor = orderedPriorities.map(priority => backgroundColors[priority]);
                const borderColor = orderedPriorities.map(priority => borderColors[priority]);

                setChartData({
                    labels: labels,
                    datasets: [{
                        label: 'Task priorities',
                        data: data,
                        backgroundColor: backgroundColor,
                        borderColor: borderColor,
                        borderWidth: 1,
                    }],
                });
            })
            .catch(error => console.error("Error fetching task priority counts:", error));
    }, []);

    return (
        <div style={{ width: '100%', height: '400px', margin: '0 auto' }}>
            <h2>Task priorities</h2>
            <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
    );
};

export default TaskPriorityChart;

