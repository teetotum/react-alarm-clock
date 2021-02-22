import React, { useState, useRef, useCallback } from "react";
import Clock from "@components/Clock";
import Controls from "@components/Controls";
import useConstructor from "@hooks/useConstructor";
import HighResolutionTimer from "@src/HighResolutionTimer";
import AudioManager, { Sound } from "@src/AudioManager";
import { calcTimeUntilAlert, getCurrentTime, changeTime } from "@src/time";
import { retrieveTime, storeTime } from "@src/storage";
import AlarmSound from "@assets/audio/Alarm.mp3";
import "./App.scss";

export default function App() {
    const [mode, setMode] = useState<types.AlarmClockMode>("idle");
    const [time, setTime] = useState<types.Time>();

    const [armButtonIsLit, setArmButtonIsLit] = useState(false);

    const timer     = useRef<HighResolutionTimer>();
    const sound     = useRef<Sound>();
    const timeoutId = useRef<number>();

    useConstructor(() => {
        setTime(retrieveTime() || getCurrentTime());

        timer.current = new HighResolutionTimer(500, 500, () => {
            setArmButtonIsLit(isLit => {
                if (!isLit) {
                    sound.current.play();
                }
                return !isLit;
            });
        });

        const audioManager = AudioManager.getInstance();
        sound.current = audioManager.createSound(AlarmSound);
    });

    const armButtonCallback = useCallback(() => {
        if (mode === "idle") {
            setMode("armed");

            let delta = calcTimeUntilAlert(time);
            timeoutId.current = window.setTimeout(() => {
                setMode("fired");

                setArmButtonIsLit(true);
                sound.current.play();

                timer.current.start();
            }, delta);

            storeTime(time);
        } else {
            setMode("idle");

            setArmButtonIsLit(false);

            timer.current.stop();
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
                    armButtonIsLit={armButtonIsLit}
                    changeTimeButtonCallback={changeTimeButtonCallback}
                />
            </div>
        </div>
    );
}
