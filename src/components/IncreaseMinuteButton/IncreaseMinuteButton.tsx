import React, { memo, useCallback } from "react";
import ChangeTimeButton from "@components/ChangeTimeButton";
import { MAX_MINUTE } from "@common/constants";
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

const IncreaseMinuteButton = (props: PropsType) => {
    const {applyChangeTime, disabled, className} = props;

    let increaseMinute: ChangeTimeFunction = ({hours, minutes}: Time) => {
        minutes = (minutes < MAX_MINUTE) ? minutes + 1 : 0;
        return {hours: hours, minutes: minutes};
    }

    const callback = useCallback(() => applyChangeTime(increaseMinute), []);

    return (
        <ChangeTimeButton callback={callback} disabled={disabled} className={className}>
            <PlusIcon  className="button_icon"/>
        </ChangeTimeButton>
    );
}

export default memo(IncreaseMinuteButton);
