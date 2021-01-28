import React from "react";
import ChangeTimeButton from "@components/ChangeTimeButton";
import { Time, ChangeTimeFunction, ApplyChangeTimeFunction } from "@common/types";
import PlusIcon from "@assets/svg/plus.svg";

type PropsType = { applyChangeTime: ApplyChangeTimeFunction; };

export default function IncreaseMinuteButton({applyChangeTime}: PropsType) {
    let increaseMinute: ChangeTimeFunction = ({hours, minutes}: Time) => {
        minutes = (minutes < 59) ? minutes + 1 : 0;
        return {hours: hours, minutes: minutes};
    }

    return (
        <ChangeTimeButton callback={() => applyChangeTime(increaseMinute)}>
            <PlusIcon  className="icon"/>
        </ChangeTimeButton>
    );
}
