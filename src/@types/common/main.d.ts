declare namespace types {
    type BoolMap = {
        [key: string]: boolean
    };

    type Time = {
        hours: number;
        minutes: number
    };

    type ChangeTimeFunction = (time: Time) => Time;

    type ApplyChangeTimeFunction = (changeTime: ChangeTimeFunction) => void;
}

interface Window {
    AudioContext:       typeof AudioContext
    webkitAudioContext: typeof AudioContext // @@Note: Why do we need this?
}

declare module "*.mp3";
declare module '*.svg';
