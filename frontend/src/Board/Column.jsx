import React from 'react';
import Card from './Card';
import './Board.css'

const Column = ({ title, cards,status, handleCreateTask, handleDragOver, handleDrop, handleDragStart, toggleDropdown, handleEditTask, handleDeleteTask, showDropdown, ...props }) => {
  
  
  return (
    <div className="column">
      <h2>{title}</h2>
      <div className="droppable with-scrollbar" 
          onDrop={(e) => handleDrop(e, title)} 
          onDragOver={(e) => e.preventDefault()}
        >
        {cards.map((card) => (
          <Card 
          key={card.id} 
          card={card} 
          handleCreateTask={handleCreateTask} 
          handleDragStart={handleDragStart} 
          handleDeleteTask={handleDeleteTask}
          handleEditTask={handleEditTask}
          showDropdown={showDropdown}
          toggleDropdown={toggleDropdown}/>
        ))}
         {title === "Todo" && (
        <div className='create-task'>
          <button onClick={handleCreateTask}>New Task</button>
        </div>
         )}
      </div>
    </div>
  );
};

export default Column;
