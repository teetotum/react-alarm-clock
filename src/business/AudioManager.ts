export default class AudioManager {
    static _instance: AudioManager = null;
    context: AudioContext;

    constructor() {
        this.context = new (window.AudioContext || window.webkitAudioContext)();
    }

    static instance() {
        if (AudioManager._instance === null) {
            AudioManager._instance = new AudioManager();
        }

        return AudioManager._instance;
    }
}
