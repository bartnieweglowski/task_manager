// TaskAssigneeChart.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const TaskAssigneeChart = () => {
    const [chartData, setChartData] = useState({
        datasets: [],
    });

    useEffect(() => {
        axios.get('http://localhost:8000/api/task-assignee-counts/')
            .then(response => {
                const taskData = response.data;
                setChartData({
                    labels: Object.keys(taskData),
                    datasets: [{
                        label: 'Assign users',
                        data: Object.values(taskData),
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1,
                    }],
                });
            })
            .catch(error => console.error("Error fetching task assignee counts:", error));
    }, []);

    return (
        <div style={{ width: '100%', height: '400px', margin: '0 auto' }}>
            <h2>Assign users</h2>
            <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
    );
};

export default TaskAssigneeChart;
