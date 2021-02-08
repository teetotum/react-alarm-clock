import React, { useState, useRef, useCallback } from "react";
import Clock from "@components/Clock";
import Controls from "@components/Controls";
import useConstructor from "@hooks/useConstructor";
import { calcTimeUntilAlert, getCurrentTime } from "@business/time";
import { retrieveTime, storeTime } from "@business/storage";
import alarmSound from "@assets/audio/alarm.mp3";
import "./App.scss";

export default function App() {
    const [running, setRunning] = useState<boolean>(false);
    const [time, setTime]       = useState<types.Time>();
    const timeoutId             = useRef<number>();
    const audio                 = useRef<HTMLAudioElement>();

    useConstructor(() => {
        setTime(retrieveTime() || getCurrentTime());
        audio.current = new Audio(alarmSound);
        audio.current.loop = true;
    });

    const toggleRunning = () => {
        if (!running) {
            storeTime(time);
            let delta = calcTimeUntilAlert(time);
            timeoutId.current = window.setTimeout(() => audio.current.play(), delta);
        } else {
            clearTimeout(timeoutId.current);
            audio.current.pause();
            audio.current.currentTime = 0;
        }

        setRunning(!running);
    }

    const applyChangeTime = useCallback((changeTime: types.ChangeTimeFunction) => {
        setTime((prevTime: types.Time) => changeTime(prevTime));
    }, []);

    return (
        <div className="outerContainer">
            <div className="innerContainer">
                <Clock time={time} />
                <Controls running={running} toggleRunning={toggleRunning}
                 applyChangeTime={applyChangeTime} />
            </div>
        </div>
    );
}
