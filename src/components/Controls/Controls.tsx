import React, { useEffect } from "react";
import StartButton from "@components/StartButton";
import IncreaseHourButton from "@components/IncreaseHourButton";
import DecreaseHourButton from "@components/DecreaseHourButton";
import IncreaseMinuteButton from "@components/IncreaseMinuteButton";
import DecreaseMinuteButton from "@components/DecreaseMinuteButton";
import useClassName from "@hooks/useClassName";
import { ApplyChangeTimeFunction } from "@common/types";
import "./Controls.scss";

type PropsType = {
    running: boolean;
    toggleRunning: () => void;
    applyChangeTime: ApplyChangeTimeFunction;
};

export default function Controls(props: PropsType) {
    const {running, toggleRunning, applyChangeTime} = props;

    const [className, setClassName] = useClassName({
        controls__alarmIsSet: true,
        controls: true
    });

    useEffect(() => setClassName("update", {controls__alarmIsSet: running}), [running]);

    return (
        <div className={className} >
            <IncreaseHourButton applyChangeTime={applyChangeTime}
                disabled={running} className="changeTimeButton__left" />
            <DecreaseHourButton applyChangeTime={applyChangeTime}
                disabled={running} className="changeTimeButton__left" />
            <StartButton running={running} toggleRunning={toggleRunning} />
            <IncreaseMinuteButton applyChangeTime={applyChangeTime}
                disabled={running} className="changeTimeButton__right"/>
            <DecreaseMinuteButton applyChangeTime={applyChangeTime}
                disabled={running} className="changeTimeButton__right"/>
        </div>
    );
}
