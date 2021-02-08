export default class Sound {
    context: any;
    buffer: AudioBuffer;
    currentSource: AudioBufferSourceNode;
    ready: boolean;

    constructor(context: any, url: string) {
        this.context = context;
        this.buffer = null;
        this.currentSource = null;
        this.ready = false;
        this._load(url);
    }

    _load(url: string) {
        const request = new XMLHttpRequest();
        request.open("GET", url);
        request.responseType = "arraybuffer";

        request.onload = () => {
            this.context.decodeAudioData(request.response, (buffer: AudioBuffer) => {
                this.buffer = buffer;
                this.ready = true;
            });
        }

        request.send();
    }

    // @@Note: On mobile, we only hear sound after user presses a button.
    play() {
        if (!this.ready) {
            return
        }

        if (this.currentSource !== null) {
            this.currentSource.stop();
        }

        this.currentSource = this.context.createBufferSource();
        this.currentSource.buffer = this.buffer;

        this.currentSource.connect(this.context.destination);
        this.currentSource.start();
    }
}
