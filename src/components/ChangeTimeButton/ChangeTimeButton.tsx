import React, { memo, useEffect, useRef } from "react";
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

export interface PropsType {
    type: types.ChangeTimeButtonType;
    className: string|types.BoolDictionary;
    action: (type: types.ChangeTimeButtonType) => void;
    off: boolean;
};

interface InternalPropsType extends PropsType {
    onPress: () => void;
    onRelease: () => void;
    disabled: boolean;
};

const ChangeTimeButton = memo((props: InternalPropsType) => {
    const [classes, setClasses] = useClasses({changeTimeButton: true, button: true});
    useEffect(() => setClasses("update", props.className), [props.className]);

    const spanRef    = useRef<HTMLAnchorElement>();
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

        if (props.off || props.disabled) {
            return;
        }

        // @@Todo: Are we checking this correctly?
        if (e.type === "mousedown" && (("buttons" in e && e.buttons !== 1) || ("which" in e && e.which !== 1))) {
            return;
        }

        setClasses("update", {
            changeTimeButton__pressed: true,
            changeTimeButton__unpressed: false,
            changeTimeButton__disabled: false
        });

        pressed.current = true;
        props.onPress();

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

        setClasses("update", (classes: types.BoolDictionary) => {
            return {
                changeTimeButton__unpressed: classes.changeTimeButton__pressed,
                changeTimeButton__pressed: false,
                changeTimeButton__disabled: false
            };
        });

        pressed.current = false;
        props.onRelease();

        clearTimeout(timeoutId.current);
        clearInterval(intervalId.current);
    }

    useEffect(() => setClasses("update", {
        changeTimeButton__off: props.off,
        changeTimeButton__pressed: false,
        changeTimeButton__unpressed: false
    }), [props.off]);

    useEffect(() => {
        spanRef.current.addEventListener("touchstart", press);
        spanRef.current.addEventListener("touchend", release);

        return () => {
            spanRef.current.removeEventListener("touchstart", press);
            spanRef.current.removeEventListener("touchend", release);
        }
    }, [props.off, props.disabled]);

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
            ref={spanRef}
            className={serializeClasses(classes)}
        >
            {icon}
        </span>
    );
});

export default ChangeTimeButton;
