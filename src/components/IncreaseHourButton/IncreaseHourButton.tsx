import React, { memo, useCallback } from "react";
import ChangeTimeButton from "@components/ChangeTimeButton";
import { MAX_HOUR } from "@common/constants";
import {
    BoolMap,
    Time,
    ChangeTimeFunction,
    ApplyChangeTimeFunction
} from "@common/types";
import PlusIcon from "@assets/svg/plus.svg";

type PropsType = {
    applyChangeTime: ApplyChangeTimeFunction;
    disabled: boolean;
    className: (string|BoolMap);
};

const IncreaseHourButton = (props : PropsType) => {
    const {applyChangeTime, disabled, className} = props;

    const increaseHour: ChangeTimeFunction = ({hours, minutes}: Time) => {
        hours = (hours < MAX_HOUR) ? hours + 1 : 0;
        return {hours: hours, minutes: minutes};
    }

    const callback = useCallback(() => applyChangeTime(increaseHour), []);

    return (
        <ChangeTimeButton callback={callback} disabled={disabled} className={className}>
            <PlusIcon  className="button_icon"/>
        </ChangeTimeButton>
    );
};

export default memo(IncreaseHourButton);
