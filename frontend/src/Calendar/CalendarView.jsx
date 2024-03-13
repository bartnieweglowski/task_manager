
import React, { useContext, useState } from 'react';
import { CardsContext } from '../Board/Board';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import Modal from './Modal'; // Zakładając, że Modal jest odpowiednio zaimplementowany
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { updateTask, deleteTask } from '../services/taskService';
import TaskDetailsModal from './TaskDetailsModal';

function CalendarView() {
    const {cards, setCards } = useContext(CardsContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showModal, setShowModal] = useState(false);
    const  localizer = momentLocalizer(moment);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showTaskDetailsModal, setShowTaskDetailsModal] = useState(false);
    const [endDate, setEndDate] = useState(new Date());


    const assignTaskToDate = async (taskId, newStartDate, newEndDate) => {
        const taskToUpdate = cards.find(card => card.id === taskId);
        if (taskToUpdate) {
            // Przygotowanie zaktualizowanego zadania
            const updatedTask = { 
                ...taskToUpdate, 
                start_date: newStartDate, 
                end_date: newEndDate 
            };
    
            // Wywołanie updateTask z serwisu taskService, aby zaktualizować zadanie w bazie danych
            const response = await updateTask(taskId, updatedTask);
            if (response) {
                // Aktualizacja stanu cards w kontekście CardsContext
                setCards(prevCards => prevCards.map(card => 
                    card.id === taskId ? { ...card, ...updatedTask } : card
                ));
            }
        }
    };

    const onSelectEvent = (event) => {
        const task = cards.find(card => card.title === event.title);
        setSelectedTask(task);
        setShowTaskDetailsModal(true);
    };
    
    const onEventDrop = ({ event, start, end }) => {
        const task = cards.find(card => card.title === event.title);
        if (task) {
            const updatedTask = { ...task, start_date: start, end_date: end };
            updateTask(task.id, updatedTask).then(() => {
                setCards(prevCards => prevCards.map(card => card.id === task.id ? updatedTask : card));
            });
        }
    };
    const onEventResize = ({ event, start, end }) => {
        const task = cards.find(card => card.title === event.title);
        if (task) {
            // Tworzymy zaktualizowany obiekt zadania z nowymi datami
            const updatedTask = { ...task, start_date: start, end_date: end };
    
            // Wywołujemy funkcję updateTask, aby zaktualizować zadanie w bazie danych
            updateTask(task.id, updatedTask).then(() => {
                // Po pomyślnej aktualizacji w bazie danych, aktualizujemy stan cards
                setCards(prevCards => prevCards.map(card => 
                    card.id === task.id ? updatedTask : card
                ));
            }).catch(error => {
                console.error("Błąd podczas aktualizacji zadania:", error);
                // Tutaj możesz również obsłużyć błędy, np. informując użytkownika
            });
        }
    };

    const events = cards.map(card => ({
        title: card.title,
        start: new Date(card.start_date), // Użyj nowego pola start_date
        end: new Date(card.end_date),     // Użyj nowego pola end_date
        allDay: false, // lub true, jeśli zadanie ma trwać cały dzień
    }));

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={onSelectEvent}
                onEventDrop={onEventDrop}
                onEventResize={onEventResize}
                onSelectSlot={slotInfo => {
                    setSelectedDate(slotInfo.start);
                    setEndDate(slotInfo.end);
                    setShowModal(true);
                }}
                selectable={true}
                style={{ height: 600 }}
            />
           {showModal && (
             <Modal
             date={selectedDate}
             endDate={endDate}
             selectedTask={selectedTask}
             closeModal={() => {
             setShowModal(false);
             setSelectedTask(null);
        }}
        assignTaskToDate={assignTaskToDate}
        // Dodaj funkcje do edycji i usuwania zadań
    />
)}
{showTaskDetailsModal && selectedTask && (
                <TaskDetailsModal
                    task={selectedTask}
                    closeModal={() => setShowTaskDetailsModal(false)}
                    updateTask={(taskId, updatedData) => updateTask(taskId, updatedData)}
                    deleteTask={(taskId) => deleteTask(taskId)}
                />
            )}
        </div>
    );
};

export default CalendarView;