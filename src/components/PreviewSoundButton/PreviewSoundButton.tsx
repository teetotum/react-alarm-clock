import React, { useEffect, useRef } from "react";
import { useConstructor } from "@common/hooks";
import SpeakerIcon from "./speaker.svg";
import alarmSound from "@assets/audio/alarm.mp3";

export default function PreviewSoundButton() {
    let anchorRef = useRef<HTMLAnchorElement>();
    let audio     = useRef<HTMLAudioElement>();

    useConstructor(() => {
        audio.current = new Audio(alarmSound);
    });

    const press = (e: any) => {
        e.preventDefault();

        audio.current.currentTime = 0;
        audio.current.play();
    };

    useEffect(() => {
        anchorRef.current.addEventListener("touchstart", press);
    }, []);

    return (
        <a className="button" onMouseDown={press} ref={anchorRef}>
            <SpeakerIcon className="icon"/>
        </a>
    );
}
