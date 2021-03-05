import React, { useEffect, useMemo } from "react";
import { AlarmClockMode } from '@types';
import { ArmButton } from "@components/ArmButton";
import ChangeTimeButton from "@components/ChangeTimeButton";
import { useClasses, serializeClasses } from "./useClasses";
import "./Controls.scss";

type PropsType = {
    mode: AlarmClockMode;
    armButtonCallback: () => void;
    changeTimeButtonCallback: (type: types.ChangeTimeButtonType) => void;
};

export default function Controls(props: PropsType) {
    const { mode, armButtonCallback, changeTimeButtonCallback } = props;

    const [classes, setClasses] = useClasses();

    const isNotIdle = mode !== AlarmClockMode.IDLE;
    useEffect(() => setClasses({Controls__isNotIdle: isNotIdle}), [isNotIdle]);

    return (
        <div className={serializeClasses(classes)}>
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
