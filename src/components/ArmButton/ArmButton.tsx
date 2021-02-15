import React, { useEffect, useRef } from "react";
import useConstructor from "@hooks/useConstructor";
import useClasses, { serializeClasses } from "@hooks/useClasses";
import AudioManager from "@src/AudioManager";
import Sound from "@src/Sound";
import buttonSound from "./button.mp3";
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
        const audioContext = AudioManager.instance().context;
        sound.current = new Sound(audioContext, buttonSound);
    });

    const [classes, setClasses] = useClasses({
        armButton__isArmed: false,
        armButton__IsFired: false,
        armButton: true,
        button: true
    });

    useEffect(() => {
        setClasses("update", {
            armButton__IsArmed: props.mode === "armed",
            armButton__IsFired: props.mode === "fired"
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
