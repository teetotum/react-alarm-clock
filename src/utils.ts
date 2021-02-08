export function isFunction(obj: any) {
    return obj && Object.prototype.toString.call(obj) === '[object Function]';
}

export function isString(obj: any) {
    return Object.prototype.toString.call(obj) === "[object String]";
}

// @@Todo: Figure out the type for audioContext.
export function loadAudio(audioContext: any, url: string, onload: Function) {
    const request = new XMLHttpRequest();
    request.open("GET", url);
    request.responseType = "arraybuffer";

    request.onload = () => {
        const undecodedAudio = request.response;
        audioContext.decodeAudioData(undecodedAudio, (data: AudioBuffer) => onload(data));
    }

    request.send();
}

// @@Todo: Figure out the type for audioContext.
export function playAudioBuffer(audioContext: any, audioBuffer: AudioBuffer) {
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
}
