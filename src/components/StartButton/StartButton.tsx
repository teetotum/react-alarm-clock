import React, { useState } from "react";
import PlayIcon from "./play.svg";
import PauseIcon from "./pause.svg";

type PropsType = {
    isOn: boolean;
    onClick: () => void;
};

export default function StartButton(props: PropsType) {
    let {isOn, onClick} = props;
    const icon = isOn ? <PauseIcon className="icon" /> : <PlayIcon className="icon" />

    return (
        <a id="start-button" className={`button ${isOn ? "on" : "off"}`} onClick={onClick} >
            {icon}
        </a>
    );
}
