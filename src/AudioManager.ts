type BufferInfo = {
    buffer: AudioBuffer|null,
    path: string;
    ready: boolean;
};

export default class AudioManager {
    static _instance: AudioManager = null;
    context: AudioContext;
    buffers: {[path: string]: BufferInfo} = {};

    constructor() {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.buffers = {};
    }

    static instance() {
        if (AudioManager._instance === null) {
            AudioManager._instance = new AudioManager();
        }

        return AudioManager._instance;
    }

    load(url: string) {
        if (url in this.buffers) {
            return new Sound(this.context, this.buffers[url]);
        }

        const bufferInfo: BufferInfo = {buffer: null, path: url, ready: false};
        this.buffers[url] = bufferInfo;

        const request = new XMLHttpRequest();
        request.open("GET", url);
        request.responseType = "arraybuffer";
        request.onload = () => {
            this.context.decodeAudioData(request.response, (buffer: AudioBuffer) => {
                bufferInfo.buffer = buffer;
                bufferInfo.ready = true;
            });
        }
        request.send();

        return new Sound(this.context, bufferInfo);
    }
}

export class Sound {
    context: any;
    bufferInfo: BufferInfo;
    currentSource: AudioBufferSourceNode;

    constructor(context: any, bufferInfo: BufferInfo) {
        this.context = context;
        this.bufferInfo = bufferInfo;
        this.currentSource = null;
    }

    // @@Note: On mobile, we only hear sound after user presses a button.
    play() {
        if (!this.bufferInfo.ready) {
            return
        }

        if (this.currentSource !== null) {
            this.currentSource.stop();
        }

        this.currentSource = this.context.createBufferSource();
        this.currentSource.buffer = this.bufferInfo.buffer;

        this.currentSource.connect(this.context.destination);
        this.currentSource.start();
    }
}
