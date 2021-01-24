import React from "react";
import PlayIcon from "./play.svg";
import PauseIcon from "./pause.svg";
import "./StartButton.scss";

type PropsType = {
    running: boolean;
    toggleRunning: (e: React.MouseEvent) => void;
};

export default function StartButton(props: PropsType) {
    const {running, toggleRunning} = props;
    const className = `button ${running ? "on" : "off"}`;
    const icon = (running) ?
        <PauseIcon className="icon" /> :
        <PlayIcon  className="icon" />

    return (
        <a id="start-button" className={className} onClick={toggleRunning} >
            {icon}
        </a>
    );
}
