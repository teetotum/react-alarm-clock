import React, { memo, useEffect, useRef } from "react";
import useConstructor from "@hooks/useConstructor";
import { useClasses, serializeClasses } from "./useClasses";
import HighResolutionTimer from "@src/HighResolutionTimer";
import AudioManager, { Sound } from "@src/AudioManager";
import ChangeTimeButtonPressSound from "@assets/audio/ChangeTimeButtonPress.mp3";
import PlusIcon from "./plus.svg";
import MinusIcon from "./minus.svg";
import "./ChangeTimeButton.scss";

export interface PropsType {
    type: types.ChangeTimeButtonType;
    className: string[];
    action: (type: types.ChangeTimeButtonType) => void;
    off: boolean;
};

interface InternalPropsType extends PropsType {
    onPress: () => void;
    onRelease: () => void;
    disabled: boolean;
};

const ChangeTimeButton = memo((props: InternalPropsType) => {
    const [classes, setClasses] = useClasses(...props.className);
    useEffect(() => setClasses({changeTimeButton__off: props.off}), [props.off]);

    const spanRef = useRef<HTMLAnchorElement>();
    const timer   = useRef<HighResolutionTimer>();
    const sound   = useRef<Sound>();
    const pressed = useRef(false);

    useConstructor(() => {
        timer.current = new HighResolutionTimer(110, 400);

        const audioManager = AudioManager.getInstance();
        sound.current = audioManager.createSound(ChangeTimeButtonPressSound);
    });

    const doAction = () => {
        props.action(props.type);
        sound.current.play()
    }

    const press = (e: any) => {
        e.preventDefault();

        // @@Todo: Are we checking this correctly?
        if (e.type === "mousedown" && (("buttons" in e && e.buttons !== 1) || ("which" in e && e.which !== 1))) {
            return;
        }

        if (props.off || props.disabled) {
            return;
        }

        pressed.current = true;
        props.onPress();

        doAction();
        timer.current.setCallback(doAction);
        timer.current.start();

        setClasses("changeTimeButton__pressed");
    };

    const release = (e: any) => {
        e.preventDefault();

        if (!pressed.current) {
            return;
        }

        pressed.current = false;
        props.onRelease();

        timer.current.stop();

        setClasses("changeTimeButton__unpressed");
    };

    useEffect(() => {
        spanRef.current.addEventListener("touchstart", press, {passive: false});
        spanRef.current.addEventListener("touchend", release, {passive: false});

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
