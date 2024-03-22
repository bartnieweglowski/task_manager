import React, { useState, useEffect } from 'react';
import TaskTimerModal from './TaskTimerModal';
import { getTasks } from '../services/taskService';
import './TaskManager.css';
import moment from 'moment';

function TimeTracking() {
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchTasks = async () => {
            const fetchedTasks = await getTasks();
            if (fetchedTasks) {
                // Sortuj zadania wg daty startu
                const sortedTasks = fetchedTasks.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
                setTasks(sortedTasks);
            }
        };

        fetchTasks();
    }, []);

    const openTimerModal = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const calculateWeekTotal = (tasks) => {
        const startOfWeek = moment().startOf('week');
        const endOfWeek = moment().endOf('week');
        
        const weekTotalSeconds = tasks.reduce((total, task) => {
            const taskDate = moment(task.start_date);
            if (taskDate.isBetween(startOfWeek, endOfWeek, null, '[]')) {
                return total + task.time_spent;
            }
            return total;
        }, 0);
        
        return formatTime(weekTotalSeconds);
    };

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const sec = seconds % 60;
        return `${hours}h ${minutes}m ${sec}s`;
    };

    const updateTaskTimeSpent = (taskId, newTimeSpent) => {
        setTasks(prevTasks =>
            prevTasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, time_spent: newTimeSpent };
                }
                return task;
            })
        );
    };

    const weekTotal = calculateWeekTotal(tasks);

    const isTrackTimeVisible = (task) => {
        const now = moment();
        const startDate = moment(task.start_date);
        const endDate = moment(task.end_date);
    
        // Sprawdza, czy bieżąca data i czas są między startem a końcem zadania
        return now.isBetween(startDate, endDate);
    };

    return (
        <div>
            <h2>Task List</h2>
            <div className="week-total">Week Total: {weekTotal}</div>
            <ul className="task-list">
                {tasks.map(task => (
                    <li key={task.id} className="task-list-item">
                        <div className="task-info">
                            <span className="task-title">{task.title}</span>
                            <span className="task-dates">
                                {moment(task.start_date).format('DD/MM/YYYY HH:mm')} - {moment(task.end_date).format('DD/MM/YYYY HH:mm')}
                            </span>
                            <span className="task-assigned">{task.assignedUserDetail ? task.assignedUserDetail.fullName : 'Nie przypisano'}</span>
                            <span className={`task-priority priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
                        </div>
                        <div>
                            <span className="task-time">{formatTime(task.time_spent)}</span>
                            {isTrackTimeVisible(task) && (
                                <button onClick={() => openTimerModal(task)} className="track-time-btn">Track Time</button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
            {isModalOpen && selectedTask && (
                <TaskTimerModal task={selectedTask} 
                 closeModal={closeModal}
                 updateTaskTimeSpent={updateTaskTimeSpent} />
            )}
        </div>
    );
}

export default TimeTracking;
