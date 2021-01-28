export type BoolMap = {[key: string]: boolean};

export type Time = {hours: number; minutes: number};
export type ChangeTimeFunction = (time: Time) => Time;
export type ApplyChangeTimeFunction = (changeTime: ChangeTimeFunction) => void;
