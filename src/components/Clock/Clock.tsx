import React from "react";
import { formatTime } from "@src/time";
import "./Clock.scss";

type PropsType = { time: types.Time };

export default function Clock(props: PropsType) {
    return (
        <div className="clock">
            <span className="clock_fg">{formatTime(props.time)}</span>
            <span className="clock_bg">88:88</span>
        </div>
    );
};
