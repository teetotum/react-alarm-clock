import React, { useEffect, useMemo } from "react";
import ArmButton from "@components/ArmButton";
import ChangeTimeButton from "@components/ChangeTimeButton";
import useClasses, { serializeClasses } from "@hooks/useClasses";
import "./Controls.scss";

type PropsType = {
    mode: types.AlarmClockMode;
    onArmButtonPress: () => void;
    onChangeTimeButtonPress: (type: types.ChangeTimeButtonType) => void;
};

export default function Controls(props: PropsType) {
    const {mode, onArmButtonPress, onChangeTimeButtonPress} = props;

    const [classes, setClasses] = useClasses({
        controls__isNotIdle: false,
        controls: true
    });

    const isNotIdle = mode !== "idle";
    useEffect(() => setClasses("update", {controls__isNotIdle: isNotIdle}), [isNotIdle]);

    return (
        <div className={serializeClasses(classes)}>
            <ChangeTimeButton
                type="h+"
                disabled={isNotIdle}
                className="changeTimeButton__left"
                onPress={onChangeTimeButtonPress}
            />
            <ChangeTimeButton
                type="h-"
                disabled={isNotIdle}
                className="changeTimeButton__left"
                onPress={onChangeTimeButtonPress}
            />
            <ArmButton
                mode={mode}
                onPress={onArmButtonPress}
            />
            <ChangeTimeButton
                type="m+"
                disabled={isNotIdle}
                className="changeTimeButton__right"
                onPress={onChangeTimeButtonPress}
            />
            <ChangeTimeButton
                type="m-"
                disabled={isNotIdle}
                className="changeTimeButton__right"
                onPress={onChangeTimeButtonPress}
            />
        </div>
    );
}
