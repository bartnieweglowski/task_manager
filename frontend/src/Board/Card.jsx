import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import './Board.css'
import Avatar from './Avatar';

const Card = ({ 
   card,
   handleDragStart, 
   isEditingTaskTitle, 
   editTaskId, 
   setIsEditingTaskTitle, 
   editedTaskTitle, 
   setEditedTaskTitle, 
   handleSaveTask, 
   toggleDropdown, 
   showDropdown, 
   handleDeleteTask, 
   handleEditTask, 
   description, 
   setDescription,
   handleDescriptionChange,
   handleCreateTask,
   cardId,
   dueDate, 
   
   
  

   }) => {


  
    const priorityClass = `priority-${card.priority.toLowerCase()}`;
   
  return (
    <div 
    className="card"
    draggable 
    onDragStart={(e) => handleDragStart(e, card)}>
      <div className="task-title">
        {isEditingTaskTitle && cardId === editTaskId ? (
          <input
            type="text"
            value={editedTaskTitle}
            onChange={(e) => setEditedTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveTask()}
            onBlur={() => setIsEditingTaskTitle(false)}
          />
        ) : (
          <span>{card.title}</span>
        )}
        <div className="priority-and-buttons">
        {card.assignedUserDetail && (
        <div className="assigned-user">
          <Avatar fullName={card.assignedUserDetail.fullName} />
        </div>
      )}
        <div className={`priority-tag ${priorityClass}`}>
          {card.priority.toUpperCase()}
        </div>
        <div className='button-group'>
          <div className="dropdown">
            <button className="icon-button" onClick={() => toggleDropdown(card.id)}>
              <FontAwesomeIcon icon={faPen} />
            </button>
            {showDropdown === card.id && (
              <div className="dropdown-content">
                <button className="delete-button" onClick={() => handleDeleteTask(card.id)}>
                  Delete
                </button>
                <button className="edit-button" onClick={() => handleEditTask(card.id, card.title)}>
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
      <div className="description">
        <textarea
         value={card.description}
         onChange={handleDescriptionChange}
         placeholder="Enter description"
        />
      </div>
      <div className="card-labels">
        {card.labels && card.labels.map(label => (
          <span className="card-label" key={label}>{label}</span>
        ))}
      </div>
    


        </div>
  );
};

export default Card;
