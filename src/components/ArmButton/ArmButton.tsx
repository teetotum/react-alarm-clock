import React, { useEffect, useMemo } from "react";
import BasicButton from "@components/BasicButton";
import { PlayIcon, PauseIcon } from "./icons";
import { useClasses, serializeClasses } from "./useClasses";
import ArmButtonSound from "./ArmButton.mp3";
import "./ArmButton.scss";

type PropsType = {
    mode: types.AlarmClockMode;
    callback: () => void;
};

// @@Note: Right now, whenever the time changes, onPress() gets
// re-evaluated in <App> and, as a consequence, ArmButton re-renders.
// Maybe there's a way to avoid this kind of thing?
export default function ArmButton(props: PropsType) {
    const [classes, setClasses] = useClasses();

    useEffect(() => setClasses({
        ArmButton__isArmed: props.mode === "armed",
        ArmButton__isFired: props.mode === "fired"
    }), [props.mode]);

    const icon = useMemo(() => {
        return (props.mode === "idle") ? <PlayIcon/> : <PauseIcon/>;
    }, [props.mode]);

    return (
        <BasicButton
            onPress={props.callback}
            sound={ArmButtonSound}
            className={serializeClasses(classes)}
        >
            {icon}
        </BasicButton>
    );
}
