import play, { AudioPlayHandle } from 'audio-play';
import load from 'audio-loader';

export class AudioThing {
    constructor(path: string) {
        load("./audio_files/guitar.ogg")?.then((audio) => {
            play(audio as AudioBuffer, {}, () => {})
        });
    }
}