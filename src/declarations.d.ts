declare namespace types {
    interface AnyDictionary {
        [key: string]: any
    };

    type BoolDictionary = {
        [key: string]: boolean
    };

    type Time = {
        hours: number;
        minutes: number
    };

    type ChangeTimeFunction = (time: Time) => Time;

    type ApplyChangeTimeFunction = (changeTime: ChangeTimeFunction) => void;

    type AlarmClockMode = "idle"|"armed"|"fired";
}

interface Window {
    AudioContext:       typeof AudioContext
    webkitAudioContext: typeof AudioContext // @@Note: Why do we need this?
}

declare module "*.mp3";
declare module '*.svg';
