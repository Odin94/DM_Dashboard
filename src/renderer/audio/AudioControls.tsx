import React from 'react';

import pauseIcon from '../../../assets/icons/pause.svg';
import playIcon from '../../../assets/icons/play.svg';
import resetIcon from '../../../assets/icons/reset.svg';
import replayIcon from '../../../assets/icons/replay.svg';

export default function AudioControls({
	isPlaying,
	onPlayPauseClick,
	onResetClick,
	onReplayClick
}: AudioControlsProps) {
	return (
		<div className="audio-controls">
			<button type="button" className="reset" aria-label="Reset" onClick={onResetClick}>
				<img src={resetIcon} width={'35px'} height={'35px'} alt="" />
			</button>
			{isPlaying ? (
				<button type="button" className="pause" onClick={() => onPlayPauseClick(false)} aria-label="Pause">
					<img src={pauseIcon} width={'40px'} height={'40px'} alt="" />
				</button>
			) : (
				<button type="button" className="play" onClick={() => onPlayPauseClick(true)} aria-label="Play">
					<img src={playIcon} width={'40px'} height={'40px'} alt="" />
				</button>
			)}
			<button type="button" className="replay" aria-label="Replay" onClick={onReplayClick}>
				<img src={replayIcon} width={'35px'} height={'35px'} alt="" />
			</button>
		</div>
	);
}

type AudioControlsProps = {
	isPlaying: boolean;
	onPlayPauseClick: (isPaused: boolean) => void;
	onResetClick: () => void;
	onReplayClick: () => void;
	// onLoopToggleClick() => void;
};
