import React, { memo, useState, useEffect, useRef } from "react";
import useConstructor from "@hooks/useConstructor";
import useClasses, { serializeClasses } from "@hooks/useClasses";
import AudioManager from "@src/AudioManager";
import Sound from "@src/Sound";
import buttonSound from "./button.mp3";
import PlusIcon from "./plus.svg";
import MinusIcon from "./minus.svg";
import "./ChangeTimeButton.scss";

const CHANGE_TIME_REPEAT_PERIOD = 100;
const CHANGE_TIME_INITIAL_DELAY = 400;

type PropsType = {
    type: types.ChangeTimeButtonType;
    className: string|types.BoolDictionary;
    action: (type: types.ChangeTimeButtonType) => void;
    off: boolean;
};

const ChangeTimeButton = memo((props: PropsType) => {
    const [classes, setClasses] = useClasses({changeTimeButton: true, button: true});
    useEffect(() => setClasses("update", props.className), [props.className]);

    const anchorRef  = useRef<HTMLAnchorElement>();
    const timeoutId  = useRef<number>();
    const intervalId = useRef<number>();
    const sound      = useRef<Sound>();
    const pressed    = useRef(false);

    useConstructor(() => {
        const audioContext = AudioManager.instance().context
        sound.current = new Sound(audioContext, buttonSound);
    });

    const action = (type: types.ChangeTimeButtonType) => {
        props.action(type);
        sound.current.play()
    }

    const press = (e: any) => {
        e.preventDefault();

        if (props.off) {
            return;
        }

        // @@Todo: Are we checking this correctly?
        if (e.type === "mousedown" && (("buttons" in e && e.buttons !== 1) || ("which" in e && e.which !== 1))) {
            return;
        }

        pressed.current = true;

        setClasses("update", {
            changeTimeButton__pressed: true,
            changeTimeButton__unpressed: false,
            changeTimeButton__disabled: false
        });

        action(props.type);

        timeoutId.current = window.setTimeout(() => {
            intervalId.current = window.setInterval(() => {
                action(props.type);
            }, CHANGE_TIME_REPEAT_PERIOD);
        }, CHANGE_TIME_INITIAL_DELAY);
    };

    const release = (e: any) => {
        e.preventDefault();

        if (!pressed.current) {
            return;
        }

        pressed.current = false;

        setClasses("update", (classes: types.BoolDictionary) => {
            return {
                changeTimeButton__unpressed: classes.changeTimeButton__pressed,
                changeTimeButton__pressed: false,
                changeTimeButton__disabled: false
            };
        });

        clearTimeout(timeoutId.current);
        clearInterval(intervalId.current);
    }

    useEffect(() => {
        setClasses("update", {
            changeTimeButton__disabled: props.off,
            changeTimeButton__pressed: false,
            changeTimeButton__unpressed: false
        });

        anchorRef.current.addEventListener("touchstart", press);
        anchorRef.current.addEventListener("touchend", release);

        return () => {
            anchorRef.current.removeEventListener("touchstart", press);
            anchorRef.current.removeEventListener("touchend", release);
        }
    }, [props.off]);

    // @@Note: Maybe it's silly to memoize this, since we probably
    // won't change the type once it is first set.
    let icon;
    if (props.type === "h+" || props.type === "m+") {
        icon = <PlusIcon className="button_icon"/>;
    } else {
        icon = <MinusIcon className="button_icon"/>;
    }

    return (
        <span
            onMouseDown={press}
            onMouseUp={release}
            onMouseLeave={release}
            ref={anchorRef}
            className={serializeClasses(classes)}
        >
            {icon}
        </span>
    );
});

export default ChangeTimeButton;
