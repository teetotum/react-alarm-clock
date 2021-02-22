import React, { useRef, useEffect } from "react";
import HighResolutionTimer from "@src/HighResolutionTimer";
import AudioManager, { Sound } from "@src/AudioManager";
import useConstructor from "@hooks/useConstructor";
import { useClasses, serializeClasses } from "./useClasses";

type PropsType = React.PropsWithChildren<{
    onPress:    Function;
    blinking:   boolean;
    pressSound: string;
    blinkSound: string;
    className:  string;
}>;

export default function BlinkingButton(props: PropsType) {
    const [classes, setClasses] = useClasses();

    const timer      = useRef<HighResolutionTimer>();
    const pressSound = useRef<Sound>();
    const blinkSound = useRef<Sound>();
    const isLit      = useRef(false);

    const blink = (lit: boolean) => {
        isLit.current = lit;
        setClasses({BlinkingButton__isLit: lit});
    }

    useConstructor(() => {
        timer.current = new HighResolutionTimer(500, 500, () => {
            blink(!isLit.current);
            blinkSound.current.playIf(isLit.current);
        });

        const audioManager = AudioManager.getInstance();
        pressSound.current = audioManager.createSound(props.pressSound);
        blinkSound.current = audioManager.createSound(props.blinkSound);
    });

    useEffect(() => {
        if (props.blinking) {
            timer.current.start();
        } else {
            // @@Note: Sound won't stop immediately after state change.
            timer.current.stop();
            blink(false);
        }
    }, [props.blinking]);

    const callback = (e: React.MouseEvent) => {
        props.onPress();
        pressSound.current.play();
    }

    const className = `${serializeClasses(classes)} ${props.className}`;

    return (
        <span
            onClick={callback}
            className={className}
        >
            {props.children}
        </span>
    );
}
