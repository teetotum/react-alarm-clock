export type TimeoutId  = ReturnType<typeof setTimeout>;
export type IntervalId = ReturnType<typeof setInterval>;

export type BoolMap = {[key: string]: boolean};

export type Time = {hours: number; minutes: number};
export type ChangeTimeFunction = (time: Time) => Time;
export type ApplyChangeTimeFunction = (changeTime: ChangeTimeFunction) => void;
