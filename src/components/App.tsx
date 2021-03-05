import React, { useState, useRef, useCallback } from "react";
import type { HTMLAttributesFunctionComponent } from '@types';
import { Clock } from "@components/Clock";
import { Controls } from "@components/Controls";
import { AlarmClockMode } from '@types';
import HighResolutionTimer from "@src/HighResolutionTimer";
import { calcTimeUntilAlert, changeTime, getCurrentTime } from "@src/time";
import "./App.scss";

const initTime = () => {
    const json = localStorage.getItem("time");
    let time;
    if (json === null) {
        time = getCurrentTime();
    } else {
        time = JSON.parse(json);
    }
    return time;
};

export const App: HTMLAttributesFunctionComponent = () => {
    const [mode, setMode] = useState<AlarmClockMode>(AlarmClockMode.IDLE);
    const [time, setTime] = useState<types.Time>(initTime);
    const timeoutId = useRef<number>();

    const armButtonCallback = useCallback(() => {
        if (mode === AlarmClockMode.IDLE) {
            setMode(AlarmClockMode.ARMED);

            let delta = calcTimeUntilAlert(time);
            timeoutId.current = window.setTimeout(() => {
                setMode(AlarmClockMode.FIRED);
            }, delta);

            localStorage.setItem("time", JSON.stringify(time));
        } else {
            setMode(AlarmClockMode.IDLE);
            clearTimeout(timeoutId.current);
        }
    }, [mode, time])

    const changeTimeButtonCallback = useCallback((type: types.ChangeTimeButtonType) => {
        const f = {
            "h+": (time: types.Time) => changeTime(time,  1,  0),
            "h-": (time: types.Time) => changeTime(time, -1,  0),
            "m+": (time: types.Time) => changeTime(time,  0,  1),
            "m-": (time: types.Time) => changeTime(time,  0, -1)
        }[type];
        setTime(time => f(time));
    }, []);

    return (
        <div className="outerContainer">
            <div className="innerContainer">
                <Clock time={time} />
                <Controls
                    mode={mode}
                    armButtonCallback={armButtonCallback}
                    changeTimeButtonCallback={changeTimeButtonCallback}
                />
            </div>
        </div>
    );
};
