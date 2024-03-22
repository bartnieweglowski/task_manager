import React, { useState, useEffect } from 'react';
import Column from './Column';
import TaskModal from './TaskModal';
import './Board.css'
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
export const CardsContext = React.createContext();


const Board = () => {
    const [cards, setCards] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editTaskId, setEditTaskId] = useState(null);
    const [editedTaskTitle, setEditedTaskTitle] = useState('');
    const [showDropdown, setShowDropdown] = useState(null);
    const [description, setDescription] = useState('');
    const [editedLabels, setEditedLabels] = useState([]);
    const [currentPriority, setCurrentPriority] = useState('MEDIUM');
    const [assignedUser, setAssignedUser] = useState('');
    console.log(assignedUser);
    const handleDragStart = (e, card) => {
        e.dataTransfer.setData('cardId', card.id);
    };


      
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const fetchedTasks = await getTasks();
                setCards(fetchedTasks);
            } catch (error) {
                console.error("Błąd podczas pobierania zadań:", error);
            }
        };
    
        fetchTasks();
    }, []);
    const updateTaskDescription = (taskId, newDescription) => {
        const updatedCards = cards.map(card => {
            if (card.id === taskId) {
                return { ...card, description: newDescription };
            }
            return card;
        });
        setCards(updatedCards);
    };

    const handleDeleteTask = async (taskId) => {
        try {
            // Próba usunięcia zadania i oczekiwanie na odpowiedź z serwera
            await deleteTask(taskId);
            // Jeśli serwer odpowiedział bez błędu, usuwamy zadanie z UI
            const updatedCards = cards.filter(card => card.id !== taskId);
            setCards(updatedCards);
        } catch (error) {
            // Obsługa błędów, np. nie można było usunąć zadania
            console.error("Nie można usunąć zadania:", error);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = async (e, newStatus) => {
        const cardId = e.dataTransfer.getData("cardId");
        const updatedCards = cards.map(card => {
            if (card.id === parseInt(cardId)) {
                return { ...card, status: newStatus };
            }
            return card;
        });
    
        const movedCard = updatedCards.find(card => card.id === parseInt(cardId));
        if (movedCard) {
            try {
                const updatedTask = await updateTask(movedCard.id, { ...movedCard, status: newStatus });
                if (updatedTask) {
                    setCards(updatedCards);
                }
            } catch (error) {
                console.error("Błąd podczas aktualizacji zadania:", error);
            }
        }
    };

  
    const handleCreateTask = () => {
        setEditTaskId(null);
        setEditedTaskTitle('');
        setDescription('');
        setEditedLabels([]); 
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditTaskId(null);
        setEditedTaskTitle('');
        setAssignedUser('');
    };


    const handleEditTask = (taskId) => {
        const taskToEdit = cards.find(card => card.id === taskId);
        setEditTaskId(taskId);
        setEditedTaskTitle(taskToEdit.title);
        setDescription(taskToEdit.description);
        setShowModal(true);
        setEditedLabels(taskToEdit.labels);
        setCurrentPriority(taskToEdit.priority);
        setAssignedUser(taskToEdit.assignedUser)
    };

    const handleSaveTask = async () => {
        if (editTaskId) {
            const updatedData = {
                title: editedTaskTitle,
                description: description,
                labels: editedLabels,
                priority: currentPriority,
                assignedUser: assignedUser,
    

            };
            console.log("Saving task with assigned user ID:", assignedUser);
            const updatedTask = await updateTask(editTaskId, updatedData);
            console.log("Odpowiedź z updateTask:", updatedTask);
            if (updatedTask) {
                const updatedCards = cards.map(card => 
                    card.id === editTaskId ? updatedTask : card
                );
                console.log("Aktualizacja stanu po updateTask", updatedCards);
                setCards(updatedCards);
            }
        } else {
            const newTaskData = {
                title: editedTaskTitle,
                description,
                status: 'Todo',
                labels: editedLabels,
                priority: currentPriority,
                assignedUser: assignedUser
            };
            const createdTask = await createTask(newTaskData);
            if (createdTask) {
                setCards([...cards, createdTask]);
            }      
        }
        handleCloseModal();
    };


    const toggleDropdown = (taskId) => {
        setShowDropdown(showDropdown === taskId ? null : taskId);
    };

    const saveDescription = (taskId, newDescription) => {
        const updatedCards = cards.map(card => {
            if (card.id === taskId) {
                return { ...card, description: newDescription };
            }
            return card;
        });
        setCards(updatedCards);
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveTask();
        }
    };

    useEffect(() => {
        const keyPressHandler = (event) => {
            if (event.key === 'Enter' && showModal) {
                handleSaveTask();
            }
        };

        window.addEventListener('keydown', keyPressHandler);
        return () => {
            window.removeEventListener('keydown', keyPressHandler);
        };
    }, [showModal, handleSaveTask]);
  

    return (
        <CardsContext.Provider value={{ cards, setCards}}>
        <div className='board'>
            <Column title="Todo" cards={cards.filter(card => card.status === 'Todo')} 
            handleDragOver={handleDragOver} 
            handleDrop={handleDrop}
            handleDragStart={handleDragStart}
            toggleDropdown={toggleDropdown}
            handleDeleteTask={handleDeleteTask}
            showDropdown={showDropdown}
            handleEditTask={handleEditTask}
            handleCreateTask={handleCreateTask}
            >
            </Column>
            <Column title="In Progress" cards={cards.filter(card => card.status === 'In Progress')}
             handleDragOver={handleDragOver}
             handleDrop={handleDrop} 
             handleDragStart={handleDragStart}
             toggleDropdown={toggleDropdown}
             handleDeleteTask={handleDeleteTask}
             showDropdown={showDropdown}
             handleEditTask={handleEditTask}
             handleCreateTask={handleCreateTask}
            />
            <Column title="Done" cards={cards.filter(card => card.status === 'Done')}
             handleDragOver={handleDragOver}
             handleDrop={handleDrop}
             handleDragStart={handleDragStart}
             toggleDropdown={toggleDropdown}
             handleDeleteTask={handleDeleteTask}
             showDropdown={showDropdown}
             handleEditTask={handleEditTask}
             handleCreateTask={handleCreateTask}/>
            {showModal && (
                <TaskModal
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    editTaskId={editTaskId}
                    editedTaskTitle={editedTaskTitle}
                    setEditedTaskTitle={setEditedTaskTitle}
                    description={description}
                    setDescription={setDescription}
                    handleSaveTask={handleSaveTask}
                    handleKeyPress={handleKeyPress}
                    saveDescription={saveDescription}
                    setShowModal={setShowModal}
                    updateTaskDescription={updateTaskDescription}
                    cards={cards}
                    handleCreateTask={handleCreateTask}
                    editedLabels={editedLabels}
                    setEditedLabels={setEditedLabels}
                    priority={currentPriority}
                    setPriority={setCurrentPriority}
                    setAssignedUser={setAssignedUser}
                    assignedUser={assignedUser}
                />
            )}
        </div>
        </CardsContext.Provider>
    );
};

export default Board;


