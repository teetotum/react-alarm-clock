import React, { useEffect, useMemo } from "react";
import BlinkingButton from "@components/BlinkingButton";
import { PlayIcon, PauseIcon } from "./icons";
import { useClasses, serializeClasses } from "./useClasses";
import ArmButtonPressSoundPath from "./ArmButtonPress.mp3";
import ArmButtonBlinkSoundPath from "./ArmButtonBlink.mp3";
import "./ArmButton.scss";

type PropsType = {
    callback: () => void;
    mode: types.AlarmClockMode;
};

// @@Note: Right now, whenever the time changes, onPress() gets
// re-evaluated in <App> and, as a consequence, ArmButton re-renders.
// Maybe there's a way to avoid this kind of thing?
export default function ArmButton(props: PropsType) {
    const [classes, setClasses] = useClasses();

    useEffect(() => setClasses({
        ArmButton__isArmed: props.mode !== "idle"
    }), [props.mode]);

    const icon = useMemo(() => {
        return (props.mode === "idle") ? <PlayIcon/> : <PauseIcon/>;
    }, [props.mode]);

    return (
        <BlinkingButton
            onPress={props.callback}
            blinking={props.mode === "fired"}
            pressSound={ArmButtonPressSoundPath}
            blinkSound={ArmButtonBlinkSoundPath}
            className={serializeClasses(classes)}
        >
            {icon}
        </BlinkingButton>
    );
}
