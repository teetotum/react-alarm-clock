import React, { useEffect, useRef } from "react";
import useConstructor from "@hooks/useConstructor";
import useClassName from "@hooks/useClassName";
import AudioManager from "@business/AudioManager";
import Sound from "@business/Sound";
import buttonSound from "./button.mp3";
import PlayIcon from "./play.svg";
import PauseIcon from "./pause.svg";
import "./ArmButton.scss";

type PropsType = {
    alarmClockMode: types.AlarmClockMode;
    onArmButtonPress: (e: React.MouseEvent) => void;
};

export default function ArmButton(props: PropsType) {
    const {alarmClockMode, onArmButtonPress} = props;

    const sound = useRef<Sound>();

    useConstructor(() => {
        const audioContext = AudioManager.instance().context;
        sound.current = new Sound(audioContext, buttonSound);
    });

    const [className, setClassName] = useClassName({
        armButton__alarmIsArmed: false,
        armButton__alarmIsFired: false,
        armButton: true,
        button: true
    });

    useEffect(() => {
        setClassName("update", {
            armButton__alarmIsArmed: alarmClockMode === "armed",
            armButton__alarmIsFired: alarmClockMode === "fired"
        });
    }, [alarmClockMode]);

    const callback = (e: React.MouseEvent) => {
        onArmButtonPress(e);
        sound.current.play();
    }

    const icon = (alarmClockMode === "idle") ?
        <PlayIcon  className="button_icon" /> :
        <PauseIcon className="button_icon" />;

    return (
        <span className={className} onClick={callback} >
            {icon}
        </span>
    );
}
