import React, { useEffect } from "react";
import { useClassName } from "@common/hooks";
import PlayIcon from "./play.svg";
import PauseIcon from "./pause.svg";
import "./StartButton.scss";

type PropsType = {
    running: boolean;
    toggleRunning: (e: React.MouseEvent) => void;
};

export default function StartButton(props: PropsType) {
    const {running, toggleRunning} = props;

    const [className, setClassName, updateClassName] = useClassName({
        startButton__pressed: false,
        startButton__unpressed: false,
        startButton: true,
        button: true
    });

    useEffect(() => {
        updateClassName({
            startButton__pressed: running,
            startButton__unpressed: !running
        });
    }, [running]);

    const icon = (running) ?
        <PauseIcon className="button_icon" /> :
        <PlayIcon  className="button_icon" />

    return (
        <a className={className} onClick={toggleRunning} >
            {icon}
        </a>
    );
}
