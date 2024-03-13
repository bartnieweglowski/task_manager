
import React, { useContext, useState, useEffect } from 'react';
import { CardsContext } from '../Board/Board';
import { getTasks } from '../services/taskService';
import './Modal.css';
import '../Board/Board.css'


function Modal({ date, closeModal, assignTaskToDate }) {
    const { cards, setCards } = useContext(CardsContext);
    const [selectedTask, setSelectedTask] = useState(null);
    
   

    const formatDate = (date) => {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        let year = d.getFullYear();
        let hours = '' + d.getHours();
        let minutes = '' + d.getMinutes();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        if (hours.length < 2) hours = '0' + hours;
        if (minutes.length < 2) minutes = '0' + minutes;

        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const [startDate, setStartDate] = useState(formatDate(date));
    const [endDate, setEndDate] = useState(formatDate(date));

    useEffect(() => {
        const fetchTasks = async () => {
            const fetchedTasks = await getTasks();
            if (fetchedTasks) {
                setCards(fetchedTasks);
            }
        };
        fetchTasks();
    }, [setCards]);

    const handleAssignTask = async () => {
        if (selectedTask) {
            const formattedStartDate = new Date(startDate).toISOString();
            const formattedEndDate = new Date(endDate).toISOString();

            await fetch(`/api/tasks/${selectedTask}/assign_date/`, {
                method: 'POST',
                body: JSON.stringify({
                    start_date: formattedStartDate,
                    end_date: formattedEndDate
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            closeModal();
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
            <div className="modal-header">
                <h2>Assign task to date</h2>
                <button className="close-button" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
                <div className="input-group">
                    <label>Start:</label>
                    <input type="datetime-local" value={startDate}
                        onChange={e => setStartDate(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>End:</label>
                    <input type="datetime-local" value={endDate} 
                        onChange={e => setEndDate(e.target.value)} />
                </div>
                <div className="input-group">
                    <label>Task</label>
                    <select onChange={e => setSelectedTask(e.target.value)}>
                        <option value="">Choose task</option>
                        {cards.map(task => (
                            <option key={task.id} value={task.id}>{task.title}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="modal-footer">
                <button className="assign-button" onClick={handleAssignTask}>Assign task</button>
            </div>
        </div>
        </div>
    );
}

export default Modal;