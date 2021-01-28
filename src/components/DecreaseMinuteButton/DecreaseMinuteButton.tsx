import React from "react";
import ChangeTimeButton from "@components/ChangeTimeButton";
import { Time, ChangeTimeFunction, ApplyChangeTimeFunction } from "@common/types";
import MinusIcon from "@assets/svg/minus.svg";

type PropsType = { applyChangeTime: ApplyChangeTimeFunction; };

export default function DecreaseMinuteButton({applyChangeTime}: PropsType) {
    let decreaseMinute: ChangeTimeFunction = ({hours, minutes}: Time) => {
        minutes = (minutes > 0) ? minutes - 1 : 59;
        return {hours: hours, minutes: minutes};
    }

    return (
        <ChangeTimeButton callback={() => applyChangeTime(decreaseMinute)}>
            <MinusIcon  className="icon"/>
        </ChangeTimeButton>
    );
}
