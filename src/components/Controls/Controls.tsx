import React from "react";
import ChangeTimeButton from "@components/ChangeTimeButton";
import StartButton from "@components/StartButton";
import PreviewSoundButton from "@components/PreviewSoundButton";
import { ButtonAction, TimeUnit } from "@common/types";
import "./Controls.scss";

type PropsType = {
    running: boolean;
    toggleRunning: () => void;
    changeTime: (action: ButtonAction, unit: TimeUnit) => void;
};

export default function Controls(props: PropsType) {
    const {running, toggleRunning, changeTime} = props;

    let [left, right] = (() => {
        if (running) {
            return [null, null];
        } else {
            return [
                <>
                <ChangeTimeButton unit="hour" action="increase" changeTime={changeTime} />
                <ChangeTimeButton unit="hour" action="decrease" changeTime={changeTime} />
                </>,
                <>
                <ChangeTimeButton unit="minute" action="increase" changeTime={changeTime} />
                <ChangeTimeButton unit="minute" action="decrease" changeTime={changeTime} />
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
