import React, { useEffect } from "react";
import useClassName from "@hooks/useClassName";
import PlayIcon from "./play.svg";
import PauseIcon from "./pause.svg";
import "./StartButton.scss";

type PropsType = {
    running: boolean;
    toggleRunning: (e: React.MouseEvent) => void;
};

export default function StartButton(props: PropsType) {
    const {running, toggleRunning} = props;

    const [className, setClassName] = useClassName({
        startButton__alarmIsSet: false,
        startButton: true,
        button: true
    });

    useEffect(() => {
        setClassName("update", {
            startButton__alarmIsSet: running
        });
    }, [running]);

    const callback = (e: React.MouseEvent) => {
        toggleRunning(e);
    }

    const icon = (running) ?
        <PauseIcon className="button_icon" /> :
        <PlayIcon  className="button_icon" />

    return (
        <span className={className} onClick={callback} >
            {icon}
        </span>
    );
}
