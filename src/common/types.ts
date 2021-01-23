export type TimeoutId  = ReturnType<typeof setTimeout>;
export type IntervalId = ReturnType<typeof setInterval>;

export type Action = "increase"|"decrease";
export type Unit   = "hour"|"minute";
