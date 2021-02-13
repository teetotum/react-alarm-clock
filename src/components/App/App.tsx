import React, { useState, useRef, useCallback } from "react";
import Clock from "@components/Clock";
import Controls from "@components/Controls";
import useConstructor from "@hooks/useConstructor";
import { calcTimeUntilAlert, getCurrentTime, changeTime } from "@business/time";
import { retrieveTime, storeTime } from "@business/storage";
import alarmSound from "@assets/audio/alarm.mp3";
import "./App.scss";

export default function App() {
    const [mode, setMode]  = useState<types.AlarmClockMode>("idle");
    const [time, setTime]  = useState<types.Time>();
    const timeoutId        = useRef<number>();
    const audio            = useRef<HTMLAudioElement>();

    useConstructor(() => {
        setTime(retrieveTime() || getCurrentTime());
        audio.current = new Audio(alarmSound);
        audio.current.loop = true;
    });

    const onArmButtonPress = useCallback(() => {
        if (mode === "idle") {
            setMode("armed");

            let delta = calcTimeUntilAlert(time);
            timeoutId.current = window.setTimeout(() => {
                setMode("fired");
                audio.current.play()
            }, delta);

            storeTime(time);
        } else {
            setMode("idle");

            clearTimeout(timeoutId.current);

            audio.current.pause();
            audio.current.currentTime = 0;
        }
    }, [mode, time])

    const onChangeTimeButtonPress = useCallback((type: types.ChangeTimeButtonType) => {
        const f = {
            "h+": (time: types.Time) => changeTime(time,  1,  0),
            "h-": (time: types.Time) => changeTime(time, -1,  0),
            "m+": (time: types.Time) => changeTime(time,  0,  1),
            "m-": (time: types.Time) => changeTime(time,  0, -1)
        }[type];
        setTime((time: types.Time) => f(time));
    }, [time]);

    return (
        <div className="outerContainer">
            <div className="innerContainer">
                <Clock time={time} />
                <Controls
                    mode={mode}
                    onArmButtonPress={onArmButtonPress}
                    onChangeTimeButtonPress={onChangeTimeButtonPress}
                />
            </div>
        </div>
    );
}
