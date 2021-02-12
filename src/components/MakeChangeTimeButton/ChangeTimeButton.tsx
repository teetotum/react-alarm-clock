import React, { memo, useEffect, useRef, ReactNode } from "react";
import useConstructor from "@hooks/useConstructor";
import useClasses, { serializeClasses } from "@hooks/useClasses";
import AudioManager from "@business/AudioManager";
import Sound from "@business/Sound";
import buttonSound from "./button.mp3";
import "./ChangeTimeButton.scss";

const CHANGE_TIME_REPEAT_PERIOD = 100;
const CHANGE_TIME_INITIAL_DELAY = 400;

type PropsType = {
    children: ReactNode;
    callback: Function;
    alarmClockMode: types.AlarmClockMode;
    className: string|types.BoolMap;
};

const ChangeTimeButton = memo((props: PropsType) => {
    const anchorRef  = useRef<HTMLAnchorElement>();
    const timeoutId  = useRef<number>();
    const intervalId = useRef<number>();
    const sound      = useRef<Sound>();

    useConstructor(() => {
        const audioContext = AudioManager.instance().context
        sound.current = new Sound(audioContext, buttonSound);
    });

    const [classes, setClasses] = useClasses({
        changeTimeButton: true,
        button: true,
    }, props.className);

    const press = (e: any) => {
        e.preventDefault();

        if (props.alarmClockMode !== "idle") {
            return;
        }

        // @@Todo: Are we checking this correctly?
        if (e.type === "mousedown" && (("buttons" in e && e.buttons !== 1) || ("which" in e && e.which !== 1))) {
            return;
        }

        setClasses("update", {
            changeTimeButton__pressed: true,
            changeTimeButton__unpressed: false,
            changeTimeButton__alarmIsNotIdle: false
        });

        props.callback();
        sound.current.play()

        timeoutId.current = window.setTimeout(() => {
            intervalId.current = window.setInterval(() => {
                props.callback();
                sound.current.play()
            }, CHANGE_TIME_REPEAT_PERIOD);
        }, CHANGE_TIME_INITIAL_DELAY);
    };

    const release = (e: any) => {
        e.preventDefault();

        if (props.alarmClockMode !== "idle") {
            return;
        }

        setClasses("update", (classes: types.BoolMap) => {
            return {
                changeTimeButton__unpressed: classes.changeTimeButton__pressed,
                changeTimeButton__pressed: false,
                changeTimeButton__alarmIsNotIdle: false
            };
        });

        clearTimeout(timeoutId.current);
        clearInterval(intervalId.current);
    };

    useEffect(() => {
        setClasses("update", {
            changeTimeButton__alarmIsNotIdle: props.alarmClockMode !== "idle",
            changeTimeButton__pressed: false,
            changeTimeButton__unpressed: false
        });

        anchorRef.current.addEventListener("touchstart", press);
        anchorRef.current.addEventListener("touchend", release);

        return () => {
            anchorRef.current.removeEventListener("touchstart", press);
            anchorRef.current.removeEventListener("touchend", release);
        }
    }, [props.alarmClockMode]);

    return (
        <span
            className={serializeClasses(classes)}
            onMouseDown={press}
            onMouseUp={release}
            onMouseLeave={release}
            ref={anchorRef}>
            {props.children}
        </span>
    );
});

export default ChangeTimeButton;
