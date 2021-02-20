import React, { memo, useMemo, useCallback } from "react";
import HoldableButton from "@components/HoldableButton";
import { PlusIcon, MinusIcon } from "./icons";
import usePressed from "./usePressed";
import ChangeTimeButtonSound from "./ChangeTimeButton.mp3";
import "./ChangeTimeButton.scss";

type PropsType = {
    callback: (type: types.ChangeTimeButtonType) => void;
    off: boolean;
    type: types.ChangeTimeButtonType;
    className: string;
};

const ChangeTimeButton = memo((props: PropsType) => {
    const { callback, type, off, className } = props;

    const [pressed, setPressed] = usePressed();
    const disabled = pressed !== null && pressed !== type;

    const onPress   = useCallback(() => { callback(type); setPressed(type) }, [type]);
    const onRelease = useCallback(() => setPressed(null), []);
    const onHold    = useCallback(() => callback(type), [type]);

    const icon = useMemo(() => {
        return (type === "h+" || type === "m+") ? <PlusIcon/> : <MinusIcon/>;
    }, []);

    return (
        <HoldableButton
            onPress={onPress}
            onRelease={onRelease}
            onHold={onHold}
            disabled={disabled}
            off={off}
            sound={ChangeTimeButtonSound}
            className={`ChangeTimeButton ${className}`}
        >
            {icon}
        </HoldableButton>
    );
});

export default ChangeTimeButton;
