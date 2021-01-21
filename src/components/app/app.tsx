import React, { useState, useRef } from "react";
import Clock from "@components/clock";
import Controls, {ActionType, UnitType} from "@components/controls";
import useConstructor from "@hooks/useConstructor.tsx";
import audioSrc from "@assets/audio/alarm.mp3";
import "./app.scss";

const MILLISECONDS_IN_A_DAY = 86400000;

type TimeoutId = ReturnType<typeof setTimeout>;

export default function App() {
    let [isOn, setIsOn]       = useState<boolean>(false);
    let [hours, setHours]     = useState<number>();
    let [minutes, setMinutes] = useState<number>();
    let timeoutId             = useRef<TimeoutId>();
    let audio                 = useRef<HTMLAudioElement>();

    useConstructor(() => {
        let d = new Date();

        let localStorageHours = localStorage.getItem("hours");
        let defaultHours = localStorageHours ? parseInt(localStorageHours) : d.getHours();
        setHours(defaultHours);

        let localStorageMinutes = localStorage.getItem("minutes");
        let defaultMinutes = localStorageMinutes ? parseInt(localStorageMinutes) : d.getMinutes();
        setMinutes(defaultMinutes);

        audio.current = new Audio(audioSrc);
        audio.current.loop = true;
    });

    const handleStartButtonClick = () => {
        let newIsOn = !isOn;
        if (newIsOn) {
            let d = new Date();
            d.setHours(hours, minutes, 0, 0);

            let targetTime = d.getTime();
            let currentTime = Date.now();
            if (targetTime < currentTime) {
                targetTime += MILLISECONDS_IN_A_DAY;
            }

            let delta = targetTime - currentTime;
            timeoutId.current = setTimeout(() => {
                audio.current.play();
            }, delta);

            localStorage.setItem("hours", hours.toString());
            localStorage.setItem("minutes", minutes.toString());
        } else {
            clearTimeout(timeoutId.current);
            audio.current.pause();
            audio.current.currentTime = 0;
        }

        setIsOn(newIsOn);
    }

    const handleChangeTimeButtonClick = (action: ActionType, unit: UnitType): void => {
        const increase = (x: number, max: number) => (x < max) ? x + 1 : 0;
        const decrease = (x: number, max: number) => (x > 0)   ? x - 1 : max;
        let mod = (action === "increase") ? increase : decrease;

        if (unit === "hour") {
            setHours((x: number) => mod(x, 23));
        } else {
            setMinutes((x: number) => mod(x, 59));
        }
    }

    return (
        <div className="outer-container">
            <div className="inner-container">
                <Clock hours={hours} minutes={minutes} />
                <Controls isOn={isOn} onStartButtonClick={handleStartButtonClick}
                          onChangeTimeButtonClick={handleChangeTimeButtonClick} />
            </div>
        </div>
    );
}


const formatTime = (hours: number, minutes: number): string => {
    let hoursString = hours.toString().padStart(2, "0");
    let minutesString = minutes.toString().padStart(2, "0");

    return `${hoursString}:${minutesString}`;
}
