import React, { useCallback } from "react";
import ChangeTimeButton, { PropsType } from "./ChangeTimeButton";
import createGlobalState from "@hooks/useGlobal";

const usePressed = createGlobalState<types.ChangeTimeButtonType|null>(null);

export default (props: PropsType) => {
    const [pressed, setPressed] = usePressed();

    const onPress = useCallback(() => {
        setPressed(props.type);
    }, [props.type]);

    const onRelease = useCallback(() => {
        setPressed(null);
    }, []);

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
