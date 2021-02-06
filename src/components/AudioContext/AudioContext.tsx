import React, { createContext, ReactNode } from "react";

(window as any).AudioContext = (window as any).AudioContext || (window as any).webkitAudioContext;
let audioContext = new AudioContext();

// @nocommit: Why do we need to pass a default value here?
export const AudioContextContext = createContext(undefined);

type PropsType = {
    children: ReactNode
};

export const AudioContextProvider = (props: PropsType) => {
    return (
        <AudioContextContext.Provider value={audioContext}>
            {props.children}
        </AudioContextContext.Provider>
    );
}
