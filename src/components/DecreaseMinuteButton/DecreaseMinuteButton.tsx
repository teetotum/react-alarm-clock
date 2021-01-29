import React, { memo, useCallback } from "react";
import ChangeTimeButton from "@components/ChangeTimeButton";
import { MAX_MINUTE } from "@common/constants";
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

const DecreaseMinuteButton = (props: PropsType) => {
    const {applyChangeTime, disabled, className} = props;

    let decreaseMinute: ChangeTimeFunction = ({hours, minutes}: Time) => {
        minutes = (minutes > 0) ? minutes - 1 : MAX_MINUTE;
        return {hours: hours, minutes: minutes};
    }

    const callback = useCallback(() => applyChangeTime(decreaseMinute), []);

    return (
        <ChangeTimeButton callback={callback} disabled={disabled} className={className}>
            <MinusIcon  className="button_icon"/>
        </ChangeTimeButton>
    );
}

export default memo(DecreaseMinuteButton);
