import React, { useEffect, useMemo } from "react";
import ArmButton from "@components/ArmButton";
import ChangeTimeButton from "@components/ChangeTimeButton";
import useClasses, { serializeClasses } from "@hooks/useClasses";
import "./Controls.scss";

type PropsType = {
    mode: types.AlarmClockMode;
    onArmButtonPress: () => void;
    onChangeTimeButtonAction: (type: types.ChangeTimeButtonType) => void;
};

export default function Controls(props: PropsType) {
    const {mode, onArmButtonPress, onChangeTimeButtonAction} = props;

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
                className="changeTimeButton__left"
                action={onChangeTimeButtonAction}
                off={isNotIdle}
            />
            <ChangeTimeButton
                type="h-"
                className="changeTimeButton__left"
                action={onChangeTimeButtonAction}
                off={isNotIdle}
            />
            <ArmButton
                mode={mode}
                onPress={onArmButtonPress}
            />
            <ChangeTimeButton
                type="m+"
                className="changeTimeButton__right"
                action={onChangeTimeButtonAction}
                off={isNotIdle}
            />
            <ChangeTimeButton
                type="m-"
                className="changeTimeButton__right"
                action={onChangeTimeButtonAction}
                off={isNotIdle}
            />
        </div>
    );
}
