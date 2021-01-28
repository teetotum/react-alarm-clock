import React from "react";
import ChangeTimeButton from "@components/ChangeTimeButton";
import { Time, ChangeTimeFunction, ApplyChangeTimeFunction } from "@common/types";
import PlusIcon from "@assets/svg/plus.svg";

type PropsType = { applyChangeTime: ApplyChangeTimeFunction; };

export default function IncreaseHourButton({applyChangeTime}: PropsType) {
    const increaseHour: ChangeTimeFunction = ({hours, minutes}: Time) => {
        hours = (hours < 23) ? hours + 1 : 0;
        return {hours: hours, minutes: minutes};
    }

    return (
        <ChangeTimeButton callback={() => applyChangeTime(increaseHour)}>
            <PlusIcon  className="icon"/>
        </ChangeTimeButton>
    );
}
