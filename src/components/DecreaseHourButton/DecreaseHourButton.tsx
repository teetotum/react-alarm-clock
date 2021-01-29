import React, { memo, useCallback } from "react";
import ChangeTimeButton from "@components/ChangeTimeButton";
import { MAX_HOUR } from "@common/constants";
import {
    BoolMap,
    Time,
    ChangeTimeFunction,
    ApplyChangeTimeFunction
} from "@common/types";
import MinusIcon from "@assets/svg/minus.svg";

type PropsType = {
    applyChangeTime: ApplyChangeTimeFunction;
    disabled: boolean;
    className: (string|BoolMap);
};

const DecreaseHourButton = (props: PropsType) => {
    const {applyChangeTime, disabled, className} = props;

    let decreaseHour: ChangeTimeFunction = ({hours, minutes}: Time) => {
        hours = (hours > 0) ? hours - 1 : MAX_HOUR;
        return {hours: hours, minutes: minutes};
    }

    const callback = useCallback(() => applyChangeTime(decreaseHour), []);

    return (
        <ChangeTimeButton callback={callback} disabled={disabled} className={className}>
            <MinusIcon  className="button_icon"/>
        </ChangeTimeButton>
    );
}

export default memo(DecreaseHourButton);
