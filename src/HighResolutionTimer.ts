export default class HighResolutionTimer {
    callback:    (timer: HighResolutionTimer) => void;
    duration:    number;
    delay:       number;
    startTime:   number|undefined;
    currentTime: number|undefined;
    timeoutId:   number|undefined;
    totalTicks:  number = 0;
    deltaTime:   number = 0;

    constructor(callback: (timer: HighResolutionTimer) => void, duration: number, delay: number = 0) {
        this.callback = callback;
        this.duration = duration;
        this.delay = delay;
    }

    reset() {
        this.startTime = this.currentTime = this.timeoutId = undefined;
        this.totalTicks = 0;
        this.deltaTime = 0;
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
        this.reset();
        this.timeoutId = window.setTimeout(() => this.tick(), this.delay);
    }

    stop() {
        if (this.timeoutId !== undefined) {
            clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }
    }
}
