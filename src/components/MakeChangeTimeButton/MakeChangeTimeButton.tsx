import React, { memo, useMemo, useCallback } from "react";
import ChangeTimeButton from "./ChangeTimeButton";
import { changeTime } from "@business/time";
import PlusIcon from "./plus.svg";
import MinusIcon from "./minus.svg";

type PropsType = {
    type: "h+"|"h-"|"m+"|"m-";
    applyChangeTime: types.ApplyChangeTimeFunction;
    className: (string|types.BoolDictionary);
    disabled: boolean;
};

const MakeChangeTimeButton = memo((props: PropsType) => {
    const {type, applyChangeTime, className, disabled} = props;

    const _changeTime = {
        "h+": (time: types.Time) => changeTime(time,  1,  0),
        "h-": (time: types.Time) => changeTime(time, -1,  0),
        "m+": (time: types.Time) => changeTime(time,  0,  1),
        "m-": (time: types.Time) => changeTime(time,  0, -1)
    }[type];

    const icon = useMemo(() => {
        if (type === "h+" || type === "m+") {
            return <PlusIcon className="button_icon" />;
        } else {
            return <MinusIcon className="button_icon" />;
        }
    }, [type]);

    const callback = useCallback(() => applyChangeTime(_changeTime), []);

    return (
        <ChangeTimeButton
            callback={callback}
            disabled={disabled}
            className={className}
        >
            {icon}
        </ChangeTimeButton>
    );
});

export default MakeChangeTimeButton;
