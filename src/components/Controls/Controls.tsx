import React, { useEffect, useMemo } from "react";
import ArmButton from "@components/ArmButton";
import ChangeTimeButton from "@components/ChangeTimeButton";
import makeUseClasses from "@hooks/useClasses";
import classData from "./classData";
import "./Controls.scss";

const [useClasses, serializeClasses] = makeUseClasses(classData);

type PropsType = {
    mode: types.AlarmClockMode;
    onArmButtonPress: () => void;
    onChangeTimeButtonAction: (type: types.ChangeTimeButtonType) => void;
};

export default function Controls(props: PropsType) {
    const {mode, onArmButtonPress, onChangeTimeButtonAction} = props;

    const [classes, setClasses] = useClasses();

    const isNotIdle = mode !== "idle";
    useEffect(() => setClasses({controls__isNotIdle: isNotIdle}), [isNotIdle]);

    return (
        <div className={serializeClasses(classes)}>
            <ChangeTimeButton
                type="h+"
                className={["changeTimeButton__left"]}
                action={onChangeTimeButtonAction}
                off={isNotIdle}
            />
            <ChangeTimeButton
                type="h-"
                className={["changeTimeButton__left"]}
                action={onChangeTimeButtonAction}
                off={isNotIdle}
            />
            <ArmButton
                mode={mode}
                onPress={onArmButtonPress}
            />
            <ChangeTimeButton
                type="m+"
                className={["changeTimeButton__right"]}
                action={onChangeTimeButtonAction}
                off={isNotIdle}
            />
            <ChangeTimeButton
                type="m-"
                className={["changeTimeButton__right"]}
                action={onChangeTimeButtonAction}
                off={isNotIdle}
            />
        </div>
    );
}
