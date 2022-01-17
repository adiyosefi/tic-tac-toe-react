import React from 'react';
import './Square.css';
import { SquareValue } from '../../types/square-value';


type SquareProps = {
  value: SquareValue;
  onClick: () => void
};

const Square = (props: SquareProps) => (
    <button className="square"
            onClick={props.onClick}>
      {props.value}
    </button>
);

export default Square;
