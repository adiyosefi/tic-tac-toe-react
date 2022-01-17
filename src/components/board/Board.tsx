import React from 'react';
import './Board.css';
import { SquareValue } from '../../types/square-value';
import Square from '../square/Square';


type BoardProps = {
  squares: SquareValue[];
  onClick: (i: number, position: [number, number]) => void
};

class Board extends React.Component<BoardProps> {
  renderSquare(i: number, position: [number, number]) {
    return <Square key={i}
                   value={this.props.squares[i]}
                   onClick={() => this.props.onClick(i, position)}/>;
  }

  render() {
    const rowCount = 3, colCount = 3;
    return (
        <div>
          {[...new Array(rowCount)].map((x, rowIndex) => {
            return (
                <div className="board-row" key={rowIndex}>
                  {[...new Array(colCount)].map((y, colIndex) => this.renderSquare(rowIndex * colCount + colIndex, [rowIndex, colIndex]))}
                </div>
            )
          })
          }
        </div>
    );
  }
}

export default Board;
