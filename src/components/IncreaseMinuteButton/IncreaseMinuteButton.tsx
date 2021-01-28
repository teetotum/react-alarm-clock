import React, { memo, useCallback } from "react";
import ChangeTimeButton from "@components/ChangeTimeButton";
import { Time, ChangeTimeFunction, ApplyChangeTimeFunction } from "@common/types";
import PlusIcon from "@assets/svg/plus.svg";

type PropsType = { applyChangeTime: ApplyChangeTimeFunction; };

const IncreaseMinuteButton = ({applyChangeTime}: PropsType) => {
    let increaseMinute: ChangeTimeFunction = ({hours, minutes}: Time) => {
        minutes = (minutes < 59) ? minutes + 1 : 0;
        return {hours: hours, minutes: minutes};
    }

    const callback = useCallback(() => applyChangeTime(increaseMinute), []);

    return (
        <ChangeTimeButton callback={callback}>
            <PlusIcon  className="icon"/>
        </ChangeTimeButton>
    );
}

export default memo(IncreaseMinuteButton);
