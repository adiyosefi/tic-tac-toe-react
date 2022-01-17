import { SquareValue } from './square-value';

export type HistoryItem = {
	squares: SquareValue[];
	position?: [number, number];
}
