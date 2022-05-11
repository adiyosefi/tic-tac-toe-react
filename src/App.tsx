import React from 'react';
import './App.scss';
import { Game } from './components/game/Game';

export const App: React.FC = () => {
	return (
		<>
			<div className="app-wrapper">
				<Game/>
			</div>
			<div className="footer">
				® Made by Adi Yosefi
			</div>
		</>
	);
};

