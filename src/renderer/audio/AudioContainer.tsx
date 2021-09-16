import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import AudioTile from './AudioTile';

export default function AudioContainer({ fileNamesPromise }: AudioContainerProps) {
	const [ fileNames, setFilenames ] = useState([] as string[]);

	useEffect(() => {
		fileNamesPromise.then((loadedFileNames: string[]) => {
			setFilenames(loadedFileNames);
		});
	}, []);

	const rows: any[] = [];
	fileNames.forEach((_fileName: string, fileIndex: number) => {
		if (fileIndex % 3 == 0) {
			rows.push([]);
		}

		const rowIndex = Math.floor(fileIndex / 3);
		rows[rowIndex].push(
			<Col key={fileIndex + 100 * rowIndex} style={{ margin: '15px' }}>
				<AudioTile key={fileIndex + 100 * rowIndex} fileNames={fileNames} fileIndex={fileIndex} />
			</Col>
		);
	});

	return (
		<div className="wrapper">
			<Container>
				{rows.map((row: any[], index: number) => {
					return <Row key={index}>{row}</Row>;
				})}
			</Container>
		</div>
	);
}

type AudioContainerProps = {
	fileNamesPromise: Promise<string[]>;
};
