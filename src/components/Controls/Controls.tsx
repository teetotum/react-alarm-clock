import React from "react";
import ChangeTimeButton from "@components/ChangeTimeButton";
import StartButton from "@components/StartButton";
import { Action, Unit } from "@common/types";
import "./Controls.scss";

type PropsType = {
    isOn: boolean;
    start: () => void;
    changeTime: (action: Action, unit: Unit) => void;
};

export default function Controls(props: PropsType) {
    const {isOn, start, changeTime} = props;

    return (
        <div className="controls">
            {!isOn &&
            <>
            <ChangeTimeButton unit="hour" action="increase" changeTime={changeTime} />
            <ChangeTimeButton unit="hour" action="decrease" changeTime={changeTime} />
            </>
            }
            <StartButton isOn={isOn} onClick={start} />
            {!isOn &&
            <>
            <ChangeTimeButton unit="minute" action="increase" changeTime={changeTime} />
            <ChangeTimeButton unit="minute" action="decrease" changeTime={changeTime} />
            </>
            }
        </div>
    );
}
