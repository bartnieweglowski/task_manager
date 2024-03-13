// TaskStatusChart.jsx
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

const TaskStatusChart = () => {
    const [chartData, setChartData] = useState({
        datasets: [],
    });

    useEffect(() => {
        axios.get('http://localhost:8000/api/task-status-counts/')
            .then(response => {
                const taskData = response.data;
                setChartData({
                    labels: Object.keys(taskData),
                    datasets: [{
                        label: 'Task statuses',
                        data: Object.values(taskData),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 1,
                    }],
                });
            })
            .catch(error => console.error("Error fetching task status counts:", error));
    }, []);

    return (
        <div style={{ width: '100%', height: '400px', margin: '0 auto' }}>
            <h2>Task statuses</h2>
            <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
    );
};

export default TaskStatusChart;
