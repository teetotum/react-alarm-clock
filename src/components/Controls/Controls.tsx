import React, { useEffect, useMemo } from "react";
import ArmButton from "@components/ArmButton";
import ChangeTimeButton from "@components/ChangeTimeButton";
import { useClasses, serializeClasses } from "./useClasses";
import "./Controls.scss";

type PropsType = {
    mode: types.AlarmClockMode;
    armButtonCallback: () => void;
    armButtonIsLit: boolean;
    changeTimeButtonCallback: (type: types.ChangeTimeButtonType) => void;
};

export default function Controls(props: PropsType) {
    const {mode, armButtonCallback, armButtonIsLit, changeTimeButtonCallback} = props;

    const [classes, setClasses] = useClasses();

    const isNotIdle = mode !== "idle";
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
                lit={armButtonIsLit}
            />
            <ChangeTimeButton
                callback={changeTimeButtonCallback}
                off={isNotIdle}
                type="m+"
                className="ChangeTimeButton__right"
            />
            <ChangeTimeButton
                callback={changeTimeButtonCallback}
                off={isNotIdle}
                type="m-"
                className="ChangeTimeButton__right"
            />
        </div>
    );
}
