export type TimeoutId  = ReturnType<typeof setTimeout>;
export type IntervalId = ReturnType<typeof setInterval>;

export type ButtonAction = "increase"|"decrease";
export type TimeUnit = "hour"|"minute";

export type ChangeTimeFunction = (action: ButtonAction, unit: TimeUnit) => void;
