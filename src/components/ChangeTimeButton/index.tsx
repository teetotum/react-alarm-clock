import React, { useCallback } from "react";
import ChangeTimeButton, { PropsType } from "./ChangeTimeButton";
import usePressed from "./usePressed";

export default (props: PropsType) => {
    const [pressed, setPressed] = usePressed();

    const onPress   = useCallback(() => setPressed(props.type), [props.type]);
    const onRelease = useCallback(() => setPressed(null), []);

    const disabled = pressed !== null && pressed !== props.type;

    return (
        <ChangeTimeButton
            {...props}
            onPress={onPress}
            onRelease={onRelease}
            disabled={disabled}
        />
    );
}
