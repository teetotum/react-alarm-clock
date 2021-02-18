type Callback = (timer: HighResolutionTimer) => void;

export default class HighResolutionTimer {
    callback:    Callback;
    duration:    number;
    delay:       number;
    startTime:   number|undefined;
    currentTime: number|undefined;
    timeoutId:   number|undefined;
    totalTicks:  number = 0;
    deltaTime:   number = 0;

    constructor(duration: number, delay: number = 0, callback: Callback = null) {
        this.duration = duration;
        this.delay = delay;
        this.callback = callback;
    }

    reset() {
        this.startTime = this.currentTime = this.timeoutId = undefined;
        this.totalTicks = this.deltaTime = 0;
    }

    tick() {
        const lastTime = this.currentTime;
        this.currentTime = Date.now();

        if (this.startTime === undefined) {
            this.startTime = this.currentTime;
        }

        if (lastTime !== undefined) {
            this.deltaTime = this.currentTime - lastTime;
        }

        this.callback(this);

        const nextTick = this.duration - (this.currentTime - (this.startTime + (this.totalTicks * this.duration)));
        this.totalTicks++;

        this.timeoutId = window.setTimeout(() => this.tick(), nextTick);
    }

    start() {
        console.assert(this.callback !== null, "Timer callback was not set.");

        this.reset();
        this.timeoutId = window.setTimeout(() => this.tick(), this.delay);
    }

    stop() {
        if (this.timeoutId !== undefined) {
            clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }
    }

    setCallback(callback: Callback) {
        this.callback = callback;
    }
}
