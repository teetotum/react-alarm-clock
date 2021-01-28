import React, { memo, useCallback } from "react";
import ChangeTimeButton from "@components/ChangeTimeButton";
import { Time, ChangeTimeFunction, ApplyChangeTimeFunction } from "@common/types";
import MinusIcon from "@assets/svg/minus.svg";

type PropsType = { applyChangeTime: ApplyChangeTimeFunction; };

const DecreaseHourButton = ({applyChangeTime}: PropsType) => {
    let decreaseHour: ChangeTimeFunction = ({hours, minutes}: Time) => {
        hours = (hours > 0) ? hours - 1 : 23;
        return {hours: hours, minutes: minutes};
    }

    const callback = useCallback(() => applyChangeTime(decreaseHour), []);

    return (
        <ChangeTimeButton callback={callback}>
            <MinusIcon  className="icon"/>
        </ChangeTimeButton>
    );
}

export default memo(DecreaseHourButton);
