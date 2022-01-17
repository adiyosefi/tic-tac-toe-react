import React from 'react';
import './Moves.css';
import { HistoryItem } from '../../types/history-item';


type MovesState = {
  currentMove: number;
}

type MovesProps = {
  history: HistoryItem[];
  jumpTo: (i: number) => void
}

class Moves extends React.Component<MovesProps, MovesState> {
  state: MovesState = {
    currentMove: 0
  };

  jumpToMoveAndMakeUpdateCurrentMove(index: number): void {
    this.props.jumpTo(index);
    this.setState({currentMove: index});
  }

  isCurrentMove(index: number): boolean {
    return this.state.currentMove === index;
  }

  render() {
    const moves = this.props.history.map((step, index) => {
      const position: string = step.position?.join(', ') || '';
      const desc = index ?
          `Go to move #${index} [${position}]` :
          'Go to game start';
      return (
          <li key={index}>
            <button className={this.isCurrentMove(index) ? 'current-move' : ''}
                    onClick={() => this.jumpToMoveAndMakeUpdateCurrentMove(index)}>
              {desc}
            </button>
          </li>
      )
    });
    return (
        <ol>{moves}</ol>
    );
  }
}

export default Moves;
