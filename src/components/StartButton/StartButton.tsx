import React, { useEffect, useRef } from "react";
import useConstructor from "@hooks/useConstructor";
import useClassName from "@hooks/useClassName";
import AudioManager from "@business/AudioManager";
import Sound from "@business/Sound";
import buttonSound from "./button.mp3";
import PlayIcon from "./play.svg";
import PauseIcon from "./pause.svg";
import "./StartButton.scss";

type PropsType = {
    running: boolean;
    toggleRunning: (e: React.MouseEvent) => void;
};

export default function StartButton(props: PropsType) {
    const {running, toggleRunning} = props;

    const sound = useRef<Sound>();

    useConstructor(() => {
        const audioContext = AudioManager.instance().context;
        sound.current = new Sound(audioContext, buttonSound);
    });

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
        sound.current.play();
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
