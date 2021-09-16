import React, { useEffect, useState, useRef } from 'react';
import AudioControls from './AudioControls';

export default function AudioTile({ fileNames, fileIndex }: AudioTileProps) {
	const [ isPlaying, setIsPlaying ] = useState(false);

	const audioRef = useRef(new Audio(fileNames[fileIndex]));

	useEffect(
		() => {
			if (isPlaying) {
				audioRef.current.play();
			} else {
				audioRef.current.pause();
			}
		},
		[ isPlaying ]
	);

	const { duration } = audioRef.current;
	const title = fileNames[fileIndex].split('/').pop();

	const reset = () => {
		setIsPlaying(false);
		audioRef.current.currentTime = 0;
	};

	const replay = () => {
		audioRef.current.currentTime = 0;
		setIsPlaying(true);
	};

	return (
		<div className="audio-player">
			<div className="track-info">
				<img
					className="artwork"
					src={'./assets/images/mountain_pixabay.jpg'}
					alt={`track artwork for ${title}`}
				/>
				<h3 className="title">{title}</h3>
				<AudioControls
					isPlaying={isPlaying}
					onResetClick={reset}
					onReplayClick={replay}
					onPlayPauseClick={setIsPlaying}
				/>
			</div>
		</div>
	);
}

type AudioTileProps = {
	fileNames: string[];
	fileIndex: number;
};
