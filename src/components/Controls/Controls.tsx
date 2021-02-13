import React, { useEffect, useMemo } from "react";
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

    // @@Note: This might trigger an update when alarm
    // is in "fired" state even though we only need to
    // re-render on to-"idle" and to-"armed" transitions.
    const alarmClockIsNotIdle = useMemo(() => {
        return alarmClockMode !== "idle";
    }, [alarmClockMode]);

    const [classes, setClasses] = useClasses({
        controls__alarmClockIsNotIdle: false,
        controls: true
    });

    // @@Note: This might trigger an update when alarm
    // is in "fired" state even though we only need to
    // re-render on to-"idle" and to-"armed" transitions.
    useEffect(() => setClasses("update", {
        controls__alarmClockIsNotIdle: alarmClockIsNotIdle
    }), [alarmClockMode]);

    return (
        <div className={serializeClasses(classes)}>
            <MakeChangeTimeButton
                type="h+"
                applyChangeTime={applyChangeTime}
                className="changeTimeButton__left"
                disabled={alarmClockIsNotIdle}
            />
            <MakeChangeTimeButton
                type="h-"
                applyChangeTime={applyChangeTime}
                className="changeTimeButton__left"
                disabled={alarmClockIsNotIdle}
            />
            <ArmButton
                alarmClockMode={alarmClockMode}
                onArmButtonPress={onArmButtonPress}
            />
            <MakeChangeTimeButton
                type="m+"
                applyChangeTime={applyChangeTime}
                className="changeTimeButton__right"
                disabled={alarmClockIsNotIdle}
            />
            <MakeChangeTimeButton
                type="m-"
                applyChangeTime={applyChangeTime}
                className="changeTimeButton__right"
                disabled={alarmClockIsNotIdle}
            />
        </div>
    );
}
