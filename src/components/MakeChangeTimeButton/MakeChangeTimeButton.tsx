import React, { memo, useCallback } from "react";
import ChangeTimeButton from "./ChangeTimeButton";
import { changeTime } from "@business/time";
import PlusIcon from "./plus.svg";
import MinusIcon from "./minus.svg";

type PropsType = {
    type: "h+"|"h-"|"m+"|"m-";
    applyChangeTime: types.ApplyChangeTimeFunction;
    alarmIsSet: boolean;
    className: (string|types.BoolMap);
};

const MakeChangeTimeButton = memo((props: PropsType) => {
    const {type, applyChangeTime, alarmIsSet, className} = props;

    const _changeTime = {
        "h+": (time: types.Time) => changeTime(time,  1,  0),
        "h-": (time: types.Time) => changeTime(time, -1,  0),
        "m+": (time: types.Time) => changeTime(time,  0,  1),
        "m-": (time: types.Time) => changeTime(time,  0, -1)
    }[type];

    let icon;
    if (type === "h+" || type === "m+") {
        icon = <PlusIcon className="button_icon" />;
    } else {
        icon = <MinusIcon className="button_icon" />;
    }

    const callback = useCallback(() => applyChangeTime(_changeTime), []);

    return (
        <ChangeTimeButton callback={callback} alarmIsSet={alarmIsSet}
         className={className}>
            {icon}
        </ChangeTimeButton>
    );
});

export default MakeChangeTimeButton;
