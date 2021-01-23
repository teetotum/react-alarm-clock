import React, { useState } from "react";
import PlayIcon from "./play.svg";
import PauseIcon from "./pause.svg";
import "./StartButton.scss";

type PropsType = {
    isOn: boolean;
    onClick: (e: React.MouseEvent) => void;
};

export default function StartButton(props: PropsType) {
    const {isOn, onClick} = props;
    const className = `button ${isOn ? "on" : "off"}`;
    const icon = (isOn) ?
        <PauseIcon className="icon" /> :
        <PlayIcon  className="icon" />

    return (
        <a id="start-button" className={className} onClick={onClick} >
            {icon}
        </a>
    );
}
