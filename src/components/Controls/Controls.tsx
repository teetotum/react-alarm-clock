import React, { useState, useEffect, useMemo } from "react";
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

    const [pressed, setPressed] = useState<string|null>(null);

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
                off={isNotIdle}
                className="changeTimeButton__left"
                action={onChangeTimeButtonAction}
                onPress={() => setPressed("h+")}
                onRelease={() => setPressed(null)}
                disabled={pressed !== null && pressed !== "h+"}
            />
            <ChangeTimeButton
                type="h-"
                off={isNotIdle}
                className="changeTimeButton__left"
                action={onChangeTimeButtonAction}
                onPress={() => setPressed("h-")}
                onRelease={() => setPressed(null)}
                disabled={pressed !== null && pressed !== "h-"}
            />
            <ArmButton
                mode={mode}
                onPress={onArmButtonPress}
            />
            <ChangeTimeButton
                type="m+"
                off={isNotIdle}
                className="changeTimeButton__right"
                action={onChangeTimeButtonAction}
                onPress={() => setPressed("m+")}
                onRelease={() => setPressed(null)}
                disabled={pressed !== null && pressed !== "m+"}
            />
            <ChangeTimeButton
                type="m-"
                off={isNotIdle}
                className="changeTimeButton__right"
                action={onChangeTimeButtonAction}
                onPress={() => setPressed("m-")}
                onRelease={() => setPressed(null)}
                disabled={pressed !== null && pressed !== "m-"}
            />
        </div>
    );
}
