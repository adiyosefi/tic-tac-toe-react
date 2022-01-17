import React from 'react';
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

class Moves extends React.Component<MovesProps, MovesState> {
	state: MovesState = {
		currentMove: 0,
		sortOrder: 'asc'
	};

	jumpToMoveAndMakeUpdateCurrentMove(index: number): void {
		this.props.jumpTo(index);
		this.setState({currentMove: index});
	}

	isCurrentMove(index: number): boolean {
		return this.state.currentMove === index;
	}

	onSort(): void {
		const newSortOrder = this.state.sortOrder === 'asc' ? 'desc' : 'asc';
		this.setState({sortOrder: newSortOrder});
	}

	sortHistoryItems(a: { step: HistoryItem, index: number }, b: { step: HistoryItem, index: number }): number {
		const isReversed = (this.state.sortOrder === 'asc') ? 1 : -1;
		return isReversed * (a.index - b.index)
	}

	getSortButtonLabel(): string {
		return this.state.sortOrder === 'asc' ? '↓' : '↑';
	}

	render() {
		const moves = this.props.history
			.map((step, index) => ({step: step, index: index}))
			.sort(this.sortHistoryItems.bind(this))
			.map((sortedStep) => {
				const position: string = sortedStep.step.position?.join(', ') || '';
				const desc = sortedStep.index ?
					`Go to move #${sortedStep.index} [${position}]` :
					'Go to game start';
				return (
					<li key={sortedStep.index}>
						<button className={this.isCurrentMove(sortedStep.index) ? 'current-move' : ''}
								onClick={() => this.jumpToMoveAndMakeUpdateCurrentMove(sortedStep.index)}>
							{desc}
						</button>
					</li>
				)
			});
		return (
			<div className="moves-wrapper">
				<button onClick={() => this.onSort()}
						className="sort-button">
					Sort {this.getSortButtonLabel()}
				</button>
				<ol>{moves}</ol>
			</div>
		);
	}
}

export default Moves;
