import React from 'react';
import './Game.css';
import Board from '../board/Board';
import { SquareValue } from '../../types/square-value';
import { HistoryItem } from '../../types/history-item';
import Moves from '../moves/Moves';


type GameState = {
  history: HistoryItem[];
  stepNumber: number;
  xIsNext: boolean;
};

class Game extends React.Component<{}, GameState> {
  state: GameState = {
    history: [
      {squares: Array(9).fill(null)}
    ],
    stepNumber: 0,
    xIsNext: true,
  };

  handleClick(i: number, position: [number, number]): void {
    const history: HistoryItem[] = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares: SquareValue[] = [...current.squares];

    if (calculateWinner(squares) || squares[i]) return; // if someone won or square is already filled, don't change anything

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {squares: squares, position: position},
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  handleJumpTo(step: number) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history: HistoryItem[] = this.state.history;
    const current: HistoryItem = history[this.state.stepNumber]; // current history item
    const winner: SquareValue = calculateWinner(current.squares);
    const nextPlayer: SquareValue = this.state.xIsNext ? 'X' : 'O';
    const status: string = winner ?
        `Winner: ${winner}` :
        `Next player: ${nextPlayer}`;

    return (
        <div className="game">
          <div className="game-board">
            <Board squares={current.squares}
                   onClick={(i: number, position: [number, number]) => this.handleClick(i, position)}/>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <Moves history={history}
                   jumpTo={(i: number) => this.handleJumpTo(i)}/>
          </div>
        </div>
    );
  }
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


export default Game;
