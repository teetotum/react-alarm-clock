import React, { memo, useCallback } from "react";
import ChangeTimeButton from "@components/ChangeTimeButton";
import { Time, ChangeTimeFunction, ApplyChangeTimeFunction } from "@common/types";
import PlusIcon from "@assets/svg/plus.svg";

type PropsType = { applyChangeTime: ApplyChangeTimeFunction; };

const IncreaseHourButton = ({applyChangeTime}: PropsType) => {
    const increaseHour: ChangeTimeFunction = ({hours, minutes}: Time) => {
        hours = (hours < 23) ? hours + 1 : 0;
        return {hours: hours, minutes: minutes};
    }

    const callback = useCallback(() => applyChangeTime(increaseHour), []);

    return (
        <ChangeTimeButton callback={callback}>
            <PlusIcon  className="icon"/>
        </ChangeTimeButton>
    );
};

export default memo(IncreaseHourButton);
