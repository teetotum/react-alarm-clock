import React from "react";
import classnames from 'classnames';
import { AlarmClockMode } from '@types';
import type { HTMLAttributesFunctionComponent } from '@types';
import BlinkingButton from "@components/BlinkingButton";
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
}) => (
    <BlinkingButton
        onPress={callback}
        blinking={mode === AlarmClockMode.FIRED}
        pressSound={ArmButtonPressSoundPath}
        blinkSound={ArmButtonBlinkSoundPath}
        className={classnames('ArmButton', className, {
            'ArmButton__isArmed': mode !== AlarmClockMode.IDLE,
        })}
    >
        {
            (mode === AlarmClockMode.IDLE) ? <PlayIcon className="icon" /> : <PauseIcon className="icon" />
        }
    </BlinkingButton>
);
