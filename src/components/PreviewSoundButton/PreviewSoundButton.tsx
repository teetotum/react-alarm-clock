import React, { useEffect, useRef } from "react";
import { useConstructor, useForceUpdate, useClasses } from "@common/hooks";
import { TimeoutId } from "@common/types";
import { replace } from "@common/utils";
import SpeakerIcon from "./speaker.svg";
import alarmSound from "@assets/audio/alarm.mp3";
import "./PreviewSoundButton.scss";

export default function PreviewSoundButton() {
    let anchorRef     = useRef<HTMLAnchorElement>();
    let timeoutId     = useRef<TimeoutId>();
    let audio         = useRef<HTMLAudioElement>();
    let classes       = useClasses("button");
    const forceUpdate = useForceUpdate();

    useConstructor(() => {
        audio.current = new Audio(alarmSound);
    });

    const press = (e: any) => {
        e.preventDefault();

        classes.current = replace(classes.current, "off", "on", true);

        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => {
            classes.current = replace(classes.current, "on", "off", false);
            forceUpdate();
        }, 100);

        forceUpdate();

        audio.current.currentTime = 0;
        audio.current.play();
    };

    useEffect(() => {
        anchorRef.current.addEventListener("touchstart", press);
    }, []);

    let className = classes.current.join(" ");

    return (
        <a id="preview-sound-button" className={className} onMouseDown={press} ref={anchorRef}>
            <SpeakerIcon className="icon"/>
        </a>
    );
}
