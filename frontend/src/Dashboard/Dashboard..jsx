import React, { useState } from 'react';
import TaskStatusChart from './TaskStatusChart';
import TaskPriorityChart from './TaskPriorityChart';
import TaskAssigneeChart from './TaskAssigneeChart';

const Dashboard = () => {
    const [activeChart, setActiveChart] = useState('users');

    const renderChart = () => {
        switch (activeChart) {
            case 'status':
                return <TaskStatusChart />;
            case 'priority':
                return <TaskPriorityChart />;
            case 'users':
                return <TaskAssigneeChart />;
            default:
                return null;
        }
    };

    return (
        <div>
            <div className="chart-menu">
                <button onClick={() => setActiveChart('users')}>Users</button>
                <button onClick={() => setActiveChart('status')}>Status</button>
                <button onClick={() => setActiveChart('priority')}>Priority</button>
            </div>
            <div className="chart-container">
                {renderChart()}
            </div>
        </div>
    );
};

export default Dashboard;
