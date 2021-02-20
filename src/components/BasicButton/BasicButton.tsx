import React, { useRef } from "react";
import useConstructor from "@hooks/useConstructor";
import AudioManager, { Sound } from "@src/AudioManager";

type PropsType = React.PropsWithChildren<{
    onPress:   Function;
    sound:     string;
    className: string;
}>;

export default function BasicButton(props: PropsType) {
    const sound = useRef<Sound>();

    useConstructor(() => {
        const audioManager = AudioManager.getInstance();
        sound.current = audioManager.createSound(props.sound);
    });

    const callback = (e: React.MouseEvent) => {
        props.onPress();
        sound.current.play();
    }

    const className = `button BasicButton ${props.className}`;

    return (
        <span
            onClick={callback}
            className={className}
        >
            {props.children}
        </span>
    );
}
