import React from "react";
import "./Clock.scss";

type PropsType = {
    hours: number;
    minutes: number;
};

export default function Clock(props: PropsType) {
    let {hours, minutes} = props;

    return (
        <div id="clock">
            <span id="clock_fg">{formatTime(hours, minutes)}</span>
            <span id="clock_bg">88:88</span>
        </div>
    );
};

const formatTime = (hours: number, minutes: number): string => {
    let hoursString = hours.toString().padStart(2, "0");
    let minutesString = minutes.toString().padStart(2, "0");
    return `${hoursString}:${minutesString}`;
}
