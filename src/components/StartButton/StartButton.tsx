import React, { useEffect, useRef, useContext } from "react";
import { AudioContextContext } from "@components/AudioContext";
import useConstructor from "@hooks/useConstructor";
import useClassName from "@hooks/useClassName";
import { loadAudio, playAudioBuffer } from "@utils";
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

    const audioContext = useContext(AudioContextContext);
    const audioBuffer = useRef<AudioBuffer>();

    useConstructor(() => loadAudio(audioContext, buttonSound, (data: any) => {
        audioBuffer.current = data;
    }));

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
        // @@Note: This could be undefined if the audio file took
        // a long time to load.
        playAudioBuffer(audioContext, audioBuffer.current);
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
