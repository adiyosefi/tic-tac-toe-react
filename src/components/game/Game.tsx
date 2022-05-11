import React, { useState } from 'react';
import './Game.scss';
import { Board } from '../board/Board';
import { SquareValue } from '../../types/square-value';
import { HistoryItem } from '../../types/history-item';
import { Moves } from '../moves/Moves';


type GameState = {
	history: HistoryItem[];
	stepNumber: number;
	xIsNext: boolean;
};

export const Game: React.FC = () => {
	const initialGameState: GameState = {
		history: [
			{squares: Array(9).fill(null)}
		],
		stepNumber: 0,
		xIsNext: true,
	};
	const [gameState, setGameState] = useState<GameState>(initialGameState);

	const handleClick = (i: number, position: [number, number]): void => {
		const gameHistory: HistoryItem[] = gameState.history.slice(0, gameState.stepNumber + 1);
		const currentHistoryItem = gameHistory[gameHistory.length - 1];
		const squares: SquareValue[] = [...currentHistoryItem.squares];

		if (calculateWinner(squares) || squares[i]) return; // if someone won or square is already filled, don't change anything

		squares[i] = gameState.xIsNext ? 'X' : 'O';
		setGameState({
			history: gameHistory.concat([
				{squares: squares, position: position},
			]),
			stepNumber: gameHistory.length,
			xIsNext: !gameState.xIsNext
		});
	}

	const handleJumpTo = (step: number): void => {
		setGameState({
			...gameState,
			stepNumber: step,
			xIsNext: (step % 2) === 0,
		});
	}

	const history: HistoryItem[] = gameState.history;
	const current: HistoryItem = history[gameState.stepNumber]; // current history item
	const winner: SquareValue = calculateWinner(current.squares);
	const nextPlayer: SquareValue = gameState.xIsNext ? 'X' : 'O';
	const gameOverNoWinner: boolean = !winner && gameState.stepNumber === 9;
	const gameOverWinner: boolean = !!winner && !gameOverNoWinner;
	const nextPlayerTemplate: JSX.Element = <span>Next player: <strong className={'player-' + nextPlayer.toLowerCase()}>{nextPlayer}</strong></span>;
	const statusNoWinner: JSX.Element = gameOverNoWinner ? <span>Game over, no winner</span> : nextPlayerTemplate;
	const status: JSX.Element = gameOverWinner ? <span>Winner: <strong className={'player-' + winner?.toLowerCase()}>{winner}</strong></span> : statusNoWinner;

	return (
		<div className="game-wrapper">
			<h1>Tic Tac Toe</h1>
			<div className="game">
				<div className="game-board">
					<Board squares={current.squares}
						   onClick={(i: number, position: [number, number]) => handleClick(i, position)}/>
				</div>
				<div className="game-info">
					<div className="game-status">
						{status}
					</div>
					<Moves history={history}
						   jumpTo={(i: number) => handleJumpTo(i)}/>
				</div>
			</div>
		</div>
	);
}

function calculateWinner(squares: SquareValue[]): SquareValue {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	for (let line of lines) {
		const [a, b, c] = line;
		if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
			return squares[a];
		}
	}
	return null;
}
