import React from "react";
import ChangeTimeButton from "@components/ChangeTimeButton";
import { Time, ChangeTimeFunction, ApplyChangeTimeFunction } from "@common/types";
import MinusIcon from "@assets/svg/minus.svg";

type PropsType = { applyChangeTime: ApplyChangeTimeFunction; };

export default function DecreaseHourButton({applyChangeTime}: PropsType) {
    let decreaseHour: ChangeTimeFunction = ({hours, minutes}: Time) => {
        hours = (hours > 0) ? hours - 1 : 23;
        return {hours: hours, minutes: minutes};
    }

    return (
        <ChangeTimeButton callback={() => applyChangeTime(decreaseHour)}>
            <MinusIcon  className="icon"/>
        </ChangeTimeButton>
    );
}
