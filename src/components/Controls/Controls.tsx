import React from "react";
import ChangeTimeButton from "@components/ChangeTimeButton";
import StartButton from "@components/StartButton";
import { ButtonAction, TimeUnit } from "@common/types";
import "./Controls.scss";

type PropsType = {
    running: boolean;
    toggleRunning: () => void;
    changeTime: (action: ButtonAction, unit: TimeUnit) => void;
};

export default function Controls(props: PropsType) {
    const {running, toggleRunning, changeTime} = props;

    return (
        <div className="controls">
            {!running &&
            <>
            <ChangeTimeButton unit="hour" action="increase" changeTime={changeTime} />
            <ChangeTimeButton unit="hour" action="decrease" changeTime={changeTime} />
            </>
            }
            <StartButton running={running} toggleRunning={toggleRunning} />
            {!running &&
            <>
            <ChangeTimeButton unit="minute" action="increase" changeTime={changeTime} />
            <ChangeTimeButton unit="minute" action="decrease" changeTime={changeTime} />
            </>
            }
        </div>
    );
}
