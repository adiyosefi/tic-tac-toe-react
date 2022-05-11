import React from 'react';
import './Board.scss';
import { SquareValue } from '../../types/square-value';
import { Square } from '../square/Square';


type BoardProps = {
	squares: SquareValue[];
	onClick: (i: number, position: [number, number]) => void
};

export const Board: React.FC<BoardProps> = ({squares, onClick}) => {
	const renderSquare = (i: number, position: [number, number]) => {
		return <Square key={i}
					   id={i}
					   value={squares[i]}
					   onClick={() => onClick(i, position)}/>;
	}

	const rowCount = 3, colCount = 3;
	return (
		<div className="board">
			{[...new Array(rowCount)].map((x, rowIndex) => {
				return (
					<div className="board-row" key={rowIndex}>
						{[...new Array(colCount)].map((y, colIndex) => renderSquare(rowIndex * colCount + colIndex, [rowIndex, colIndex]))}
					</div>
				)
			})}
		</div>
	);
}
