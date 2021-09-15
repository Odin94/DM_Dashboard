import React, { useEffect, useState } from 'react';
import AudioTile from './AudioTile';

export default function AudioContainer({ fileNamesPromise }: AudioContainerProps) {
	const [ fileNames, setFilenames ] = useState([] as string[]);

	useEffect(() => {
		fileNamesPromise.then((loadedFileNames: string[]) => {
			setFilenames(loadedFileNames);
		});
	}, []);

	return (
		<div className="wrapper">
			<h1>World's Longest Rivers</h1>
			{fileNames.map(function(_fileName, index) {
				return <AudioTile key={index} fileNames={fileNames} fileIndex={index} />;
			})}
		</div>
	);
}

type AudioContainerProps = {
	fileNamesPromise: Promise<string[]>;
};
