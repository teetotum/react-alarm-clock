import React from "react";
import StartButton from "@components/StartButton";
import IncreaseButton from "@components/IncreaseButton";
import DecreaseButton from "@components/DecreaseButton";
import { TimeUnit, ChangeTimeFunction } from "@common/types";
import "./Controls.scss";

type PropsType = {
    running: boolean;
    toggleRunning: () => void;
    changeTime: ChangeTimeFunction;
};

export default function Controls(props: PropsType) {
    const {running, toggleRunning, changeTime} = props;

    let [left, right] = (() => {
        if (running) {
            return [null, null];
        } else {
            return [
                <>
                <IncreaseButton changeTime={changeTime} unit="hour"/>
                <DecreaseButton changeTime={changeTime} unit="hour"/>
                </>,
                <>
                <IncreaseButton changeTime={changeTime} unit="minute"/>
                <DecreaseButton changeTime={changeTime} unit="minute"/>
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
