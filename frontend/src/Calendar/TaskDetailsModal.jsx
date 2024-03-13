import React, { useState } from 'react';

function TaskDetailsModal({ task, closeModal, updateTask, deleteTask }) {
    const [startDate, setStartDate] = useState(task.start_date);
    const [endDate, setEndDate] = useState(task.end_date);

    const handleUpdate = () => {
        updateTask(task.id, { ...task, start_date: startDate, end_date: endDate });
        closeModal();
    };

    const handleDelete = () => {
        updateTask(task.id, { ...task, start_date: null, end_date: null });
        closeModal();
    };

    return (
        <div className="modal">
            <div className="modal-content">
            <div className="modal-header">
                <h2>Edit task</h2>
                <button className="close-button" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
            <p>{task.title}</p>
            <input type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} />
            <input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} />
            </div>
            <div className="modal-footer">
            <button onClick={handleUpdate}>Save</button>
            <button onClick={handleDelete}>Delete task</button>
            <button onClick={closeModal}>Close</button>
            </div>
        </div>
        </div>
    );
}

export default TaskDetailsModal;
