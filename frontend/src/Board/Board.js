import React, { useState } from 'react';
import './Board.css';

const Board = () => {
  const [cards, setCards] = useState([
    { id: 1, title: 'Task 1', status: 'Todo' },
    { id: 2, title: 'Task 2', status: 'In Progress' },
    { id: 3, title: 'Task 3', status: 'Done' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTaskFor, setNewTaskFor] = useState('');
  const [newTaskText, setNewTaskText] = useState('');

  const handleDragStart = (e, card) => {
    e.dataTransfer.setData('cardId', card.id);
  };

  
  const handleDeleteTask = (taskId) => {
    const updatedCards = cards.filter((card) => card.id !== taskId);
    setCards(updatedCards);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, status) => {
    const cardId = e.dataTransfer.getData('cardId');
    const updatedCards = cards.map((card) => {
      if (card.id === parseInt(cardId)) {
        return { ...card, status: status };
      }
      return card;
    });
    setCards(updatedCards);
  };

  const handleCreateTask = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewTaskFor('');
    setNewTaskText('');
  };

  const handleSaveTask = () => {
    const newTaskId = cards.length + 1;
    const newTask = {
      id: newTaskId,
      title: newTaskText,
      status: 'Todo',
    };
    setCards([...cards, newTask]);
    handleCloseModal();
  };

  return (
    <div className="board">
      <div className="column">
        <h2>Todo</h2>
        <div
          className="droppable"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, 'Todo')}
        >
          {cards
            .filter((card) => card.status === 'Todo')
            .map((card) => (
              <div
                key={card.id}
                className="card"
                draggable
                onDragStart={(e) => handleDragStart(e, card)}
              >
                {card.title}
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTask(card.id)}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
      <div className="column">
        <h2>In Progress</h2>
        <div
          className="droppable"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, 'In Progress')}
        >
          {cards
            .filter((card) => card.status === 'In Progress')
            .map((card) => (
              <div
                key={card.id}
                className="card"
                draggable
                onDragStart={(e) => handleDragStart(e, card)}
              >
                {card.title}
                <button
                  className="delete-button"
                  onClick={() => handleDeleteTask(card.id)}
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
      <div className="column">
        <h2>Done</h2>
        <div
          className="droppable"
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, 'Done')}
        >
          {cards
            .filter((card) => card.status === 'Done')
            .map((card) => (
              <div
                key
                ={card.id}
                className="card"
                draggable
                onDragStart={(e) => handleDragStart(e, card)}
                >
                {card.title}
                <button className="delete-button" onClick={() => handleDeleteTask(card.id)}>
                  Delete
                </button>
                </div>
                ))}
                </div>
                </div>
                <div className="create-task">
                <button onClick={handleCreateTask}>Create Task</button>
                </div>
                {showModal && (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Create Task</h3>
          <button className="close-button" onClick={handleCloseModal}>
            &#x2715;
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="taskFor">For:</label>
            <input
              type="text"
              id="taskFor"
              value={newTaskFor}
              onChange={(e) => setNewTaskFor(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="taskText">Type something:</label>
            <textarea
              id="taskText"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="modal-footer">
          <button className="cancel-button" onClick={handleCloseModal}>
            Cancel
          </button>
          <button className="save-button" onClick={handleSaveTask}>
            Save
          </button>
        </div>
      </div>
    </div>
  )}
</div>
);
};

export default Board;
