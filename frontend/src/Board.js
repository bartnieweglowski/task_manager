import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Board = () => {
	const [boards, setBoards] = useState([])
	const [cards, setCards] = useState([])

	useEffect(() => {
		axios
			.get('/api/boards/')
			.then(response => {
				setBoards(response.data.boards)
			})
			.catch(error => {
				console.error(error)
			})
	}, [])

	const handleBoardClick = boardId => {
		axios
			.get(`/api/boards/${boardId}/cards/`)
			.then(response => {
				setCards(response.data.cards)
			})
			.catch(error => {
				console.error(error)
			})
	}

	return (
		<div>
			<h1>Boards</h1>
			<ul>
				{boards.map(board => (
					<li key={board.id} onClick={() => handleBoardClick(board.id)}>
						{board.title}
					</li>
				))}
			</ul>
			{cards.length > 0 && (
				<div>
					<h2>Cards</h2>
					<ul>
						{cards.map(card => (
							<li key={card.id}>
								<h3>{card.title}</h3>
								<p>{card.description}</p>
								<p>Status: {card.status}</p>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	)
}

export default Board
