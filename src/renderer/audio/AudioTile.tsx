import React, { useEffect, useState, useRef } from 'react';
import AudioControls from './AudioControls';

export default function AudioTile({ fileNames, fileIndex }: AudioTileProps) {
	const [ trackProgress, setTrackProgress ] = useState(0);
	const [ isPlaying, setIsPlaying ] = useState(false);

	const audioRef = useRef(new Audio(fileNames[fileIndex]));
	const intervalRef = useRef<NodeJS.Timeout>();
	const isReady = useRef(false);

	useEffect(
		() => {
			if (isPlaying) {
				audioRef.current.play();
				startTimer();
			} else {
				clearInterval(intervalRef.current!);
				audioRef.current.pause();
			}
		},
		[ isPlaying ]
	);

	useEffect(() => {
		// Pause and clean up on unmount
		return () => {
			audioRef.current.pause();
			clearInterval(intervalRef.current!);
		};
	}, []);

	const { duration } = audioRef.current;
	const title = fileNames[fileIndex].split('/').pop();

	const reset = () => {
		setIsPlaying(false);
		clearInterval(intervalRef.current!);
		audioRef.current.currentTime = 0;
		setTrackProgress(0);
	};

	const replay = () => {
		audioRef.current.currentTime = 0;
		setTrackProgress(0);
		setIsPlaying(true);
	};

	const startTimer = () => {
		// Clear any timers already running
		clearInterval(intervalRef.current!);

		intervalRef.current = setInterval(() => {
			setTrackProgress(audioRef.current.currentTime);
			if (audioRef.current.currentTime == duration) {
				reset();
			}
		}, 200);
	};

	const onScrub = (value: number) => {
		// Clear any timers already running
		clearInterval(intervalRef.current!);
		audioRef.current.currentTime = value;
		setTrackProgress(audioRef.current.currentTime);
	};

	const onScrubEnd = () => {
		// If not already playing, start
		if (!isPlaying) {
			setIsPlaying(true);
		}
		startTimer();
	};

	const currentPercentage = duration ? `${trackProgress / duration * 100}%` : '0%';
	const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))`;

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
				<input
					type="range"
					value={trackProgress}
					step="1"
					min="0"
					max={duration ? duration : `${duration}`}
					className="progress"
					onChange={(e) => onScrub(parseInt(e.target.value))}
					onMouseUp={onScrubEnd}
					onKeyUp={onScrubEnd}
					style={{ background: trackStyling }}
				/>
			</div>
		</div>
	);
}

type AudioTileProps = {
	fileNames: string[];
	fileIndex: number;
};
