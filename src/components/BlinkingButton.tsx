import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';
import HighResolutionTimer from '@src/HighResolutionTimer';
import AudioManager, { Sound } from '@src/AudioManager';
import "./BlinkingButton.scss";

type PropsType = React.PropsWithChildren<{
    onPress:    Function;
    blinking:   boolean;
    pressSound: string;
    blinkSound: string;
    className:  string;
}>;

export default function BlinkingButton(props: PropsType) {
    const timer      = useRef<HighResolutionTimer>();
    const pressSound = useRef<Sound>();
    const blinkSound = useRef<Sound>();
    const isLit      = useRef(false);

    useEffect(() => {
        timer.current = new HighResolutionTimer(500, 500, () => {
            isLit.current = !isLit.current;
            blinkSound.current.playIf(isLit.current);
        });

        const audioManager = AudioManager.getInstance();
        pressSound.current = audioManager.createSound(props.pressSound);
        blinkSound.current = audioManager.createSound(props.blinkSound);
    }, []);

    useEffect(() => {
        if (props.blinking) {
            timer.current.start();
        } else {
            // @@Note: Sound won't stop immediately after state change.
            timer.current.stop();
            isLit.current = false;
        }
    }, [props.blinking]);

    const callback = (e: React.MouseEvent) => {
        props.onPress();
        pressSound.current.play();
    }

    return (
        <span
            onClick={callback}
            className={classnames('button', 'BlinkingButton', props.className, {
                'BlinkingButton__blink': props.blinking,
            })}
        >
            {props.children}
        </span>
    );
}
