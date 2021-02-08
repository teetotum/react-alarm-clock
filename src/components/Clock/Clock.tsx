import React from "react";
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

const formatTime = ({hours, minutes}: types.Time): string => {
    let hoursString = hours.toString().padStart(2, "0");
    let minutesString = minutes.toString().padStart(2, "0");
    return `${hoursString}:${minutesString}`;
}
