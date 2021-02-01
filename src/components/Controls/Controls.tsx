import React, { useEffect } from "react";
import StartButton from "@components/StartButton";
import MakeChangeTimeButton from "@components/MakeChangeTimeButton";
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
            <MakeChangeTimeButton type="h+" applyChangeTime={applyChangeTime}
                alarmIsSet={running} className="changeTimeButton__left" />
            <MakeChangeTimeButton type="h-" applyChangeTime={applyChangeTime}
                alarmIsSet={running} className="changeTimeButton__left" />
            <StartButton running={running} toggleRunning={toggleRunning} />
            <MakeChangeTimeButton type="m+" applyChangeTime={applyChangeTime}
                alarmIsSet={running} className="changeTimeButton__right"/>
            <MakeChangeTimeButton type="m-" applyChangeTime={applyChangeTime}
                alarmIsSet={running} className="changeTimeButton__right"/>
        </div>
    );
}
