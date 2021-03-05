import React from "react";
import classnames from 'classnames';
import { AlarmClockMode } from '@types';
import type { HTMLAttributesFunctionComponent } from '@types';
import { ArmButton } from "@components/ArmButton";
import ChangeTimeButton from "@components/ChangeTimeButton";
import "./Controls.scss";

type ControlsProps = {
    mode: AlarmClockMode;
    armButtonCallback: () => void;
    changeTimeButtonCallback: (type: types.ChangeTimeButtonType) => void;
};

export const Controls: HTMLAttributesFunctionComponent<ControlsProps> = ({
    mode, armButtonCallback, changeTimeButtonCallback,
}) => {
    const isNotIdle = mode !== AlarmClockMode.IDLE;
    return (
        <div className={classnames('Controls', {
            'Controls__isNotIdle': isNotIdle,
        })}>
            <ChangeTimeButton
                callback={changeTimeButtonCallback}
                off={isNotIdle}
                type="h+"
                className="ChangeTimeButton__left"
            />
            <ChangeTimeButton
                callback={changeTimeButtonCallback}
                off={isNotIdle}
                type="h-"
                className="ChangeTimeButton__left"
            />
            <ArmButton
                callback={armButtonCallback}
                mode={mode}
            />
            <ChangeTimeButton
                callback={changeTimeButtonCallback}
                off={isNotIdle}
                type="m-"
                className="ChangeTimeButton__right"
            />
            <ChangeTimeButton
                callback={changeTimeButtonCallback}
                off={isNotIdle}
                type="m+"
                className="ChangeTimeButton__right"
            />
        </div>
    );
}
