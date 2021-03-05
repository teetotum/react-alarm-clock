import React, { memo, useMemo, useCallback } from "react";
import HoldableButton from "@components/HoldableButton";
import MinusIcon from '@assets/icons/minus.svg';
import PlusIcon from '@assets/icons/plus.svg';
import usePressed from "./usePressed";
import ChangeTimeButtonPressAndHoldSoundPath from "@assets/audio/ChangeTimeButtonPressAndHold.mp3";
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
        return (type === "h+" || type === "m+") ? <PlusIcon className="icon" /> : <MinusIcon className="icon" />;
    }, []);

    return (
        <HoldableButton
            onPress={onPress}
            onRelease={onRelease}
            onHold={onHold}
            disabled={disabled}
            off={off}
            sound={ChangeTimeButtonPressAndHoldSoundPath}
            className={`ChangeTimeButton ${className}`}
        >
            {icon}
        </HoldableButton>
    );
});

export default ChangeTimeButton;
