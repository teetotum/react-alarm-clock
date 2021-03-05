import React, { useEffect, useMemo } from "react";
import { AlarmClockMode } from '@types';
import type { HTMLAttributesFunctionComponent } from '@types';
import BlinkingButton from "@components/BlinkingButton";
import { useClasses, serializeClasses } from "./useClasses";
import ArmButtonPressSoundPath from "@assets/audio/ArmButtonPress.mp3";
import ArmButtonBlinkSoundPath from "@assets/audio/ArmButtonBlink.mp3";
import PlayIcon from '@assets/icons/play.svg';
import PauseIcon from '@assets/icons/pause.svg';
import "./ArmButton.scss";

type ArmButtonProps = {
    callback: () => void;
    mode: AlarmClockMode;
};

// @@Note: Right now, whenever the time changes, onPress() gets
// re-evaluated in <App> and, as a consequence, ArmButton re-renders.
// Maybe there's a way to avoid this kind of thing?
export const ArmButton: HTMLAttributesFunctionComponent<ArmButtonProps> = ({
    callback, mode, className,
}) => {
    const [classes, setClasses] = useClasses();

    useEffect(() => setClasses({
        ArmButton__isArmed: mode !== AlarmClockMode.IDLE
    }), [mode]);

    const icon = useMemo(() => {
        return (mode === AlarmClockMode.IDLE) ? <PlayIcon className="icon" /> : <PauseIcon className="icon" />;
    }, [mode]);

    return (
        <BlinkingButton
            onPress={callback}
            blinking={mode === AlarmClockMode.FIRED}
            pressSound={ArmButtonPressSoundPath}
            blinkSound={ArmButtonBlinkSoundPath}
            className={serializeClasses(classes)}
        >
            {icon}
        </BlinkingButton>
    );
}
