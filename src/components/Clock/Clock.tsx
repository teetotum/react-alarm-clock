import React from "react";
import { formatTime } from "@src/time";
import "./Clock.scss";

type PropsType = { time: types.Time };

export default function Clock(props: PropsType) {
    return (
        <div className="Clock">
            <span className="Clock_fg">{formatTime(props.time)}</span>
            <span className="Clock_bg">88:88</span>
        </div>
    );
};
