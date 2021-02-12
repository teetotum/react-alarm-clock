import React, { useEffect } from "react";
import ArmButton from "@components/ArmButton";
import MakeChangeTimeButton from "@components/MakeChangeTimeButton";
import useClasses, { serializeClasses } from "@hooks/useClasses";
import "./Controls.scss";

type PropsType = {
    alarmClockMode: types.AlarmClockMode;
    onArmButtonPress: () => void;
    applyChangeTime: types.ApplyChangeTimeFunction;
};

export default function Controls(props: PropsType) {
    const {alarmClockMode, onArmButtonPress, applyChangeTime} = props;

    const [classes, setClasses] = useClasses({
        controls__alarmIsNotIdle: false,
        controls: true
    });

    // @Note: This might trigger an update when alarm
    // is in "fired" state even though we only need to
    // re-render on to-"idle" and to-"armed" transitions.
    useEffect(() => setClasses("update", {
        controls__alarmIsNotIdle: alarmClockMode !== "idle"
    }), [alarmClockMode]);

    return (
        <div className={serializeClasses(classes)} >
            <MakeChangeTimeButton
                type="h+"
                applyChangeTime={applyChangeTime}
                alarmClockMode={alarmClockMode}
                className="changeTimeButton__left" />
            <MakeChangeTimeButton
                type="h-"
                applyChangeTime={applyChangeTime}
                alarmClockMode={alarmClockMode}
                className="changeTimeButton__left" />
            <ArmButton
                alarmClockMode={alarmClockMode}
                onArmButtonPress={onArmButtonPress} />
            <MakeChangeTimeButton
                type="m+"
                applyChangeTime={applyChangeTime}
                alarmClockMode={alarmClockMode}
                className="changeTimeButton__right"/>
            <MakeChangeTimeButton
                type="m-"
                applyChangeTime={applyChangeTime}
                alarmClockMode={alarmClockMode}
                className="changeTimeButton__right"/>
        </div>
    );
}
