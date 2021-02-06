import React, { useState, useRef, useCallback } from "react";
import Clock from "@components/Clock";
import Controls from "@components/Controls";
import { AudioContextProvider } from "@components/AudioContext";
import useConstructor from "@hooks/useConstructor";
import { Time, ChangeTimeFunction } from "@common/types";
import alarmSound from "@assets/audio/alarm.mp3";
import "./App.scss";

const MILLISECONDS_IN_A_DAY = 86400000;

export default function App() {
    const [running, setRunning] = useState<boolean>(false);
    const [time, setTime]       = useState<Time>();
    const timeoutId             = useRef<number>();
    const audio                 = useRef<HTMLAudioElement>();

    useConstructor(() => {
        setTime(getDefaultTime());

        audio.current = new Audio(alarmSound);
        audio.current.loop = true;
    });

    const toggleRunning = () => {
        if (!running) {
            let delta = calcTimeUntilAlert(time);
            timeoutId.current = window.setTimeout(() => audio.current.play(), delta);

            setDefaultTime(time);
        } else {
            clearTimeout(timeoutId.current);
            audio.current.pause();
            audio.current.currentTime = 0;
        }

        setRunning(!running);
    }

    const applyChangeTime = useCallback((changeTime: ChangeTimeFunction) => {
        setTime((prevTime: Time) => changeTime(prevTime));
    }, []);

    return (
        <AudioContextProvider>
            <div className="outerContainer">
                <div className="innerContainer">
                    <Clock time={time} />
                    <Controls running={running} toggleRunning={toggleRunning}
                     applyChangeTime={applyChangeTime} />
                </div>
            </div>
        </AudioContextProvider>
    );
}

const calcTimeUntilAlert = ({hours, minutes}: Time): number => {
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

const getDefaultTime = (): Time => {
    const d = new Date();

    const localStorageHours = localStorage.getItem("hours");
    const hours = localStorageHours ? parseInt(localStorageHours) : d.getHours();

    const localStorageMinutes = localStorage.getItem("minutes");
    const minutes = localStorageMinutes ? parseInt(localStorageMinutes) : d.getMinutes();

    return {hours: hours, minutes: minutes};
}

const setDefaultTime = ({hours, minutes}: Time) => {
    localStorage.setItem("hours",   hours.toString());
    localStorage.setItem("minutes", minutes.toString());
}
