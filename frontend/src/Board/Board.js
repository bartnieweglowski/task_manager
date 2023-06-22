import React, { useState, useEffect } from 'react'
import './Board.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const Board = () => {
	const [cards, setCards] = useState([
		{ id: 1, title: 'Task 1', status: 'Todo' },
		{ id: 2, title: 'Task 2', status: 'In Progress' },
		{ id: 3, title: 'Task 3', status: 'Done' },
	])

	const [showModal, setShowModal] = useState(false)
	const [newTaskFor, setNewTaskFor] = useState('')
	const [newTaskText, setNewTaskText] = useState('')
	const [editTaskId, setEditTaskId] = useState(null)
	const [editedTaskTitle, setEditedTaskTitle] = useState('')
	const [showDropdown, setShowDropdown] = useState(null)

	const handleDragStart = (e, card) => {
		e.dataTransfer.setData('cardId', card.id)
	}

	const handleDeleteTask = taskId => {
		const updatedCards = cards.filter(card => card.id !== taskId)
		setCards(updatedCards)
	}

	const handleDragOver = e => {
		e.preventDefault()
	}

	const handleDrop = (e, status) => {
		const cardId = e.dataTransfer.getData('cardId')
		const updatedCards = cards.map(card => {
			if (card.id === parseInt(cardId)) {
				return { ...card, status: status }
			}
			return card
		})
		setCards(updatedCards)
	}

	const handleCreateTask = () => {
		setShowModal(true)
	}

	const handleCloseModal = () => {
		setShowModal(false)
		setNewTaskFor('')
		setNewTaskText('')
		setEditTaskId(null)
		setEditedTaskTitle('')
	}

	const handleSaveTask = () => {
		if (editTaskId) {
			const updatedCards = cards.map(card => (card.id === editTaskId ? { ...card, title: editedTaskTitle } : card))
			setCards(updatedCards)
		} else {
			const newTaskId = cards.length + 1
			const newTask = {
				id: newTaskId,
				title: newTaskText,
				status: 'Todo',
			}
			setCards([...cards, newTask])
		}

		handleCloseModal()
	}

	const handleEditTask = (taskId, taskTitle) => {
		setEditTaskId(taskId)
		setEditedTaskTitle(taskTitle)
		setShowModal(true)
	}

	const toggleDropdown = taskId => {
		setShowDropdown(showDropdown === taskId ? null : taskId)
	}

	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			handleSaveTask()
		}
	}

	useEffect(() => {
		const handleKeyPress = event => {
			if (event.key === 'Enter') {
				handleSaveTask()
			}
		}

		if (showModal) {
			window.addEventListener('keydown', handleKeyPress)
		}

		return () => {
			window.removeEventListener('keydown', handleKeyPress)
		}
	}, [showModal, handleSaveTask])

	return (
		<div className='board'>
			<div className='column'>
				<h2>Todo</h2>
				<div
					className='droppable with-scrollbar'
					onDragOver={e => handleDragOver(e)}
					onDrop={e => handleDrop(e, 'Todo')}>
					{cards
						.filter(card => card.status === 'Todo')
						.map(card => (
							<div key={card.id} className='card' draggable onDragStart={e => handleDragStart(e, card)}>
								{card.title}
								<div className='button-group'>
									<div className='dropdown'>
										<button className='icon-button' onClick={() => toggleDropdown(card.id)}>
											<FontAwesomeIcon icon={faPen} />
										</button>
										{showDropdown === card.id && (
											<div className='dropdown-content'>
												<button className='delete-button' onClick={() => handleDeleteTask(card.id)}>
													Delete
												</button>
												<button className='edit-button' onClick={() => handleEditTask(card.id, card.title)}>
													Edit
												</button>
											</div>
										)}
									</div>
								</div>
							</div>
						))}
					<div className='create-task'>
						<button onClick={handleCreateTask}>Create Task</button>
					</div>
				</div>
			</div>
			<div className='column'>
				<h2>In Progress</h2>
				<div
					className='droppable with-scrollbar'
					onDragOver={e => handleDragOver(e)}
					onDrop={e => handleDrop(e, 'In Progress')}>
					{cards
						.filter(card => card.status === 'In Progress')
						.map(card => (
							<div key={card.id} className='card' draggable onDragStart={e => handleDragStart(e, card)}>
								{card.title}

								<div className='button-group'>
									<div className='dropdown'>
										<button className='icon-button' onClick={() => toggleDropdown(card.id)}>
											<FontAwesomeIcon icon={faPen} />
										</button>
										{showDropdown === card.id && (
											<div className='dropdown-content'>
												<button className='delete-button' onClick={() => handleDeleteTask(card.id)}>
													Delete
												</button>
												<button className='edit-button' onClick={() => handleEditTask(card.id, card.title)}>
													Edit
												</button>
											</div>
										)}
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
			<div className='column'>
				<h2>Done</h2>
				<div
					className='droppable with-scrollbar'
					onDragOver={e => handleDragOver(e)}
					onDrop={e => handleDrop(e, 'Done')}>
					{cards
						.filter(card => card.status === 'Done')
						.map(card => (
							<div key={card.id} className='card' draggable onDragStart={e => handleDragStart(e, card)}>
								{card.title}
								<div className='button-group'>
									<div className='dropdown'>
										<button className='icon-button' onClick={() => toggleDropdown(card.id)}>
											<FontAwesomeIcon icon={faPen} />
										</button>
										{showDropdown === card.id && (
											<div className='dropdown-content'>
												<button className='delete-button' onClick={() => handleDeleteTask(card.id)}>
													Delete
												</button>
												<button className='edit-button' onClick={() => handleEditTask(card.id, card.title)}>
													Edit
												</button>
											</div>
										)}
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
			{showModal && (
				<div className='modal'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h3>Create task </h3>
							<button className='close-button' onClick={handleCloseModal}>
								&#x2715;
							</button>
						</div>
						<div className='modal-body'>
							{editTaskId && (
								<div className='form-group'>
									<label htmlFor='taskTitle'>Type Something:</label>
									<input
										type='text'
										id='taskTitle'
										value={editedTaskTitle}
										onChange={e => setEditedTaskTitle(e.target.value)}
										onKeyPress={handleKeyPress}
									/>
								</div>
							)}
							{!editTaskId && (
								<div>
									<div className='form-group'>
										<label htmlFor='taskFor'>For:</label>
										<input
											type='text'
											id='taskFor'
											value={newTaskFor}
											onChange={e => setNewTaskFor(e.target.value)}
											onKeyPress={handleKeyPress}
										/>
									</div>
									<div className='form-group'>
										<label htmlFor='taskText'>Type something:</label>
										<textarea
											id='taskText'
											value={newTaskText}
											onChange={e => setNewTaskText(e.target.value)}
											onKeyPress={handleKeyPress}></textarea>
									</div>
								</div>
							)}
						</div>
						<div className='modal-footer'>
							<button className='cancel-button' onClick={handleCloseModal}>
								Cancel
							</button>
							<button className='save-button' onClick={handleSaveTask}>
								{editTaskId ? 'Save' : 'Create'}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Board
