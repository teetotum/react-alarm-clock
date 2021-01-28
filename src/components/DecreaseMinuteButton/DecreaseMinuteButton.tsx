import React, { memo, useCallback } from "react";
import ChangeTimeButton from "@components/ChangeTimeButton";
import { Time, ChangeTimeFunction, ApplyChangeTimeFunction } from "@common/types";
import MinusIcon from "@assets/svg/minus.svg";

type PropsType = { applyChangeTime: ApplyChangeTimeFunction; };

const DecreaseMinuteButton = ({applyChangeTime}: PropsType) => {
    let decreaseMinute: ChangeTimeFunction = ({hours, minutes}: Time) => {
        minutes = (minutes > 0) ? minutes - 1 : 59;
        return {hours: hours, minutes: minutes};
    }

    const callback = useCallback(() => applyChangeTime(decreaseMinute), []);

    return (
        <ChangeTimeButton callback={callback}>
            <MinusIcon  className="icon"/>
        </ChangeTimeButton>
    );
}

export default memo(DecreaseMinuteButton);
