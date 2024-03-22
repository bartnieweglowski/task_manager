import React, { useState } from 'react';
import moment from 'moment';

function TaskDetailsModal({ task, closeModal, updateTask, deleteTask }) {
    const [startDate, setStartDate] = useState(task.start_date);
    const [endDate, setEndDate] = useState(task.end_date);

    const handleUpdate = () => {
        updateTask(task.id, { ...task, start_date: startDate, end_date: endDate });
        closeModal();
    };

    const handleDelete = () => {
        deleteTask(task.id);
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
                    <input type="datetime-local" value={moment(startDate).format('YYYY-MM-DDTHH:mm')} onChange={e => setStartDate(new Date(e.target.value))} />
                    <input type="datetime-local" value={moment(endDate).format('YYYY-MM-DDTHH:mm')} onChange={e => setEndDate(new Date(e.target.value))} />
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
