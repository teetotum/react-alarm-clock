import React, { useState, useRef } from "react";
import Clock from "@components/Clock";
import Controls from "@components/Controls";
import { TimeoutId, ButtonAction, TimeUnit } from "@common/types";
import { useConstructor } from "@common/hooks";
import audioSrc from "@assets/audio/alarm.mp3";
import "./App.scss";

const MILLISECONDS_IN_A_DAY = 86400000;
const MAX_HOUR   = 23;
const MAX_MINUTE = 59;

export default function App() {
    let [running, setRunning] = useState<boolean>(false);
    let [hours, setHours]     = useState<number>();
    let [minutes, setMinutes] = useState<number>();
    let timeoutId             = useRef<TimeoutId>();
    let audio                 = useRef<HTMLAudioElement>();

    useConstructor(() => {
        let [defaultHours, defaultMinutes] = getDefaultTime();
        setHours(defaultHours);
        setMinutes(defaultMinutes);

        audio.current = new Audio(audioSrc);
        audio.current.loop = true;
    });

    const toggleRunning = () => {
        if (!running) {
            let delta = calcTimeUntilAlert(hours, minutes);
            timeoutId.current = setTimeout(() => audio.current.play(), delta);

            setDefaultTime(hours, minutes);
        } else {
            clearTimeout(timeoutId.current);
            audio.current.pause();
            audio.current.currentTime = 0;
        }

        setRunning(!running);
    }

    const changeTime = (action: ButtonAction, unit: TimeUnit): void => {
        const increase = (x: number, max: number) => (x < max) ? x + 1 : 0;
        const decrease = (x: number, max: number) => (x > 0)   ? x - 1 : max;
        let mod = (action === "increase") ? increase : decrease;

        if (unit === "hour") {
            setHours((x: number) => mod(x, MAX_HOUR));
        } else {
            setMinutes((x: number) => mod(x, MAX_MINUTE));
        }
    }

    return (
        <div className="outer-container">
            <div className="inner-container">
                <Clock hours={hours} minutes={minutes} />
                <Controls running={running} toggleRunning={toggleRunning}
                    changeTime={changeTime} />
            </div>
        </div>
    );
}

const calcTimeUntilAlert = (hours: number, minutes: number) => {
    let d = new Date();
    d.setHours(hours, minutes, 0, 0);

    let targetTime = d.getTime();
    let currentTime = Date.now();
    if (targetTime < currentTime) {
        targetTime += MILLISECONDS_IN_A_DAY;
    }

    let result = targetTime - currentTime;
    return result;
}

const getDefaultTime = () => {
    let d = new Date();

    let localStorageHours = localStorage.getItem("hours");
    let hours = localStorageHours ? parseInt(localStorageHours) : d.getHours();

    let localStorageMinutes = localStorage.getItem("minutes");
    let minutes = localStorageMinutes ? parseInt(localStorageMinutes) : d.getMinutes();

    return [hours, minutes];
}

const setDefaultTime = (hours: number, minutes: number) => {
    localStorage.setItem("hours",   hours.toString());
    localStorage.setItem("minutes", minutes.toString());
}

const formatTime = (hours: number, minutes: number): string => {
    let hoursString = hours.toString().padStart(2, "0");
    let minutesString = minutes.toString().padStart(2, "0");

    return `${hoursString}:${minutesString}`;
}
