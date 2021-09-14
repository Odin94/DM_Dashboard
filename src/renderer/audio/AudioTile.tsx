import React from 'react';

export default function AudioTile({ fileNames, fileIndex }: AudioTileProps) {
    return(
        <div>{ fileNames[fileIndex] }</div>
    )
}

type AudioTileProps = {
    fileNames: string[],
    fileIndex: number
}