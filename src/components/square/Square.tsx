import React from 'react';
import './Square.css';
import { SquareValue } from '../../types/square-value';


type SquareProps = {
  value: SquareValue;
  onClick: () => void
};

export const Square: React.FC<SquareProps> = ({value, onClick}) => (
    <button className="square"
            onClick={onClick}>
      {value}
    </button>
);
