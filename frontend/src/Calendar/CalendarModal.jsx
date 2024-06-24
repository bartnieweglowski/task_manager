
import React, { useContext, useState, useEffect } from 'react';
import { CardsContext } from '../Board/Board';
import { getTasks } from '../services/taskService';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../Board/Board.css'


function CalendarModal({ date, closeModal, task }) {
    const {cards, setCards } = useContext(CardsContext);
    const [selectedTask, setSelectedTask] = useState(null);
    const [show, setShow] = useState(true)
    
   
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
            let formattedStartDate = new Date(startDate).toISOString();
            let formattedEndDate = new Date(endDate);
    
            if(formattedEndDate.getHours() === 0 && formattedEndDate.getMinutes() === 0) {
                formattedEndDate.setDate(formattedEndDate.getDate() + 1);
            }
    
            formattedEndDate = formattedEndDate.toISOString();
    
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
        <Modal show={show} onHide={closeModal} centered>
            <Modal.Header closeButton>
                <Modal.Title>Assign task to date</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="startDate">
                        <Form.Label>Start:</Form.Label>
                        <Form.Control type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="endDate">
                        <Form.Label>End:</Form.Label>
                        <Form.Control type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="selectTask">
                        <Form.Label>Task:</Form.Label>
                        <Form.Control as="select" custom onChange={e => setSelectedTask(e.target.value)}>
                            <option value="">Choose task</option>
                            {cards.map(task => (
                                <option key={task.id} value={task.id}>{task.title}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleAssignTask}>
                    Assign task
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default CalendarModal;