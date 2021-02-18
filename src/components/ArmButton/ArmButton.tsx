import React, { useEffect, useRef } from "react";
import useConstructor from "@hooks/useConstructor";
import { useClasses, serializeClasses } from "./useClasses";
import AudioManager, { Sound } from "@src/AudioManager";
import ArmButtonPressSound from "@assets/audio/ArmButtonPress.mp3";
import PlayIcon from "./play.svg";
import PauseIcon from "./pause.svg";
import "./ArmButton.scss";

type PropsType = {
    mode: types.AlarmClockMode;
    onPress: () => void;
};

export default function ArmButton(props: PropsType) {
    const sound = useRef<Sound>();

    useConstructor(() => {
        const audioManager = AudioManager.getInstance();
        sound.current = audioManager.createSound(ArmButtonPressSound);
    });

    const [classes, setClasses] = useClasses();

    useEffect(() => {
        setClasses({
            armButton__isArmed: props.mode === "armed",
            armButton__isFired: props.mode === "fired"
        });
    }, [props.mode]);

    const callback = (e: React.MouseEvent) => {
        props.onPress();
        sound.current.play();
    }

    const icon = (props.mode === "idle") ?
        <PlayIcon  className="button_icon" /> :
        <PauseIcon className="button_icon" />;

    return (
        <span className={serializeClasses(classes)} onClick={callback} >
            {icon}
        </span>
    );
}
