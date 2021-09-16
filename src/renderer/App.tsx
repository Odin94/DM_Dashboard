import './App.global.css';

import React from 'react';
import { MemoryRouter as Router, Route, Switch } from 'react-router-dom';

import AudioContainer from './audio/AudioContainer';

const AppComponent = () => {
	const fileNamesPromise = (window as BridgedWindow).electron.glob('./audio_files/**/*.@(ogg|mp3|flac|wav)');

	return (
		<div>
			<h1 style={{color: "white", margin: "auto", padding: "20px", textAlign: "center"}}>DM Dashboard</h1>
			<AudioContainer fileNamesPromise={fileNamesPromise} />
		</div>
	);
};

export default function App() {
	return (
		<Router>
			<Switch>
				<Route path="/" component={AppComponent} />
			</Switch>
		</Router>
	);
}
