import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Board/Board.css';
import './TaskTimerModal.css'


function TaskTimerModal({ task, closeModal, updateTaskTimeSpent }) {
    const [isTiming, setIsTiming] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        return () => clearInterval(timer);
    }, [timer]);

    const startTiming = async () => {
        try {
            if (!isTiming) {
                await axios.post(`/tasks/${task.id}/start/`);
                setIsTiming(true);
                const newTimer = setInterval(() => {
                    setElapsedTime(prev => prev + 1); 
                }, 1000);
                setTimer(newTimer);
            }
        } catch (error) {
            console.error("Error starting task timing:", error);
        }
    };

    const stopTiming = async () => {
        try {
            const response = await axios.post(`/tasks/${task.id}/stop/`);
            clearInterval(timer);
            setIsTiming(false);
            updateTaskTimeSpent(task.id, response.data.time_spent);
            closeModal();
        } catch (error) {
            console.error("Error stopping task timing:", error);
        }
    };


    const endTiming = async () => {
        try {
            const response = await axios.post(`/tasks/${task.id}/end/`);
            clearInterval(timer);
            setIsTiming(false);
            updateTaskTimeSpent(task.id, response.data.time_spent);
            closeModal();
        } catch (error) {
            console.error("Error ending task timing:", error);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Task Timer</h2>
                    <button onClick={closeModal}>&times;</button>
                </div>
                <div className="modal-body">
                     <p>{task.title}</p>
                     <p>Time: {elapsedTime} seconds</p>
                     <button onClick={startTiming} disabled={isTiming} className="modal-btn modal-btn-start">Start</button>
                     <button onClick={stopTiming} disabled={!isTiming} className="modal-btn modal-btn-stop">Stop</button>
                     <button onClick={endTiming} disabled={!isTiming} className="modal-btn modal-btn-end">End</button>
                </div>
            </div>
        </div>
    );
}

export default TaskTimerModal;