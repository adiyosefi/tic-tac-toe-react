import React, { useState } from 'react';
import './Moves.css';
import { HistoryItem } from '../../types/history-item';


type MovesState = {
	currentMove: number;
	sortOrder: 'asc' | 'desc';
}

type MovesProps = {
	history: HistoryItem[];
	jumpTo: (i: number) => void
}

export const Moves: React.FC<MovesProps> = ({history, jumpTo}) => {
	const initialMovesState: MovesState = {
		currentMove: 0,
		sortOrder: 'asc'
	};
	const [movesState, setMovesState] = useState<MovesState>(initialMovesState);

	const jumpToMoveAndMakeUpdateCurrentMove = (index: number): void => {
		jumpTo(index);
		setMovesState({...movesState, currentMove: index});
	}

	const isCurrentMove = (index: number): boolean => {
		return movesState.currentMove === index;
	}

	const onSort = (): void => {
		const newSortOrder = movesState.sortOrder === 'asc' ? 'desc' : 'asc';
		setMovesState({...movesState, sortOrder: newSortOrder});
	}

	const sortHistoryItems = (a: { step: HistoryItem, index: number }, b: { step: HistoryItem, index: number }): number => {
		const isReversed = (movesState.sortOrder === 'asc') ? 1 : -1;
		return isReversed * (a.index - b.index)
	}

	const getSortButtonLabel = (): string => {
		return movesState.sortOrder === 'asc' ? '↓' : '↑';
	}

	const moves = history
		.map((step, index) => ({step: step, index: index}))
		.sort(sortHistoryItems.bind(this))
		.map((sortedStep) => {
			const position: string = sortedStep.step.position?.join(', ') || '';
			const desc = sortedStep.index ?
				`Go to move #${sortedStep.index} [${position}]` :
				'Go to game start';
			return (
				<li key={sortedStep.index}>
					<button className={isCurrentMove(sortedStep.index) ? 'current-move' : ''}
							onClick={() => jumpToMoveAndMakeUpdateCurrentMove(sortedStep.index)}>
						{desc}
					</button>
				</li>
			)
		});
	return (
		<div className="moves-wrapper">
			<button onClick={() => onSort()}
					className="sort-button">
				Sort {getSortButtonLabel()}
			</button>
			<ol>{moves}</ol>
		</div>
	);
}
