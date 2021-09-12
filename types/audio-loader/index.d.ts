import ts, { Path } from 'typescript';
import { URL } from 'url';

/**
 * Loads a sound effect or music from a path, url or array buffer with encoded data, or an array/map of sources.
 * @param source the object to be loaded: can be an URL string, ArrayBuffer with encoded data or an array/map of sources
 * @param options (Optional) the load options for that source
 * @param cb A callback that is executed when the source is loaded
 */
declare function audioLoad(
    source: audioLoad.Source | Array<audioLoad.Source> | Object, 
    options?: audioLoad.Options, cb?: (err: Error | null, data: AudioBuffer | Array<AudioBuffer> | Record<string, AudioBuffer>) => void
): void;

declare namespace audioLoad {
    type Source = URL | Path | ArrayBuffer | Buffer | Promise<Source>

    /**
     * Various options for audio playback
     * @param from a function or string to convert from file names to urls. If is a string it will be prefixed to the name: load('snare.mp3', { from: 'http://audio.net/samples/' }) If it's a function it receives the file name and should return the url as string.
     * @param only when loading objects, if provided, only the given keys will be included in the decoded object: load('piano.json', { only: ['C2', 'D2'] })
     * @param context (browser only) The audio context to use. By default uses audio-context
     * @param decode a function to decode audio. It receives a buffer and must return a promise to an audio buffer.
     * @param fetch a function to fetch files. It receives an url and a response type (one of 'arraybuffer' or 'text') and must return a promise to the contents
     */
    interface Options {
        from?: (fileName: string) => URL | string | undefined;
        only?: Array<string> | undefined;
        context?: AudioContext | undefined;
        decode?: (data: Buffer) => Promise<AudioBuffer> | undefined;
        fetch?: (url: URL, responseType: string) => Promise<ArrayBuffer | string>| undefined;
    }
}

export = audioLoad;