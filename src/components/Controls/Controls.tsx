import React from "react";
import StartButton from "@components/StartButton";
import IncreaseHourButton from "@components/IncreaseHourButton";
import DecreaseHourButton from "@components/DecreaseHourButton";
import IncreaseMinuteButton from "@components/IncreaseMinuteButton";
import DecreaseMinuteButton from "@components/DecreaseMinuteButton";
import { ApplyChangeTimeFunction } from "@common/types";
import "./Controls.scss";

type PropsType = {
    running: boolean;
    toggleRunning: () => void;
    applyChangeTime: ApplyChangeTimeFunction;
};

export default function Controls(props: PropsType) {
    const {running, toggleRunning, applyChangeTime} = props;

    let [left, right] = (() => {
        if (running) {
            return [null, null];
        } else {
            return [
                <>
                <IncreaseHourButton applyChangeTime={applyChangeTime}/>
                <DecreaseHourButton applyChangeTime={applyChangeTime}/>
                </>,
                <>
                <IncreaseMinuteButton applyChangeTime={applyChangeTime}/>
                <DecreaseMinuteButton applyChangeTime={applyChangeTime}/>
                </>
            ];
        }
    })();

    return (
        <div id="controls">
            {left}
            <StartButton running={running} toggleRunning={toggleRunning} />
            {right}
        </div>
    );
}
