import {React, useState, useEffect} from 'react';
import axios from 'axios';
import './Board.css'



const TaskModal = ({ 
   showModal,
   handleCloseModal, 
   editTaskId, 
   editedTaskTitle, 
   setEditedTaskTitle, 
   handleKeyPress, 
   description, 
   setDescription, 
   updateTaskDescription,
   cards,
   handleSaveTask,
   setEditedLabels,
   editedLabels,
   dueDate,
   setDueDate, 
   priority,
   setPriority,
   assignedUser,
   setAssignedUser
   

 }) => {
  const [users, setUsers] = useState([]);


const handlePriorityChange = (e) => {
  setPriority( e.target.value);
};

useEffect(() => {
  const fetchUsers = async () => {
      try {
          const response = await axios.get('http://localhost:8000/api/users/');
          setUsers(response.data);  // Zakładając, że odpowiedź to lista użytkowników
      } catch (error) {
          console.error("Nie można załadować listy użytkowników:", error);
      }
  };

  fetchUsers();
}, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{editTaskId ? 'Edit Task' : 'Create Task'}</h3>
          <button className="close-button" onClick={handleCloseModal}>&#x2715;</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="taskTitle">{editTaskId ? 'Edit Task Title:' : 'Task Title:'}</label>
            <textarea
              id="taskTitle"
              value={editedTaskTitle}
              onChange={(e) => setEditedTaskTitle(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="form-group">
            <label htmlFor="taskDescription">{editTaskId ? 'Edit Task Description:' : 'Description:'}</label>
            <textarea
              id="taskDescription"
              value={description}
              onChange={e => setDescription(e.target.value)}
              onKeyDown={handleKeyPress}
            />
          </div>
          <div className="form-group">
                <label htmlFor="taskLabels">Labels:</label>
                <input
                    id="taskLabels"
                    value={editedLabels ? editedLabels.join(', ') : ''}
                    onChange={e => setEditedLabels(e.target.value.split(',').map(label => label.trim()))}
                />
            </div>
            <div className="form-group">
            <label htmlFor="taskPriority">Priority:</label>
            <select
              id="taskPriority"
              value={priority}
              onChange={handlePriorityChange}
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div> 
          <div className="form-group">
    <label htmlFor="assignedUser">Assign to:</label>
    <select
  id="assignedUser"
  value={assignedUser}
  onChange={(e) => setAssignedUser(e.target.value)}
>
  <option value="">Select a user</option>
  {users.map((user) => (
    <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
  ))}
</select>

</div>

        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={handleCloseModal}>Cancel</button>
          <button className="save-button" onClick={handleSaveTask}>{editTaskId ? 'Save' : 'Create'}</button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
