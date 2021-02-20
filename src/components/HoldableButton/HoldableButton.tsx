import React, { memo, useEffect, useRef } from "react";
import useConstructor from "@hooks/useConstructor";
import { useClasses, serializeClasses } from "./useClasses";
import HighResolutionTimer from "@src/HighResolutionTimer";
import AudioManager, { Sound } from "@src/AudioManager";

type PropsType = React.PropsWithChildren<{
    onPress:   Function;
    onRelease: Function;
    onHold:    Function;
    disabled:  boolean;
    off:       boolean;
    sound:     string;
    className: string;
}>;

const HoldableButton = memo((props: PropsType) => {
    const [classes, setClasses] = useClasses();
    useEffect(() => setClasses({HoldableButton__off: props.off}), [props.off]);

    const spanRef   = useRef<HTMLAnchorElement>();
    const timer     = useRef<HighResolutionTimer>();
    const sound     = useRef<Sound>();
    const isPressed = useRef(false);

    useConstructor(() => {
        timer.current = new HighResolutionTimer(110, 400);

        const audioManager = AudioManager.getInstance();
        sound.current = audioManager.createSound(props.sound);
    });

    const press = (e: any) => {
        e.preventDefault();

        // @@Todo: Are we checking this correctly?
        if (e.type === "mousedown" && (("buttons" in e && e.buttons !== 1) || ("which" in e && e.which !== 1))) {
            return;
        }

        if (props.off || props.disabled) {
            return;
        }

        isPressed.current = true;
        setClasses("HoldableButton__pressed");

        props.onPress();
        sound.current.play();
        timer.current.setCallback(() => {
            props.onHold();
            sound.current.play();
        });
        timer.current.start();
    };

    const release = (e: any) => {
        e.preventDefault();

        if (!isPressed.current) {
            return;
        }

        isPressed.current = false;
        setClasses("HoldableButton__released");

        props.onRelease();
        timer.current.stop();
    };

    useEffect(() => {
        spanRef.current.addEventListener("touchstart", press, {passive: false});
        spanRef.current.addEventListener("touchend", release, {passive: false});

        return () => {
            spanRef.current.removeEventListener("touchstart", press);
            spanRef.current.removeEventListener("touchend", release);
        }
    }, [props.off, props.disabled]);

    const className = `${serializeClasses(classes)} ${props.className}`;

    return (
        <span
            ref={spanRef}
            onMouseDown={press}
            onMouseUp={release}
            onMouseLeave={release}
            className={className}
        >
            {props.children}
        </span>
    );
});

export default HoldableButton;
