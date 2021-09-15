import React, { useEffect, useState } from 'react';
import { ProgressBar, Button, Row, Col } from 'react-bootstrap';

export default function AudioTile({ fileNames, fileIndex }: AudioTileProps) {
	const [ audio, setAudio ] = useState({} as HTMLAudioElement);
	const [ timePercentage, setTimePercentage ] = useState(0.0);

	useEffect(() => {
		const loadedAudio = new Audio(fileNames[fileIndex]);
		setAudio(loadedAudio);
	}, []);

	audio.ontimeupdate = (ev: Event) => {
		const percent = audio.currentTime / audio.duration * 100;
		console.log(percent);
		setTimePercentage(percent);
	};

	// TODO: Test & add playback-status (playing/paused)
	return (
		<div>
			<button
				onClick={() => {
					toggleAudio(audio);
				}}
			>
				{fileNames[fileIndex]}
			</button>
			<div className="progressBar">
				<ProgressBar
					style={{transitionDuration: "50ms"}}
					now={timePercentage}
					label={audio.paused ? '' : `${audio.currentTime?.toFixed(1)}s / ${audio.duration?.toFixed(1)}s`}
				/>
			</div>
		</div>
	);
}

const toggleAudio = (audio: HTMLAudioElement) => {
	audio.paused ? audio.play() : audio.pause();
};

type AudioTileProps = {
	fileNames: string[];
	fileIndex: number;
};
