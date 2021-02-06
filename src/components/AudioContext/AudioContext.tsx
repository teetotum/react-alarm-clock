import React, { useRef, createContext, ReactNode } from "react";
import useConstructor from "@hooks/useConstructor";

export const AudioContextContext = createContext(undefined);

type PropsType = {
    children: ReactNode
};

export const AudioContextProvider = (props: PropsType) => {
    let audioContextRef = useRef<any>();

    useConstructor(() => {
        const _window = window as any;
        const AudioContextClass = _window.AudioContext || _window.webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
    });

    return (
        <AudioContextContext.Provider value={audioContextRef.current}>
            {props.children}
        </AudioContextContext.Provider>
    );
}
