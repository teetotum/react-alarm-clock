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

declare module "*.mp3";
declare module '*.svg';
