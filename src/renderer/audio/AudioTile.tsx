import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { trimFileName } from 'renderer/utils';
import useMousetrap from "react-hook-mousetrap"

import DropdownMenu from '../DropdownMenu';
import AudioControls from './AudioControls';

export default function AudioTile({ fileNames, fileIndex, tileIndex }: AudioTileProps) {
	const [ selectedFileIndex, setSelectedFileIndex ] = useState(fileIndex);
	const [ trackProgress, setTrackProgress ] = useState(0);
	const [ isPlaying, setIsPlaying ] = useState(false);
	const [ volume, setVolume ] = useState(0.5);

	const audioRef = useRef(new Audio(fileNames[selectedFileIndex]));
	const intervalRef = useRef<NodeJS.Timeout>();

	useEffect(
		() => {
			reset();
			audioRef.current.src = fileNames[selectedFileIndex];
			audioRef.current.load();
		},
		[ selectedFileIndex ]
	);

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

	useEffect(() => {
		audioRef.current.volume = volume
	}, [ volume ])

	const hotkey = hotkeyList[tileIndex] || "-";
	useMousetrap(hotkey, () => {
		setIsPlaying(!isPlaying);
	});

	const { duration } = audioRef.current;
	const title = trimFileName(fileNames[selectedFileIndex]);

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

	const onVolumeBarChange = (value: number) => {
		setVolume(value / 100);
	}

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
				<Row className={"flex-shrink-0 flex-nowrap"}>
					<Col className={"col-11"} style={{height: "40px", marginTop: "7%"}}>
						{/* Playback progress bar */}
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
					</Col>
					<Col className={"col-1"} style={{height: "40px"}}>
						{/* Volume control */}
						<input 
							type="range" 
							className={"vertical"} 
							value={volume * 100}
							step="1"
							min="0"
							max="100"
							onChange={(e) => onVolumeBarChange(parseInt(e.target.value))}
						/>
					</Col>
				</Row>
				</div>
			<DropdownMenu fileNames={fileNames} selectFile={(fileIndex: number) => setSelectedFileIndex(fileIndex)} />
		</div>
	);
}

const hotkeyList = "1234qwerasdfyxcv5678tzuighjkbnm,90opl".split('');

type AudioTileProps = {
	fileNames: string[];
	fileIndex: number;
	tileIndex: number;
};
