declare namespace types {
    type AnyDictionary = {
        [key: string]: any
    };

    type BoolDictionary = {
        [key: string]: boolean
    };

    type Time = {
        hours: number;
        minutes: number
    };

    type ChangeTimeButtonType = "h+"|"h-"|"m+"|"m-";
}

interface Window {
    AudioContext:       typeof AudioContext
    webkitAudioContext: typeof AudioContext // @@Note: Why do we need this?
}

declare module "*.mp3";
declare module '*.svg';
