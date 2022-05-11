import React from 'react';
import './Square.scss';
import { SquareValue } from '../../types/square-value';


type SquareProps = {
	id: number;
	value: SquareValue;
	onClick: () => void
};

export const Square: React.FC<SquareProps> = ({id, value, onClick}) => (
	<button className={"square square-" + id + " player-" + value?.toLowerCase()}
			onClick={onClick}>
		{value}
	</button>
);
