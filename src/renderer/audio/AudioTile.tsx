import React, { useEffect, useState } from 'react';

export default function AudioTile({ fileNames, fileIndex }: AudioTileProps) {
    const [audio, setAudio] = useState({} as HTMLAudioElement);

    useEffect(() => {
        const loadedAudio = new Audio(fileNames[fileIndex]);
        setAudio(loadedAudio);
    }, [])

    // TODO: Test & add playback-status (playing/paused)
    return(
        <div>
            <button onClick={() => {audio.play(); console.log("playing " + audio)}}>{ fileNames[fileIndex] }</button>
        </div>
    )
}

type AudioTileProps = {
    fileNames: string[],
    fileIndex: number
}